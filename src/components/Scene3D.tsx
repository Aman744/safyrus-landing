'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SapphireCrystal from './SapphireCrystal';
import HinduTemple from './HinduTemple';
import OrbitingRockets from './OrbitingRockets';
import DataStreams from './DataStreams';
import { Vector3 } from 'three';

// Register GSAP plugins on client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CameraStateData {
  posX: number;
  posY: number;
  posZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

// Internal component to handle camera updates in the R3F loop
function CameraController({
  cameraState,
  mouseState,
}: {
  cameraState: React.MutableRefObject<CameraStateData>;
  mouseState: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const currentTarget = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Lerp camera position to target position from GSAP
    camera.position.x = gsap.utils.interpolate(camera.position.x, cameraState.current.posX, 0.08);
    camera.position.y = gsap.utils.interpolate(camera.position.y, cameraState.current.posY, 0.08);
    camera.position.z = gsap.utils.interpolate(camera.position.z, cameraState.current.posZ, 0.08);

    // Add parallax mouse effect
    camera.position.x += (mouseState.current.x * 1.5 - camera.position.x * 0.02) * 0.05;
    camera.position.y += (-mouseState.current.y * 1.5 - camera.position.y * 0.02) * 0.05;

    // 2. Lerp camera target direction
    const targetX = gsap.utils.interpolate(currentTarget.current.x, cameraState.current.targetX, 0.08);
    const targetY = gsap.utils.interpolate(currentTarget.current.y, cameraState.current.targetY, 0.08);
    const targetZ = gsap.utils.interpolate(currentTarget.current.z, cameraState.current.targetZ, 0.08);
    currentTarget.current.set(targetX, targetY, targetZ);

    camera.lookAt(currentTarget.current);
  });

  return null;
}

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Camera state that will be animated by GSAP ScrollTrigger
  const cameraState = useRef({
    posX: 0,
    posY: 0,
    posZ: 6.5,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
  });

  // Mouse position state for parallax
  const mouseState = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse coordinates normalized between -1 and 1
    const handleMouseMove = (e: MouseEvent) => {
      mouseState.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseState.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Define camera flight path animations based on scroll
    // Scroll progress goes from 0 (top) to 1 (bottom)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2, // smooth camera movement
        invalidateOnRefresh: true,
      },
    });

    // Animate camera position and target across scroll sections
    tl.to(cameraState.current, {
      posX: -2.2,
      posY: 0.2,
      posZ: 4.2,
      targetX: -0.6,
      targetY: 0.1,
      targetZ: 0,
      duration: 1, // Section 1: About
    })
    .to(cameraState.current, {
      posX: 2.2,
      posY: 1.0,
      posZ: 4.8,
      targetX: 0.5,
      targetY: 0.4,
      targetZ: 0,
      duration: 1, // Section 2: Services
    })
    .to(cameraState.current, {
      posX: 0,
      posY: 2.8,
      posZ: 5.2,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      duration: 1, // Section 3: Capabilities
    })
    .to(cameraState.current, {
      posX: -1.8,
      posY: -0.8,
      posZ: 3.5,
      targetX: 0.8,
      targetY: -0.2,
      targetZ: 0,
      duration: 1, // Section 4: AI Lab
    })
    .to(cameraState.current, {
      posX: 2.5,
      posY: 0.4,
      posZ: 5.0,
      targetX: -0.8,
      targetY: 0,
      targetZ: 0,
      duration: 1, // Section 5: Showcase
    })
    .to(cameraState.current, {
      posX: 0,
      posY: 1.4,
      posZ: 4.2,
      targetX: 0,
      targetY: 1.0,
      targetZ: 0,
      duration: 1, // Section 6: Temple of Innovation
    })
    .to(cameraState.current, {
      posX: 0,
      posY: -1.2,
      posZ: 5.5,
      targetX: 0,
      targetY: -0.6,
      targetZ: 0,
      duration: 1, // Section 7: Contact
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0 bg-[#050505]"
      style={{
        backgroundImage: "url('/safyrus-landing/nebula_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fogExp2 attach="fog" args={['#050505', 0.06]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00BFFF" />
        <pointLight position={[-5, -5, 5]} intensity={1.0} color="#2563EB" />
        <directionalLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />

        {/* Cinematic Star Field */}
        <Stars
          radius={100}
          depth={50}
          count={3500}
          factor={4}
          saturation={0.5}
          fade
          speed={1.5}
        />

        {/* 3D Elements layout in Space */}
        <group>
          {/* Main Floating Sapphire Crystal */}
          <SapphireCrystal position={[1.4, 0, 0]} scale={1.2} />

          {/* Holographic Ancient Hindu Temple in the center distance */}
          <HinduTemple position={[0, -0.5, -2.5]} scale={1.3} />

          {/* Outer Orbiting Futuristic Rockets */}
          <OrbitingRockets />

          {/* AI Data Streams / Connecting Nodes */}
          <DataStreams count={75} connectionDist={1.6} />
        </group>

        {/* Custom camera controller updating frame by frame */}
        <CameraController cameraState={cameraState} mouseState={mouseState} />
      </Canvas>
    </div>
  );
}
