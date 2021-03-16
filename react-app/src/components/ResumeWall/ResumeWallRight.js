import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import resume2 from "../../resources/Resume_2021_03_07-2.jpg";
import { TrackballControls } from "@react-three/drei";

const ResumeRightWall = (props) => {
  console.log(resume2);
  const texture2 = useLoader(Three.TextureLoader, resume2);
  return (
    <mesh {...props} castShadow>
      <planeGeometry attach="geometry" args={[38.67, 50, 1, 1]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"white"}
        map={texture2}
      />
    </mesh>
  );
};

export default ResumeRightWall;
