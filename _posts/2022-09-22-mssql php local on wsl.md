---
layout: post
# title: Proxmox Beginners Guide
description: 
# menu: review
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

I found that I couldn't connect to MSSQL on Windows from the WSL side. The ODBC drivers were working as I could connect to a remote instance. [source code](https://github.com/osr4rightstools/osr4rights-tools/blob/main/fire-map-infra/create_firemap_webserver.sh) sample.

So I got MSSQL working on WSL2 which isn't supported but it works.

[https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16) this is SQL2022 Preview v16 which needs SSMS tools 19 preview to get the profiler working

[https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-microsoft-sql-server](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-microsoft-sql-server)

```bash
# run mssql manually
sudo -u mssql /opt/mssql/bin/sqlservr -c -d/var/opt/mssql/data/master.mdf -l/var/opt/mssql/data/mastlog.ldf -e/var/opt/mssql/log/errorlog -x
```

Then connect from Windows via the IP

[![alt text](/assets/2022-09-22/1.jpg "email")](/assets/2022-09-22/1.jpg)

`172.24.49.17` which I found doing `ifconfig` from wsl side.


Then PHP side:

```php
$serverName = "127.0.0.1";
database = "OSR4Rights" ;
username = "sa";
password = "secret";

connectionOptions = array(
	"database" => $database,
	"uid" => $username,
	"pwd" => $password,
	"TrustServerCertificate" => true
);
```
[source code](https://github.com/osr4rightstools/osr4rights-tools/blob/main/fire-map-infra/create_firemap_webserver.sh) contains gotchas including getting the cursor correct to get the correct rowcount.



