import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as Three from "../../../node_modules/three/build/three";

const TextStandard = (props) => {
  const mesh = useRef();

  const textOptions = {
    font: props.font,
    size: props.size,
    height: props.thickness,
  };

  return (
    <mesh {...props} castShadow ref={props.reference} position={props.position}>
      <textGeometry attach="geometry" args={[props.text, textOptions]} />
      <meshPhongMaterial
        attach="material"
        color={props.color}
        side={Three.DoubleSide}
      />
    </mesh>
  );
};

export default TextStandard;
