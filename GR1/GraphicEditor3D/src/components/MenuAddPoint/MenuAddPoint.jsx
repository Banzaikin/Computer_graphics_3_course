import React from "react";
import InputNumber from "../../views/InputNumber/InputNumber";
import Point from "../../entities/Point";
import pointRegimes from "../../constants/pointRegimes";
import Bold from "../../views/Bold/Bold";

const MenuAddPoint = ({
  addedPoint,
  addedPointChange,
  step,
  points,
  pointsChange,
}) => {
  const reset = () => {
    addedPointChange(new Point(0, 0, 0, pointRegimes.added));
  };

  const add = () => {
    let p = addedPoint.clone();
    for (let i = 0; i < points.length; i++)
      if (points[i].x === p.x && points[i].y === p.y && points[i].z === p.z)
        return;

    p.regimes = [pointRegimes.standart];
    pointsChange([...points, p]);
  };

  return (
    <div>
      <Bold>
        <span style={{ color: "#30ff01" }}>Добавление точки</span>
      </Bold>
      <InputNumber
        text={"X"}
        value={addedPoint.x}
        step={step}
        valueChange={(value) => {
          let clone = addedPoint.clone();
          clone.x = value;
          addedPointChange(clone);
        }}
      />
      <InputNumber
        text={"Y"}
        value={addedPoint.y}
        step={step}
        valueChange={(value) => {
          let clone = addedPoint.clone();
          clone.y = value;
          addedPointChange(clone);
        }}
      />
      <InputNumber
        text={"Z"}
        value={addedPoint.z}
        step={step}
        valueChange={(value) => {
          let clone = addedPoint.clone();
          clone.z = value;
          addedPointChange(clone);
        }}
      />
      <button onClick={add}>Добавить</button>
      <button onClick={reset}>Обнулить</button>
    </div>
  );
};

export default MenuAddPoint;
