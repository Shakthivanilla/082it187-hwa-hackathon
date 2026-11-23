"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshDistortMaterial } from "@react-three/drei";

function Blob({ color }: { color?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        distort={0.32}
        speed={2.1}
        roughness={0.4}
        metalness={0.05}
      />
    </mesh>
  );
}

export function HeroCanvas({ color }: { color?: string }) {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    let cancelled = false;
    loader.load(
      "/foragegrid.glb",
      (gltf) => {
        if (!cancelled) setModel(gltf.scene);
      },
      undefined,
      () => {
        if (!cancelled) setModel(null);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 6]} intensity={2.4} />
      <pointLight position={[-4, -2, 4]} intensity={26} color="#facc15" />
      <pointLight position={[4, -3, -2]} intensity={14} color="#60a5fa" />
      {model ? <primitive object={model} /> : <Blob color={color} />}
    </Canvas>
  );
}