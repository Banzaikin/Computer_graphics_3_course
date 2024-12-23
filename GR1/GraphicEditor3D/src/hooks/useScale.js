import { useState } from "react";
import regimes from "../constants/regimes";
import If from "../views/If/If";
import MenuScale from "../components/MenuScale/MenuScale";
import constants from "../constants/constants";
import DrawScale from "../components/DrawScale/DrawScale";

/** Создание компонентов меню и отрисовки для масштабирования */
const useScale = (
  regime,
  distance,
  groupPoints,
  groupPointsChange,
  params
) => {
  const [shift, shiftChange] = useState({ ...constants.shiftScale });

  const menu = (
    <If value={regime === regimes.groupScale}>
      <MenuScale
        shift={shift}
        shiftChange={shiftChange}
        groupPoints={groupPoints}
        groupPointsChange={groupPointsChange}
        step={Math.round(distance) / 100}
      />
    </If>
  );

  const draw = (
    <If value={regime === regimes.groupScale}>
      <DrawScale points={groupPoints} shift={shift} params={params} />
    </If>
  );

  const reset = () => {
    shiftChange({ ...constants.shiftScale });
  };

  return [draw, menu, reset];
};

export default useScale;
