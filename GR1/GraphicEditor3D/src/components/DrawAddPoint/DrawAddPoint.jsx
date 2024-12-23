import React, { useEffect, useState } from "react";
import DrawPoint from "../DrawPoint/DrawPoint";
import getComplex from "../../functions/getComplex";
import Stick from "../../entities/Stick";
import stickRegimes from "../../constants/stickRegimes";
import Point from "../../entities/Point";
import DrawSticks from "../DrawSticks/DrawSticks";

const DrawAddPoint = ({ point, params }) => {
  const complex = getComplex(params);
  const [lines, linesChange] = useState([]);

  useEffect(() => {
    const px = new Point(0, point.y, point.z);
    const py = new Point(point.x, 0, point.z);
    const pz = new Point(point.x, point.y, 0);
    linesChange([
      new Stick(point, px, stickRegimes.addedPointFrame),
      new Stick(px, new Point(0, point.y, 0), stickRegimes.addedPointFrame),
      new Stick(px, new Point(0, 0, point.z), stickRegimes.addedPointFrame),
      new Stick(point, py, stickRegimes.addedPointFrame),
      new Stick(py, new Point(point.x, 0, 0), stickRegimes.addedPointFrame),
      new Stick(py, new Point(0, 0, point.z), stickRegimes.addedPointFrame),
      new Stick(point, pz, stickRegimes.addedPointFrame),
      new Stick(pz, new Point(0, point.y, 0), stickRegimes.addedPointFrame),
      new Stick(pz, new Point(point.x, 0, 0), stickRegimes.addedPointFrame),
    ]);
  }, [params]);

  return (
    <>
      <DrawSticks sticks={lines} params={params} />
      <DrawPoint point={point} complex={complex} />
    </>
  );
};

export default DrawAddPoint;
