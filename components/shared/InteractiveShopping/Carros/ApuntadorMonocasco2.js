import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function ApuntadorMonocasco2(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (mesh.current.rotation.x += 0.03))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 35}
      onClick={(event) => alert("Ir a partes del Monocasco")}
      onPointerOver={(event) => () => alert('azul')}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry attach="geometry" args={[.5, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#2D2E83'} />
    </mesh>
  )
}
// onClick={(event) => setActive(!active)}
//<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
export default ApuntadorMonocasco2;
//  <circleGeometry args={[1, 58, 20]} />