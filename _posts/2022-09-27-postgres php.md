---
layout: post
# title: Proxmox Beginners Guide
description: 
menu: review
categories: php
published: true 
comments: false     
sitemap: true
image: /assets/2022-09-22/1.jpg
---

<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "email"){:width="800px"}](/assets/2021-10-22/email-cover.jpg) -->
<!-- [![alt text](/assets/2021-10-22/email-cover.jpg "Thanks to Solen Feyissa on unsplash - https://unsplash.com/@solenfeyissa")](https://unsplash.com/@solenfeyissa) -->


<!-- [![alt text](/assets/2021-12-21/desk.jpg "email")](/assets/2021-12-21/desk.jpg) -->

<!-- [![alt text](/assets/2022-09-15/fire-map.jpg "email")](/assets/2022-09-15/fire-map.jpg) -->

<!-- [![alt text](/assets/2022-09-15/cookie.jpg "email")](/assets/2022-09-15/cookie.jpg) -->

[2020/11/09/postgres](2020/11/09/postgres) is a guide to setting up postgres on windows.

[https://github.com/djhmateer/password-postgres](https://github.com/djhmateer/password-postgres) shows connecting to postgres from .NET. Also good build scripts.



[https://github.com/osr4rightstools/osr4rights-tools/blob/main/fire-map-infra/pg-test.php](https://github.com/osr4rightstools/osr4rights-tools/blob/main/fire-map-infra/pg-test.php) good database test code using pdo with PHP. Also in here are good build scripts for a production server.

```php
PGTest
<?php

// show php errors otherwise will silently fail with no warnings on screen
// https://stackoverflow.com/a/21429652/26086
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// env variables are set in /etc/apache2/envvars
$username = getenv('DBFIRE_USERNAME');
$password = getenv('DBFIRE_PASSWORD');

// $username = 'postgres';
// $password = 'verysecret123!!';

echo "username " . $username;
// echo "password " . $password;

try {
	$pdo = new PDO('pgsql:host=127.0.0.1;dbname=nasafiremap', $username, $password);

	// $sql = "select * from users;";

	// Very userful for initial connect test
	$sql = "select version();";

	// useful when in pgadmin 
	// SELECT current_database();

	// $stmt = $pdo->prepare($sql);
	$stmt = $pdo->query($sql);
	$foo = $stmt->fetch();
	echo "foo is " . print_r($foo);

	$stmt = $pdo->query("select * from users");
	// $stmt is false if the query fails
	if (!$stmt) {
		die("Execute query error, because: " . print_r($pdo->errorInfo(), true));
	}

	$bar = $stmt->fetch();
	echo "bar is " . print_r($bar);


	echo "after bar query";
	echo "<br/>bar is " . print_r($bar);

	echo "done";
	// $stmt->execute([$s,$phash, $s]);	
	// $stmt->execute($s);

	// $c = $stmt->rowCount();

	// echo "c is " . $c;
} catch (PDOException $e) {

	echo "exception";
	die($e->getMessage());
}

echo "outside of try";
```

- PHP silently swallows exceptions unless you turn on error_reporting.
- PDO silently returns a false ($stmt above) if the query fails (eg table not there)

<!-- [![alt text](/assets/2022-09-22/1.jpg "email")](/assets/2022-09-22/1.jpg) -->

## PSQL

```bash
sudo -i -u postgres
psql

SELECT current_database();
```
