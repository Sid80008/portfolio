"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Particle Field Component ──────────────────────────────────────────────────
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Track mouse coordinates outside of React state loop for performance
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on screen size
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const N = 580;
  
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      vel[i * 3]     = (Math.random() - 0.5) * 0.0018;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0018;
    }
    return { positions: pos, velocities: vel };
  }, [N]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.getElapsedTime();

    // The organic drift mathematical loop designed by Claude
    for (let i = 0; i < N; i++) {
      posArray[i * 3]     += velocities[i * 3]     + Math.sin(t * 0.25 + i * 0.7) * 0.0003;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.18 + i * 0.5) * 0.0003;
      
      // Loop bounds
      if (posArray[i * 3] > 4.5) posArray[i * 3] = -4.5;
      if (posArray[i * 3] < -4.5) posArray[i * 3] = 4.5;
      if (posArray[i * 3 + 1] > 2.8) posArray[i * 3 + 1] = -2.8;
      if (posArray[i * 3 + 1] < -2.8) posArray[i * 3 + 1] = 2.8;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Mouse Parallax effect
    const { x, y } = mouseRef.current;
    state.camera.position.x += (x * 0.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += (y * 0.3 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.042} 
        color="#c8a96e" // Deep amber/gold token color mapping
        transparent 
        opacity={0.72} 
        sizeAttenuation={true} 
      />
    </points>
  );
}

// ── Wrapper Component ─────────────────────────────────────────────────────────
export default function CanvasBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (isReducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-[#080808]">
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 60 }} 
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
