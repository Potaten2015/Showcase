import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import resume2 from "../../resources/Resume2.jpg";
import ResumeDownloader from "./ResumeDownloader";
import LiveLink from "./LiveLink";

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
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-9.8, 6.8, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.4}
        backDropY={0}
        link={"https://tatenknight.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-11.1, 2.35, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.4}
        backDropY={0}
        link={"https://create-resumes.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-9.1, -2, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.4}
        backDropY={0}
        link={"https://buy-sourced.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-6.15, -6.4, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.4}
        backDropY={0}
        link={"https://goodeats-c-j-j-t.herokuapp.com/"}
      />
      <ResumeDownloader
        position={[0, -22.5, 0.1]}
        font={props.resources.font}
      />
    </mesh>
  );
};

export default ResumeRightWall;
