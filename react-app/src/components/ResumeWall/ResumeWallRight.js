import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import resume2 from "../../resources/Resume2.jpg";
import ResumeDownloader from "./ResumeDownloader";

const ResumeRightWall = (props) => {
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
      <ResumeDownloader
        position={[0, -22.5, 0.1]}
        font={props.resources.font}
      />
    </mesh>
  );
};

export default ResumeRightWall;
