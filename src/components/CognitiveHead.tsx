'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending } from 'three';

interface IdeaParticle {
  ref: React.RefObject<Group | null>;
  type: 'rocket' | 'book' | 'code';
  speed: number;
  startX: number;
  startZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  phase: number;
}

export default function CognitiveHead() {
  const headRef = useRef<Group>(null);
  
  // Set up 18 floating idea particles
  const particleCount = 18;
  const particles = useMemo<IdeaParticle[]>(() => {
    const list: IdeaParticle[] = [];
    const types: ('rocket' | 'book' | 'code')[] = ['rocket', 'book', 'code'];
    
    for (let i = 0; i < particleCount; i++) {
      list.push({
        ref: { current: null },
        type: types[i % 3],
        speed: 0.015 + Math.random() * 0.02,
        startX: (Math.random() - 0.5) * 0.8,
        startZ: (Math.random() - 0.5) * 0.8,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (headRef.current) {
      // Slow rotation of head base
      headRef.current.rotation.y = time * 0.15;
    }

    // Animate idea particles shooting upwards out of the head
    particles.forEach((p) => {
      if (!p.ref.current) return;
      
      // Move up
      p.ref.current.position.y += p.speed;
      
      // Floating wave in X & Z
      p.ref.current.position.x = p.startX + Math.sin(time * 1.5 + p.phase) * 0.15;
      p.ref.current.position.z = p.startZ + Math.cos(time * 1.5 + p.phase) * 0.15;

      // Rotate
      p.ref.current.rotation.x += p.rotSpeedX;
      p.ref.current.rotation.y += p.rotSpeedY;

      // Reset to head core base when reaching height limit
      if (p.ref.current.position.y > 2.5) {
        p.ref.current.position.y = 0.4;
        p.ref.current.position.x = p.startX;
        p.ref.current.position.z = p.startZ;
      }

      // Fade out near the top
      const height = p.ref.current.position.y;
      const alpha = Math.max(0, 1 - (height - 0.4) / 2.1);
      
      // Scale down near the top
      p.ref.current.scale.setScalar(alpha * 0.28);
    });
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* 1. Cognitive Head Silhouette (Solid flat-shaded robotic/sculpture head with wireframe details) */}
      <group ref={headRef}>
        {/* Cranium / Back Skull */}
        <mesh position={[0, 0.4, -0.05]}>
          <sphereGeometry args={[0.62, 10, 10]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.4, -0.05]} scale={1.01}>
          <sphereGeometry args={[0.62, 10, 10]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Forehead / Face Plate */}
        <mesh position={[0, 0.5, 0.28]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.25]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 0.5, 0.28]} rotation={[-0.15, 0, 0]} scale={1.01}>
          <boxGeometry args={[0.5, 0.35, 0.25]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.15}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Nose Bridge */}
        <mesh position={[0, 0.24, 0.52]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.24, 0.12]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>

        {/* Left Cheek */}
        <mesh position={[-0.3, 0.18, 0.38]} rotation={[0, 0.2, -0.2]}>
          <boxGeometry args={[0.22, 0.18, 0.22]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.4}
            metalness={0.7}
            flatShading
          />
        </mesh>

        {/* Right Cheek */}
        <mesh position={[0.3, 0.18, 0.38]} rotation={[0, -0.2, 0.2]}>
          <boxGeometry args={[0.22, 0.18, 0.22]} />
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.4}
            metalness={0.7}
            flatShading
          />
        </mesh>

        {/* Jaw & Chin */}
        <mesh position={[0, -0.06, 0.24]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.36, 0.28, 0.42]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, -0.06, 0.24]} rotation={[0.2, 0, 0]} scale={1.01}>
          <boxGeometry args={[0.36, 0.28, 0.42]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.25}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Neck Column */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.2, 0.26, 0.4, 8]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.5}
            metalness={0.8}
            flatShading
          />
        </mesh>

        {/* Glowing Eyes */}
        <mesh position={[-0.16, 0.32, 0.48]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#00BFFF" />
        </mesh>
        <mesh position={[0.16, 0.32, 0.48]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#00BFFF" />
        </mesh>

        {/* Orbiting intelligence rings */}
        <mesh position={[0, 0.4, 0]} rotation={[1.0, 0.5, 0]}>
          <torusGeometry args={[1.0, 0.015, 4, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Idea Particles (Bursting out of the top of the head) */}
      {particles.map((p, idx) => (
        <group key={idx} ref={p.ref} position={[p.startX, 0.4, p.startZ]}>
          {p.type === 'rocket' && (
            /* Solid Mini Rocket */
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.12, 0.12, 0.6, 8]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.42, 0]}>
                <coneGeometry args={[0.12, 0.24, 8]} />
                <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Fins */}
              <mesh position={[-0.14, -0.22, 0]}>
                <boxGeometry args={[0.08, 0.15, 0.02]} />
                <meshStandardMaterial color="#2563EB" />
              </mesh>
              <mesh position={[0.14, -0.22, 0]}>
                <boxGeometry args={[0.08, 0.15, 0.02]} />
                <meshStandardMaterial color="#2563EB" />
              </mesh>
            </group>
          )}

          {p.type === 'book' && (
            /* Solid Mini Book */
            <group>
              {/* Book Cover */}
              <mesh>
                <boxGeometry args={[0.5, 0.38, 0.12]} />
                <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.5} />
              </mesh>
              {/* Pages block */}
              <mesh position={[0, 0, 0]} scale={[0.92, 0.92, 0.8]}>
                <boxGeometry args={[0.5, 0.38, 0.12]} />
                <meshStandardMaterial color="#fef08a" roughness={0.8} />
              </mesh>
            </group>
          )}

          {p.type === 'code' && (
            /* Code Node (Solid Glowing Octahedral Data Crystal) */
            <mesh>
              <octahedronGeometry args={[0.18]} />
              <meshStandardMaterial
                color="#00E5FF"
                roughness={0.1}
                metalness={0.9}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
