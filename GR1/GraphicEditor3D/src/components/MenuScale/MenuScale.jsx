import React from "react";
import InputNumber from "../../views/InputNumber/InputNumber";
import constants from "../../constants/constants";
import Bold from "../../views/Bold/Bold";

const MenuScale = ({
  shift,
  shiftChange,
  groupPoints,
  groupPointsChange,
  step,
}) => {
  const apply = () => {
    let oldShift = shift;
    let newShift = constants.shiftScale;
    shiftChange(oldShift);
    groupPointsChange(
      groupPoints.map((p) => {
        p.x *= oldShift.x;
        p.y *= oldShift.y;
        p.z *= oldShift.z;
        return p;
      })
    );
    shiftChange(newShift);
  };

  const cancel = () => {
    shiftChange(constants.shiftScale);
  };

  return (
    <div>
      <Bold>
        <span style={{ color: "#30ff01" }}>Масштабирование группы</span>
      </Bold>

      <InputNumber
        text={"X"}
        step={step}
        value={shift.x}
        valueChange={(value) => {
          shiftChange({ ...shift, x: value });
        }}
      />
      <InputNumber
        text={"Y"}
        step={step}
        value={shift.y}
        valueChange={(value) => {
          shiftChange({ ...shift, y: value });
        }}
      />
      <InputNumber
        text={"Z"}
        step={step}
        value={shift.z}
        valueChange={(value) => {
          shiftChange({ ...shift, z: value });
        }}
      />
      <button onClick={apply}>Применить</button>
      <button onClick={cancel}>Отмена</button>
    </div>
  );
};

export default MenuScale;