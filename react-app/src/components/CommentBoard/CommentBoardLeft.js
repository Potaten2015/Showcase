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
  const colorSplit = [];

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
        colorSplit.push(comment.color);
        currentComment = currentComment.slice(charTest + 1);
      }
      colorSplit.push(comment.color);
      commentSplit.push(`${currentComment} - @${comment.user.username}`);
      colorSplit.push(comment.color);
      commentSplit.push(" ");
      while (count < 4) {
        colorSplit.push(comment.color);
        commentSplit.push(" ");
        count++;
      }
    });

  // const commentSpotlight1 = useRef();
  // useHelper(commentSpotlight1, Three.SpotLightHelper, 1, "blue");
  // const commentSpotlight2 = useRef();
  // useHelper(commentSpotlight2, Three.SpotLightHelper, 1, "blue");

  useFrame(() => {
    if (scrollingMesh1.current.position.y <= -62.4) {
      scrollingMesh1.current.position.y = 15.5;
      scrollingMesh1.current.position.y -= 0.1;
    } else {
      scrollingMesh1.current.position.y -= 0.1;
    }
    if (scrollingMesh2.current.position.y <= -62.4) {
      scrollingMesh2.current.position.y = 15.5;
      scrollingMesh2.current.position.y -= 0.1;
    } else {
      scrollingMesh2.current.position.y -= 0.1;
    }
  });

  return (
    <object3D {...props} castShadow>
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
      <object3D castShadow ref={scrollingMesh1}>
        {commentSplit.map((comment, index) => {
          return (
            <TextStandard
              key={index}
              font={props.resources.font}
              size={commentFontSize}
              text={comment}
              color={colorSplit[index]}
              position={[18, 96 - 1.3 * index, 3.5]}
              thickness={commentThickness}
              rotation-y={Math.PI}
            />
          );
        })}
      </object3D>
      <object3D castShadow ref={scrollingMesh2}>
        {commentSplit.map((comment, index) => {
          return (
            <TextStandard
              castShadow
              key={index + 51}
              font={props.resources.font}
              size={commentFontSize}
              text={comment}
              color={colorSplit[index]}
              position={[18, 18 - 1.3 * index, 3.5]}
              thickness={commentThickness}
              rotation-y={Math.PI}
            />
          );
        })}
      </object3D>
    </object3D>
  );
};

export default CommentBoardLeft;
