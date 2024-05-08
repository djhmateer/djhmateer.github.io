---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
# menu: review
categories: mssql 
published: true 
comments: false     
sitemap: false
image: /assets/2024-04-25/1.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

<!-- [![alt text](/assets/2024-04-24/1.jpg "email")](/assets/2024-04-24/1.jpg) -->

I'm trying to restore an MSSQL database using

- .bak file (800GB)
- .trn transaction log files

And getting:

`Microsoft.Data.SqlClient.SqlError: The log or differential backup cannot be restored because no files are ready to rollforward. (Microsoft.SqlServer.Smo)`

I'm trying to figure out the timings of what has happened which could have caused this as it has worked before.


[![alt text](/assets/2024-04-25/1.jpg "email")](/assets/2024-04-25/1.jpg)

I can restore all of Sunday 21st April, but not Monday 22nd Apr. Suspicious that the 0500 .bak file was written at 1805 in the evening. Problem sovled - the backup takes over 13 hours to complete.

But what about the insane log file of 18gb at 0700 on Sunday morning. which was written at 0733. I don't think this is a problem


## RESTORE NO RECOVERY

So the DB comes back in a `restoring` state but we can apply .trn log files to it. Remember on the last log file to `RESTORE WITH RECOVERY` so that the db comes back online.

## Error

`Microsoft.Data.SqlClient.SqlError: The log in this backup set terminates at LSN 1821957000080696200001, which is too early to apply to the database. A more recent log backup that includes LSN 1821957000104764400001 can be restored. (Microsoft.SqlServer.Smo)`

How to find out which trn log file it expects?


## Check log files

Here is how we can get the LSN's from a directory of files.


