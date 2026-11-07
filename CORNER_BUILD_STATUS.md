# CORNER build status

## Implemented in this foundation

- Expo Android app config, typed file-based navigation, dark CORNER visual tokens, and glass-inspired surfaces.
- First-run personalization (display name, experience, preferred days, low-impact preference).
- Five primary tabs with home plan card, movement catalogue/detail pages, calendar, progress, profile, settings, Fuel Room, Coach demo, and rewards.
- Local interval timer with pause, resume, skip, completion logging, and timer cleanup.
- On-device persistence for profile and completed sessions.
- Milestone reward logic based on completed sessions; no punitive streak behavior.
- Vegetarian sample meals, dairy-free labels, and non-restrictive general nutrition copy.
- Photo drop folder and static Expo/Metro asset manifest generator.
- Initial Supabase RLS schema and server-side Coach Edge Function scaffold.
- Basic unit tests for session records, time formatting, and rewards.

## Still requiring work/configuration

- Supabase authentication/client setup and remote data sync.
- Full backend/admin content management UI and privileged workflows.
- Coach function provider secrets, deployment, request rate limits, and client integration. Current in-app Coach is a safe local demo.
- Subscription SDK, purchase verification, guardian controls, and entitlement sync. Current membership is not purchasable.
- Exercise photography and content review. Add images to `assets/user-provided/` and run `npm run assets:sync`.
- Android device QA, performance/accessibility review, and signed APK/AAB build.

No credentials, production billing, or Android signing account were supplied. Do not treat this foundation as a store-ready fitness/medical product.

