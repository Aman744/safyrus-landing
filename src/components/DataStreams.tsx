'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute, LineSegments, AdditiveBlending } from 'three';

interface DataStreamsProps {
  count?: number;
  connectionDist?: number;
}

interface SwarmNode {
  radius: number;
  speed: number;
  angle: number;
  heightOffset: number;
  yWaveFreq: number;
  yWaveAmp: number;
}

export default function DataStreams({
  count = 90,
  connectionDist = 1.3,
}: DataStreamsProps) {
  const pointsRef = useRef<Points>(null);
  const linesRef = useRef<LineSegments>(null);

  // Generate particles arranged in a Keplerian swirling data disk
  const [nodes, initialPositions] = useMemo(() => {
    const list: SwarmNode[] = [];
    const pos = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Radius distribution: nested between 1.5 and 5.5 units
      const radius = 1.5 + (i / count) * 4.0;
      
      // Keplerian speed: closer orbits spin faster! (v proportional to 1/sqrt(r))
      const speed = (0.35 / Math.sqrt(radius)) * (Math.random() * 0.4 + 0.8);
      
      // Random starting angle
      const angle = Math.random() * Math.PI * 2;
      
      // Small vertical dispersion
      const heightOffset = (Math.random() - 0.5) * 0.4;
      const yWaveFreq = 1.0 + Math.random() * 3.0;
      const yWaveAmp = 0.1 + Math.random() * 0.15;

      list.push({
        radius,
        speed,
        angle,
        heightOffset,
        yWaveFreq,
        yWaveAmp,
      });

      // Compute initial Cartesian coordinates
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = heightOffset + Math.sin(angle * yWaveFreq) * yWaveAmp;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [list, pos];
  }, [count]);

  // Buffer coordinate storage for lines to avoid allocations in loop
  const linePositions = useMemo(() => new Float32Array(count * count * 6), [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    const pointsGeom = pointsRef.current?.geometry as BufferGeometry;
    if (!pointsGeom) return;
    
    const posAttr = pointsGeom.getAttribute('position') as Float32BufferAttribute;

    // 1. Update Keplerian orbits of node particles
    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      
      // Advance angle
      node.angle += node.speed * 0.03;
      
      // Compute new coordinates
      const x = Math.cos(node.angle) * node.radius;
      const z = Math.sin(node.angle) * node.radius;
      // Add a waving y coordinate based on frequency and time
      const y = node.heightOffset + Math.sin(node.angle * node.yWaveFreq + time * 0.8) * node.yWaveAmp;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;

    // 2. Compute dynamic network connections between close nodes
    const linesGeom = linesRef.current?.geometry as BufferGeometry;
    if (!linesGeom) return;

    let lineIndex = 0;
    
    for (let i = 0; i < count; i++) {
      const piX = posAttr.getX(i);
      const piY = posAttr.getY(i);
      const piZ = posAttr.getZ(i);

      for (let j = i + 1; j < count; j++) {
        const pjX = posAttr.getX(j);
        const pjY = posAttr.getY(j);
        const pjZ = posAttr.getZ(j);

        const dx = piX - pjX;
        const dy = piY - pjY;
        const dz = piZ - pjZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDist) {
          // Connect segments
          linePositions[lineIndex * 6] = piX;
          linePositions[lineIndex * 6 + 1] = piY;
          linePositions[lineIndex * 6 + 2] = piZ;

          linePositions[lineIndex * 6 + 3] = pjX;
          linePositions[lineIndex * 6 + 4] = pjY;
          linePositions[lineIndex * 6 + 5] = pjZ;
          
          lineIndex++;
        }
      }
    }

    const linePosAttr = linesGeom.getAttribute('position') as Float32BufferAttribute;
    linePosAttr.needsUpdate = true;
    linesGeom.setDrawRange(0, lineIndex * 2);
  });

  return (
    <group>
      {/* Keplerian Node Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00BFFF"
          size={0.065}
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={AdditiveBlending}
        />
      </points>

      {/* Interconnecting Data Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
