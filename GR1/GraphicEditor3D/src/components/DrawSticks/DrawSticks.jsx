import React from "react";
import getComplex from "../../functions/getComplex";
import DrawStick from "../DrawStick/DrawStick";

const DrawSticks = ({ sticks, params, infinity = false }) => {
  const complex = getComplex(params);

  return sticks.map((stick, index) => (
    <DrawStick
      key={index}
      stick={stick}
      complex={complex}
      infinity={infinity}
    />
  ));
};

export default DrawSticks;
