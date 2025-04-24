---
layout: post
title: Next.js Logging 
description:
menu: review
categories: nextjs
published: true
comments: false
sitemap: false
image: /assets/2024-11-12/1.jpg
---

<!-- [![alt text](/assets/2025-04-03/1.jpg "email"){:width="700px"}](/assets/2025-04-03/1.jpg)  -->


<!-- [![alt text](/assets/2025-04-07/1.jpg "email")](/assets/2025-04-07/1.jpg) -->
## Background

I'm working with a client who has a business application close to v1 release using this stack:

- Next.js (although we may be changing as have long compile times.. and don't use Next much.. what?)
- Vercel for hosting

One of the big issues with Logging and Monitoring on this stack is the [Serverless]() environment. Follow this link to my article on it.

## TLDR;

I got Axiom working - but am choosing not to use.


# Logging

eg events, errors, user actions.

Lets consider why log?  

- Monitoring of the system for warnings, performance, errors
- Debugging in production - being able to see what happened at a specific time.
- Auditing - what a person did and when.

I leave on trace level logging on my production systems because I can. It logs to disk (I run VM's on custom infrastructure with fast SSD disks). I backup logs.

I'd like to have a dashboard so clients can see errors and warnings. Also to see the load of the systems (it what is currently processing)

My favourite .NET logging library is [Serilog](https://serilog.net/) using [log levels](https://github.com/serilog/serilog/wiki/Configuration-Basics#minimum-level) of

- Verbose
- Debug - internal system events.
- Information - Things happening in the system that correspond to responsibilities. Generally observable actions the system can perform.
- Warning - Service is degraded or behaving outside expected parameters
- Error - Service unavailable or expectation are broken.
- Fatal - Demands immediate attention

Vercel can show:

- console.log - yes
- console.info - not differentiated in vercel. same as log
- console.warn - yes..
- console.error - yes..

I run production servers using VMs, so log to the filesystem. Using a Serverless we need to write to something less ephemeral.

[![alt text](/assets/2025-04-07/11.jpg "vercel logs")](/assets/2025-04-07/11.jpg)

Can use console.log, console.warn and console.error in vercel. These logs are only kept for 1 hour on the free tier, 1 day on pro and 3 dasy on enterprise. Vercel can ship logs to other services (paid for) Vercel can ship logs to other services (paid for)

[Pino](https://getpino.io/) - 15k stars. It is a node.js logger. [arcjet blog](https://blog.arcjet.com/structured-logging-in-json-for-next-js/) - it can do client side logging as well.

[Winston](https://github.com/winstonjs/winston). 3.17.0 (5 months old - 15th Apr 2025). 13m weekly downloads on npm.

###  Transports

[https://github.com/winstonjs/winston/blob/master/docs/transports.md](https://github.com/winstonjs/winston/blob/master/docs/transports.md) 

[https://github.com/paulelie/winston-pg-native](https://github.com/paulelie/winston-pg-native) 18 stars

[https://github.com/jpoon/winston-azuretable](https://github.com/jpoon/winston-azuretable) 7 stars

## Pino

Pino (for Next.js logging) + Fluentd + Loki + Grafana.

```bash
pnpm install pino pino-pretty
```


[![alt text](/assets/2025-04-07/12.jpg "pino on vercel logs")](/assets/2025-04-07/12.jpg)

Can see the structured logs coming into the stdout.

[cannot find module with pretty](https://stackoverflow.com/questions/78200117/how-to-implement-pino-logger-in-a-next-js-typescript-monorepo-for-both-client) fix.

- trace (10)
- debug (20)
- info (30)
- warning (40)
- error (50)
- fatal (60)

## Where to log to?

As Vecel is 'severless' I can't write to the filesystem (not really).

## Grafana

I couldn't get this working. No events being ingested into loki


[![alt text](/assets/2025-04-07/13.jpg "grafana hosted")](/assets/2025-04-07/13.jpg)

davemateer.grafana.net (deployed into UK)

towards - pino to loki to grafana (self host?)

promtail which reads system logs from files. (so don't need on serverless)

```bash
# https://www.npmjs.com/package/pino-loki
pnpm install pino-loki

# what grafana suggested I use
pnpm install @miketako3/cloki
```

It looks like I'm sending logs, but can't see them on the UI.

## Better Stack aka Logtail

[https://betterstack.com/docs/logs/vercel/automatic-integration/](https://betterstack.com/docs/logs/vercel/automatic-integration/) Interestingly they recommend using the paid log drain from Vercel.


[video demo](https://www.youtube.com/watch?v=fluDEkA1h6w&t=1325s)

[https://betterstack.com/docs/logs/javascript/](https://betterstack.com/docs/logs/javascript/)

```bash
# 0.5.4 on 17th Apr
pnpm i @logtail/pino
```

Sources represent services you want to collect logs from.

Source - JavaScript - Node.js


Production needed: [https://github.com/logtail/logtail-js/issues/129](https://github.com/logtail/logtail-js/issues/129) ie adding to next.config.ts. Also [here](https://medium.com/@sibteali786/debugging-pino-logger-issues-in-a-next-js-4e0c3368ef14)

I also came across an error from Vercel side:

`(node:4) ExperimentalWarning: vm.USE_MAIN_CONTEXT_DEFAULT_LOADER is an experimental feature and might change at any time`

And my log entry wasn't being sent to logtail.

```ts
// can get structured data to the conole
const log = pino(pino.destination({ sync: true }));

//
```
Okay, log entries work okay on pino being sent to the console.


## What is Vercel Serverless

Vercel functions are meant to be run quickly and teminate.

Serverless functions must flush logs before returning responses, as the environment ends immediately after the response is returned.

## Winston Logging

[https://github.com/winstonjs/winston](https://github.com/winstonjs/winston)

```bash
pnpm install winston
```

[betterstack aka logtail docs](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/)


[betterstack winston transport](https://betterstack.com/docs/logs/javascript/winston/)

```bash
pnpm install @logtail/winston @logtail/node
```

I can get this to work and send logs to logtail but only by handling it by myself:


```ts
import postgres from "postgres";

import winston from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);

// Create a function to get a fresh logger instance
function createLogger() {
  const ingestingHost = process.env.LOGTAIL_INGESTING_HOST ?? "";
  const sourceToken = process.env.LOGTAIL_SOURCE_TOKEN ?? "";

  const logtail = new Logtail(sourceToken, { endpoint: ingestingHost });

  return winston.createLogger({
    transports: [
      new LogtailTransport(logtail),
      new winston.transports.Console(),
    ],
  });
}

export async function GET() {
  // Create a new logger instance for each request
  const log = createLogger();
  try {
    const start = Date.now();
    log.info("insert starting");
    // await transactionInsert();
    await new Promise((resolve) => setTimeout(resolve, 500)); // Add 1 second delay
    log.info("insert end");
    const end = Date.now();
    const duration = end - start;

    log.info(`seedroutepino duration: ${duration}ms`);

    // Create a promise that resolves when logs are flushed
    const flushPromise = new Promise<void>((resolve) => {
      log.on("finish", () => resolve());
      log.end();
    });

    // Wait for logs to flush (with a timeout)
    await Promise.race([
      flushPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Log flush timeout")), 1000)
      ),
    ]);

    // log.end(); // Explicitly end Winston logging stream but after 2 calls it locks up

    return Response.json({
      message: `seeded successfully from route in ${duration} milliseconds`,
    });
  } catch (error) {
    // console.error("stderr: Seed route error:", error);
    // console.log("stdout: GET function", error);
    // log.error("error caught in seedroutepino GET");
    throw error;
    return Response.json({ error }, { status: 500 });
  }
}
```

You can see my iniital try of log.end() but after 2 calls it locks with an error:

TODO - try Axiom as maybe slightly more supported?


## Axiom

[https://axiom.co/docs/apps/vercel#what-is-vercel](https://axiom.co/docs/apps/vercel#migrate-from-vercel-app-to-next-axiom)

They talk about the cost rise from Vercel of using Log Drains and suggest using their `await log.flush()` for server components.


[https://app.axiom.co/](https://app.axiom.co/) is the front end for Axiom. I created a new Dataset, then a new Token.


```bash
# next-axiom library
pnpm install next-axiom
```
and

```ts
// next.config.ts
// axiom wraps everything
const { withAxiom } = require('next-axiom');

const nextConfig = withAxiom({
  // Your existing configuration.
  eslint: {
    ignoreDuringBuilds: true,
  },
});
```

and the secret below is to await the log.flush

```ts
import postgres from "postgres";
import { log } from "next-axiom";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!);

async function transactionInsert() {
  const customer = {
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
  };

  log.info("inside function start");
  // if I don't do a try catch it locks up postgres waiting for transaction to finish
  try {
    await sql.begin(async (sql) => {
      for (let i = 0; i < 1000; i++) {
        await sql`
            INSERT INTO customers (name, email, image_url)
            VALUES (${customer.name + i}, ${customer.email}, ${
          customer.image_url
        })
          `;
      }
    });
  } catch (error) {
    throw error;
  }
  log.info("inside function end");
}

export async function GET() {
  try {
    const start = Date.now();
    log.info("insert starting");

    await transactionInsert();

    const end = Date.now();
    const duration = end - start;

    log.info(`seedroutepino duration: ${duration}ms`);

    return Response.json({
      message: `seeded successfully from route in ${duration} milliseconds`,
    });
  } catch (error) {
    // try global error handler to see if axiom is working
    // throw error;
    log.error("error caught in seedroutepino GET ", { code: '500', error: error });
    return Response.json({ error }, { status: 500 });
  } finally {
    await log.flush();
  }
}
```

[https://www.imakewebsites.ca/posts/axiom-logging-nextjs-api-routes/](https://www.imakewebsites.ca/posts/axiom-logging-nextjs-api-routes/)


## others

[OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/)

[SizNoz](https://signoz.io/)

[https://opstrace.com/](https://opstrace.com/) - now gitlab


[https://github.com/grafana/grafana](https://github.com/grafana/grafana) - 67k stars. data vis platform. sources like: promethius, logi, elasticsearch, Postgres

[https://prometheus.io/](https://prometheus.io/) - DB for logs and metrics. There is an exporter for Plex Media Server [https://github.com/axsuul/plex-media-server-exporter](https://github.com/axsuul/plex-media-server-exporter) and Proxmos [https://forum.proxmox.com/threads/is-prometheus-an-optimal-option-to-monitor-proxmox.151726/](https://forum.proxmox.com/threads/is-prometheus-an-optimal-option-to-monitor-proxmox.151726/)

Pino to Loki

[lnav](https://lnav.org/) - command line log file nagivator


### Log Collector

[https://logflare.app/](https://logflare.app/) - part of Supabase. 3 days free.

[https://betterstack.com/pricing](https://betterstack.com/pricing) - formerly Logtail. 3 days for free.


[https://baselime.io/](https://baselime.io/) 7 days log retention and free.


## Metrics

eg performance, timings, resources - Promethius and Grafana

[https://grafana.com/pricing/](https://grafana.com/pricing/) 14 days retention. Open source data visualisation platform.

### Grafana

[https://github.com/grafana/grafana?pg=oss-graf&plcmt=hero-btn-3](https://github.com/grafana/grafana?pg=oss-graf&plcmt=hero-btn-3) data visualisation from promethius, loki, elastic search, postgres

[https://grafana.com/grafana/plugins/grafana-vercel-datasource](https://grafana.com/grafana/plugins/grafana-vercel-datasource) - Vercel plugin


[https://github.com/prometheus/prometheus](https://github.com/prometheus/prometheus) - time series database and monitoring system. Metrics and Alerts. Also visualisation.


### Sentry - Error only

[sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) - this is about logging errors. Includes client and server.

Setup a new Project (Next.js) in the dashboard.

```bash
pnpx @sentry/wizard@latest -i nextjs --saas --org hmsoftware --project cooking

# then authenticate using web browser

# do you want to route Sentry requests in the browser through your Next.js server to avoid ad blockers? - yes
# tracing to track the perf - yes
# session replay - yes
```

then

```ts
// global-error.tsx
"use client"; // Error boundaries must be Client Components
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

[![alt text](/assets/2025-04-07/14.jpg "email")](/assets/2025-04-07/14.jpg)

Sentry added `/sentry-example-page` which successfully sent an error in the dev.

Build time on Vercel went up from 47s to 1:43.

`.env.sentry-build-plugin` move the key to `.env` and plug into Vercel environment variables.

## Remove Sentry

It is very chatty, so to remove:

- .env.sentry-build-plugin
- instrumentation-client.ts
- instrumentation.ts
- sentry.edge.config.ys
- sentry.server.config.ts
- app/sentry-example-page

## Update next.js

```bash
pnpm install next@latest react@latest react-dom@latest
```

## Vercel Logging


[![alt text](/assets/2025-04-07/15.jpg "email")](/assets/2025-04-07/15.jpg)

3 levels of logging is good enough. Can easily filter.

Errors are sent to Sentry.


## Web Analytics (Vercel) and Speed Insights

Essentially a javascript that sends usage and perf data.


## Conclusion

Logging on Next.js (client and server) with Vercel (serverless) is complex.

Complexity in a critical application is bad (Stackoverflow had a tough problem which was caused by the logging library)

I am sticking with the 1 hour of Info, Warn, and Error log levels that I get on Vercel (for free), and using Sentry to keep an eye on long term Errors.

