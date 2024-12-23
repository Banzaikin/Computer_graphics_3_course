import React, { useContext } from "react";
import { Circle } from "react-konva";
import { Context } from "../../context/context";

const DrawPoint = ({ point, complex }) => {
  const { centerX, centerY } = useContext(Context);
  const matrix = point.getMatrix(complex);
  const regime = point.getRegime();
  
  return (
    matrix.at(-1) > 0 && (
      <Circle
        x={centerX + matrix[0]}
        y={centerY - matrix[1]}
        stroke={regime.stroke}
        radius={regime.radius}
        fill={regime.fill}
        strokeWidth={regime.strokeWidth}
      />
    )
  );
};

export default DrawPoint;
