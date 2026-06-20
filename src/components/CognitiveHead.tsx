'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending, DoubleSide } from 'three';

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
      {/* 1. Cognitive Head Silhouette (Stepped wireframe cylinder/sphere combo) */}
      <group ref={headRef}>
        {/* Brain/Skull Core */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshBasicMaterial
            color="#00BFFF"
            wireframe
            transparent
            opacity={0.16}
            blending={AdditiveBlending}
          />
        </mesh>
        
        {/* Jaw/Face base */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.6, 8, 2, true]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.2}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Orbiting intelligence rings */}
        <mesh position={[0, 0.4, 0]} rotation={[1.0, 0.5, 0]}>
          <torusGeometry args={[1.0, 0.015, 4, 32]} />
          <meshBasicMaterial
            color="#00BFFF"
            transparent
            opacity={0.12}
            blending={AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Idea Particles (Bursting out of the top of the head) */}
      {particles.map((p, idx) => (
        <group key={idx} ref={p.ref} position={[p.startX, 0.4, p.startZ]}>
          {p.type === 'rocket' && (
            /* Mini Rocket */
            <group rotation={[Math.PI / 2, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.8, 6]} />
                <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.65} />
              </mesh>
              <mesh position={[0, 0.55, 0]}>
                <coneGeometry args={[0.2, 0.35, 6]} />
                <meshBasicMaterial color="#2563EB" transparent opacity={0.7} />
              </mesh>
            </group>
          )}

          {p.type === 'book' && (
            /* Mini Book (Flat Box with wireframe pages) */
            <group>
              <mesh>
                <boxGeometry args={[0.6, 0.45, 0.12]} />
                <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.6} />
              </mesh>
              <mesh scale={0.9}>
                <boxGeometry args={[0.6, 0.45, 0.12]} />
                <meshBasicMaterial color="#00BFFF" transparent opacity={0.2} side={DoubleSide} />
              </mesh>
            </group>
          )}

          {p.type === 'code' && (
            /* Code Node (Glowing 3D Octahedron / Data particle) */
            <mesh>
              <octahedronGeometry args={[0.3]} />
              <meshBasicMaterial
                color="#00E5FF"
                wireframe
                transparent
                opacity={0.8}
                blending={AdditiveBlending}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