```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;

-- Where we put filenames from our directory
IF OBJECT_ID('tempdb..#Start') IS NOT NULL
    DROP TABLE #Start;

CREATE TABLE #Start(
    [BackupName] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


-- The output
IF OBJECT_ID('tempdb..#LogFileHeaders') IS NOT NULL
    DROP TABLE #LogFileHeaders;

CREATE TABLE #LogFileHeaders
(
    BackupName nvarchar(MAX),
    BackupDescription nvarchar(255),
    BackupType smallint,
    ExpirationDate datetime,
    Compressed bit,
    Position smallint,
    DeviceType tinyint, 
    UserName nvarchar(128),
    ServerName nvarchar(128),
    DatabaseName nvarchar(128),
    DatabaseVersion int,
    DatabaseCreationDate datetime,
    BackupSize numeric(20, 0),
    FirstLSN numeric(25, 0),
    LastLSN numeric(25, 0),
    CheckpointLSN numeric(25, 0),
    DatabaseBackupLSN numeric(25, 0),
    BackupStartDate datetime,
    BackupFinishDate datetime,
    SortOrder smallint,
    [CodePage] smallint,
    UnicodeLocaleId int,
    UnicodeComparisonStyle int,
    CompatibilityLevel tinyint,
    SoftwareVendorId int,
    SoftwareVersionMajor int,
    SoftwareVersionMinor int,
    SoftwareVersionBuild int,
    MachineName nvarchar(128),
    Flags int,
    BindingId uniqueidentifier,
    RecoveryForkId uniqueidentifier,
    Collation nvarchar(128),
    FamilyGUID uniqueidentifier,
    HasBulkLoggedData bit,
    IsSnapshot bit,
    IsReadOnly bit,
    IsSingleUser bit,
    HasBackupChecksums bit,
    IsDamaged bit,
    BeginsLogChain bit,
    HasIncompleteMetaData bit,
    IsForceOffline bit,
    IsCopyOnly bit,
    FirstRecoveryForkID uniqueidentifier,
    ForkPointLSN numeric(25, 0),
    RecoveryModel nvarchar(60),
    DifferentialBaseLSN numeric(25, 0),
    DifferentialBaseGUID uniqueidentifier,
    BackupTypeDescription nvarchar(60),
    BackupSetGUID uniqueidentifier,
    CompressedBackupSize bigint,
    Containment tinyint,
    KeyAlgorithm nvarchar(32),
    EncryptorThumbprint varbinary(20),
    EncryptorType nvarchar(32)
)

-- Variable to store file path and command for directory listing
DECLARE @Path VARCHAR(512) = 'C:\temp\foo\';  -- Adjust this path as necessary
DECLARE @Command VARCHAR(512) = 'DIR ' + @Path + '*.trn /B';

INSERT INTO #Start (BackupName)
EXEC xp_cmdshell @Command;

-- Remove NULL or irrelevant entries
DELETE FROM #Start WHERE BackupName IS NULL OR BackupName NOT LIKE '%.trn';

-- Declare variables to loop through files and add header info
DECLARE @FileName NVARCHAR(MAX);
DECLARE @DynamicSQL NVARCHAR(MAX);

-- Cursor to loop through each .trn file and populate header information
DECLARE file_cursor CURSOR FOR
SELECT BackupName FROM #Start;

OPEN file_cursor;
FETCH NEXT FROM file_cursor INTO @FileName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Build and execute the dynamic SQL to populate the header info
    SET @DynamicSQL = 'RESTORE HEADERONLY FROM DISK = ''' + @Path + @FileName + '''';

 	INSERT INTO #LogFileHeaders
           ([BackupName]
           ,[BackupDescription]
           ,[BackupType]
           ,[ExpirationDate]
           ,[Compressed]
           ,[Position]
           ,[DeviceType]
           ,[UserName]
           ,[ServerName]
           ,[DatabaseName]
           ,[DatabaseVersion]
           ,[DatabaseCreationDate]
           ,[BackupSize]
           ,[FirstLSN]
           ,[LastLSN]
           ,[CheckpointLSN]
           ,[DatabaseBackupLSN]
           ,[BackupStartDate]
           ,[BackupFinishDate]
           ,[SortOrder]
           ,[CodePage]
           ,[UnicodeLocaleId]
           ,[UnicodeComparisonStyle]
           ,[CompatibilityLevel]
           ,[SoftwareVendorId]
           ,[SoftwareVersionMajor]
           ,[SoftwareVersionMinor]
           ,[SoftwareVersionBuild]
           ,[MachineName]
           ,[Flags]
           ,[BindingId]
           ,[RecoveryForkId]
           ,[Collation]
           ,[FamilyGUID]
           ,[HasBulkLoggedData]
           ,[IsSnapshot]
           ,[IsReadOnly]
           ,[IsSingleUser]
           ,[HasBackupChecksums]
           ,[IsDamaged]
           ,[BeginsLogChain]
           ,[HasIncompleteMetaData]
           ,[IsForceOffline]
           ,[IsCopyOnly]
           ,[FirstRecoveryForkID]
           ,[ForkPointLSN]
           ,[RecoveryModel]
           ,[DifferentialBaseLSN]
           ,[DifferentialBaseGUID]
           ,[BackupTypeDescription]
           ,[BackupSetGUID]
           ,[CompressedBackupSize]
           ,[Containment]
           ,[KeyAlgorithm]
           ,[EncryptorThumbprint]
           ,[EncryptorType])
		EXEC (@DynamicSQL);

    FETCH NEXT FROM file_cursor INTO @FileName;
END;

CLOSE file_cursor;
DEALLOCATE file_cursor;

-- Does the LastLSN match the next FirstLSN?
-- look for 'No Match'
SELECT 
    BackupName, 
    FirstLSN, 
    LastLSN,
    LEAD(FirstLSN) OVER (ORDER BY BackupName) AS Next_FirstLSN,
    CASE 
        WHEN LastLSN = LEAD(FirstLSN) OVER (ORDER BY BackupName) THEN 'Match'
        ELSE 'No Match'
    END AS LSN_Check
FROM 
    #LogFileHeaders
ORDER BY 
    BackupName;
```


## Checker

[![alt text](/assets/2024-04-25/2.jpg "email")](/assets/2024-04-25/2.jpg)

Showing that each day there seems to be a break in the LSN numbers 

- LastLSN of 1745 file - 1821957000104761900001
- FirstLSN of 0700 file - 1821957000104785500001

From our error message above we're looking for an LSN of - 1821957000104764400001

- LastLSN - 1047619
- FirstLSN -1047855
- Target   -1047644

So we need a trn file written after 1745  and before 0700. Perhaps an 1800 one which isn't working?

## Veeam

Turns out the problem was another backup solution which somehow looked at the log files, thus breaking the chain. Once it was disabled for the log files, this restore worked. I only managed to restore the bak and all trn files together, not separate which should be possible.