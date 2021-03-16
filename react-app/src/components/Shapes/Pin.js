import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { TextStandard } from "../TextGeometry";

function Pin(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const displayString = `${props.isYours ? "Your Pin!" : ""}
${props.city ? props.city : ""}
${props.state ? props.state : ""}
${props.company ? props.company : ""}`;

  if (displayString.length > 0) {
  }

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      castShadow
      {...props}
      ref={mesh}
      rotation-x={-Math.PI / 2}
      scale={active ? [2, 2, 2] : [2, 2, 2]}
      // onClick={(e) => console.log("click")}
      // onContextMenu={(e) => console.log("context menu")}
      onDoubleClick={(e) => console.log("double click")}
      // onWheel={(e) => console.log("wheel spins")}
      // onPointerUp={(e) => console.log("up")}
      // onPointerDown={(e) => console.log("down")}
      // onPointerOver={(e) => console.log("over")}
      // onPointerOut={(e) => console.log("out")}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHover(true);
      }} // see note 1
      onPointerLeave={(e) => setHover(false)} // see note 1
      // onPointerMove={(e) => console.log("move")}
      // onPointerMissed={() => console.log("missed")}
      // onUpdate={(self) => console.log("props have been updated")}
      onClick={(e) => console.log("I GOT CLICKED")}>
      <mesh>
        <cylinderBufferGeometry
          attach="geometry"
          args={[0.01, 0.01, 0.8, 20, 20]}
        />
        <meshPhongMaterial
          attach="material"
          color={hovered ? "red" : props.color}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneBufferGeometry attach="geometry" args={[0.01, 0.2, 20, 20]} />
        <meshPhongMaterial
          attach="material"
          color={hovered ? "red" : props.color}
        />
      </mesh>
      <mesh position={[0, -0.41, 0]}>
        <sphereBufferGeometry attach="geometry" args={[0.12, 20, 20]} />
        <meshPhongMaterial
          attach="material"
          color={hovered ? "red" : props.color}
        />
      </mesh>
      {displayString.length > 0 && hovered && (
        <mesh position={[7, -5, -7]}>
          <boxBufferGeometry attach="geometry" args={[10, 0.1, 10]} />
          <meshPhongMaterial attach="material" color={"black"} />
          <mesh rotation-x={Math.PI / 2} position={[-4.8, 0, 3]}>
            <TextStandard
              font={props.font}
              size={1}
              thickness={0.1}
              text={displayString}
            />
          </mesh>
        </mesh>
      )}
    </mesh>
  );
}

export default Pin;
