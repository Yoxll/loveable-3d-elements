# Volumetric Clouds (React Three Fiber)

Drop-in orbiting volumetric cloud layer for R3F scenes. Five large, slow-drifting
grey-mist cloud masses that circle a scene centre — tuned for a ~300-500 world-unit island.

## Requirements

```bash
npm i three @react-three/fiber @react-three/drei
```

## Usage

Copy `src/VolumetricClouds.tsx` into your project (e.g. `src/components/VolumetricClouds.tsx`),
then render it inside a `<Canvas>`:

```tsx
import { Canvas } from '@react-three/fiber';
import { VolumetricClouds } from './components/VolumetricClouds';

<Canvas>
  <VolumetricClouds />
</Canvas>
```

## Props

| Prop         | Type                       | Default          | Description                        |
| ------------ | -------------------------- | ---------------- | ---------------------------------- |
| `puffs`      | `CloudPuff[]`              | `DEFAULT_PUFFS`  | Cloud definitions                  |
| `orbitSpeed` | `number`                   | `0.012`          | Radians per second                 |
| `center`     | `[number, number, number]` | `[0, 0, 0]`      | Orbit centre in world space        |

### Tuning notes

- Keep the cloud count low (5-6). Each `<Cloud>` renders `segments` sprites, so
  many clouds with high segment counts read as a repeating tiled pattern.
- Set `y` near your terrain's peak height so clouds sit just above the skyline.
- Radii of ~1.2-1.5x the island radius keep the ring tight and visible.

MIT licensed.
