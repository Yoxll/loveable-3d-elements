# loveable-3d-elements

A shared library of 3D building blocks (React Three Fiber components + GLB/texture assets) for Lovable island and nature scenes.

## Structure

```
loveable-3d-elements/
├── components/            # React Three Fiber components
│   ├── atmosphere/        # sky, haze, fog, scattering
│   ├── clouds/            # cloud systems
│   ├── environment/       # scene rigs, HDRI, biomes
│   ├── lighting/          # sun/moon, ambient, time-of-day
│   ├── ocean/             # open ocean, shoreline
│   ├── terrain/           # heightfields, ground
│   ├── weather/           # rain, snow, wind, storms
│   ├── water/             # lakes, rivers, ponds
│   └── effects/           # post-processing, particles, VFX
├── volumetric-clouds/     # standalone, working cloud package (do not modify)
│   ├── package.json
│   └── src/               # VolumetricClouds.tsx, PreviewClouds.tsx
├── assets/                # GLB models, textures, materials, audio
│   ├── fauna/             # animals — birds, mammals, reptiles, amphibians,
│   │                      #   fish, insects, pollinators, marine-life
│   ├── flora/             # plants — trees, shrubs, flowers, grasses, ferns, fungi
│   ├── geology/           # rocks, cliffs, caves, sand, soil
│   ├── water/             # water-surface assets
│   ├── structures/        # buildings and man-made structures
│   ├── vehicles/          # boats, drones, land vehicles
│   ├── textures/          # image maps (albedo, normal, roughness…)
│   ├── materials/         # reusable material definitions
│   ├── audio/             # ambience and SFX
│   └── effects/           # sprites, flipbooks, VFX source art
└── examples/              # runnable demo scenes
```

### Category mapping

The asset taxonomy is biological rather than flat, so some common names map as follows:

| Looking for | Lives in |
|---|---|
| `birds` | `assets/fauna/birds/` |
| `animals` | `assets/fauna/` (+ sub-categories) |
| `trees` | `assets/flora/trees/` |
| `plants` | `assets/flora/` (+ sub-categories) |
| `rocks` | `assets/geology/rocks/` |
| `buildings` | `assets/structures/` |

## Adding a future GLB asset

1. Pick the most specific existing folder (e.g. `assets/fauna/birds/`). Do not create a duplicate top-level folder.
2. Name the file in lowercase kebab-case, describing the subject: `flying-seagull.glb`, `hummingbird.glb`.
3. Keep models Y-up, metres, origin at the base/pivot point, and centred on X/Z.
4. Optimise before committing — draco/meshopt compression, textures ≤ 2048px, no unused animations.
5. Add a row to that folder's `README.md`: file name, source/licence, poly count, whether it is animated.
6. Reference it from a component with a loader path relative to the repo, e.g. `assets/fauna/birds/hummingbird.glb`.

## Conventions

- Components are `.tsx`, one component per file, PascalCase file names.
- Components must not hardcode absolute asset URLs — take a `url`/`src` prop or import a path constant.
- `volumetric-clouds/` is a working published package: leave it untouched unless versioning it deliberately.

## Cloud styles

Two distinct cloud packages live in this repo — pick by look, not by name:

| Package | Look | Use when |
|---|---|---|
| `volumetric-clouds/` | 5 large, dense puffs orbiting a centre point just past the island peaks, grey-mist tinted | You want clouds as a feature element with motion and scale |
| `soft-drift-clouds/` | 2 large, low-opacity high puffs with internal churn only, no orbit | You want quiet distant background sky |
