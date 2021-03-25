import React, { useRef, useState } from "react";
import { applyProps, useFrame } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import ResumeLeftWall from "./ResumeWallLeft";
import ResumeRightWall from "./ResumeWallRight";

const ResumeWall = (props) => {
  return (
    <>
      <mesh {...props} receiveShadow castShadow>
        <planeGeometry attach="geometry" args={[100, 100, 1, 150]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
        <ResumeLeftWall position={[-20, 0, 1]} resources={props.resources} />
        <ResumeRightWall position={[20, 0, 1]} resources={props.resources} />
      </mesh>
    </>
  );
};

export default ResumeWall;
