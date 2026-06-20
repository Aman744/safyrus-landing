'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending } from 'three';

interface Peak {
  pos: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export default function Himalayas() {
  const groupRef = useRef<Group>(null);

  // Set up 9 low-poly mountain peak definitions representing the Himalayan range
  const peaks = useMemo<Peak[]>(() => [
    { pos: [0, -0.5, -3.0], scale: [3.8, 3.8, 3.8], color: '#00BFFF' }, // Central highest peak (Everest)
    { pos: [-2.0, -0.6, -2.8], scale: [3.0, 3.0, 3.0], color: '#2563EB' },
    { pos: [2.0, -0.6, -2.8], scale: [3.2, 3.2, 3.2], color: '#00BFFF' },
    { pos: [-4.2, -0.8, -3.2], scale: [2.5, 2.5, 2.5], color: '#2563EB' },
    { pos: [4.2, -0.8, -3.2], scale: [2.6, 2.6, 2.6], color: '#0055ff' },
    { pos: [-6.0, -1.0, -3.5], scale: [2.0, 2.0, 2.0], color: '#00BFFF' },
    { pos: [6.0, -1.0, -3.5], scale: [2.1, 2.1, 2.1], color: '#2563EB' },
    { pos: [-1.0, -0.4, -2.0], scale: [1.8, 1.8, 1.8], color: '#00BFFF' }, // Forefront peaks
    { pos: [1.2, -0.4, -2.0], scale: [1.6, 1.6, 1.6], color: '#2563EB' },
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Very subtle sway to give depth to the mountain range on mouse movement / scroll
      groupRef.current.position.y = -0.4 + Math.sin(time * 0.2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {peaks.map((p, idx) => (
        <group key={idx} position={p.pos} scale={p.scale}>
          {/* Low-poly Peak Base (Pyramid / 4-segment cone) */}
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1.0, 1.0, 4]} />
            <meshStandardMaterial
              color="#0d1527"
              roughness={0.8}
              metalness={0.2}
              flatShading
            />
          </mesh>

          {/* Glowing wireframe overlay */}
          <mesh rotation={[0, Math.PI / 4, 0]} scale={1.002}>
            <coneGeometry args={[1.0, 1.0, 4]} />
            <meshBasicMaterial
              color={p.color}
              wireframe
              transparent
              opacity={0.3}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Ground plane cover */}
      <mesh position={[0, -1.0, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
    </group>
  );
}
