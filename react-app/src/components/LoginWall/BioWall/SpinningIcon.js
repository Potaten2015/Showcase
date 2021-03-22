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
  const [hovered, setHovered] = useState(false);

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
          color={hovered ? "hotpink" : "black"}
          side={Three.DoubleSide}
        />
        <shapeBufferGeometry attach="geometry" args={[shape]} />
      </mesh>
    );
  };

  useEffect(() => void svgResource.then(set), []);

  return (
    <>
      <object3D
        position={props["shape-position"]}
        rotation={[Math.PI, Math.PI, Math.PI]}>
        <mesh
          position={[0, 0, 0]}
          ref={groupRef}
          onPointerEnter={
            props.hoverable
              ? (e) => {
                  setHovered(true);
                }
              : null
          }
          onPointerLeave={
            props.hoverable
              ? (e) => {
                  setHovered(false);
                }
              : null
          }
          onClick={
            props.hoverable ? (e) => window.open(props.link, "_blank") : null
          }>
          {shapes.map((item, index) => (
            <Shape
              key={item.shape.uuid}
              {...item}
              reference={elementsRef[index]}
            />
          ))}
          {props.hoverable && (
            <mesh
              castShadow
              receiveShadow
              onClick={props.onClick}
              position={[-1.25, -1.25, 0]}>
              <boxBufferGeometry attach="geometry" args={[2.5, 2.5, -0.01]} />
              <meshPhongMaterial
                attach="material"
                transparent={true}
                opacity={props.opacity ? props.opacity : 0.3}
                color={props.backColor ? props.backColor : "white"}
              />
            </mesh>
          )}
        </mesh>
      </object3D>
    </>
  );
};

export default SpinningIcon;
