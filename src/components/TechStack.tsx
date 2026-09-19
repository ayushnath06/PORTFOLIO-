import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import "./styles/TechStack.css";

const techSkills = [
  "C",
  "C++",
  "Python",
  "HTML",
  "CSS",
  "JavaScript",
  "Git",
  "GitHub",
  // Duplicating a few to fill the bowl and make it look dense, as requested by 'closer' and 'circles'
  "C", "Python", "JavaScript", "HTML", "CSS", "Git", "GitHub", "C++"
];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

type SphereProps = {
  text: string;
  isActive: boolean;
  color: string;
};

function TechSphere({ text, isActive, color }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  // Soft boundary / Hemisphere effect
  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    
    // Apply a soft force towards the center-bottom to keep them clustered
    const translation = api.current.translation();
    
    // Create a bowl shape: push towards center horizontally, and push down if too high, push up if too low
    const targetY = -2; // Bottom of the bowl
    
    const force = new THREE.Vector3(
      -translation.x * 2,           // pull to horizontal center
      (targetY - translation.y) * 4, // pull to target height
      -translation.z * 2            // pull to horizontal center
    );

    // Apply a subtle rotation for dynamic feel
    api.current.applyTorqueImpulse(
      new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      ),
      true
    );

    api.current.applyImpulse(force.multiplyScalar(delta * 2), true);
  });

  return (
    <RigidBody
      ref={api}
      linearDamping={1.5}
      angularDamping={0.5}
      friction={0.2}
      restitution={0.7}
      position={[
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloat(0, 10),
        THREE.MathUtils.randFloatSpread(10)
      ]}
      colliders={false}
    >
      <BallCollider args={[1]} />
      <mesh castShadow receiveShadow geometry={sphereGeometry}>
        <meshPhysicalMaterial
          color={color}
          metalness={0.2}
          roughness={0.1}
          transmission={0.8}
          ior={1.5}
          thickness={1.5}
          clearcoat={1}
        />
      </mesh>
      {/* 2 Sided Text so it can be seen from both sides as it rotates */}
      <Text
        position={[0, 0, 1.01]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
      <Text
        position={[0, 0, -1.01]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </RigidBody>
  );
}

type PointerProps = {
  isActive: boolean;
};

function Pointer({ isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    
    // Map mouse position to 3D space
    const targetVec = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0 // keep the pointer on the Z=0 plane
    );
    
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[0, -10, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workSection = document.getElementById("work");
      if (workSection) {
        const threshold = workSection.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium color palette for the glass spheres
  const colors = ["#4f46e5", "#ec4899", "#06b6d4", "#8b5cf6", "#f59e0b"];

  return (
    <div className="techstack" id="techstack">
      <h2>Tech Stack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 100 }}
        className="tech-canvas"
      >
        <ambientLight intensity={1.5} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          intensity={2}
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {techSkills.map((tech, i) => (
            <TechSphere
              key={i}
              text={tech}
              color={colors[i % colors.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        
        {/* Adds beautiful studio lighting reflections to the glass material */}
        <Environment preset="city" />
        
        <EffectComposer>
          <N8AO color="#0f002c" aoRadius={2} intensity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
