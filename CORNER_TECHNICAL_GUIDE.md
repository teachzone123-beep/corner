# CORNER technical guide

## Stack

Expo SDK 54, React Native, TypeScript, Expo Router, AsyncStorage for demo-local profile/session data, and Supabase migration/Edge Function scaffolding. User photos are loaded using generated static asset imports.

## Local development

1. Install Node.js LTS and Android Studio/emulator if needed.
2. Run `npm install`.
3. Copy photos to `assets/user-provided/` and run `npm run assets:sync` (optional).
4. Run `npm run start`, then press `a` for an emulator or use Expo Go.
5. Run `npm run typecheck` and `npm run test:logic` for local checks.

## Supabase setup

Create a Supabase project, install the Supabase CLI, link the project, and apply `supabase/migrations/0001_corner.sql`. The client currently runs in local demo mode and does not yet authenticate or sync data. Configure `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and server-only `OPENROUTER_API_KEY`/`OPENROUTER_MODEL` as Supabase function secrets before deploying `supabase/functions/coach`. Do not expose service role or AI secrets in the app.

The included SQL isolates profile/session/reward rows by `auth.uid()`, limits exercise and food reads to approved published content, and provides no client write policy for admin roles. Review and extend policies before production. Use a trusted server process to provision administrator roles.

## Android builds

The Android application ID is `com.teachzone.corner`; change it before publishing if it conflicts with an identifier you control. Install EAS CLI and sign in to an Expo account. Use `eas build --platform android --profile preview` for an internal APK, or `eas build --platform android --profile production` for an AAB. EAS will ask you to configure Android signing credentials. No APK/AAB or signing key is included in this repository.

## Not configured yet

Authentication and remote sync, admin content editor screens, payment SDK and trusted entitlement validation, production AI network client, notifications, analytics, push reminders, and app-store release setup remain future work. Membership price proposals from the brief are not treated as purchasable offers.

