# CORNER

CORNER is an Android-first Expo and React Native fitness companion built around comfortable home movement, recovery, local session tracking, and vegetarian food ideas.

## Current implementation

- First-run preferences and a simple weekly plan.
- Five-tab navigation: Home, Train, Calendar, Progress, and Profile.
- Configurable exercise catalogue, movement details, and interval session controls.
- Local-only profile/session persistence, calendar history, and consistency rewards.
- Vegetarian Fuel Room sample recipes and a local-safe Coach demo.
- Static photo manifest generator for `assets/user-provided/`.
- Supabase schema/RLS and a server-side coach function starter.

The repository is a development foundation. Backend account flows, a finished admin CMS, verified subscriptions, production AI, remote sync, and a signed Android build still require configuration and implementation; the app does not pretend those services are active.

## Run locally

```sh
npm install
npm run assets:sync
npm run start
```

Press `a` in the Expo terminal to launch an Android emulator, or scan the development QR code using Expo Go. For a device build, see [CORNER_TECHNICAL_GUIDE.md](CORNER_TECHNICAL_GUIDE.md).

## Add photos

Copy JPG, JPEG, PNG, or WebP files into [`assets/user-provided/`](assets/user-provided/README.md), then run:

```sh
npm run assets:sync
```

Known filenames map into exercise, nutrition, branding, or reward sections. Unknown names are retained in the manifest and reported for review. Empty folders compile with placeholders.

## Services

See `.env.example` for variable names and `supabase/` for the initial schema and coach function. Never put `OPENROUTER_API_KEY` or a Supabase service role key in an `EXPO_PUBLIC_` variable.

## Commands

```sh
npm run typecheck
npm run test:logic
npm run assets:sync
npm run build:android
```

See [CORNER_BUILD_STATUS.md](CORNER_BUILD_STATUS.md), [CORNER_ASSET_GUIDE.md](CORNER_ASSET_GUIDE.md), and [CORNER_TECHNICAL_GUIDE.md](CORNER_TECHNICAL_GUIDE.md).

