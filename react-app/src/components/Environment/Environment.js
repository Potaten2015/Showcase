import React, { Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Box } from "../Shapes";
import { LoginFormObject } from "../Forms/";
import {
  PerspectiveCamera,
  MapControls,
  OrbitControls,
  CubeCamera,
  TrackballControls,
  OrthographicCamera,
  PointerLockControls,
  useHelper,
} from "@react-three/drei";
import * as Three from "../../../node_modules/three/build/three";
import { WorldMap } from "../Map";
import { CommentBoard } from "../CommentBoard";
import { Ceiling } from "../Ceiling";
import { LoginWall } from "../LoginWall";
import { ResumeWall } from "../ResumeWall";
import { BioWall } from "../LoginWall/BioWall";

const Environment = (props) => {
  const keyPressed = {};
  document.addEventListener("keydown", (e) => {
    if (!keyPressed[e.key]) keyPressed[e.key] = e.key;
  });
  document.addEventListener("keyup", (e) => {
    delete keyPressed[e.key];
  });
  const mesh = useRef();
  const persCam = useRef();
  const topCam = useRef();
  const mainCamObject = useRef();
  const topCamObject = useRef();
  // const persCam2 = useRef();
  // const persCam3 = useRef();
  // const persCam4 = useRef();
  const look1 = useRef();
  const look2 = useRef();
  const look3 = useRef();
  const look4 = useRef();
  const outerSpotlight = useRef();
  const innerSpotlight = useRef();
  const persTarget = useRef();
  const width = window.innerWidth;
  const height = window.innerHeight;
  let moveX = 0;
  let justMoved = false;

  const { gl } = useThree();

  // useHelper(persCam, Three.CameraHelper, 1, "blue");
  // useHelper(topCam, Three.CameraHelper, 1, "blue");

  useFrame(() => {
    if (keyPressed["ArrowLeft"]) mainCamObject.current.rotation.z += 0.01;
    if (keyPressed["ArrowRight"]) mainCamObject.current.rotation.z -= 0.01;
    if (keyPressed["ArrowUp"]) persCam.current.rotation.x += 0.01;
    if (keyPressed["ArrowDown"]) persCam.current.rotation.x -= 0.01;
    if (keyPressed["Shift"]) mainCamObject.current.position.z += 0.1;
    if (keyPressed["Control"]) mainCamObject.current.position.z -= 0.1;
    if (keyPressed["w"]) mainCamObject.current.position.y += 0.1;
    if (keyPressed["s"]) mainCamObject.current.position.y -= 0.1;
    if (keyPressed["d"]) mainCamObject.current.position.x += 0.1;
    if (keyPressed["a"]) mainCamObject.current.position.x -= 0.1;
  });
  return (
    <>
      {/* LIGHTING */}
      {/* <ambientLight intensity={0.1} /> */}
      <pointLight args={["white", 0.1]} position={[40, 40, 40]} />
      <pointLight args={["white", 0.1]} position={[-40, -40, 40]} />
      <pointLight args={["white", 0.1]} position={[-40, 40, 40]} />
      <pointLight args={["white", 0.1]} position={[40, -40, 40]} />
      <pointLight args={["white", 0.1]} position={[40, 40, 0]} />
      <pointLight args={["white", 0.1]} position={[-40, -40, 0]} />
      <pointLight args={["white", 0.1]} position={[-40, 40, 0]} />
      <pointLight args={["white", 0.1]} position={[40, -40, 0]} />
      <pointLight
        args={["white", 1, 150, 0]}
        position={[0, 0, 40]}
        intensity={0.2}
        shadow-mapSize-width={1500}
        shadow-mapSize-height={1500}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        castShadow
      />
      {/* CAMERA */}
      <object3D ref={mainCamObject}>
        <PerspectiveCamera
          ref={persCam}
          args={[60, 2, 1, 400]}
          attach="camera"
          position={[0, 0, 25]}
          rotation-x={Math.PI / 2}
          rotation-y={Math.PI}
          makeDefault>
          <object3D ref={persTarget} position={[0, 0, -10]} />
        </PerspectiveCamera>
      </object3D>

      <mesh ref={mesh} receiveShadow position={[0, 0, 0]}>
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <LoginWall rotation-x={Math.PI / 2} position={[0, -50, 25]} />
        </Suspense>
        <LoginFormObject
          font={props.resources.font}
          loginFormTools={props.loginFormTools}
          castShadow
          rotation-x={Math.PI / 2}
          rotation-y={Math.PI}
          position={[20, -45, 25]}
        />
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <WorldMap
            resources={props.resources}
            loginFormTools={props.loginFormTools}
            session={props.session}
            rotation-x={Math.PI / 2}
            position={[0, 50, 25]}
          />
        </Suspense>
        <Ceiling position={[0, 0, 50]} />
        <Suspense fallback={<Box position={[0, 0, 0]} />}>
          <ResumeWall
            rotation-x={Math.PI / 2}
            rotation-y={Math.PI / 2}
            position={[-50, 0, 25]}
          />
        </Suspense>
        <CommentBoard
          resources={props.resources}
          loginFormTools={props.loginFormTools}
          session={props.session}
          rotation-x={Math.PI / 2}
          rotation-y={Math.PI / 2}
          position={[50, 0, 25]}
        />
        <mesh position={[0, 5, 50]}>
          <object3D ref={persTarget} position={[0, 0, -10]} />
        </mesh>
        <planeBufferGeometry args={[100, 100]} />
        <shaderMaterial attach="material" opacity={0.3} />
        <meshPhongMaterial
          attach="material"
          color="black"
          side={Three.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Environment;
