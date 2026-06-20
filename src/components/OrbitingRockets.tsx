'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, AdditiveBlending, DoubleSide } from 'three';

interface ProbeConfig {
  radiusX: number;
  radiusZ: number;
  speed: number;
  height: number;
  phase: number;
  scale: number;
  color: string;
  tilt: number;
}

export default function OrbitingRockets() {
  const probesRef = useRef<Group>(null);
  const contactSatelliteRef = useRef<Group>(null);

  // Configuration for two deep space probes/satellites
  const probesData = useMemo<ProbeConfig[]>(() => [
    {
      radiusX: 5.5,
      radiusZ: 4.5,
      speed: 0.22,
      height: 0.6,
      phase: 0,
      scale: 0.28,
      color: '#00BFFF',
      tilt: 0.12,
    },
    {
      radiusX: 7.2,
      radiusZ: 5.8,
      speed: -0.16, // opposite orbit direction
      height: -0.7,
      phase: Math.PI, // opposite starting point
      scale: 0.24,
      color: '#2563EB',
      tilt: -0.08,
    },
  ], []);

  // References to the individual probe groups
  const refs = [useRef<Group>(null), useRef<Group>(null)];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Animate background orbiting probes
    probesData.forEach((data, index) => {
      const ref = refs[index];
      if (!ref.current) return;

      const angle = time * data.speed + data.phase;
      
      // Compute elliptical position on orbit track
      const x = Math.cos(angle) * data.radiusX;
      const z = Math.sin(angle) * data.radiusZ;
      const y = data.height + Math.sin(angle * 2) * data.tilt;

      ref.current.position.set(x, y, z);

      // Compute look-ahead coordinate for orbital orientation
      const nextAngle = (time + 0.05) * data.speed + data.phase;
      const nextX = Math.cos(nextAngle) * data.radiusX;
      const nextZ = Math.sin(nextAngle) * data.radiusZ;
      const nextY = data.height + Math.sin(nextAngle * 2) * data.tilt;

      const target = new Vector3(nextX, nextY, nextZ);
      ref.current.lookAt(target);
    });

    // 2. Animate dedicated contact satellite hovering next to the form
    if (contactSatelliteRef.current) {
      contactSatelliteRef.current.position.y = -0.3 + Math.sin(time * 0.8) * 0.06;
      contactSatelliteRef.current.position.x = -0.85 + Math.cos(time * 0.4) * 0.03;
      contactSatelliteRef.current.position.z = 0.8;
      
      contactSatelliteRef.current.rotation.y = time * 0.12;
      contactSatelliteRef.current.rotation.x = Math.sin(time * 0.5) * 0.08;
    }
  });

  return (
    <group ref={probesRef}>
      {/* Background Orbiting Probes */}
      {probesData.map((data, index) => {
        const ref = refs[index];

        return (
          <group key={index} ref={ref}>
            <group scale={data.scale}>
              {/* Main Core (Dodecahedron) */}
              <mesh>
                <dodecahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                  color="#111827"
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>

              {/* Glowing core sphere */}
              <mesh>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshBasicMaterial
                  color={data.color}
                  transparent
                  opacity={0.3}
                  blending={AdditiveBlending}
                />
              </mesh>

              {/* Solar Panels */}
              <group position={[-1.0, 0, 0]}>
                <mesh>
                  <boxGeometry args={[0.9, 0.3, 0.03]} />
                  <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                <mesh scale={1.02}>
                  <boxGeometry args={[0.9, 0.3, 0.03]} />
                  <meshBasicMaterial
                    color={data.color}
                    wireframe
                    transparent
                    opacity={0.3}
                    blending={AdditiveBlending}
                  />
                </mesh>
                <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
              </group>

              <group position={[1.0, 0, 0]}>
                <mesh>
                  <boxGeometry args={[0.9, 0.3, 0.03]} />
                  <meshStandardMaterial
                    color="#0f172a"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                <mesh scale={1.02}>
                  <boxGeometry args={[0.9, 0.3, 0.03]} />
                  <meshBasicMaterial
                    color={data.color}
                    wireframe
                    transparent
                    opacity={0.3}
                    blending={AdditiveBlending}
                  />
                </mesh>
                <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
              </group>

              {/* Comm Dish */}
              <group position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.3, 0.05, 0.15, 12, 1, true]} />
                  <meshStandardMaterial
                    color="#1e293b"
                    metalness={0.8}
                    roughness={0.2}
                    side={DoubleSide}
                  />
                </mesh>
                <mesh scale={1.02}>
                  <cylinderGeometry args={[0.3, 0.05, 0.15, 12, 1, true]} />
                  <meshBasicMaterial
                    color={data.color}
                    wireframe
                    transparent
                    opacity={0.4}
                    blending={AdditiveBlending}
                  />
                </mesh>
                <mesh position={[0, 0.15, 0]}>
                  <coneGeometry args={[0.03, 0.25, 4]} />
                  <meshBasicMaterial color={data.color} />
                </mesh>
              </group>

              {/* Engine Thrusters */}
              <group position={[0, 0, -0.65]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh position={[-0.15, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.05, 0.2, 8]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[0.15, 0, 0]}>
                  <cylinderGeometry args={[0.08, 0.05, 0.2, 8]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[-0.15, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
                  <coneGeometry args={[0.06, 0.5, 8]} />
                  <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.65}
                    blending={AdditiveBlending}
                    side={DoubleSide}
                  />
                </mesh>
                <mesh position={[0.15, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
                  <coneGeometry args={[0.06, 0.5, 8]} />
                  <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.65}
                    blending={AdditiveBlending}
                    side={DoubleSide}
                  />
                </mesh>
              </group>

              {/* Antenna Mast */}
              <mesh position={[0, 0.65, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.5, 4]} />
                <meshStandardMaterial color="#475569" />
              </mesh>
              <mesh position={[0, 0.9, 0]}>
                <sphereGeometry args={[0.04, 4, 4]} />
                <meshBasicMaterial color={data.color} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Dedicated Hovering Contact Telemetry Satellite */}
      <group ref={contactSatelliteRef}>
        <group scale={0.35}>
          {/* Main Core (Octahedron & Box combo) */}
          <mesh>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.1}
              flatShading
            />
          </mesh>
          <mesh scale={1.01}>
            <octahedronGeometry args={[0.5]} />
            <meshBasicMaterial
              color="#00BFFF"
              wireframe
              transparent
              opacity={0.35}
              blending={AdditiveBlending}
            />
          </mesh>

          {/* Core cylinder */}
          <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.6, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Large Solar Panels (Left & Right) */}
          <group position={[-1.2, 0, 0]}>
            <mesh>
              <boxGeometry args={[1.1, 0.35, 0.04]} />
              <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh scale={1.02}>
              <boxGeometry args={[1.1, 0.35, 0.04]} />
              <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.4} />
            </mesh>
            <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          </group>

          <group position={[1.2, 0, 0]}>
            <mesh>
              <boxGeometry args={[1.1, 0.35, 0.04]} />
              <meshStandardMaterial color="#090d16" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh scale={1.02}>
              <boxGeometry args={[1.1, 0.35, 0.04]} />
              <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.4} />
            </mesh>
            <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.2]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          </group>

          {/* Parabolic High-Gain Comm Dish */}
          <group position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.4, 0.05, 0.2, 12, 1, true]} />
              <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} side={DoubleSide} />
            </mesh>
            <mesh scale={1.02}>
              <cylinderGeometry args={[0.4, 0.05, 0.2, 12, 1, true]} />
              <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.5} blending={AdditiveBlending} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.04, 0.2, 4]} />
              <meshBasicMaterial color="#00BFFF" />
            </mesh>
          </group>

          {/* Plasma Engine Thrusters */}
          <group position={[0, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh position={[-0.1, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[0.1, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
            {/* Engine plume */}
            <mesh position={[0, -0.35, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.08, 0.4, 8]} />
              <meshBasicMaterial color="#00BFFF" transparent opacity={0.6} blending={AdditiveBlending} side={DoubleSide} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
