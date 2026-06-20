'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending, Mesh } from 'three';

interface MeditatingBoyProps {
  position?: [number, number, number];
  scale?: number;
}

export default function MeditatingBoy({
  position = [0, 0, 0],
  scale = 1,
}: MeditatingBoyProps) {
  const groupRef = useRef<Group>(null);
  const aura1Ref = useRef<Mesh>(null);
  const aura2Ref = useRef<Mesh>(null);
  const laptopScreenRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Smooth levitating bounce animation
      groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.15;
    }

    // Spin aura rings
    if (aura1Ref.current) {
      aura1Ref.current.rotation.z = time * 0.4;
      aura1Ref.current.rotation.y = time * 0.1;
    }
    if (aura2Ref.current) {
      aura2Ref.current.rotation.z = -time * 0.3;
      aura2Ref.current.rotation.x = time * 0.15;
    }

    // Laptop screen glow pulsing
    if (laptopScreenRef.current) {
      const pulse = 0.8 + Math.sin(time * 4) * 0.2;
      laptopScreenRef.current.scale.set(1, pulse, 1);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      
      {/* 1. Meditating Body (Low-poly wireframe humanoid figure) */}
      <group position={[0, 0.2, 0]}>
        {/* Head (Sphere) */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.5}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Neck (Cylinder) */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.1, 6]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Torso (Cylinder) */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.1, 0.6, 6]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Crossed Legs (Lotus Posture) */}
        {/* Left Thigh/Knee */}
        <mesh position={[-0.25, -0.2, 0.15]} rotation={[0, 0.3, Math.PI / 2.3]}>
          <cylinderGeometry args={[0.07, 0.05, 0.6, 6]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Right Thigh/Knee */}
        <mesh position={[0.25, -0.2, 0.15]} rotation={[0, -0.3, -Math.PI / 2.3]}>
          <cylinderGeometry args={[0.07, 0.05, 0.6, 6]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Folded Foot Rest */}
        <mesh position={[0, -0.25, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 6, 12]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.5}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Left Arm (Resting on knee) */}
        <mesh position={[-0.32, 0.15, 0.1]} rotation={[0.4, 0.2, 0.5]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 6]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Right Arm (Resting on knee) */}
        <mesh position={[0.32, 0.15, 0.1]} rotation={[0.4, -0.2, -0.5]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 6]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Meditating Aura Rings (Concentric around the figure) */}
      <group position={[0, 0.2, 0]}>
        <mesh ref={aura1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.015, 4, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.15}
            blending={AdditiveBlending}
          />
        </mesh>
        <mesh ref={aura2Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <torusGeometry args={[0.65, 0.01, 4, 32]} />
          <meshBasicMaterial
            color="#2563EB"
            transparent
            opacity={0.25}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 3. Meditating Laptop (Floating in front of him) */}
      <group position={[0, -0.05, 0.52]} rotation={[-0.1, 0, 0]}>
        {/* Keyboard Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.015, 0.28]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Glowing Screen (Angled open) */}
        <group position={[0, 0.01, -0.13]} rotation={[1.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.4, 0.28, 0.012]} />
            <meshBasicMaterial
              color="#00BFFF"
              wireframe
              transparent
              opacity={0.4}
              blending={AdditiveBlending}
            />
          </mesh>

          {/* Screen Light Emission (Simulated glow panel) */}
          <mesh ref={laptopScreenRef} position={[0, 0, 0.008]}>
            <planeGeometry args={[0.36, 0.24]} />
            <meshBasicMaterial
              color="#00BFFF"
              transparent
              opacity={0.25}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      </group>

    </group>
  );
}
