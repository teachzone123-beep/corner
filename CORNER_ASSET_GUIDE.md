# CORNER asset guide

## Drop photos here

Put your images directly into `assets/user-provided/`. Supported formats are JPG, JPEG, PNG, and WebP. Subfolders are not scanned. Keep exact filenames, including the long shadowboxing filename, rather than guessing or renaming it.

After copying photos, run `npm run assets:sync`. The generated `assets/generated/userAssets.ts` contains static `require()` calls supported by Metro, typed metadata, and a list of unrecognised files. App screens use the image when present and show a glass placeholder when it is missing. Running sync with no photos generates an empty manifest and does not break the app.

Filename matching is case-insensitive and based on the basename. Known exercise names include `marching`, `sideshuffle`, `wallpushups`, `catcow`, `deadbugs`, `birddog`, `glutebridges`, and `squats`. Nutrition names include `poha`, `chana`, `paneerbowl`, `fruitsnuts`, `rajmachawal`, and `dalchawal`. `beltcollection`, `blackgym`, and `boxer` are catalogued for visual review.

Higher-intensity images (V-sits, burpees, jump squats, clap push-ups, plank punches, bicycle crunches, and line hops) are catalogued as advanced and are not included in the beginner plan. Image filenames do not verify what a photograph depicts. Review content before publishing it.

Unknown files are included once each and reported as “Review before use”; they are not automatically shown as exercise guidance. `npm run assets:sync` writes only the generated manifest.

