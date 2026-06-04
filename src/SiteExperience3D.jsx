import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

const stageStops = [0.04, 0.22, 0.42, 0.62, 0.82]
const fieldPoints = Array.from({ length: 34 }, (_, index) => {
  const x = ((index * 37) % 100) / 100
  const y = ((index * 61) % 100) / 100
  return {
    scale: 0.018 + (index % 4) * 0.008,
    x: x * 9 - 4.5,
    y: y * 6 - 3,
    z: -2.8 - (index % 5) * 0.35,
  }
})

function SiteExperience3D() {
  return (
    <div className="site-3d-backdrop" aria-hidden="true">
      <div className="scene-safety-model">
        <span />
        <span />
      </div>
      <Canvas
        camera={{ position: [0, 0.25, 8.2], fov: 35 }}
        dpr={[0.65, 1]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3.8, 4.2, 5.5]} intensity={2.2} />
        <pointLight position={[-3.2, 1.6, 2.4]} color="#008fc5" intensity={1.4} />
        <pointLight position={[2.8, -1.4, 2.2]} color="#e51f28" intensity={0.7} />
        <ScrollSystem />
        <BackgroundField />
      </Canvas>
    </div>
  )
}

function ScrollSystem() {
  const root = useRef()
  const route = useRef()
  const node0 = useRef()
  const node1 = useRef()
  const node2 = useRef()
  const node3 = useRef()
  const node4 = useRef()
  const smoothProgress = useRef(0)
  const nodeRefs = [node0, node1, node2, node3, node4]

  useFrame(({ clock }, delta) => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    const targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
    const ease = Math.min(1, delta * 4.5)
    smoothProgress.current = MathUtils.lerp(smoothProgress.current, targetProgress, ease)

    const p = smoothProgress.current
    const time = clock.getElapsedTime()

    if (root.current) {
      root.current.rotation.x = Math.sin(time * 0.28) * 0.08 - p * 0.22
      root.current.rotation.y = -0.55 + p * 2.65 + Math.sin(time * 0.16) * 0.08
      root.current.rotation.z = Math.sin(time * 0.2) * 0.035
      root.current.position.x = 2.55 - p * 3.45
      root.current.position.y = -0.06 + Math.sin(time * 0.32) * 0.08
      root.current.scale.setScalar(1.18 - p * 0.1)
    }

    if (route.current) {
      route.current.rotation.z = time * 0.08 + p * Math.PI * 2.4
      route.current.rotation.x = 0.42 + Math.sin(time * 0.18) * 0.08
    }

    nodeRefs.forEach((nodeRef, index) => {
      const node = nodeRef.current
      if (!node) return
      const active = Math.max(0, 1 - Math.abs(p - stageStops[index]) * 9)
      const pulse = 1 + active * 0.55 + Math.sin(time * 2.4 + index) * active * 0.04
      node.scale.setScalar(pulse)
      node.position.z = MathUtils.lerp(node.position.z, active * 0.42, ease)
    })
  })

  return (
    <group ref={root} position={[2.55, -0.04, 0]} scale={1.18}>
      <group ref={route}>
        <RouteRing color="#008FC5" radius={2.08} rotation={[1.18, 0.2, 0.2]} />
        <RouteRing color="#E51F28" radius={2.34} rotation={[0.28, 1.22, -0.18]} />
        <RouteRing color="#114E6B" radius={2.62} rotation={[1.44, 0.6, 0.68]} />
      </group>

      <BrandHub />
      <DocumentStack />
      <WarehouseGrid />
      <CapsuleFlow />

      <group position={[2.38, 0.35, 0.16]} ref={node0}>
        <ProcessNode color="#008FC5" label="IN" />
      </group>
      <group position={[0.62, 2.18, -0.12]} ref={node1}>
        <ProcessNode color="#E51F28" label="DOC" />
      </group>
      <group position={[-1.72, 1.16, 0.08]} ref={node2}>
        <ProcessNode color="#FFFFFF" label="QC" />
      </group>
      <group position={[-1.85, -1.24, 0.08]} ref={node3}>
        <ProcessNode color="#114E6B" label="NET" />
      </group>
      <group position={[0.96, -2.08, 0.16]} ref={node4}>
        <ProcessNode color="#008FC5" label="OUT" />
      </group>
    </group>
  )
}

