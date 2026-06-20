'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending, Mesh } from 'three';

interface HinduTempleProps {
  position?: [number, number, number];
  scale?: number;
}

export default function HinduTemple({
  position = [0, 0, 0],
  scale = 1,
}: HinduTempleProps) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.12;
      // Very slow rotating animation
      groupRef.current.rotation.y = time * 0.04;
    }

    // Pulse the glowing sanctum core
    if (coreRef.current) {
      const pulse = 0.35 + Math.sin(time * 3) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Spin the celestial sacred geometry rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.25;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.18;
  });

  // Reusable procedural spire component representing Shikhara spires
  const SpireTower = ({ tiers = 6, baseWidth = 1.0, tierHeight = 0.4, color = '#00BFFF', opacityFactor = 0.35 }) => {
    return (
      <group>
        {Array.from({ length: tiers }).map((_, index) => {
          const factor = (tiers - index) / tiers; // Tapering
          const width = baseWidth * factor;
          const posY = index * tierHeight;

          return (
            <group key={index} position={[0, posY, 0]}>
              {/* Outer stepped square layers */}
              <mesh>
                <boxGeometry args={[width, tierHeight, width]} />
                <meshBasicMaterial
                  color={color}
                  wireframe
                  transparent
                  opacity={opacityFactor - index * 0.04}
                  blending={AdditiveBlending}
                />
              </mesh>
              {/* Inner supporting structural cylinder */}
              <mesh>
                <cylinderGeometry args={[width * 0.45, width * 0.55, tierHeight, 8]} />
                <meshBasicMaterial
                  color="#2563EB"
                  wireframe
                  transparent
                  opacity={0.12}
                  blending={AdditiveBlending}
                />
              </mesh>
            </group>
          );
        })}

        {/* Crowning ribbed disc (Amalaka) */}
        <group position={[0, tiers * tierHeight + 0.1, 0]}>
          <mesh>
            <torusGeometry args={[baseWidth * 0.2, baseWidth * 0.08, 8, 20]} />
            <meshBasicMaterial
              color={color}
              wireframe
              transparent
              opacity={0.4}
              blending={AdditiveBlending}
            />
          </mesh>
          {/* Spire tip (Kalasha) */}
          <mesh position={[0, baseWidth * 0.2, 0]}>
            <coneGeometry args={[baseWidth * 0.04, baseWidth * 0.25, 8]} />
            <meshBasicMaterial
              color={color}
              wireframe
              transparent
              opacity={0.65}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      
      {/* 1. Ground Platform (Stepped Jagati Base) */}
      {/* Lowest Layer */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.2, 0.15, 3.2]} />
        <meshBasicMaterial
          color="#00BFFF"
          wireframe
          transparent
          opacity={0.15}
          blending={AdditiveBlending}
        />
      </mesh>
      {/* Mid Layer */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[2.7, 0.15, 2.7]} />
        <meshBasicMaterial
          color="#00BFFF"
          wireframe
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
        />
      </mesh>
      {/* Upper Layer */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.2, 0.15, 2.2]} />
        <meshBasicMaterial
          color="#2563EB"
          wireframe
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* 2. Entrance Pillar Colonade (Simulating Mandapa Columns) */}
      {/* Render 4 glowing vertical column masts in front */}
      <group position={[0, -0.05, 0.75]}>
        {[-0.8, -0.3, 0.3, 0.8].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
            <meshBasicMaterial
              color="#00BFFF"
              wireframe
              transparent
              opacity={0.3}
              blending={AdditiveBlending}
            />
          </mesh>
        ))}
        {/* Flat Mandapa Roof */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.8, 0.05, 0.5]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 3. The Sanctum Inner Core (Garbhagriha Core) */}
      {/* A pulsing sapphire sphere representing the core intellect of the temple */}
      <mesh ref={coreRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.35}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* 4. Layered Spire Complex (Prasada) */}
      {/* Central Spire (Garbhagriha Tower - Tallest) */}
      <group position={[0, -0.22, 0]}>
        <SpireTower tiers={7} baseWidth={1.2} tierHeight={0.35} color="#00BFFF" opacityFactor={0.4} />
      </group>

      {/* Left Flanking Spire (Urushringa - Medium) */}
      <group position={[-0.7, -0.22, -0.1]} scale={0.75}>
        <SpireTower tiers={5} baseWidth={1.0} tierHeight={0.35} color="#2563EB" opacityFactor={0.3} />
      </group>

      {/* Right Flanking Spire (Urushringa - Medium) */}
      <group position={[0.7, -0.22, -0.1]} scale={0.75}>
        <SpireTower tiers={5} baseWidth={1.0} tierHeight={0.35} color="#2563EB" opacityFactor={0.3} />
      </group>

      {/* Back Flanking Spire (Smallest) */}
      <group position={[0, -0.22, -0.7]} scale={0.55}>
        <SpireTower tiers={4} baseWidth={0.9} tierHeight={0.35} color="#0055ff" opacityFactor={0.25} />
      </group>

      {/* 5. Celestial Rotating Sacred Geometry Rings (Concentric above the top spires) */}
      <group position={[0, 2.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Outer Ring */}
        <mesh ref={ring1Ref}>
          <ringGeometry args={[0.9, 1.0, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            side={2}
            transparent
            opacity={0.15}
            blending={AdditiveBlending}
          />
        </mesh>
        
        {/* Inner Ring */}
        <mesh ref={ring2Ref}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial
            color="#2563EB"
            side={2}
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Small center orbit ring */}
        <mesh>
          <ringGeometry args={[0.3, 0.32, 24]} />
          <meshBasicMaterial
            color="#00E5FF"
            side={2}
            transparent
            opacity={0.25}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

    </group>
  );
}
