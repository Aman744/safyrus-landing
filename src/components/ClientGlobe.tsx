'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, AdditiveBlending, Mesh } from 'three';

interface GlobeDot {
  pos: [number, number, number];
  size: number;
}

export default function ClientGlobe() {
  const globeRef = useRef<Group>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);

  // Generate 25 coordinates representing global nodes/cities on the earth sphere
  const dots = useMemo<GlobeDot[]>(() => {
    const list: GlobeDot[] = [];
    const r = 1.3; // globe radius
    
    for (let i = 0; i < 25; i++) {
      // Polar coordinates
      const theta = Math.random() * Math.PI; // latitude
      const phi = Math.random() * Math.PI * 2; // longitude
      
      list.push({
        pos: [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(theta)
        ],
        size: 0.03 + Math.random() * 0.03,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      // Rotate the globe
      globeRef.current.rotation.y = time * 0.18;
      globeRef.current.rotation.x = 0.2; // tilted axis
    }

    // Spin connection rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.3;
      ring1Ref.current.rotation.x = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.2;
      ring2Ref.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Globe Core & Dots */}
      <group ref={globeRef}>
        {/* Main Wireframe Earth Sphere */}
        <mesh>
          <sphereGeometry args={[1.3, 16, 12]} />
          <meshBasicMaterial
            color="#2563EB"
            wireframe
            transparent
            opacity={0.22}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Global Client Location Nodes */}
        {dots.map((d, idx) => (
          <mesh key={idx} position={d.pos}>
            <sphereGeometry args={[d.size, 6, 6]} />
            <meshBasicMaterial
              color="#00BFFF"
              transparent
              opacity={0.8}
              blending={AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* Connection Orbits (Concentric surrounding rings) */}
      <mesh ref={ring1Ref} rotation={[1.2, 0.4, 0]}>
        <torusGeometry args={[1.7, 0.012, 4, 32]} />
        <meshBasicMaterial
          color="#00BFFF"
          transparent
          opacity={0.2}
          blending={AdditiveBlending}
        />
      </mesh>
      
      <mesh ref={ring2Ref} rotation={[-0.8, -0.6, 0]}>
        <torusGeometry args={[1.9, 0.01, 4, 32]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.15}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
