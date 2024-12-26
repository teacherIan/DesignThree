import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import heart from './assets/heart.png';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import top from './assets/top.png';
import bottom from './assets/bottom.png';
import front from './assets/front.png';
import back from './assets/back.png';
import left from './assets/left.png';
import right from './assets/right.png';
import { useSprings, animated } from '@react-spring/three';

export default function ImageBoxes({ imageUrl, rows, cols, spacing }) {
  const texture = useTexture(imageUrl);
  const topTexture = useTexture(top);
  const bottomTexture = useTexture(bottom);
  const frontTexture = useTexture(front);
  const backTexture = useTexture(back);
  const leftTexture = useTexture(left);
  const rightTexture = useTexture(right);
  const groupRef = useRef();

  //animation
  const [springs, api] = useSprings(
    rows * cols,
    (n) => ({
      from: { opacity: 1, color: '#00ff00', r: 0 },
      to: { opacity: 1, color: '#ff0000' },

      delay: n * 10, // Staggered animation
    }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((c, i) => {
        // c.rotation.z = state.clock.elapsedTime / 4;
        c.rotation.y = state.clock.elapsedTime / 4;
      });

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
            <animated.group key={`${rowIndex}-${colIndex}`} position={position}>
              {/* Box with solid color material */}

              <animated.mesh>
                <boxGeometry args={[1, 1, 1]} />
                <animated.meshPhysicalMaterial
                  roughness={0.25}
                  reflectivity={1}
                  metalness={0}
                  color="white"
                  // color={springs[rowIndex * cols + colIndex].color}
                  // opacity={springs[rowIndex * cols + colIndex].opacity}
                />
              </animated.mesh>

              {/* Front face with texture */}
              <animated.mesh position={[0, 0, 0.51]}>
                <planeGeometry args={[1, 1]} />
                <animated.meshStandardMaterial
                  transparent
                  color={springs[rowIndex * cols + colIndex].color}
                  opacity={springs[rowIndex * cols + colIndex].opacity}
                >
                  <texture
                    attach="map"
                    {...frontTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - rowIndex / rows]}
                  />
                </animated.meshStandardMaterial>
              </animated.mesh>
              {/* back face with texture */}
              <mesh position={[0, 0, -0.51]} rotation={[Math.PI, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    // rotation={[0, 0, 0]}
                    attach="map"
                    {...backTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - rowIndex / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
              {/* Left face with texture */}
              <mesh
                position={[-0.51, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                transparent
              >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...leftTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
              {/* Right face with texture */}
              <mesh position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent color={'#ffffff'}>
                  <texture
                    attach="map"
                    {...rightTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh>
              {/* Top face with texture */}
              <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial transparent>
                  <texture
                    attach="map"
                    {...topTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshStandardMaterial>
              </mesh>

              {/* Bottom face with texture */}
              <mesh position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial>
                  <texture
                    attach="map"
                    {...bottomTexture}
                    repeat={[1 / cols, 1 / rows]}
                    offset={[colIndex / cols, 1 - (rowIndex + 1) / rows]}
                  />
                </meshBasicMaterial>
              </mesh>
            </animated.group>
          );
        })
      )}
    </group>
  );
}
