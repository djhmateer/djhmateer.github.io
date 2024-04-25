---
layout: post
# title: LLM Run Locally with CPU and Text Generation WebUI 
description: 
menu: review
categories: ror 
published: true 
comments: false     
sitemap: false
image: /assets/2024-03-03/2.jpg
---

<!-- [![alt text](/assets/2024-02-01/1.jpg "email"){:width="600px"}](/assets/2024-02-02/1.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email"){:width="800px"}](/assets/2024-03-03/2.jpg) -->
<!-- [![alt text](/assets/2024-03-03/2.jpg "email")](/assets/2024-03-03/2.jpg) -->

<!-- [![alt text](/assets/2024-04-24/1.jpg "email")](/assets/2024-04-24/1.jpg) -->



```sql
![alt text](image.png)
-- Enable xp_cmdshell (consult your DBA if permissions are an issue)
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;

--DECLARE @DynamicSQL NVARCHAR(MAX);
--SET @DynamicSQL = 'RESTORE HEADERONLY FROM DISK = ''C:\temp\foo\ProNet_backup_2024_04_21_070003_1327184.trn'''

--INSERT INTO LogFileHeaders (BackupName, BackupDescription, BackupType, ExpirationDate, Compressed, Position, DeviceType, UserName, ServerName, DatabaseName, DatabaseVersion, DatabaseCreationDate, BackupSize, FirstLSN, LastLSN, CheckpointLSN, DatabaseBackupLSN)
  --  EXEC (@DynamicSQL);

--INSERT INTO [dbo].[LogFileHeaders]
--           ([BackupName]
--           ,[BackupDescription]
--           ,[BackupType]
--           ,[ExpirationDate]
--           ,[Compressed]
--           ,[Position]
--           ,[DeviceType]
--           ,[UserName]
--           ,[ServerName]
--           ,[DatabaseName]
--           ,[DatabaseVersion]
--           ,[DatabaseCreationDate]
--           ,[BackupSize]
--           ,[FirstLSN]
--           ,[LastLSN]
--           ,[CheckpointLSN]
--           ,[DatabaseBackupLSN]
--           ,[BackupStartDate]
--           ,[BackupFinishDate]
--           ,[SortOrder]
--           ,[CodePage]
--           ,[UnicodeLocaleId]
--           ,[UnicodeComparisonStyle]
--           ,[CompatibilityLevel]
--           ,[SoftwareVendorId]
--           ,[SoftwareVersionMajor]
--           ,[SoftwareVersionMinor]
--           ,[SoftwareVersionBuild]
--           ,[MachineName]
--           ,[Flags]
--           ,[BindingId]
--           ,[RecoveryForkId]
--           ,[Collation]
--           ,[FamilyGUID]
--           ,[HasBulkLoggedData]
--           ,[IsSnapshot]
--           ,[IsReadOnly]
--           ,[IsSingleUser]
--           ,[HasBackupChecksums]
--           ,[IsDamaged]
--           ,[BeginsLogChain]
--           ,[HasIncompleteMetaData]
--           ,[IsForceOffline]
--           ,[IsCopyOnly]
--           ,[FirstRecoveryForkID]
--           ,[ForkPointLSN]
--           ,[RecoveryModel]
--           ,[DifferentialBaseLSN]
--           ,[DifferentialBaseGUID]
--           ,[BackupTypeDescription]
--           ,[BackupSetGUID]
--           ,[CompressedBackupSize]
--           ,[Containment]
--           ,[KeyAlgorithm]
--           ,[EncryptorThumbprint]
--           ,[EncryptorType])
--		EXEC (@DynamicSQL);


-- Continue with the rest of your operations...





-- Create a temporary table to store log file headers
IF OBJECT_ID('tempdb..#LogFileHeaders') IS NOT NULL
    DROP TABLE #LogFileHeaders;

--IF OBJECT_ID('tempdb..#LogFileHeadersOLD') IS NOT NULL
--    DROP TABLE #LogFileHeadersOLD;

--CREATE TABLE #LogFileHeadersOLD
--(
--    BackupName NVARCHAR(128),
--    BackupDescription NVARCHAR(255),
--    BackupType SMALLINT,
--    ExpirationDate DATETIME,
--    Compressed BIT,
--    Position INT,
--    DeviceType TINYINT,
--    UserName NVARCHAR(128),
--    ServerName NVARCHAR(128),
--    DatabaseName NVARCHAR(128),
--    DatabaseVersion INT,
--    DatabaseCreationDate DATETIME,
--    BackupSize NUMERIC(20,0),
--    FirstLSN NUMERIC(25,0),
--    LastLSN NUMERIC(25,0),
--    CheckpointLSN NUMERIC(25,0),
--    DatabaseBackupLSN NUMERIC(25,0)
--    -- Include other columns as necessary
--);

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
DECLARE @Path NVARCHAR(MAX) = 'C:\temp\foo\';  -- Adjust this path as necessary
DECLARE @Command NVARCHAR(MAX);

-- Get list of .trn files from the directory
SET @Command = 'DIR ' + @Path + '*.trn /B';
--SELECT @Command
--INSERT INTO #LogFileHeaders (BackupName)

INSERT INTO Start (BackupName)
--EXEC xp_cmdshell @Command;
EXEC xp_cmdshell "DIR C:\temp\foo\*.trn /B"

-- Remove NULL or irrelevant entries
--DELETE FROM #LogFileHeaders WHERE BackupName IS NULL OR BackupName NOT LIKE '%.trn';
DELETE FROM Start WHERE BackupName IS NULL OR BackupName NOT LIKE '%.trn';

-- 176 rows - perfect
--SELECT * FROM #LogFileHeaders

-- Declare variables to loop through files and add header info
DECLARE @FileName NVARCHAR(MAX);
DECLARE @DynamicSQL NVARCHAR(MAX);

-- Cursor to loop through each .trn file and populate header information
DECLARE file_cursor CURSOR FOR
--SELECT BackupName FROM #LogFileHeaders;
SELECT BackupName FROM Start;

OPEN file_cursor;
FETCH NEXT FROM file_cursor INTO @FileName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Build and execute the dynamic SQL to populate the header info
    SET @DynamicSQL = 'RESTORE HEADERONLY FROM DISK = ''' + @Path + @FileName + '''';
    --INSERT INTO #LogFileHeaders (BackupName, BackupDescription, BackupType, ExpirationDate, Compressed, Position, DeviceType, UserName, ServerName, DatabaseName, DatabaseVersion, DatabaseCreationDate, BackupSize, FirstLSN, LastLSN, CheckpointLSN, DatabaseBackupLSN)
    --EXEC (@DynamicSQL);

	-- this works but only on some
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

	-- 
	--SELECT @DynamicSQL

	-- this gets 176 rows of perfect SQL
	--INSERT INTO bar(foo) VALUES (@DynamicSQL)

    FETCH NEXT FROM file_cursor INTO @FileName;
END;

CLOSE file_cursor;
DEALLOCATE file_cursor;

-- Now, analyze the LSNs from #LogFileHeaders and determine if any are out of sequence
SELECT *,
       LAG(LastLSN, 1, 0) OVER (ORDER BY FirstLSN) AS PrevLastLSN
FROM #LogFileHeaders
ORDER BY FirstLSN;

-- Optional: Drop the temporary table if no longer needed
-- DROP TABLE #LogFileHeaders;


```