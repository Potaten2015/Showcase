import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { Box } from "../../Shapes";
import * as Three from "three";
import PictureHolder from "./PictureHolder";
import SpinningIcon from "./SpinningIcon";
import HtmlIcon from "../../../resources/Icon/iconfinder_10-html5_104494.svg";
import CssIcon from "../../../resources/Icon/iconfinder_26_1784540.svg";
import JsIcon from "../../../resources/Icon/iconfinder_187_Js_logo_logos_4373691.svg";
import GithubIcon from "../../../resources/Icon/iconfinder_github_1220319.svg";
import JavaIcon from "../../../resources/Icon/iconfinder_java_4691382.svg";
import PythonIcon from "../../../resources/Icon/iconfinder_python_4691213.svg";
import VsIcon from "../../../resources/Icon/iconfinder_Visual_Studio_1378056.svg";
import EclipseIcon from "../../../resources/Icon/icons8-java-eclipse (2).svg";
import ExpressIcon from "../../../resources/Icon/express-js-seeklogo.com.svg";
import PostgresIcon from "../../../resources/Icon/icons8-postgresql.svg";
import SolidworksIcon from "../../../resources/Icon/solidworks.svg";
import MatlabIcon from "../../../resources/Icon/matlab-seeklogo.com.svg";
import SequelizeIcon from "../../../resources/Icon/10223313071580802969.svg";

const BioWall = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry attach="geometry" args={[28, 40, 4]} />
      <meshPhongMaterial
        attach="material"
        side={Three.DoubleSide}
        color={"white"}
      />
      <PictureHolder position={[8, 11, -2.1]} />
      <SpinningIcon
        url={HtmlIcon}
        shape-position={[-8.7, 13.6, -3.2]}
        scale={[0.06, 0.06, 0.06]}
        limit={-0.2}
        moving={true}
      />
      <SpinningIcon
        url={JsIcon}
        shape-position={[1.2, 19, -3.2]}
        scale={[0.01, 0.01, 0.01]}
        groupMoving={true}
      />
      <SpinningIcon
        url={GithubIcon}
        shape-position={[-8.8, 1.2, -3.2]}
        scale={[0.005, 0.005, 0.005]}
        moving={true}
      />
      <SpinningIcon
        url={JavaIcon}
        shape-position={[-9, 17, -3.2]}
        scale={[0.12, 0.12, 0.1]}
        moving={true}
      />
      <SpinningIcon
        url={PythonIcon}
        shape-position={[-0.6, 13, -3.2]}
        scale={[0.1, 0.1, 0.1]}
        groupMoving={true}
      />
      <SpinningIcon
        url={VsIcon}
        shape-position={[-5.2, 13, -3.2]}
        scale={[0.002, 0.002, 0.002]}
        moving={true}
      />
      <SpinningIcon
        url={EclipseIcon}
        shape-position={[0, 9.5, -3.2]}
        scale={[0.07, 0.07, 0.07]}
        moving={true}
      />
      <SpinningIcon
        url={CssIcon}
        shape-position={[-4.5, 9.3, -3.2]}
        scale={[0.006, 0.006, 0.006]}
        limit={-0.0001}
        groupMoving={true}
      />
      <SpinningIcon
        url={ExpressIcon}
        shape-position={[0.2, 6, -3.2]}
        scale={[0.07, 0.07, 0.07]}
        limit={-0.0001}
        moving={true}
      />
      <SpinningIcon
        url={PostgresIcon}
        shape-position={[-8.3, 9.4, -3.2]}
        scale={[0.07, 0.07, 0.07]}
        limit={-0.0001}
        groupMoving={true}
      />
      <SpinningIcon
        url={MatlabIcon}
        shape-position={[-8.8, 5.2, -3.2]}
        scale={[0.07, 0.07, 0.07]}
        limit={-0.0001}
        moving={true}
      />
      <SpinningIcon
        url={SequelizeIcon}
        shape-position={[-5, 17, -3.2]}
        scale={[0.02, 0.02, 0.02]}
        limit={-0.0001}
        groupMoving={true}
      />
    </mesh>
  );
};

export default BioWall;
