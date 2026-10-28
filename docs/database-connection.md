# Database connection settings

The settings in [api/src/db/index.ts](../api/src/db/index.ts), and why each one is set the way it is.

## How the API connects

- Through Supabase's **session pooler** (the `DATABASE_URL` in `api/.env`)
- Each API connection gets its own database connection for as long as it stays open
- Picked because the direct connection is IPv6 only, which many networks can't reach
- Fine for production too, as long as the API is a long-running server (not serverless)

## Settings

| Setting                 | Value          | What it means                                                                                                     |
| ----------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ssl.ca`                | Supabase's CA  | Encrypts the connection and checks it really is our database. Never turn certificate checking off               |
| `ssl.rejectUnauthorized`| `true`         | Refuse to connect if the certificate doesn't check out                                                            |
| `max`                   | `5`            | At most 5 open connections. Extra queries wait their turn instead of failing                                      |
| `idle_timeout`          | `300` seconds  | Keep an unused connection open for 5 minutes, so the next request skips the slow (~4 s) reconnect                 |
| `connect_timeout`       | `5` seconds    | Give up on a new connection after 5 seconds, so a down database returns a `500` quickly instead of hanging        |
| `prepare`               | default (on)   | Left on: the session pooler supports prepared statements. Turn it off only if we move to the transaction pooler |

## Why `max: 5`

- Each request runs one short query, then hands the connection back
- 5 connections handle far more requests than this app gets
- More connections don't make the small free-plan database faster
- Leaves room in Supabase's pool for migrations, the seed, the dashboard and a second instance during deploys
- Rule: `max` × number of API instances must stay under the plan's pool size (Project Settings → Database → Connection pooling)

## Things to watch

- **After Wi-Fi drops, laptop sleep or a database restart:** an open connection may be dead. The first request can be slow or return a `500` before postgres.js reconnects
- **Slow requests:** the dev database is in Seoul (`ap-northeast-2`). Every query takes ~0.8 s from Brisbane. Moving to Sydney (`ap-southeast-2`) fixes this
- **Going serverless or running many instances:** switch to the transaction pooler (port 6543) and set `prepare: false`
