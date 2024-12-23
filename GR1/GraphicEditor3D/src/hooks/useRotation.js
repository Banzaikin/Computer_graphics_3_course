import { useState } from "react";
import MenuRotation from "../components/MenuRotation/MenuRotation";
import constants from "../constants/constants";
import If from "../views/If/If";
import DrawRotation from "../components/DrawRotation/DrawRotation";
import regimes from "../constants/regimes";

/** Создание компонентов меню и отрисовки для поворота */
const useRotation = (
  regime,
  distance,
  groupPoints,
  groupPointsChange,
  params
) => {
  const [turningPoint, turningPointChange] = useState(
    constants.turningPointDefault
  );
  const [angles, anglesChange] = useState({ ...constants.angles });

  const draw = (
    <If value={regime === regimes.groupRotation}>
      <DrawRotation
        points={groupPoints}
        turningPoint={turningPoint}
        angles={angles}
        params={params}
      />
    </If>
  );

  const menu = (
    <If value={regime === regimes.groupRotation}>
      <MenuRotation
        step={Math.round(distance) / 100}
        turningPoint={turningPoint}
        turningPointChange={turningPointChange}
        angles={angles}
        anglesChange={anglesChange}
        groupPoints={groupPoints}
        groupPointsChange={groupPointsChange}
      />
    </If>
  );

  const reset = () => {
    turningPointChange(constants.turningPointDefault);
    anglesChange({ ...constants.angles });
  };

  return [draw, menu, reset];
};
export default useRotation;
