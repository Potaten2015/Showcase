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
        position={[-9.3, 12.0, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.2}
        backDropY={-0.05}
        link={"https://tatenknight.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-10.9, 7.6, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.2}
        backDropY={-0.05}
        link={"https://create-resumes.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-8.9, 3.25, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.2}
        backDropY={-0.05}
        link={"https://buy-sourced.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-5.95, -1.15, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.2}
        backDropY={-0.05}
        link={"https://goodeats-c-j-j-t.herokuapp.com/"}
      />
      <LiveLink
        font={props.resources.font}
        text={"Live Link"}
        position={[-6.6, -5.5, 0.1]}
        backDropWidth={3}
        backDropHeight={0.9}
        backDropOpacity={1}
        backDropX={0.2}
        backDropY={-0.05}
        link={
          "https://play.google.com/store/apps/details?id=com.potaten2015.wallz"
        }
      />
      <ResumeDownloader
        position={[0, -22.5, 0.1]}
        font={props.resources.font}
      />
    </mesh>
  );
};

export default ResumeRightWall;
