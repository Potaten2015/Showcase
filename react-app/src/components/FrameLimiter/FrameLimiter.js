import React from "react";
import * as Three from "../../../node_modules/three/build/three";
import { useFrame } from "react-three-fiber";

const FrameLimiter = (props) => {
  const [clock] = React.useState(new Three.Clock());

  useFrame((state) => {
    state.ready = false;
    const timeUntilNextFrame = 1000 / props.fps - clock.getDelta();

    setTimeout(() => {
      state.ready = true;
      state.invalidate();
    }, Math.max(0, timeUntilNextFrame));
  });

  return <></>;
};

export default FrameLimiter;
