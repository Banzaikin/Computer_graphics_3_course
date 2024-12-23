import { useState } from "react";
import regimes from "../constants/regimes";
import If from "../views/If/If";
import MenuMoving from "../components/MenuMoving/MenuMoving";
import constants from "../constants/constants";
import DrawMoving from "../components/DrawMoving/DrawMoving";

/** Создание компонентов меню и отрисовки для перемещения */
const useMoving = (
  regime,
  distance,
  groupPoints,
  groupPointsChange,
  params
) => {
  const [shift, shiftChange] = useState({ ...constants.shiftDefault });

  const menu = (
    <If value={regime === regimes.groupMoving}>
      <MenuMoving
        shift={shift}
        shiftChange={shiftChange}
        groupPoints={groupPoints}
        groupPointsChange={groupPointsChange}
        step={Math.round(distance) / 100}
      />
    </If>
  );

  const draw = (
    <If value={regime === regimes.groupMoving}>
      <DrawMoving points={groupPoints} shift={shift} params={params} />
    </If>
  );

  const reset = () => {
    shiftChange({ ...constants.shiftDefault });
  };

  return [draw, menu, reset];
};

export default useMoving;
