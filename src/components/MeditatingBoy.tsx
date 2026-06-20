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
      
      {/* 1. Meditating Body (Solid flat-shaded body parts with wireframe highlights) */}
      <group position={[0, 0.2, 0]}>
        
        {/* Head */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.8, 0]} scale={1.01}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.35}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.1, 8]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.55, 0]} scale={1.02}>
          <cylinderGeometry args={[0.045, 0.055, 0.102, 8]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.25}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.18, 0.1, 0.6, 8]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.3}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.2, 0]} scale={1.01}>
          <cylinderGeometry args={[0.185, 0.105, 0.605, 8]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.3}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Crossed Legs (Lotus Posture) */}
        {/* Left Thigh/Knee */}
        <mesh position={[-0.25, -0.2, 0.15]} rotation={[0, 0.3, Math.PI / 2.3]}>
          <cylinderGeometry args={[0.07, 0.05, 0.6, 8]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.4}
            metalness={0.7}
            flatShading
          />
        </mesh>
        <mesh position={[-0.25, -0.2, 0.15]} rotation={[0, 0.3, Math.PI / 2.3]} scale={1.01}>
          <cylinderGeometry args={[0.075, 0.055, 0.605, 8]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.35}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Right Thigh/Knee */}
        <mesh position={[0.25, -0.2, 0.15]} rotation={[0, -0.3, -Math.PI / 2.3]}>
          <cylinderGeometry args={[0.07, 0.05, 0.6, 8]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.4}
            metalness={0.7}
            flatShading
          />
        </mesh>
        <mesh position={[0.25, -0.2, 0.15]} rotation={[0, -0.3, -Math.PI / 2.3]} scale={1.01}>
          <cylinderGeometry args={[0.075, 0.055, 0.605, 8]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.35}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Folded Foot Rest */}
        <mesh position={[0, -0.25, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 8, 16]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.3}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, -0.25, 0.3]} rotation={[Math.PI / 2, 0, 0]} scale={1.01}>
          <torusGeometry args={[0.18, 0.04, 8, 16]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.4}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Left Arm (Resting on knee) */}
        <mesh position={[-0.32, 0.15, 0.1]} rotation={[0.4, 0.2, 0.5]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 8]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[-0.32, 0.15, 0.1]} rotation={[0.4, 0.2, 0.5]} scale={1.01}>
          <cylinderGeometry args={[0.055, 0.045, 0.505, 8]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.3}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Right Arm (Resting on knee) */}
        <mesh position={[0.32, 0.15, 0.1]} rotation={[0.4, -0.2, -0.5]}>
          <cylinderGeometry args={[0.05, 0.04, 0.5, 8]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0.32, 0.15, 0.1]} rotation={[0.4, -0.2, -0.5]} scale={1.01}>
          <cylinderGeometry args={[0.055, 0.045, 0.505, 8]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.3}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Meditating Aura Rings */}
      <group position={[0, 0.2, 0]}>
        <mesh ref={aura1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.015, 4, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>
        <mesh ref={aura2Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <torusGeometry args={[0.65, 0.01, 4, 32]} />
          <meshBasicMaterial
            color="#2563EB"
            transparent
            opacity={0.3}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 3. Solid Meditating Laptop */}
      <group position={[0, -0.05, 0.52]} rotation={[-0.1, 0, 0]}>
        {/* Keyboard Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.015, 0.28]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0]} scale={1.01}>
          <boxGeometry args={[0.4, 0.015, 0.28]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.35}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Screen (Angled open) */}
        <group position={[0, 0.01, -0.13]} rotation={[1.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.4, 0.28, 0.012]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>
          <mesh scale={1.01}>
            <boxGeometry args={[0.4, 0.28, 0.012]} />
            <meshBasicMaterial
              color="#00BFFF"
              wireframe
              transparent
              opacity={0.35}
              blending={AdditiveBlending}
            />
          </mesh>

          {/* Screen Light Emission (Simulated glow panel) */}
          <mesh ref={laptopScreenRef} position={[0, 0, 0.008]}>
            <planeGeometry args={[0.36, 0.24]} />
            <meshBasicMaterial
              color="#00BFFF"
              transparent
              opacity={0.4}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      </group>


    </group>
  );
}
