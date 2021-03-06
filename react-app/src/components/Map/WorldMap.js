import React, { useState, useEffect, useRef } from "react";
import * as Three from "../../../node_modules/three/build/three";
import img from "../../resources/Earth_8k_Disp_v001.png";
import img2 from "../../resources/Equirectangular_projection_SW.jpg";
import { useLoader } from "react-three-fiber";
import { Box, Pin } from "../Shapes/";
import { TextStandard } from "../TextGeometry";

const WorldMap = (props) => {
  const mapMesh = useRef();
  const textRef = useRef();
  const texture = useLoader(Three.TextureLoader, img);
  const texture2 = useLoader(Three.TextureLoader, img2);

  let capeTown = [-80.1918, 25.7617];
  capeTown = [(capeTown[0] / 180) * 50, (capeTown[1] / 90) * 25];

  return (
    <mesh {...props} receiveShadow castShadow ref={mapMesh}>
      <planeGeometry attach="geometry" args={[100, 50, 1000, 500]} />
      <meshPhongMaterial
        attach="material"
        // side={Three.DoubleSide}
        map={texture}
        displacementMap={texture}
        displacementScale={10}
        displacementBias={-2.3}
        emissive={"white"}
        emissiveMap={texture}
        emissiveIntensity={1}
        wireframe={true}
      />
      <mesh>
        <planeGeometry attach="geometry" args={[100, 50]} />
        <meshPhongMaterial
          attach="material"
          // side={Three.DoubleSide}
          // map={texture2}
          color="black"
          emissive={"black"}
          emissiveMap={texture}
          emissiveIntensity={1}
          // wireframe={true}
        />
      </mesh>
      <Box position={[50, 25, 2]} />
      {props.resources.geos.map((geo) => {
        return (
          <Pin
            key={`${geo.id}`}
            position={[(geo.longitude / 180) * 50, (geo.latitude / 90) * 25, 3]}
            font={props.resources.font}
            city={geo.city}
            state={geo.state}
            company={geo.company}
            isYours={
              props.session.user ? geo.user.id == props.session.user.id : null
            }
            color={
              props.session.user
                ? geo.user.id == props.session.user.id
                  ? "yellow"
                  : "blue"
                : "blue"
            }
          />
        );
      })}
      {props.resources.gotLocation && !props.loginFormTools.loggedIn && (
        <Pin
          position={[
            (props.resources.location.longitude / 180) * 50,
            (props.resources.location.latitude / 90) * 25,
            3,
          ]}
          font={props.resources.font}
          city={props.resources.location.city || ""}
          state={props.resources.location.state || ""}
          company={props.resources.location.company || ""}
          color={"yellow"}
          isYours={true}
        />
      )}
      <mesh position={[-30, -10, 3]} rotation-x={Math.PI / 2}>
        <boxBufferGeometry attach="geometry" args={[10, 0.1, 10]} />
        <meshPhongMaterial attach="material" color={"black"} />
        <mesh position={[-4.8, 0, -3]}>
          <TextStandard
            rotation-x={-Math.PI / 2}
            font={props.resources.font}
            size={0.8}
            thickness={0.1}
            text={`Hover over pins for
more visitor info.
Yours is yellow (if
you allowed location
access)`}
          />
        </mesh>
      </mesh>
    </mesh>
  );
};

export default WorldMap;
