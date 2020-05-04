import React from "react";

const infoLabel = props => {
  return (
    <div
      style={{
        padding: "10px",
        textAlign: "center"
      }}
    >
      <b>{props.label}</b>: {props.value} {props.appendix && props.appendix}
    </div>
  );
};

export default infoLabel;
