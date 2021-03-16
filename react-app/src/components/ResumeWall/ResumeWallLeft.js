import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import resume1 from "../../resources/Resume_2021_03_07-1.jpg";
import resume2 from "../../resources/Resume_2021_03_07-2.jpg";

const ResumeLeftWall = (props) => {
  const texture = useLoader(Three.TextureLoader, resume1);

  return (
    <mesh {...props} castShadow>
      <planeGeometry attach="geometry" args={[38.67, 50, 200, 400]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"white"}
        map={texture}
      />
    </mesh>
  );
};

export default ResumeLeftWall;
