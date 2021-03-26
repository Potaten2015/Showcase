import React, { useState } from "react";
import { TextButton, TextStandard } from "../TextGeometry";

const LiveLink = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TextButton
      onPointerEnter={(e) => setHovered(true)}
      onPointerLeave={(e) => setHovered(false)}
      onClick={(e) => window.open(props.link, "_blank")}
      font={props.font}
      size={0.6}
      thickness={0.1}
      position={props.position ? props.position : [-4, -2, 0]}
      text={props.text}
      color={hovered ? "lightblue" : "white"}
      backDropX={props.backDropX ? props.backDropX : 0}
      backDropHeight={props.backDropHeight ? props.backDropHeight : 1.3}
      backDropOpacity={props.backDropOpacity ? props.backDropOpacity : null}
      backDropY={props.backDropY ? props.backDropY : 0}
      backDropWidth={props.backDropWidth ? props.backDropWidth : null}
    />
  );
};

export default LiveLink;
