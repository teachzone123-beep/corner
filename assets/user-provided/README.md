# CORNER photo drop folder

Copy your JPG, JPEG, PNG, or WebP images into this folder. You do not need to sort them into subfolders. Keep the original filenames where possible, then run `npm run assets:sync` from the project root.

The sync script creates a TypeScript manifest with static Metro `require()` entries for each image found. Recognised names (such as `marching.jpg`, `poha.jpg`, and `beltcollection.jpg`) connect to matching app content. Unknown names are listed in the generated manifest and in the terminal report; they are not discarded. If the folder is empty, CORNER builds with its built-in visual placeholders.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp` (case-insensitive). Do not add executable files here. Please check that you have permission to use each image in the app.

