import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import { BioWall } from "./BioWall";

const LoginWall = (props) => {
  return (
    <>
      <mesh {...props} receiveShadow>
        <BioWall position={[-20, 0, -5]} />
        <planeGeometry attach="geometry" args={[100, 100, 1, 150]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
    </>
  );
};

export default LoginWall;
