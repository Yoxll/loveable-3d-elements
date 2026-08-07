import { createElement } from 'react';
import { Cloud } from '@react-three/drei';

export interface SoftDriftCloudPuff {
  /** World-space position of the puff */
  position: [number, number, number];
  /** Internal churn speed of the puff (not travel speed) */
  speed?: number;
  /** 0..1 opacity of the sprite stack */
  opacity?: number;
  /** Optional tint */
  color?: string;
  /** Sprite count — higher = denser/softer, more expensive */
  segments?: number;
  /** Bounding volume the sprites spread across */
  bounds?: [number, number, number];
}

export interface SoftDriftCloudsProps {
  /**
   * Puffs to render. Defaults to the two soft high puffs used on the
   * original island scene.
   */
  puffs?: SoftDriftCloudPuff[];
}

/**
 * SoftDriftClouds
 *
 * The lightweight cloud look from the original island scene: a couple of
 * large, low-opacity drei <Cloud> puffs sitting high above the scene with
 * only their own internal churn — no orbiting, no per-frame group math.
 *
 * This is deliberately different from VolumetricClouds (which orbits a set
 * of dense puffs around a centre point). Use this one when you want quiet
 * background sky rather than a feature element.
 *
 * Note: elements are created with `createElement` instead of JSX because
 * some dev-time JSX taggers inject props that break drei's cloud internals.
 */
const DEFAULT_PUFFS: SoftDriftCloudPuff[] = [
  { position: [10, 15, -10], speed: 0.1, opacity: 0.3 },
  { position: [-15, 12, -8], speed: 0.15, opacity: 0.25 },
];

export function SoftDriftClouds({ puffs = DEFAULT_PUFFS }: SoftDriftCloudsProps) {
  return createElement(
    'group',
    null,
    ...puffs.map((puff, i) =>
      createElement(Cloud, {
        key: i,
        position: puff.position,
        speed: puff.speed ?? 0.1,
        opacity: puff.opacity ?? 0.3,
        color: puff.color,
        segments: puff.segments,
        bounds: puff.bounds,
      }),
    ),
  );
}

export default SoftDriftClouds;
