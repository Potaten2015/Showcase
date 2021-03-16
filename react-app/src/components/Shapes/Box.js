import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={(e) => console.log("click")}
      // onContextMenu={(e) => console.log("context menu")}
      onDoubleClick={(e) => console.log("double click")}
      // onWheel={(e) => console.log("wheel spins")}
      // onPointerUp={(e) => console.log("up")}
      // onPointerDown={(e) => console.log("down")}
      // onPointerOver={(e) => console.log("over")}
      // onPointerOut={(e) => console.log("out")}
      onPointerEnter={(e) => console.log("enter")} // see note 1
      onPointerLeave={(e) => console.log("leave")} // see note 1
      // onPointerMove={(e) => console.log("move")}
      // onPointerMissed={() => console.log("missed")}
      // onUpdate={(self) => console.log("props have been updated")}
      onClick={(e) => console.log("I GOT CLICKED")}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export default Box;
