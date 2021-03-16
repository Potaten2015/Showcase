import React, { useState, useEffect, useRef } from "react";
import * as Three from "../../../node_modules/three/build/three";
import { Box, Pin } from "../Shapes/";
import { CommentBoardLeft, CommentBoardRight } from ".";

const CommentBoard = (props) => {
  const mapMesh = useRef();

  return (
    <mesh {...props} receiveShadow ref={mapMesh}>
      <boxBufferGeometry attach="geometry" args={[100, 50, 1]} />
      <shaderMaterial attach="material" opacity={1} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"black"}
        // wireframe={true}
      />
      <Box position={[50, 25, 2]} />
      <CommentBoardLeft position={[20, 0, -5]} resources={props.resources} />
      <CommentBoardRight
        position={[-25, 0, -5]}
        resources={props.resources}
        session={props.session}
        loginFormTools={props.loginFormTools}
      />
    </mesh>
  );
};

export default CommentBoard;
