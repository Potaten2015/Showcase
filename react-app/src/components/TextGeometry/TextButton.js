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
    <mesh castShadow ref={mesh} position={props.position}>
      <textGeometry attach="geometry" args={[props.text, textOptions]} />
      <meshPhongMaterial
        attach="material"
        color={props.color}
        side={Three.DoubleSide}
      />
      <mesh
        receiveShadow
        castShadow
        onPointerEnter={props.onPointerEnter}
        onPointerLeave={props.onPointerLeave}
        onClick={props.onClick}
        position={[1 + props.backDropX, 0.3, 0]}>
        <boxBufferGeometry attach="geometry" args={[3, 1, 0]} />
        <meshPhongMaterial attach="material" transparent={true} opacity={0.1} />
      </mesh>
    </mesh>
  );
};

export default TextStandard;
