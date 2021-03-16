import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../../Shapes";
import * as Three from "three";
import texture from "../../../resources/goodPhoto.png";

const PictureHolder = (props) => {
  const photo = useLoader(Three.TextureLoader, texture);

  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[11.905, 15, 200, 400]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        map={photo}
      />
      <mesh position={[6, 0, 0]}>
        <boxBufferGeometry args={[1, 16, 2]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
      <mesh position={[-6, 0, 0]}>
        <boxBufferGeometry args={[1, 16, 2]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
      <mesh position={[0, -7.5, 0]}>
        <boxBufferGeometry args={[13, 1, 2]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
      <mesh position={[0, 7.5, 0]}>
        <boxBufferGeometry args={[13, 1, 2]} />
        <meshPhongMaterial
          attach="material"
          side={Three.DoubleSide}
          color={"black"}
        />
      </mesh>
    </mesh>
  );
};

export default PictureHolder;
