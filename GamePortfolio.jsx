import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Player Component
const Player = ({ position }) => {
  const ref = useRef();
  const [forward, setForward] = useState(false);

  useFrame(() => {
    if (forward) {
      ref.current.position.z -= 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position} onClick={() => setForward(!forward)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

// Ground Component
const Ground = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color='lightgreen' />
    </mesh>
  );
};

// Tree Component
const Tree = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.5, 2]} />
      <meshStandardMaterial color='brown' />
    </mesh>
  );
};

// Landmark Component
const Landmark = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color='red' />
    </mesh>
  );
};

// Interactive ProjectZone Component
const ProjectZone = ({ position }) => {
  return (
    <mesh position={position} onClick={() => alert('Welcome to the Project Zone!') }>
      <boxGeometry args={[3, 0.1, 3]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  );
};

// EasterEgg Component
const EasterEgg = ({ position }) => {
  return (
    <mesh position={position} onClick={() => alert('You found an Easter Egg!') }>
      <sphereGeometry args={[0.3]} />
      <meshStandardMaterial color='yellow' />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Ground />
      <Player position={[0, 0, 0]} />
      <Tree position={[-5, 0, -5]} />
      <Tree position={[5, 0, -5]} />
      <Landmark position={[0, 0, 5]} />
      <ProjectZone position={[2, 0, -2]} />
      <EasterEgg position={[-2, 0, 2]} />
    </Canvas>
  );
};

export default App;