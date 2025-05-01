---
layout: post
title: Supabase and Vercel 
description:
menu: review
categories: supabase
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->


<!-- [![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg) -->

supabase.com/docs/guides/database/connecting-to-postgres](https://supabase.com/docs/guides/database/connecting-to-postgres) - good summary of Supabase connections strategies.

[![alt text](/assets/2025-04-07/3.jpg "email")](/assets/2025-04-07/3.jpg)

- Using Transaction Pooler in production as on Vercel which needs IPv4 and supports large numbers of connections.
- Using Direct Connection to run migrations which may run longer????? wont work on Vercel

Did a test of pooling and direct.. no real difference in speed. Tried to get the pooling side to fail under a long running transaction -(6 minutes).. fine.

Here is a test of creating the schema using a Direct SQL connection to the non pooling side 

[github.com/porsager/postgres](https://github.com/porsager/postgres) aka postgres.js - 7.9k stars - we are using this. Protection against SQL injection with parameters.

[github.com/brianc/node-postgres](https://github.com/brianc/node-postgres) - 12.6k stars. 

supabase.js - doesn't support transactions?


```ts
// db/seed.ts
// To run this console script
// npx tsx db/seed

import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);
// const sql = postgres(process.env.POSTGRES_URL!);

// can get the sql outputted, including parameters,but not the query time
// const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
//   ssl: 'require',
//   debug: (connection: number, query: string, parameters: any[], paramTypes: any[]) => {
//     console.log(' PG Executed query:', query);
//     if (parameters && parameters.length > 0) {
//       console.log(' PG parameters:', parameters);
//     }
//   },
// });

async function noTransactionInsert() {
  console.time();
  const customer = {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  };

  try {
    for (let i = 0; i < 1000; i++) {
      console.error("inserting ", i);
      await sql`INSERT INTO customers (name, email, image_url)
        VALUES (${customer.name+i}, ${customer.email}, ${customer.image_url})`;
    }
  } catch (error) {
    console.error("error", error);
  }

  // around 10secs
  console.timeEnd();
}

async function transactionInsert() {
  console.time();
  const customer = {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  };

  try {
    await sql.begin(async (sql) => {
      for (let i = 0; i < 1000; i++) {
        console.error("inserting ", i);
        await sql`
          INSERT INTO customers (name, email, image_url)
          VALUES (${customer.name + i}, ${customer.email}, ${customer.image_url})
        `;
      }
    });
  } catch (error) {
    console.error("error", error);
  }

  // around 10secs
  console.timeEnd();
}

noTransactionInsert();
transactionInsert();
```

The above works well from my network.

From vercel side I got a `This Serverless Function has timed out` after 10s. In Project, Settings, Functions, you can go up to 60s on the free tier.

```tsx
// seed/route.ts

export async function GET() {
  try {
    const start = Date.now();
    await noTransactionInsert();
    // transactionInsert();
    const end = Date.now();
    const duration = end - start;

    return Response.json({
      message: `seeded successfully from route in ${duration} milliseconds`,
    });
  } catch (error) {
    console.log("error", error);
    return Response.json({ error }, { status: 500 });
  }
}
```

Performance was much slower on Vercel (I was in a different region to my db). Now it is 3.6s compared to 10sec on my network. 

```json
// vercel.json
{
  "regions": ["lhr1"]
}
```

transactions worked fine on direct and pooling  - no change in speed.

I'm guessing the pooler connection works because I'm not using [Edge](https://supabase.com/docs/guides/functions) functions. [more](https://supabase.com/docs/guides/functions/connect-to-postgres) db connection guide...know more.

I believe I get more pooler connections.

[![alt text](/assets/2025-04-07/4.jpg "email")](/assets/2025-04-07/4.jpg)

I only 'need' POSTGRES_URL (have found that I can use transactions and the pooler fine from Vercel). But can't delete the other env variables.


## testing

I opened 2 terminal windows and ran this on all to simulate some load

```bash
for i in {1..10}; do
  echo "time: $(date +"%T")"
  # s is silent
  curl -s "https://cooking-iota-inky.vercel.app/seedroute"
  echo;
done
```

On the supabase side when I do multi queries at the same time, I get many errors on supabase:

### Prepared Statements

[https://www.postgresql.org/docs/current/sql-prepare.html](https://www.postgresql.org/docs/current/sql-prepare.html)

"Prepared statements potentially have the largest performance advantage when a single session is being used to execute a large number of similar statements. The performance difference will be particularly significant if the statements are complex to plan or rewrite, e.g., if the query involves a join of many tables or requires the application of several rules."

However this doesn't work for a pooled connection.

```tsx
// turn off prepared statments in the pooled connection
const sql = postgres(process.env.POSTGRES_URL!, {
  prepare: false
});
```

Getting a solid: {"message":"seeded successfully from route in 6548 milliseconds"}
accross all connections.

Changing to a NON POOLING

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);

is faster - about 4000milliseconds across all connection (4 at same time)


But we get on the nano (free db) tier.

- 60 direct connections
- 200 pooler connections

I can see number of connections

```sql
SELECT
   pg_stat_activity.pid,
   ssl AS ssl_connection,
   datname AS database,
   usename AS connected_role,
   application_name,
   client_addr,
   query,
   query_start,
   state,
   backend_start
FROM pg_stat_ssl
JOIN pg_stat_activity
 ON pg_stat_ssl.pid = pg_stat_activity.pid;
```

[![alt text](/assets/2025-04-03/4.jpg "email")](/assets/2025-04-03/4.jpg)

A quiet server with the only query running being the sql above to see display this list.


[![alt text](/assets/2025-04-03/5.jpg "email")](/assets/2025-04-03/5.jpg)

Application name: Supavisor.  Pooling conection


[![alt text](/assets/2025-04-03/6.jpg "email")](/assets/2025-04-03/6.jpg)

2 direct connections.

[![alt text](/assets/2025-04-03/9.jpg "email")](/assets/2025-04-03/9.jpg)

5 direct connections.

### Load test many request at once


```bash
sudo apt install parallel

# run 20 concurrent requets
# 60 in total
# // run in ~/ with ./foo.sh

#!/bin/bash

url="https://cooking-iota-inky.vercel.app/seedroute"
total_requests=60
concurrent_threads=20

# Function to measure time per request
make_request() {
  i=$1
  start_time=$(date +%s%3N)  # milliseconds

  echo "[$i] Requesting: $url"
  curl -s -o /dev/null -w "[%{http_code}] %{url_effective}\n" "$url"

  end_time=$(date +%s%3N)
  elapsed=$((end_time - start_time))
  echo "[$i] Elapsed: ${elapsed} ms"
}

export -f make_request
export url

# Start total timer
total_start=$(date +%s)

# Run parallel
seq 1 $total_requests | parallel -j $concurrent_threads make_request {}

# End total timer
total_end=$(date +%s)
total_elapsed=$((total_end - total_start))

echo ""
echo "✅ Total elapsed time: ${total_elapsed} seconds"
```


## Outputting SQL

```ts
// db/seed.ts
// To run this console script
// npx tsx db/seed

import "dotenv/config";
import postgres from "postgres";
// from nextjs-dashboard project
import { customers } from "./placeholder-data";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);

// can get the sql outputted, including parameters,but not the query time
// const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, {
//   ssl: 'require',
//   debug: (connection: number, query: string, parameters: any[], paramTypes: any[]) => {
//     console.log(' PG Executed query:', query);
//     if (parameters && parameters.length > 0) {
//       console.log(' PG parameters:', parameters);
//     }
//   },
// });
```