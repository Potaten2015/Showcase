import React, { useRef, useState } from "react";
import { applyProps, useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import resume1 from "../../resources/Resume1.jpg";
import { ResumeDownloader } from ".";

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
      <ResumeDownloader
        position={[0, -22.5, 0.1]}
        font={props.resources.font}
      />
    </mesh>
  );
};

export default ResumeLeftWall;
