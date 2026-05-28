"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function FloatingOrb({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
    </Float>
  )
}

function OrbitRing({ radius, color, rotationX = 0, rotationY = 0, rotationZ = 0 }: { 
  radius: number
  color: string
  rotationX?: number
  rotationY?: number
  rotationZ?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotationZ + state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={meshRef} rotation={[rotationX, rotationY, rotationZ]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#9ca3af" />
      
      {/* Floating geometric shapes */}
      <FloatingOrb position={[-1.8, 1.2, 0]} color="#f4f4f5" scale={1.2} />
      <FloatingOrb position={[2.2, -0.8, -0.5]} color="#a1a1aa" scale={1.4} />
      <FloatingOrb position={[0.5, 1.8, -1]} color="#d4d4d8" scale={1} />
      <FloatingOrb position={[-1.2, -1.2, 0.5]} color="#71717a" scale={0.8} />
      <FloatingOrb position={[1.8, 0.8, -0.3]} color="#e4e4e7" scale={1.1} />
      <FloatingOrb position={[-0.5, -0.5, 1]} color="#52525b" scale={0.9} />
      
      {/* Orbital rings */}
      <OrbitRing radius={2.8} color="#d4d4d8" rotationX={0.3} rotationZ={0.2} />
      <OrbitRing radius={2.2} color="#a1a1aa" rotationX={0.6} rotationY={0.3} />
      <OrbitRing radius={1.8} color="#71717a" rotationX={-0.2} rotationZ={0.5} />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
