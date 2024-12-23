import React from "react";
import DrawPoint from "../DrawPoint/DrawPoint";
import getComplex from "../../functions/getComplex";

const DrawPoints = ({ points, params }) => {
  const complex = getComplex(params);
  return points.map((point, index) => (
    <DrawPoint key={index} point={point} complex={complex} />
  ));
};

export default DrawPoints;
