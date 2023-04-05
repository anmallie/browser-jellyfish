import './App.css';
import { Canvas } from '@react-three/fiber'

function Sphere() {
  return (
    <mesh>
      <sphereBufferGeometry args={[2, 24, 24]} />
      <meshStandardMaterial color={'magenta'} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      {/* <ambientLight intesity={0}/> */}
      <pointLight position={[15, 15, 15]} />
      <Sphere />
    </Canvas>
  );
}

export default App;
