import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import heart from './assets/heart.png';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function ImageBoxes({ imageUrl, rows, cols, spacing }) {
  const texture = useTexture(imageUrl);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      console.log(
        groupRef.current.children.forEach((c, i) => {
          //   c.rotation.x = state.clock.elapsedTime / 4;
          //   c.rotation.y = state.clock.elapsedTime / 2;
        })
      );
      //   groupRef.current.rotation.y =  // Adjust speed as needed
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((_, colIndex) => {
          const position = [
            colIndex * spacing - (spacing * (cols - 1)) / 2,
            (rows - 1 - rowIndex) * spacing - (spacing * (rows - 1)) / 2,
            0,
          ];

          return (
            <group key={`${rowIndex}-${colIndex}`} position={position}>
              {/* Box with solid color material */}
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial transparent />
              </mesh>

              {/* Front face with texture */}
              {/* <mesh position={[0, 0, 0.501]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh> */}
              {/* back face with texture */}
              {/* <mesh position={[0, 0, -0.501]} rotation={[Math.PI, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    // rotation={[0, 0, 0]}
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - rowIndex / rows]}
                  />
                </meshStandardMaterial>
              </mesh> */}
              {/* Left face with texture */}
              <mesh
                position={[-0.501, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                transparent
              >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
              {/* Right face with texture */}
              <mesh
                position={[0.501, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                transparent
              >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
              {/* Top face with texture */}
              {/* <mesh position={[0, 0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh> */}

              {/* Bottom face with texture */}
              <mesh position={[0, -0.501, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...texture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - rowIndex / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
            </group>
          );
        })
      )}
    </group>
  );
}
