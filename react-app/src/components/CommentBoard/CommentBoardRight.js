import React, { useState, useEffect, useRef, createRef } from "react";
import * as Three from "../../../node_modules/three/build/three";
import { Box, Pin } from "../Shapes/";
import { TextButton, TextFormField, TextStandard } from "../TextGeometry";
import { useFrame } from "react-three-fiber";

const CommentBoardRight = (props) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "white",
    "hotpink",
  ];

  const colorHoverObject = {};
  colors.forEach((theColor) => {
    colorHoverObject[theColor] = false;
  });
  const [colorHoverState, setColorHoverState] = useState(colorHoverObject);

  const mapMesh = useRef();
  const holderFontSize = 6;
  const [enterHovered, setEnterHovered] = useState(false);
  const [commentFocused, setCommentFocused] = useState(false);
  const [commentHovered, setCommentHovered] = useState(false);
  let commentSplit = [];
  let currentComment = props.resources.commentFormState["content"];
  let splittable = currentComment;
  while (splittable.length > 50) {
    let lastSpace = 0;
    let charTest = 0;
    Loop: while (true) {
      if (splittable[charTest] == " ") lastSpace = charTest;
      if (splittable[charTest] == " " && charTest > 50) {
        break Loop;
      }
      if (splittable[charTest]) {
        charTest++;
      } else if (!splittable[charTest]) {
        charTest = lastSpace;
        break Loop;
      }
    }
    commentSplit.push(splittable.slice(0, charTest));
    splittable = splittable.slice(charTest + 1);
  }
  commentSplit.push(
    `${splittable} - @${
      props.loginFormTools.loggedIn ? props.session.user.username : ""
    }`,
  );
  const holderText = props.loginFormTools.loggedIn
    ? commentFocused
      ? commentSplit
      : props.resources.commentFields[0].placeholder
    : "Login to leave a comment";
  const holderTextLength =
    props.loginFormTools.loggedIn && commentFocused
      ? holderText.length
      : holderText.split(" ").length;
  const holderRefs =
    props.loginFormTools.loggedIn && commentFocused
      ? holderText.map(() => createRef())
      : holderText.split(" ").map(() => createRef());
  const displacements = [...Array(holderTextLength).keys()].map(
    (disp, index) => {
      return (6 * disp) / (holderTextLength - 1);
    },
  );

  const deltas = new Array(holderTextLength).fill(-0.1);

  useFrame(() => {
    holderRefs.forEach((holder, index) => {
      if (
        (holder.current.position.z + deltas[index] <= -4 &&
          deltas[index] < 0) ||
        (holder.current.position.z + deltas[index] >= -1.5 && deltas[index] > 0)
      )
        deltas[index] *= -1;
      holder.current.position.z += deltas[index];
    });
  });

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
        color={
          props.resources.commentFormState["color"] == "white" ||
          props.resources.commentFormState["color"] == "yellow" ||
          props.resources.commentFormState["color"] == "hotpink"
            ? "black"
            : "white"
        }
      />
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
            <>
              key={comment}
              <TextStandard
                key={comment + index}
                castShadow
                key={index + 51}
                font={props.resources.font}
                size={0.8}
                text={comment}
                color={props.resources.commentFormState["color"]}
                position={[15, 17 - 1 * index, -3.5]}
                thickness={0.2}
                rotation-y={Math.PI}
                reference={holderRefs[index]}
              />
              {index == commentSplit.length - 1 && (
                <>
                  <TextButton
                    key={"button"}
                    onPointerEnter={(e) => setEnterHovered(true)}
                    onPointerLeave={(e) => setEnterHovered(false)}
                    onClick={(e) => props.resources.submitComment()}
                    font={props.resources.font}
                    size={1}
                    text={"Submit Comment"}
                    position={[15, 15 - 1.3 * index - 2, -3.5]}
                    color={
                      enterHovered
                        ? props.resources.commentFormState["color"] ==
                            "white" ||
                          props.resources.commentFormState["color"] ==
                            "yellow" ||
                          props.resources.commentFormState["color"] == "hotpink"
                          ? "white"
                          : "black"
                        : props.resources.commentFormState["color"] !=
                            "white" &&
                          props.resources.commentFormState["color"] !=
                            "yellow" &&
                          props.resources.commentFormState["color"] != "hotpink"
                        ? "black"
                        : "hotpink"
                    }
                    thickness={0.2}
                    rotation-y={Math.PI}
                    backDropX={3.8}
                    backDropWidth={10}
                    backDropHeight={2}
                  />
                  {colors.map((theColor, index) => {
                    return (
                      <TextButton
                        key={theColor}
                        onPointerEnter={(e) =>
                          setColorHoverState((prev) => {
                            const newState = Object.assign({}, prev);
                            newState[theColor] = true;
                            return newState;
                          })
                        }
                        onPointerLeave={(e) =>
                          setColorHoverState((prev) => {
                            const newState = Object.assign({}, prev);
                            newState[theColor] = false;
                            return newState;
                          })
                        }
                        onClick={(e) =>
                          props.resources.setCommentFormState((prev) => {
                            const newState = Object.assign({}, prev);
                            newState["color"] = theColor;
                            return newState;
                          })
                        }
                        font={props.resources.font}
                        size={1}
                        text={theColor.toUpperCase()}
                        position={[-5, 6 - 2 * index - 2, -3.5]}
                        color={colorHoverState[theColor] ? "white" : theColor}
                        thickness={0.2}
                        rotation-y={Math.PI}
                        backDropX={2}
                        backDropWidth={8}
                        backDropHeight={1.8}
                      />
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      {!props.loginFormTools.loggedIn &&
        holderText.split(" ").map((word, index) => {
          return (
            <>
              <TextStandard
                castShadow
                key={word}
                font={props.resources.font}
                size={holderFontSize}
                text={word}
                color={props.resources.commentFormState["color"]}
                position={[
                  15,
                  9 - index * holderFontSize * 1.1,
                  -1.5 - 0.6 * displacements[index],
                ]}
                thickness={0.2}
                rotation-y={Math.PI}
                reference={holderRefs[index]}
              />
            </>
          );
        })}
    </mesh>
  );
};

export default CommentBoardRight;
