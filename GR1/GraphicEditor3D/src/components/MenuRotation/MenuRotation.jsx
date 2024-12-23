import React from "react";
import InputNumber from "../../views/InputNumber/InputNumber";
import constants from "../../constants/constants";
import Bold from "../../views/Bold/Bold";

const MenuRotation = ({
  step,
  turningPoint,
  turningPointChange,
  angles,
  anglesChange,
  groupPoints,
  groupPointsChange,
}) => {
  const returnStart = () => {
    turningPointChange(constants.turningPointDefault);
  };

  const apply = () => {
    let oldAngles = angles;
    let newAngles = { ...constants.shiftDefault };
    let newGroupPoints = groupPoints.map((p) => {
      p.x -= turningPoint.x;
      p.y -= turningPoint.y;
      p.z -= turningPoint.z;
      p.rotate(oldAngles.x, oldAngles.y, oldAngles.z);
      p.x += turningPoint.x;
      p.y += turningPoint.y;
      p.z += turningPoint.z;
      return p;
    });
    groupPointsChange(newGroupPoints);
    anglesChange(newAngles);
  };

  const cancel = () => {
    anglesChange({ ...constants.angles });
  };

  return (
    <div>
      <Bold>
        <span style={{ color: "#30ff01" }}>Вращение группы</span>
      </Bold>
      <Bold>
        <span style={{ color: "#30ff01" }}>Точка поворота</span>
      </Bold>
      <InputNumber
        text={"X"}
        step={step}
        value={turningPoint.x}
        valueChange={(value) => {
          let newt = turningPoint.clone();
          newt.x = value;
          turningPointChange(newt);
        }}
      />
      <InputNumber
        text={"Y"}
        step={step}
        value={turningPoint.y}
        valueChange={(value) => {
          let newt = turningPoint.clone();
          newt.y = value;
          turningPointChange(newt);
        }}
      />
      <InputNumber
        text={"Z"}
        step={step}
        value={turningPoint.z}
        valueChange={(value) => {
          let newt = turningPoint.clone();
          newt.z = value;
          turningPointChange(newt);
        }}
      />
      <button onClick={returnStart}>Поставить в начало</button>
      <Bold>
        <span style={{ color: "#30ff01" }}>Угол поворота</span>
      </Bold>
      <InputNumber
        text={"Вращение вокруг X"}
        step={3}
        maxRange={60}
        value={angles.x}
        valueChange={(value) => {
          anglesChange({ ...angles, x: value });
        }}
      />
      <InputNumber
        text={"Вращение вокруг Y"}
        step={3}
        maxRange={60}
        value={angles.y}
        valueChange={(value) => {
          anglesChange({ ...angles, y: value });
        }}
      />
      <InputNumber
        text={"Вращение вокруг Z"}
        step={3}
        maxRange={60}
        value={angles.z}
        valueChange={(value) => {
          anglesChange({ ...angles, z: value });
        }}
      />
      <button onClick={apply}>Применить</button>
      <button onClick={cancel}>Отмена</button>
    </div>
  );
};

export default MenuRotation;
