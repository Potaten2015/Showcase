import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";

const Ceiling = (props) => {
  return (
    <mesh {...props} castShadow>
      <boxBufferGeometry attach="geometry" args={[100, 100, 1]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"black"}
      />
    </mesh>
  );
};

export default Ceiling;
