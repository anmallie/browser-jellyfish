import './App.css';
import { useState, useRef } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { DoubleSide, Euler } from 'three';

function ConstrictingHemisphere() {
  const mesh = useRef()
  const [thetaLength, setThetaLength] = useState(Math.PI/4)
  const [radius, setRadius] = useState(2)
  function motionWave(x, offset=0) {
    return Math.sin(x/1.5 + Math.sin(x/1.5)/2 + offset)
  }
  const updateThetaLength = (time) => {
    // oscillate thetaLength according to sin(x)/2.6 + 3pi/8
    const newThetaLength = motionWave(time)/2.6 + 3*Math.PI/8;
    setThetaLength(newThetaLength);
  }
  const updateRadius = (time) => {
    // oscillate radius between some numbers
    const offset = Math.PI // 
    const newRadius = motionWave(time, offset)/2 + 1.5;
    setRadius(newRadius);
  }
  useFrame(({clock}) => {
      // mesh.current.rotation.y += 0.01;
      // mesh.current.rotation.x += 0.001;
      // mesh.current.rotation.z += 0.001;

      const timescale = 1;
      const time = clock.getElapsedTime() * timescale;
      updateThetaLength(time);
      updateRadius(time);
    })
  return (
    <mesh ref={mesh}>
      <sphereBufferGeometry args={[radius, 24, 24, 0, Math.PI*2, 0, thetaLength]} />
      {/* <torusBufferGeometry args={[radius, 0.1, 16, 64]} /> */}
      <meshLambertMaterial
        transparent
        color={'magenta'}
        opacity={0.7}
        side={DoubleSide} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      {/* <ambientLight intesity={0}/> */}
      <pointLight position={[15, 15, 15]} />
      <ConstrictingHemisphere rotation={new Euler(1, 3, 2)}/>
    </Canvas>
  );
}

export default App;
