'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Group } from 'three';

interface SapphireCrystalProps {
  position?: [number, number, number];
  scale?: [number, number, number] | number;
}

export default function SapphireCrystal({
  position = [0, 0, 0],
  scale = 1,
}: SapphireCrystalProps) {
  const groupRef = useRef<Group>(null);
  
  // Refs for individual crystal pillars in the cluster
  const coreRef = useRef<Group>(null);
  const p1Ref = useRef<Group>(null);
  const p2Ref = useRef<Group>(null);
  const p3Ref = useRef<Group>(null);
  const p4Ref = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.25;
      
      // Slow rotation of the entire cluster
      groupRef.current.rotation.y = time * 0.12;
    }

    // Micro-rotations and animations for individual crystal shards
    if (coreRef.current) coreRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
    if (p1Ref.current) p1Ref.current.position.y = Math.sin(time * 1.2) * 0.05;
    if (p2Ref.current) p2Ref.current.position.y = Math.sin(time * 1.5 + 1) * 0.04;
    if (p3Ref.current) p3Ref.current.position.y = Math.sin(time * 0.9 + 2) * 0.05;
    if (p4Ref.current) p4Ref.current.position.y = Math.sin(time * 1.1 + 3) * 0.03;
  });

  // Reusable component for a single hexagonal crystal prism
  const CrystalPrism = ({ 
    height = 1.5, 
    radius = 0.35, 
    color = '#0055ff', 
    wireColor = '#00BFFF',
    opacity = 0.4
  }) => {
    const wireScale = 1.01;
    return (
      <group>
        {/* Hexagonal Cylinder Body */}
        <mesh position={[0, height / 2, 0]}>
          <cylinderGeometry args={[radius, radius, height, 6, 1]} />
          <meshStandardMaterial
            color={color}
            emissive="#001845"
            roughness={0.05}
            metalness={0.95}
            flatShading
          />
        </mesh>
        
        {/* Hexagonal Cone Cap */}
        <mesh position={[0, height + (radius * 0.8) / 2, 0]}>
          <coneGeometry args={[radius, radius * 0.8, 6]} />
          <meshStandardMaterial
            color={color}
            emissive="#001845"
            roughness={0.05}
            metalness={0.95}
            flatShading
          />
        </mesh>

        {/* Wireframe Outline */}
        <mesh position={[0, height / 2, 0]} scale={wireScale}>
          <cylinderGeometry args={[radius, radius, height, 6, 1]} />
          <meshBasicMaterial
            color={wireColor}
            wireframe
            transparent
            opacity={opacity}
            blending={AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, height + (radius * 0.8) / 2, 0]} scale={wireScale}>
          <coneGeometry args={[radius, radius * 0.8, 6]} />
          <meshBasicMaterial
            color={wireColor}
            wireframe
            transparent
            opacity={opacity}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer energy sphere glow */}
      <mesh scale={2.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#00BFFF"
          wireframe
          transparent
          opacity={0.04}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Crystal Cluster Group */}
      <group>
        {/* 1. Central Tall Pillar */}
        <group ref={coreRef}>
          <CrystalPrism height={2.2} radius={0.4} color="#0044cc" wireColor="#00BFFF" opacity={0.5} />
        </group>

        {/* 2. Side Crystal Shard 1 (Front Right) */}
        <group 
          ref={p1Ref} 
          position={[0.5, -0.2, 0.4]} 
          rotation={[0.15, 0.2, -0.12]}
        >
          <CrystalPrism height={1.4} radius={0.25} color="#0055ff" wireColor="#2563EB" opacity={0.35} />
        </group>

        {/* 3. Side Crystal Shard 2 (Back Left) */}
        <group 
          ref={p2Ref} 
          position={[-0.5, -0.3, -0.4]} 
          rotation={[-0.2, 0.1, 0.18]}
        >
          <CrystalPrism height={1.6} radius={0.28} color="#0033bb" wireColor="#00BFFF" opacity={0.4} />
        </group>

        {/* 4. Side Crystal Shard 3 (Front Left) */}
        <group 
          ref={p3Ref} 
          position={[-0.55, -0.1, 0.3]} 
          rotation={[0.1, -0.35, 0.15]}
        >
          <CrystalPrism height={1.1} radius={0.22} color="#0066ff" wireColor="#00E5FF" opacity={0.3} />
        </group>

        {/* 5. Side Crystal Shard 4 (Back Right) */}
        <group 
          ref={p4Ref} 
          position={[0.45, -0.4, -0.55]} 
          rotation={[-0.18, -0.15, -0.2]}
        >
          <CrystalPrism height={1.3} radius={0.26} color="#0048dd" wireColor="#2563EB" opacity={0.35} />
        </group>
      </group>
    </group>
  );
}
