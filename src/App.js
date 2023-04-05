import './App.css';
import { useState, useRef } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'

function ConstrictingHemisphere() {
  const mesh = useRef()
  const [thetaLength, setThetaLength] = useState(Math.PI/4)
  const [radius, setRadius] = useState(2)
  
  const updateThetaLength = (time) => {
    // oscillate thetaLength according to sin(x)/2.6 + 3pi/8
    const newThetaLength = Math.sin(time)/2.6 + 3*Math.PI/8;
    setThetaLength(newThetaLength);
  }
  const updateRadius = (time) => {
    // oscillate radius between some numbers
    const offset = Math.PI // 
    const newRadius = Math.sin(time + offset)/2 + 1.5;
    setRadius(newRadius);
  }
  useFrame(({clock}) => {
      const timescale = 1;
      const time = clock.getElapsedTime() * timescale;
      updateThetaLength(time);
      updateRadius(time);
    })
  return (
    <mesh>
      <sphereBufferGeometry args={[radius, 24, 24, 0, Math.PI*2, 0, thetaLength]} />
      {/* <torusBufferGeometry args={[radius, 0.1, 16, 64]} /> */}
      <meshStandardMaterial transparent color={'magenta'} opacity={0.7} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      {/* <ambientLight intesity={0}/> */}
      <pointLight position={[15, 15, 15]} />
      <ConstrictingHemisphere/>
    </Canvas>
  );
}

export default App;