function BrandHub() {
  return (
    <group>
      <mesh position={[0, 0, -0.11]}>
        <boxGeometry args={[1.74, 1.74, 0.18]} />
        <meshStandardMaterial color="#d8d8d8" metalness={0.08} roughness={0.42} />
      </mesh>

      {[
        [-0.72, 0.72, 0.8],
        [0.72, 0.72, -0.8],
        [-0.72, -0.72, -0.8],
        [0.72, -0.72, 0.8],
      ].map(([x, y, tilt]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0]} rotation={[0, 0, Math.PI / 4 + tilt * 0.16]}>
          <boxGeometry args={[0.86, 0.54, 0.28]} />
          <meshStandardMaterial color="#008FC5" metalness={0.16} roughness={0.28} />
        </mesh>
      ))}

      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[0.42, 1.42, 0.34]} />
        <meshStandardMaterial color="#E51F28" emissive="#260407" emissiveIntensity={0.16} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0, 0.22]}>
        <boxGeometry args={[1.42, 0.42, 0.36]} />
        <meshStandardMaterial color="#E51F28" emissive="#260407" emissiveIntensity={0.18} roughness={0.32} />
      </mesh>
    </group>
  )
}

function RouteRing({ color, radius, rotation }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.018, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.74} />
    </mesh>
  )
}

function ProcessNode({ color, label }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.18, 16, 10]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.34, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.045, 0.36, 4, 8]} />
        <meshBasicMaterial color={color === '#FFFFFF' ? '#D8E9EF' : color} transparent opacity={0.78} />
      </mesh>
      <mesh position={[0, -0.58, 0]}>
        <boxGeometry args={[0.48, 0.08, 0.05]} />
        <meshBasicMaterial color={color === '#FFFFFF' ? '#D8E9EF' : color} transparent opacity={0.62} />
      </mesh>
      <StageBadge label={label} />
    </>
  )
}

function StageBadge({ label }) {
  const widths = {
    DOC: 0.45,
    NET: 0.45,
    OUT: 0.45,
  }
  return (
    <group position={[0, -0.78, 0]}>
      <mesh>
        <boxGeometry args={[widths[label] ?? 0.36, 0.13, 0.035]} />
        <meshBasicMaterial color="#F2F7FA" transparent opacity={0.82} />
      </mesh>
    </group>
  )
}

function DocumentStack() {
  return (
    <group position={[-1.18, 0.14, -0.82]} rotation={[0.28, -0.48, -0.22]}>
      {[0, 1, 2].map((item) => (
        <mesh key={item} position={[item * 0.055, item * 0.075, item * 0.055]}>
          <boxGeometry args={[0.76, 0.98, 0.045]} />
          <meshStandardMaterial color={item === 2 ? '#F2F7FA' : '#BCDDE9'} roughness={0.48} />
        </mesh>
      ))}
      <mesh position={[0.08, 0.21, 0.2]}>
        <boxGeometry args={[0.44, 0.045, 0.048]} />
        <meshBasicMaterial color="#E51F28" />
      </mesh>
      <mesh position={[0.08, 0.02, 0.21]}>
        <boxGeometry args={[0.56, 0.04, 0.048]} />
        <meshBasicMaterial color="#008FC5" />
      </mesh>
    </group>
  )
}

function WarehouseGrid() {
  return (
    <group position={[-0.2, -1.36, -0.9]} rotation={[0.32, 0.18, 0]}>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <mesh key={item} position={[(item % 3) * 0.38 - 0.38, Math.floor(item / 3) * 0.28, 0]}>
          <boxGeometry args={[0.28, 0.18, 0.24]} />
          <meshStandardMaterial color={item % 2 ? '#114E6B' : '#008FC5'} roughness={0.36} />
        </mesh>
      ))}
    </group>
  )
}

function CapsuleFlow() {
  return (
    <group position={[1.28, -0.98, 0.48]} rotation={[0.68, 0.12, -0.48]}>
      {[0, 1, 2, 3].map((item) => (
        <mesh key={item} position={[item * 0.34 - 0.5, Math.sin(item) * 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.065, 0.28, 5, 10]} />
          <meshStandardMaterial color={item % 2 ? '#008FC5' : '#E51F28'} roughness={0.32} />
        </mesh>
      ))}
    </group>
  )
}

function BackgroundField() {
  return (
    <group>
      {fieldPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <boxGeometry args={[point.scale, point.scale, point.scale]} />
          <meshBasicMaterial color={index % 5 === 0 ? '#E51F28' : '#008FC5'} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export default SiteExperience3D
