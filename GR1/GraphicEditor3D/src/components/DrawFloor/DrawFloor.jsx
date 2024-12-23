import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-konva";
import getComplex from "../../functions/getComplex";
import constants from "../../constants/constants";
import { Context } from "../../context/context";

const DrawFloor = ({ params }) => {
  const { width, height } = useContext(Context);
  const [floorCord, floorCordChange] = useState([]);

  /** Найти индекс минимального элемента */
  const minIndex = (arr) => {
    let m = 0;
    for (let i = 1; i < arr.length; ++i) if (arr[m] > arr[i]) m = i;
    return m;
  };

  useEffect(() => {
    const complex = getComplex(params); // Комплексная матрица
    // Все оси кроме Y
    const axes = [
      constants.axes[0],
      constants.axes[2],
      constants.axes[3],
      constants.axes[5],
    ];

    let matrices = axes.map((axis) => axis.last.getMatrixInfinity(complex)); // Найти матрицы для концов каждой из осей
    const minZIndex = minIndex(matrices.map((a) => a[2])); // Индекс элемента с минимальным Z
    let h = height / 2 - matrices[minZIndex][1]; // Найти высоту пола

    // Если ось Y спотрит на верх, то пол снизу, в противном случае сверху
    if (constants.axes[1].last.getMatrix(complex)[1] > 0) {
      floorCordChange([0, h, width, h, width, height, 0, height]);
    } else {
      floorCordChange([0, 0, width, 0, width, h, 0, h]);
    }
  }, [params]);

  return (
    <Line
      points={floorCord}
      fill={"#5cb923"}
      stroke={"#5cb923"}
      strokeWidth={0}
      closed={true}
    />
  );
};

export default DrawFloor;
