import React, { useContext } from "react";
import { Line } from "react-konva";
import { Context } from "../../context/context";
import realStickCords from "../../functions/realStickCords";

const DrawStick = ({ stick, complex, infinity = false }) => {
  const { width, height } = useContext(Context);
  let firstMatrix = stick.first.getMatrix(complex);
  let lastMatrix;
  if (infinity) lastMatrix = stick.last.getMatrixInfinity(complex);
  else lastMatrix = stick.last.getMatrix(complex);
  const points = realStickCords(firstMatrix, lastMatrix, width, height);
  const regime = stick.getRegime();

  return (
    <Line
      points={points}
      stroke={regime.color}
      strokeWidth={regime.width}
      dash={regime.dash}
    />
  );
};

export default DrawStick;
