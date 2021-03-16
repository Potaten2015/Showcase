import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as Three from "../../../node_modules/three/build/three";
import { Box, Pin } from "../Shapes/";
import { TextStandard } from "../TextGeometry";
import { useHelper } from "@react-three/drei";

const CommentBoardLeft = (props) => {
  const commentLines = [];
  const commentFontSize = 1;
  const commentColor = "white";
  const commentThickness = ".2";

  const scrollingMesh1 = useRef();
  const scrollingMesh2 = useRef();

  const commentSplit = [];

  props.resources.comments &&
    props.resources.comments.forEach((comment, index1) => {
      let currentComment = comment.content;
      let count = 0;
      while (currentComment.length > 50) {
        count++;
        let charTest = 50;
        while (currentComment[charTest] != " ") {
          charTest++;
        }
        commentSplit.push(currentComment.slice(0, charTest));
        currentComment = currentComment.slice(charTest + 1);
      }
      commentSplit.push(`${currentComment} - @${comment.user.username}`);
      commentSplit.push(" ");
    });

  // const commentSpotlight1 = useRef();
  // useHelper(commentSpotlight1, Three.SpotLightHelper, 1, "blue");
  // const commentSpotlight2 = useRef();
  // useHelper(commentSpotlight2, Three.SpotLightHelper, 1, "blue");

  useFrame(() => {
    if (scrollingMesh1.current.position.y <= -62.4) {
      scrollingMesh1.current.position.y = 15.5;
      scrollingMesh1.current.position.y -= 0.01;
    } else {
      scrollingMesh1.current.position.y -= 0.01;
    }
    if (scrollingMesh2.current.position.y <= -62.4) {
      scrollingMesh2.current.position.y = 15.5;
      scrollingMesh2.current.position.y -= 0.01;
    } else {
      scrollingMesh2.current.position.y -= 0.01;
    }
  });

  return (
    <mesh {...props} castShadow>
      <mesh castShadow position={[0, 22, 4]}>
        <boxBufferGeometry
          attach="geometry"
          args={[40, 7, 2]}
          position={[0, 0, 0]}
        />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
        <TextStandard
          font={props.resources.font}
          size={commentFontSize + 3}
          text={"Comments"}
          color={"white"}
          position={[12, -3, -3]}
          thickness={commentThickness}
          rotation-y={Math.PI}
        />
      </mesh>
      <mesh castShadow position={[0, -22, 4]}>
        <boxBufferGeometry
          attach="geometry"
          args={[40, 7, 2]}
          position={[0, 0, 0]}
        />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
      <mesh castShadow ref={scrollingMesh1}>
        {commentSplit.map((comment, index) => {
          return (
            <TextStandard
              key={index}
              font={props.resources.font}
              size={commentFontSize}
              text={comment}
              color={comment.color}
              position={[18, 96 - 1.3 * index, 3.5]}
              thickness={commentThickness}
              rotation-y={Math.PI}
            />
          );
        })}
      </mesh>
      <mesh castShadow ref={scrollingMesh2}>
        {commentSplit.map((comment, index) => {
          return (
            <TextStandard
              castShadow
              key={index + 51}
              font={props.resources.font}
              size={commentFontSize}
              text={comment}
              color={comment.color}
              position={[18, 18 - 1.3 * index, 3.5]}
              thickness={commentThickness}
              rotation-y={Math.PI}
            />
          );
        })}
      </mesh>
    </mesh>
  );
};

export default CommentBoardLeft;
