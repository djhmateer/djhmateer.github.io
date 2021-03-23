---
layout: post
title: Restoring MSSQL with bak and trn log files from command line 
description: 
menu: review
categories: MSSQL 
published: true 
comments: false     
sitemap: false
image: /assets/2021-03-11/cameras.jpg
---

<!-- [![Bitcoin logo](/assets/2021-02-19/bitcoin.svg "Bitcoin"){:width="500px"}](/assets/2021-02-19/bitcoin.svg) -->

<!-- [![Cameras](/assets/2021-03-11/cameras.jpg "Cameras"){:width="500px"}](/assets/2021-03-11/cameras.jpg) -->


I had this strange error using the GUI trying to restore a .bak database and it's associated trn transaction log files

> "Unable to create restore plan due to break in the LSN chain."

## CMD line

To dig in further I used:

[https://www.mssqltips.com/sqlservertip/1584/auto-generate-sql-server-restore-script-from-backup-files-in-a-directory/](https://www.mssqltips.com/sqlservertip/1584/auto-generate-sql-server-restore-script-from-backup-files-in-a-directory/) gives a nice script which

- reads all .bak and .trn files from a directory
- generates the sql

## Enable xp_commandshell

Be careful where you run this.

```sql
-- To allow advanced options to be changed. 
EXEC sp_configure 'show advanced options', 1 
GO 
 -- To update the currently configured value for advanced options. 
RECONFIGURE 
GO 
 -- To enable the feature. 
EXEC sp_configure 'xp_cmdshell', 1 
GO 
 -- To update the currently configured value for this feature. 
RECONFIGURE 
GO 
```

## Error

The script gave me essentially the same error:

> The log in this backup set begins at LSN 1058890000000031300001, which is too recent to apply to the database. An earlier log backup that includes LSN 1058885000000040900001 can be restored. 

Which means I can tell I've got a problem between 2 trn files.

Maybe one is missing.
Maybe a timing issue

## Find out what files are missing

[https://sqlbackupandftp.com/blog/the-log-in-this-backup-set-begins-at-lsn-which-is-too-recent-to-apply-to-the-database](https://sqlbackupandftp.com/blog/the-log-in-this-backup-set-begins-at-lsn-which-is-too-recent-to-apply-to-the-database)

This script tells us what backups have been run. So by running it on the prod(!) server it may give us a clue.


## Full Script

I added some logging to help me see which files were causing the error / break in the lsn chain.

```sql
-- https://www.mssqltips.com/sqlservertip/1584/auto-generate-sql-server-restore-script-from-backup-files-in-a-directory/
USE Master; 
GO  
SET NOCOUNT ON 

-- 1 - Variable declaration 
DECLARE @dbName sysname 
DECLARE @dbNewName sysname 
DECLARE @backupPath NVARCHAR(500) 
DECLARE @cmd NVARCHAR(500) 
DECLARE @msg NVARCHAR(500) 
DECLARE @fileList TABLE (backupFile NVARCHAR(255)) 
DECLARE @lastFullBackup NVARCHAR(500) 
DECLARE @lastDiffBackup NVARCHAR(500) 
DECLARE @backupFile NVARCHAR(500) 

-- 2 - Initialize variables 
SET @dbName = 'Portal' 
SET @dbNewName = 'Dave_PortaltW' 
SET @backupPath = 'c:\temp\' 

-- 3 - get list of files 
SET @cmd = 'DIR /b "' + @backupPath + '"'

INSERT INTO @fileList(backupFile) 
EXEC master.sys.xp_cmdshell @cmd 

-- dm commented out below
-- when don't have a .bak nor .dif files in c:\temp
-- 4 - Find latest full backup 
--SELECT @lastFullBackup = MAX(backupFile)  
--FROM @fileList  
--WHERE backupFile LIKE '%.BAK'  
--   AND backupFile LIKE @dbName + '%' 

--SET @cmd = 'RESTORE DATABASE [' + @dbName + '] FROM DISK = '''  
--       + @backupPath + @lastFullBackup + ''' WITH NORECOVERY, REPLACE' 
--PRINT @cmd 


-- 4 - Find latest diff backup 
--SELECT @lastDiffBackup = MAX(backupFile)  
--FROM @fileList  
--WHERE backupFile LIKE '%.DIF'  
--   AND backupFile LIKE @dbName + '%' 
--   AND backupFile > @lastFullBackup 

---- check to make sure there is a diff backup 
--IF @lastDiffBackup IS NOT NULL 
--BEGIN 
--   SET @cmd = 'RESTORE DATABASE [' + @dbName + '] FROM DISK = '''  
--       + @backupPath + @lastDiffBackup + ''' WITH NORECOVERY' 
--   PRINT @cmd 
--   SET @lastFullBackup = @lastDiffBackup 
--END 

-- 5 - check for log backups 
DECLARE backupFiles CURSOR FOR  
   SELECT backupFile  
   FROM @fileList 
   WHERE backupFile LIKE '%.TRN'  
   AND backupFile LIKE @dbName + '%' 
   --AND backupFile > @lastFullBackup 

OPEN backupFiles  

-- Loop through all the files for the database  
FETCH NEXT FROM backupFiles INTO @backupFile  

WHILE @@FETCH_STATUS = 0  
BEGIN  
   SET @msg = 'PRINT ''Trying: ' + @backupFile + ''''
   PRINT @msg
   SET @cmd = 'RESTORE LOG [' + @dbNewName + '] FROM DISK = '''  
       + @backupPath + @backupFile + ''' WITH NORECOVERY' 
   PRINT @cmd 
   FETCH NEXT FROM backupFiles INTO @backupFile  
END 

CLOSE backupFiles  
DEALLOCATE backupFiles  

-- 6 - put database in a useable state 
SET @cmd = 'RESTORE DATABASE [' + @dbNewName + '] WITH RECOVERY' 
PRINT @cmd 
```
