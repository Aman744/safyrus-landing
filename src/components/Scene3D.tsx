'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Vector3, AmbientLight, DirectionalLight } from 'three';

import Himalayas from './Himalayas';
import MeditatingBoy from './MeditatingBoy';
import CognitiveHead from './CognitiveHead';
import ClientGlobe from './ClientGlobe';
import OrbitingRockets from './OrbitingRockets'; // Satellite
import DataStreams from './DataStreams';
import HinduTemple from './HinduTemple';

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

interface LightStateData {
  ambientIntensity: number;
  dirIntensity: number;
  fogColor: string;
}

// Controller to handle camera and lighting/fog updates in R3F loop
function SceneController({
  cameraState,
  lightState,
  mouseState,
  ambientRef,
  dirRef,
}: {
  cameraState: React.MutableRefObject<CameraStateData>;
  lightState: React.MutableRefObject<LightStateData>;
  mouseState: React.MutableRefObject<{ x: number; y: number }>;
  ambientRef: React.RefObject<AmbientLight | null>;
  dirRef: React.RefObject<DirectionalLight | null>;
}) {
  const { camera, scene } = useThree();
  const currentTarget = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    // 1. Lerp camera position
    camera.position.x = gsap.utils.interpolate(camera.position.x, cameraState.current.posX, 0.08);
    camera.position.y = gsap.utils.interpolate(camera.position.y, cameraState.current.posY, 0.08);
    camera.position.z = gsap.utils.interpolate(camera.position.z, cameraState.current.posZ, 0.08);

    // Add parallax mouse effect
    camera.position.x += (mouseState.current.x * 1.0 - camera.position.x * 0.02) * 0.05;
    camera.position.y += (-mouseState.current.y * 1.0 - camera.position.y * 0.02) * 0.05;

    // 2. Lerp camera target direction
    const targetX = gsap.utils.interpolate(currentTarget.current.x, cameraState.current.targetX, 0.08);
    const targetY = gsap.utils.interpolate(currentTarget.current.y, cameraState.current.targetY, 0.08);
    const targetZ = gsap.utils.interpolate(currentTarget.current.z, cameraState.current.targetZ, 0.08);
    currentTarget.current.set(targetX, targetY, targetZ);
    camera.lookAt(currentTarget.current);

    // 3. Update lighting and fog dynamically
    if (ambientRef.current) ambientRef.current.intensity = lightState.current.ambientIntensity;
    if (dirRef.current) dirRef.current.intensity = lightState.current.dirIntensity;
    
    if (scene.fog) {
      scene.fog.color.set(lightState.current.fogColor);
    }
  });

  return null;
}

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const dirRef = useRef<DirectionalLight>(null);
  
  // Camera coordinates animated by GSAP ScrollTrigger
  const cameraState = useRef<CameraStateData>({
    posX: 0,
    posY: 0.4,
    posZ: 4.2,
    targetX: 0,
    targetY: -0.2,
    targetZ: -1.0,
  });

  // Lighting intensities animated by GSAP ScrollTrigger
  const lightState = useRef<LightStateData>({
    ambientIntensity: 0.4,
    dirIntensity: 0.8,
    fogColor: '#050505',
  });

  // Mouse position state for parallax
  const mouseState = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseState.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseState.current.y = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    // Animate camera and lights dynamically across the 8 sections
    tl.to(cameraState.current, {
      posX: -1.2,
      posY: 0.1,
      posZ: 1.8,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      duration: 1, // Section 1: About (Techno Meditating Boy)
    })
    .to(lightState.current, {
      ambientIntensity: 1.4, // bright daylight sun rise
      dirIntensity: 2.2,
      fogColor: '#e0f2fe', // light blue fog
      duration: 1,
    }, '<')
    .to(containerRef.current, {
      backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
      duration: 1,
    }, '<')

    // Section 2: Services (Cognitive Head - Rockets, books, code)
    .to(cameraState.current, {
      posX: 1.8,
      posY: 0.5,
      posZ: 2.4,
      targetX: -0.4,
      targetY: 0.2,
      targetZ: 0,
      duration: 1,
    })
    .to(lightState.current, {
      ambientIntensity: 0.4, // sunset back to dark space
      dirIntensity: 0.8,
      fogColor: '#050505',
      duration: 1,
    }, '<')
    .to(containerRef.current, {
      backgroundImage: "url('/safyrus-landing/nebula_bg.png')",
      duration: 1,
    }, '<')

    // Section 3: Capabilities (Clients - Globe semi-sphere)
    .to(cameraState.current, {
      posX: 0,
      posY: 1.4,
      posZ: 2.8,
      targetX: 0,
      targetY: 0.1,
      targetZ: 0,
      duration: 1,
    })

    // Section 4: AI Lab
    .to(cameraState.current, {
      posX: -1.6,
      posY: -0.4,
      posZ: 2.0,
      targetX: 0.6,
      targetY: 0,
      targetZ: 0,
      duration: 1,
    })

    // Section 5: Showcase
    .to(cameraState.current, {
      posX: 2.0,
      posY: 0.2,
      posZ: 3.2,
      targetX: -0.6,
      targetY: 0,
      targetZ: 0,
      duration: 1,
    })

    // Section 6: Temple of Innovation
    .to(cameraState.current, {
      posX: 0,
      posY: 1.0,
      posZ: 3.2,
      targetX: 0,
      targetY: 0.8,
      targetZ: -1.0,
      duration: 1,
    })

    // Section 7: Contact (Satellite)
    .to(cameraState.current, {
      posX: 1.4,
      posY: -0.4,
      posZ: 2.6,
      targetX: -0.4,
      targetY: -0.2,
      targetZ: 0,
      duration: 1,
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
        camera={{ position: [0, 0.4, 4.2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fogExp2 attach="fog" args={['#050505', 0.06]} />

        {/* Dynamic Light Handles */}
        <ambientLight ref={ambientRef} intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00BFFF" />
        <pointLight position={[-5, -5, 5]} intensity={1.0} color="#2563EB" />
        <directionalLight ref={dirRef} position={[0, 10, 0]} intensity={0.8} color="#ffffff" />

        {/* Stars */}
        <Stars radius={100} depth={50} count={3500} factor={4} saturation={0.5} fade speed={1.5} />

        {/* 3D Visual Coordinates */}
        <group>
          {/* Hero & About: Himalayan Peaks */}
          <Himalayas />

          {/* About: Meditating Techno Boy */}
          <MeditatingBoy position={[0, -0.3, 0]} scale={1.0} />

          {/* Services: Cognitive Mind Head */}
          <CognitiveHead />

          {/* Capabilities/Clients: Earth Globe */}
          <ClientGlobe />

          {/* Contact: Hovering Telemetry Satellite */}
          <OrbitingRockets />

          {/* Temple of Innovation */}
          <HinduTemple position={[0, -0.4, -1.5]} scale={1.2} />

          {/* AI Lab: Data Streams */}
          <DataStreams count={65} connectionDist={1.5} />
        </group>

        {/* Dynamic scene controller updates */}
        <SceneController
          cameraState={cameraState}
          lightState={lightState}
          mouseState={mouseState}
          ambientRef={ambientRef}
          dirRef={dirRef}
        />
      </Canvas>
    </div>
  );
}
