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
    <mesh
      castShadow
      ref={mesh}
      position={props.position}
      rotation-y={props["rotation-y"] ? props["rotation-y"] : 0}>
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
        position={[
          1 + props.backDropX,
          props.backDropY ? 0.3 + props.backDropY : 0.3,
          0,
        ]}>
        <boxBufferGeometry
          attach="geometry"
          args={[
            props.backDropWidth ? props.backDropWidth : 3,
            props.backDropHeight ? props.backDropHeight : 1,
            0,
          ]}
        />
        <meshPhongMaterial
          attach="material"
          transparent={true}
          opacity={props.backDropOpacity ? props.backDropOpacity : 0.3}
        />
      </mesh>
    </mesh>
  );
};

export default TextStandard;
