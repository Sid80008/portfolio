"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 1500 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#A855F7"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticleCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
