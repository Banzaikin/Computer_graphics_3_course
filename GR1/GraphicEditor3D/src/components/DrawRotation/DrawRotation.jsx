import React, { useEffect, useState } from "react";
import DrawPoints from "../DrawPoints/DrawPoints";
import pointRegimes from "../../constants/pointRegimes";
import Stick from "../../entities/Stick";
import stickRegimes from "../../constants/stickRegimes";
import Point from "../../entities/Point";
import DrawSticks from "../DrawSticks/DrawSticks";

const DrawRotation = ({ points, angles, turningPoint, params }) => {
  const [newPoints, newPointsChange] = useState([]);
  const [axes, axesChange] = useState([]);

  useEffect(() => {
    let p = points.map((p) => {
      let newP = p.clone();
      newP.x -= turningPoint.x;
      newP.y -= turningPoint.y;
      newP.z -= turningPoint.z;
      newP.rotate(angles.x, angles.y, angles.z);
      newP.x += turningPoint.x;
      newP.y += turningPoint.y;
      newP.z += turningPoint.z;
      newP.regimes = [pointRegimes.moving];
      return newP;
    });
    newPointsChange(p);
  }, [angles]);

  useEffect(() => {
    axesChange([
      new Stick(turningPoint, new Point(1, 0, 0), stickRegimes.turningAxes),
      new Stick(turningPoint, new Point(0, 1, 0), stickRegimes.turningAxes),
      new Stick(turningPoint, new Point(0, 0, 1), stickRegimes.turningAxes),
      new Stick(turningPoint, new Point(-1, 0, 0), stickRegimes.turningAxes),
      new Stick(turningPoint, new Point(0, -1, 0), stickRegimes.turningAxes),
      new Stick(turningPoint, new Point(0, 0, -1), stickRegimes.turningAxes),
    ]);
  }, [turningPoint]);

  return (
    <>
      <DrawSticks sticks={axes} params={params} infinity={true} />
      <DrawPoints points={newPoints} params={params} />
    </>
  );
};

export default DrawRotation;
