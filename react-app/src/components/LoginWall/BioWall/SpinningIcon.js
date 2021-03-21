import React, { useRef, useState, useEffect, createRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../../Shapes";
import * as Three from "three";
import flatten from "lodash-es/flatten";
import texture from "../../../resources/goodPhoto.png";
import { SVGLoader } from "../../../../node_modules/three/examples/jsm/loaders/SVGLoader";
import { Group } from "three";

const SpinningIcon = (props) => {
  const photo = useLoader(Three.TextureLoader, texture);

  const [shapes, set] = useState([]);
  const loader = new SVGLoader();

  const svgResource = new Promise((resolve) =>
    loader.load(props.url, (shapes) => {
      resolve(
        flatten(
          shapes.paths.map((group, index) =>
            group.toShapes(true).map((shape) => ({
              shape,
              position: props.position,
              color: "black",
              index,
            })),
          ),
        ),
      );
    }),
  );

  const elementsRef = shapes.map(() => createRef());
  const groupRef = useRef();

  const Shape = ({ shape, position, color, opacity, index, reference }) => {
    return (
      <mesh
        position={[0, 0, 0]}
        rotation-z={Math.PI}
        scale={props.scale}
        ref={reference}>
        <meshPhongMaterial
          attach="material"
          color={color}
          side={Three.DoubleSide}
        />
        <shapeBufferGeometry attach="geometry" args={[shape]} />
      </mesh>
    );
  };

  let delta = props.moving ? -0.001 : 0;
  let groupDelta = props.groupMoving ? -0.003 : 0;
  let displacement = 0;
  let groupDisplacement = 0;
  let currentRotation = 0.01;
  let mySwitch = false;

  useEffect(() => void svgResource.then(set), []);

  return (
    <>
      <object3D
        position={props["shape-position"]}
        rotation={[Math.PI, Math.PI, Math.PI]}>
        <mesh position={[0, 0, 0]} ref={groupRef}>
          {shapes.map((item, index) => (
            <Shape
              key={item.shape.uuid}
              {...item}
              reference={elementsRef[index]}
            />
          ))}
        </mesh>
      </object3D>
    </>
  );
};

export default SpinningIcon;
