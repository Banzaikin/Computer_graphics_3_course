import { useEffect, useState } from "react";
import regimes from "../constants/regimes";
import If from "../views/If/If";
import MenuMirror from "../components/MenuMirror/MenuMirror";
import constants from "../constants/constants";
import min from "../functions/min";
import max from "../functions/max";
import DrawMirror from "../components/DrawMirror/DrawMirror";

/** Создание компонентов меню и отрисовки для трансформирования */
const useMirror = (
  regime,
  distance,
  groupPoints,
  groupPointsChange,
  params
) => {
  const [transformationCords, transformationCordsChange] = useState({
    ...constants.transformationCords,
  });
  const [baseTransformationCords, baseTransformationCordsChange] = useState({
    ...constants.transformationCords,
  });

  const setTransformationCords = (p) => {
    const transformationCords = {
      minx: min(p, (point) => point.x),
      miny: min(p, (point) => point.y),
      minz: min(p, (point) => point.z),
      maxx: max(p, (point) => point.x),
      maxy: max(p, (point) => point.y),
      maxz: max(p, (point) => point.z),
    };
    transformationCordsChange(transformationCords);
    baseTransformationCordsChange(transformationCords);
  };

  const draw = (
    <If value={regime === regimes.groupMirror}>
      <DrawMirror
        baseCords={baseTransformationCords}
        cords={transformationCords}
        points={groupPoints}
        params={params}
      />
    </If>
  );

  const menu = (
    <If value={regime === regimes.groupMirror}>
      <MenuMirror
        step={Math.round(distance) / 100}
        baseCords={baseTransformationCords}
        cords={transformationCords}
        cordsChange={transformationCordsChange}
        groupPoints={groupPoints}
        groupPointsChange={groupPointsChange}
        setTransformationCords={setTransformationCords}
      />
    </If>
  );

  const reset = () => {
    transformationCordsChange({
      ...constants.transformationCords,
    });
    baseTransformationCordsChange({
      ...constants.transformationCords,
    });
  };

  useEffect(() => {
    if (regime === regimes.groupMirror) {
      setTransformationCords(groupPoints);
    }
  }, [regime]);

  return [draw, menu, reset];
};

export default useMirror;
