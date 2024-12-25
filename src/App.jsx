import heart from './assets/heart.png';
import { Canvas } from '@react-three/fiber';
import ImageBoxes from './ImageBoxes';
import { OrbitControls } from '@react-three/drei';
import './app.css';
export default function App() {
  const cols = 30; // Number of columns
  const rows = 10; // Number of rows
  const spacing = 1;
  const cameraWidth = (cols - 1) * spacing + 1;
  const cameraHeight = (rows - 1) * spacing + 1;

  const imageUrl = heart;

  return (
    <div id="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        orthographic
        camera={{
          left: -cameraWidth / 2,
          right: cameraWidth / 2,
          top: cameraHeight / 2,
          bottom: -cameraHeight / 2,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <ambientLight intensity={10} />
        <directionalLight intensity={5} position={[10, 10, 10]} />

        <ImageBoxes
          imageUrl={imageUrl}
          rows={rows}
          cols={cols}
          spacing={spacing}
        />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
