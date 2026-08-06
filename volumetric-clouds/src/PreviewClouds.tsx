import { createElement, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';

type Puff = {
  angle: number;
  radius: number;
  y: number;
  volume: number;
  bounds: [number, number, number];
  opacity: number;
  color: string;
  seed: number;
  segments: number;
};

/**
 * Five large, slow-orbiting clouds that read as real sky masses rather than
 * scattered puffs. Each Cloud fans out `segments` sprite billboards, so counts
 * are kept modest (7-9) while the volume/bounds are scaled ~2.5-3x to give
 * the island a sense of scale.
 */
const PUFFS: Puff[] = [
  { angle: 0.0, radius: 90, y: 65, volume: 95, bounds: [130, 35, 90], opacity: 0.58, color: '#a8b4bc', seed: 11, segments: 8 },
  { angle: 1.25, radius: 115, y: 72, volume: 115, bounds: [150, 40, 100], opacity: 0.52, color: '#9aa8b0', seed: 27, segments: 9 },
  { angle: 2.5, radius: 85, y: 58, volume: 85, bounds: [120, 30, 85], opacity: 0.6, color: '#b0bcc4', seed: 43, segments: 7 },
  { angle: 3.75, radius: 130, y: 68, volume: 125, bounds: [160, 42, 105], opacity: 0.5, color: '#98a6ae', seed: 58, segments: 9 },
  { angle: 5.0, radius: 100, y: 62, volume: 90, bounds: [130, 34, 90], opacity: 0.56, color: '#a6b2ba', seed: 72, segments: 8 },
];

const ORBIT_SPEED = 0.012; // radians / second — slow drift around the island

export const PreviewClouds = () => {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * ORBIT_SPEED;
    groupRefs.current.forEach((g, i) => {
      if (!g) return;
      const p = PUFFS[i];
      const a = p.angle + t.current;
      g.position.set(Math.cos(a) * p.radius, p.y, Math.sin(a) * p.radius);
    });
  });

  return createElement(
    Clouds,
    { material: THREE.MeshBasicMaterial, limit: 80, range: 900 },
    PUFFS.map((puff, i) =>
      createElement(
        'group',
        {
          key: i,
          ref: (el: THREE.Group | null) => (groupRefs.current[i] = el),
          position: [Math.cos(puff.angle) * puff.radius, puff.y, Math.sin(puff.angle) * puff.radius],
        },
        createElement(Cloud, {
          seed: puff.seed,
          segments: puff.segments,
          bounds: puff.bounds,
          volume: puff.volume,
          opacity: puff.opacity,
          color: puff.color,
          fade: 1200,
          growth: 4,
          speed: 0.04,
        })
      )
    )
  );
};
