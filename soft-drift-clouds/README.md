# Soft Drift Clouds

The quiet, high-altitude cloud look from the original island scene. A small set of
large, low-opacity `drei` `<Cloud>` puffs with only their own internal churn —
no orbiting, no per-frame group maths.

This is the *other* cloud style in this repo. If you want dense clouds that circle
a focal point, use `volumetric-clouds` instead.

## Install peers

```bash
npm i react three @react-three/fiber @react-three/drei
```

## Usage

```tsx
import { Canvas } from '@react-three/fiber';
import { SoftDriftClouds } from './SoftDriftClouds';

<Canvas>
  <SoftDriftClouds />
</Canvas>
```

### Custom puffs

```tsx
<SoftDriftClouds
  puffs={[
    { position: [10, 15, -10], speed: 0.1, opacity: 0.3 },
    { position: [-15, 12, -8], speed: 0.15, opacity: 0.25 },
    { position: [0, 18, 14], speed: 0.08, opacity: 0.2, color: '#dfe6ee' },
  ]}
/>
```

## Props

| Prop    | Type                  | Default        | Description                    |
| ------- | --------------------- | -------------- | ------------------------------ |
| `puffs` | `SoftDriftCloudPuff[]`| two high puffs | Position/speed/opacity per puff |

`SoftDriftCloudPuff`: `position`, `speed?`, `opacity?`, `color?`, `segments?`, `bounds?`.

## Notes

- Elements are created with `createElement` rather than JSX because some dev-time
  JSX taggers inject props that break drei's cloud internals.
- Keep puffs high (`y` ≈ 12–20 at a 15–60 unit camera distance) and opacity low;
  the look depends on them reading as distant haze.
