import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** True on phones / low-power devices — we skip WebGL entirely. */
function useIsMobile() {
  const [mobile, setMobile] = useState(true); // start true to avoid flash of heavy canvas
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const cores = navigator.hardwareConcurrency ?? 8;
      setMobile(mq.matches || reduced.matches || cores <= 4);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const lime = new THREE.Color("#C7F36A");
    const white = new THREE.Color("#ffffff");
    const silver = new THREE.Color("#8fa0ad");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      const pick = Math.random();
      const c = pick > 0.88 ? lime : pick > 0.6 ? white : silver;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function NebulaCup() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const shards = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x || 0;
    const py = state.pointer.y || 0;
    const d = Math.min(delta, 0.05);

    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, py * -0.18, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.32, 0.05);
      group.current.position.y = Math.sin(t * 0.9) * 0.18;
    }
    if (ring1.current) {
      ring1.current.rotation.z += d * 0.28;
      ring1.current.rotation.x = Math.PI / 2.35 + Math.sin(t * 0.4) * 0.08;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= d * 0.2;
      ring2.current.rotation.y += d * 0.12;
    }
    if (ring3.current) {
      ring3.current.rotation.z += d * 0.14;
      ring3.current.rotation.x = Math.PI / 1.9 + Math.cos(t * 0.3) * 0.1;
    }
    if (glow.current) {
      const s = 1 + Math.sin(t * 1.6) * 0.06;
      glow.current.scale.set(s, s, s);
    }
    if (shards.current) {
      shards.current.rotation.y -= d * 0.22;
      shards.current.rotation.z = Math.sin(t * 0.25) * 0.15;
    }
  });

  const shardPositions = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 2.9, Math.sin(a * 1.7) * 0.7, Math.sin(a) * 2.9] as [number, number, number],
          s: 0.08 + (i % 3) * 0.05,
        };
      }),
    []
  );

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <mesh ref={glow} position={[0, -0.15, -0.4]}>
        <sphereGeometry args={[1.55, 24, 24]} />
        <meshBasicMaterial
          color="#C7F36A"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.45, 0]}>
        <ringGeometry args={[0.9, 1.6, 48]} />
        <meshBasicMaterial color="#C7F36A" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.46, 0]}>
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial color="#C7F36A" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.02, 0.72, 1.25, 48, 1, true]} />
        <meshStandardMaterial
          color="#10161d"
          metalness={0.45}
          roughness={0.22}
          side={THREE.DoubleSide}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.72, 48]} />
        <meshStandardMaterial color="#0b0f14" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.94, 48]} />
        <meshStandardMaterial
          color="#2a1a0e"
          emissive="#C7F36A"
          emissiveIntensity={0.16}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.52, 32]} />
        <meshBasicMaterial color="#F6F1E7" transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.435, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.14, 16]} />
        <meshBasicMaterial color="#C7F36A" transparent opacity={0.95} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.625, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.035, 12, 48]} />
        <meshStandardMaterial color="#e8ecef" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[1.18, 0.05, 0]}>
        <torusGeometry args={[0.42, 0.07, 12, 32, Math.PI * 1.35]} />
        <meshStandardMaterial color="#1a222b" metalness={0.6} roughness={0.25} />
      </mesh>
      {[-0.25, 0.05, 0.32].map((x, i) => (
        <mesh key={i} position={[x, 1.25 + i * 0.12, -0.1 + i * 0.08]}>
          <torusGeometry args={[0.14 - i * 0.02, 0.012, 8, 16, Math.PI * 1.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.28 - i * 0.06} depthWrite={false} />
        </mesh>
      ))}

      <mesh ref={ring1} rotation={[Math.PI / 2.35, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.018, 8, 128]} />
        <meshBasicMaterial color="#C7F36A" transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.7, 0.5, 0.4]}>
        <torusGeometry args={[2.75, 0.012, 8, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.32} depthWrite={false} />
      </mesh>
      <mesh ref={ring3} rotation={[Math.PI / 1.9, -0.3, 0.2]}>
        <torusGeometry args={[3.25, 0.01, 8, 128]} />
        <meshBasicMaterial color="#8fa0ad" transparent opacity={0.22} depthWrite={false} />
      </mesh>

      <group ref={shards}>
        {shardPositions.map((s, i) => (
          <mesh key={i} position={s.pos}>
            <octahedronGeometry args={[s.s, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#C7F36A" : "#e8ecef"}
              emissive={i % 2 === 0 ? "#C7F36A" : "#000000"}
              emissiveIntensity={i % 2 === 0 ? 0.9 : 0}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      <mesh position={[-2.15, 0.9, -0.6]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#F6F1E7" emissive="#ffffff" emissiveIntensity={0.25} roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Lightweight CSS-only hero visual for mobile — zero WebGL cost. */
function MobileHeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* soft glow */}
      <div className="absolute left-1/2 top-[42%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7F36A]/[0.12] blur-[80px]" />
      {/* orbit rings */}
      <div className="absolute left-1/2 top-[42%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15 animate-spin-slowest" />
      <div className="absolute left-1/2 top-[42%] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C7F36A]/30 animate-spin-slower" />
      {/* cup silhouette */}
      <div className="relative mt-[-20px] flex flex-col items-center animate-float-soft">
        <div className="relative h-[72px] w-[58px]">
          {/* rim */}
          <div className="absolute left-1/2 top-0 h-[10px] w-[58px] -translate-x-1/2 rounded-full border border-white/40 bg-[#1a222b]" />
          {/* body */}
          <div
            className="absolute left-1/2 top-[6px] h-[58px] w-[52px] -translate-x-1/2 rounded-b-[14px] border border-white/15"
            style={{
              background: "linear-gradient(180deg, #1a222b 0%, #0d131a 100%)",
              boxShadow: "0 0 40px rgba(199,243,106,0.25), inset 0 0 20px rgba(199,243,106,0.08)",
            }}
          />
          {/* coffee surface */}
          <div className="absolute left-1/2 top-[12px] h-[8px] w-[44px] -translate-x-1/2 rounded-full bg-[#2a1a0e]" />
          <div className="absolute left-1/2 top-[13px] h-[5px] w-[18px] -translate-x-1/2 rounded-full border border-[#F6F1E7]/70" />
          <div className="absolute left-1/2 top-[14px] h-[3px] w-[6px] -translate-x-1/2 rounded-full bg-[#C7F36A]" />
          {/* handle */}
          <div className="absolute right-[-14px] top-[18px] h-[28px] w-[18px] rounded-full border-2 border-white/25" />
        </div>
        {/* steam */}
        <div className="mt-1 flex gap-2 opacity-50">
          <span className="block h-4 w-[2px] rounded-full bg-white/40 animate-pulse-glow" style={{ animationDelay: "0s" }} />
          <span className="block h-5 w-[2px] rounded-full bg-white/50 animate-pulse-glow" style={{ animationDelay: "0.4s" }} />
          <span className="block h-3.5 w-[2px] rounded-full bg-white/35 animate-pulse-glow" style={{ animationDelay: "0.8s" }} />
        </div>
      </div>
    </div>
  );
}

export default function HeroCanvas() {
  const mobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobile) return; // no observer needed — CSS only
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mobile]);

  // Mobile / low-power: pure CSS, zero WebGL
  if (mobile) {
    return (
      <div ref={containerRef} className="absolute inset-0">
        <MobileHeroVisual />
      </div>
    );
  }

  // Desktop: full 3D, paused when off-screen
  return (
    <div ref={containerRef} className="absolute inset-0">
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.4, 8.2], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          style={{ background: "transparent" }}
          frameloop="always"
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 6]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-4, 2, 3]} intensity={14} color="#C7F36A" distance={14} />
          <pointLight position={[3, -2, 4]} intensity={8} color="#7db4ff" distance={12} />
          <spotLight position={[0, 6, 4]} angle={0.5} intensity={1.1} color="#fff6e6" penumbra={1} />
          <NebulaCup />
          <Particles count={220} />
        </Canvas>
      )}
    </div>
  );
}
