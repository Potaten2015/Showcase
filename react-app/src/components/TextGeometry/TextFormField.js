import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as Three from "../../../node_modules/three/build/three";

const TextFormField = (props) => {
  const mesh = useRef();

  const textOptions = {
    font: props.font,
    size: props.size,
    height: props.thickness,
  };

  return (
    <mesh
      castShadow
      ref={mesh}
      position={props.position}
      rotation-y={props["rotation-y"]}>
      <textGeometry attach="geometry" args={[props.text, textOptions]} />
      <meshPhongMaterial
        attach="material"
        color={props.color}
        side={Three.DoubleSide}
      />
      <mesh
        castShadow
        receiveShadow
        onPointerEnter={props.onPointerEnter}
        onPointerLeave={props.onPointerLeave}
        onPointerMissed={props.onPointerMissed}
        onClick={props.onClick}
        position={[2.8, 0.3, 0]}>
        <boxBufferGeometry attach="geometry" args={[6, 0.8, 0]} />
        <meshPhongMaterial
          attach="material"
          transparent={true}
          opacity={props.opacity ? props.opacity : 0.3}
          color={props.backColor ? props.backColor : "white"}
        />
      </mesh>
    </mesh>
  );
};

export default TextFormField;
