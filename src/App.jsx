import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import styles from './App.module.css';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  // Number of boxes to display
  const numberOfBoxes = 30;
  const boxSize = 1; // Size of each box
  const spacing = 1; // Space between boxes
  const cameraWidth = (numberOfBoxes - 1) * spacing + boxSize; // Total width needed for boxes

  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        orthographic
        camera={{
          left: -cameraWidth / 2,
          right: cameraWidth / 2,
          top: 5,
          bottom: -5,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        {/* Generate boxes dynamically */}
        {Array.from({ length: numberOfBoxes }).map((_, index) => (
          <mesh
            key={index}
            position={[
              index * spacing - (spacing * (numberOfBoxes - 1)) / 2, // Position along X-axis
              4.5, // Y-axis remains constant
              0, // Z-axis remains constant
            ]}
          >
            <boxGeometry args={[boxSize, boxSize, boxSize]} />
            <meshStandardMaterial
              color={`hsl(${(index / numberOfBoxes) * 360}, 100%, 50%)`}
            />
          </mesh>
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
