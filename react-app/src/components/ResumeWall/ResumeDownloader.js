import React, { useRef, useState } from "react";
import { applyProps, useFrame, useLoader } from "react-three-fiber";
import { Box } from "../Shapes";
import * as Three from "../../../node_modules/three/build/three";
import { TextButton, TextStandard } from "../TextGeometry";

const ResumeDownloader = (props) => {
  const [docxHovered, setDocxHovered] = useState(false);
  const [pdfHovered, setPdfHovered] = useState(false);

  return (
    <mesh
      onPointerEnter={props.onPointerEnter}
      onPointerLeave={props.onPointerLeave}
      onPointerMissed={props.onPointerMissed}
      onClick={props.onClick}
      position={props.position}>
      <boxBufferGeometry attach="geometry" args={[20, 1.5, 0]} />
      <meshPhongMaterial
        attach="material"
        transparent={true}
        opacity={props.opacity ? props.opacity : 0.3}
        color={props.backColor ? props.backColor : "white"}
      />
      <TextStandard
        color={"black"}
        text={"Click below to download resume"}
        position={[-9, -0.5, 0]}
        size={1}
        thickness={0.1}
        font={props.font}
      />

      <TextButton
        onPointerEnter={(e) => setPdfHovered(true)}
        onPointerLeave={(e) => setPdfHovered(false)}
        onClick={(e) => {}}
        font={props.font}
        size={0.9}
        thickness={0.1}
        position={[-4, -2, 0]}
        text={"PDF"}
        color={pdfHovered ? "black" : "white"}
        backDropX={0}
        backDropHeight={1.3}
        backDropOpacity={0}
        backDropY={0.1}
      />
      <TextButton
        onPointerEnter={(e) => setDocxHovered(true)}
        onPointerLeave={(e) => setDocxHovered(false)}
        onClick={(e) => {}}
        font={props.font}
        size={0.9}
        thickness={0.1}
        position={[3, -2, 0]}
        text={"DOCX"}
        color={docxHovered ? "black" : "white"}
        backDropX={0.5}
        backDropHeight={1.3}
        backDropOpacity={0}
        backDropY={0.1}
      />
    </mesh>
  );
};

export default ResumeDownloader;
