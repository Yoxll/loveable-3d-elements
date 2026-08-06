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
 * Three bright white cumulus banks. Deliberately few and tightly packed:
 * low `growth` and compact bounds keep each bank reading as ONE solid mass
 * with a flat base, rather than a spray of separate puffs across the sky.
 */
const PUFFS: Puff[] = [
  { angle: 0.4, radius: 340, y: 165, volume: 520, bounds: [220, 44, 160], opacity: 0.99, color: '#ffffff', seed: 11, segments: 36 },
  { angle: 2.6, radius: 380, y: 185, volume: 600, bounds: [250, 50, 180], opacity: 0.98, color: '#fdfefe', seed: 43, segments: 40 },
  { angle: 4.5, radius: 360, y: 158, volume: 480, bounds: [210, 40, 150], opacity: 0.98, color: '#f7fafc', seed: 72, segments: 34 },
];

// One thin veil above the largest bank only — a hint of a wispy crown.
const VEILS: Puff[] = [
  { ...PUFFS[1], y: PUFFS[1].y + 28, volume: 260, bounds: [240, 34, 170], opacity: 0.42, color: '#eef4f8', seed: 144, segments: 18, angle: PUFFS[1].angle + 0.1 },
];


const ORBIT_SPEED = 0.012; // radians / second — slow drift around the island


export const DiaphanousClouds = () => {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const t = useRef(0);

  const ALL = [...PUFFS, ...VEILS];

  useFrame((_, delta) => {
    t.current += delta * ORBIT_SPEED;
    groupRefs.current.forEach((g, i) => {
      if (!g) return;
      const p = ALL[i];
      const a = p.angle + t.current;
      g.position.set(Math.cos(a) * p.radius, p.y, Math.sin(a) * p.radius);
    });
  });

  return createElement(
    Clouds,
    { material: THREE.MeshBasicMaterial, limit: 200, range: 900 },
    ALL.map((puff, i) =>
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
          fade: 3200,
          growth: 0.8,
          speed: 0.04,
        })
      )
    )
  );
};

