import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../../Shapes";
import * as Three from "three";

const Backdrop = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[38.67, 50, 200, 400]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"white"}
      />
    </mesh>
  );
};

export default Backdrop;
