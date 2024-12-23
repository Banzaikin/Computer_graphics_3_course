import { useState } from "react";
import regimes from "../constants/regimes";
import If from "../views/If/If";
import MenuAddPoint from "../components/MenuAddPoint/MenuAddPoint";
import constants from "../constants/constants";
import DrawAddPoint from "../components/DrawAddPoint/DrawAddPoint";

/** Создание компонентов меню и отрисовки для добавления точки */
const useAddPoint = (regime, distance, points, pointsChange, params) => {
  const [addedPoint, addedPointChange] = useState(
    constants.addedPointDefault.clone()
  ); // Добавляемая точка

  const draw = (
    <If value={regime === regimes.addPoint}>
      <DrawAddPoint point={addedPoint} params={params} />
    </If>
  );

  const menu = (
    <If value={regime === regimes.addPoint}>
      <MenuAddPoint
        addedPoint={addedPoint}
        addedPointChange={addedPointChange}
        step={Math.round(distance) / 100}
        points={points}
        pointsChange={pointsChange}
      />
    </If>
  );

  const reset = () => {
    addedPointChange(constants.addedPointDefault.clone());
  };

  return [draw, menu, reset];
};

export default useAddPoint;
