import React, { useState, useEffect, useRef, createRef } from "react";
import * as Three from "../../../node_modules/three/build/three";
import { Box, Pin } from "../Shapes/";
import { TextFormField, TextStandard } from "../TextGeometry";
import { useFrame } from "react-three-fiber";

const CommentBoardRight = (props) => {
  const mapMesh = useRef();
  const holderFontSize = 6;
  console.log("The state", props.resources.commentFormState);
  const holderText = "Login to leave a comment";
  const holderTextLength = holderText.split(" ").length;
  const holderRefs = holderText.split(" ").map(() => createRef());
  const displacements = [...Array(holderTextLength).keys()];
  const deltas = new Array(holderTextLength).fill(-0.01);
  const [commentFocused, setCommentFocused] = useState(false);
  const [commentHovered, setCommentHovered] = useState(false);

  let commentSplit = [];
  let currentComment = props.resources.commentFormState["content"];
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
  commentSplit.push(
    `${currentComment} - @${
      props.loginFormTools.loggedIn ? props.session.user.username : ""
    }`,
  );
  console.log(commentSplit);

  // useFrame(() => {
  //   holderRefs.forEach((holder, index) => {
  //     if (
  //       holder.current.position.z + deltas[index] <= -4 ||
  //       holder.current.position.z + deltas[index] >= -1.5
  //     )
  //       deltas[index] *= -1;
  //     holder.current.position.z += deltas[index];
  //   });
  // });

  return (
    <mesh
      {...props}
      receiveShadow
      ref={mapMesh}
      onPointerEnter={(e) => setCommentHovered(true)}
      onPointerLeave={(e) => setCommentHovered(false)}
      onClick={(e) => {
        setCommentFocused(true);
        document
          .getElementById(
            "comment" + props.resources.commentFields[0].fieldName,
          )
          .focus();
      }}
      onPointerMissed={(e) => {
        setCommentFocused(false);
        document
          .getElementById(
            "comment" + props.resources.commentFields[0].fieldName,
          )
          .blur();
      }}>
      <planeGeometry attach="geometry" args={[40, 40, 100, 50]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"white"}
      />
      <Box position={[18, 18, -1]} />
      {props.loginFormTools.loggedIn &&
        !commentFocused &&
        props.resources.commentFields[0].placeholder
          .split(" ")
          .map((word, index) => {
            return (
              <TextStandard
                key={word}
                font={props.resources.font}
                size={commentFocused ? 1 : holderFontSize}
                thickness={0.2}
                text={word}
                position={[
                  15,
                  9 - index * holderFontSize * 1.1,
                  -1.5 - 0.6 * displacements[index],
                ]}
                color={commentHovered ? "black" : "hotpink"}
                rotation-y={Math.PI}
                reference={holderRefs[index]}
              />
            );
          })}
      {props.loginFormTools.loggedIn &&
        commentFocused &&
        commentSplit.map((comment, index) => {
          return (
            <TextStandard
              castShadow
              key={index + 51}
              font={props.resources.font}
              size={1}
              text={comment}
              color={"black"}
              position={[15, 15 - 1.3 * index, -3.5]}
              thickness={0.2}
              rotation-y={Math.PI}
            />
          );
        })}
      {!props.loginFormTools.loggedIn &&
        holderText.split(" ").map((word, index) => {
          return (
            <TextStandard
              castShadow
              key={word}
              font={props.resources.font}
              size={holderFontSize}
              text={word}
              color={"hotpink"}
              position={[
                15,
                9 - index * holderFontSize * 1.1,
                -1.5 - 0.6 * displacements[index],
              ]}
              thickness={0.2}
              rotation-y={Math.PI}
              reference={holderRefs[index]}
            />
          );
        })}
    </mesh>
  );
};

export default CommentBoardRight;
