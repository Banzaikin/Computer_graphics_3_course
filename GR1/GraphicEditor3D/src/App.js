import { Layer, Stage } from "react-konva";
import { useEffect, useState } from "react";
import DrawPoints from "./components/DrawPoints/DrawPoints";
import constants from "./constants/constants";
import regimes from "./constants/regimes";
import RegimeButtons from "./views/RegimeButtons/RegimeButtons";
import pointRegimes from "./constants/pointRegimes";
import DrawSticks from "./components/DrawSticks/DrawSticks";
import { Context } from "./context/context";
import useMirror from "./hooks/useMirror";
import useRotation from "./hooks/useRotation";
import useMoving from "./hooks/useMoving";
import useScale from "./hooks/useScale";
import useAddPoint from "./hooks/useAddPoint";
import WorkWithPoints from "./functions/WorkWithPoints";
import classes from "./App.module.css";
import DrawFloor from "./components/DrawFloor/DrawFloor";

let firstPointAddedStick = null; // Первая точка при добавлении линии
let highlightedPoint = null; // Подсвеченная точка
let highlightedStick = null; // Подсвеченная линия

const App = () => {
  const headerHeight = constants.headerHeight; // Высота шапки
  const headerPadding = constants.headerPadding; // Внутренние отступы в шапке
  const widthMenu = constants.widthMenu; // Ширина бокового меню
  const getWidth = (windowWidth) => windowWidth - widthMenu; // Ширина рабочей области
  const getHeight = (windowHeight) => windowHeight - headerHeight; // Высота рабочей области

  const [width, widthChange] = useState(getWidth(window.innerWidth)); // Ширина экрана
  const [height, heightChange] = useState(getHeight(window.innerHeight)); // Высота экрана
  const [angleX, angleXChange] = useState(constants.angleXDefault); // Угол вокруг оси X
  const [angleY, angleYChange] = useState(constants.angleYDefault); // Угол вокруг оси Y
  const [distance, distanceChange] = useState(constants.distanceDefault); // Растояние от центра координат до камеры для общего масштабирования
  const [size, sizeChange] = useState(constants.size); // расстояние от центра координат до камеры

  const [points, pointsChange] = useState([...constants.pointsDefault]); // Точки
  const [sticks, sticksChange] = useState([...constants.sticksDefault]); // Палки
  const [regime, regimeChange] = useState(constants.regimeDefault); // Режим работы
  const [groupPoints, groupPointsChange] = useState([
    ...constants.groupPointsDefault,
  ]); // Группа точек

  const headerStyle = {
    height: `${headerHeight - 2 * headerPadding}px`,
    padding: `${headerPadding}px`,
  };

  const menuStyle = {
    width: `${widthMenu}px`,
  };

  /** При изменении размера экрана */
  window.addEventListener("resize", () => {
    widthChange(getWidth(window.innerWidth));
    heightChange(getHeight(window.innerHeight));
  });

  /** Параметры для получения комплексной матрицы */
  const params = {
    angleX: angleX,
    angleY: angleY,
    distance: distance,
    size: size,
  };

  const [DrawAddPoint, MenuAddPoint, resetAddPoint] = useAddPoint(
    regime,
    distance,
    points,
    pointsChange,
    params
  );

  const [DrawMoving, MenuMoving, resetMoving] = useMoving(
    regime,
    distance,
    groupPoints,
    groupPointsChange,
    params
  );

  const [DrawRotation, MenuRotation, resetRotation] = useRotation(
    regime,
    distance,
    groupPoints,
    groupPointsChange,
    params
  );

  const [DrawMirror, MenuMirror, resetMirror] = useMirror(
    regime,
    distance,
    groupPoints,
    groupPointsChange,
    params
  );

  const [DrawScale, MenuScale, resetScale] = useScale(
    regime,
    distance,
    groupPoints,
    groupPointsChange,
    params
  )

  const worker = new WorkWithPoints(
    points,
    pointsChange,
    sticks,
    sticksChange,
    params,
    angleX,
    angleY,
    angleXChange,
    angleYChange,
    width,
    height,
    firstPointAddedStick,
    (v) => {
      firstPointAddedStick = v;
    },  
    highlightedPoint,
    (v) => {
      highlightedPoint = v;
    },
    highlightedStick,
    (v) => {
      highlightedStick = v;
    },
    groupPoints,
    groupPointsChange
  );

  /** При нажатии */
  const onMouseDown = (e) => {
    const button = e.evt.button;
    if (button === 0) {
      if (regime === regimes.totalRotation) worker.totalRotation(e);
      if (regime === regimes.addStick) worker.addStick(e);
      if (regime === regimes.delete) worker.deletePointOrStick(e);
      if (regime === regimes.group) worker.addGroup(e);
    } else if (button === 1) {
      worker.totalRotation(e);
    } else if (button === 2) {
      worker.totalRotation(e);
    }
  };

  /** Перемещение мыши */
  const onMouseMove = (e) => {
    if (regime === regimes.addStick) worker.highlightPoint(e);
    if (regime === regimes.delete) worker.highlightPointOrStick(e);
  };

  /** При кручении колесика */
  const onWheel = (e) => {
    const isRightButtonPressed = e.evt.buttons === 2; // Проверяем, была ли нажата правая кнопка мыши

    if (isRightButtonPressed) {
      // Если нажата ПКМ, изменяем size
      if (e.evt.deltaY < 0) {
        sizeChange(size * 0.9);  // Увеличиваем размер
      } else if (e.evt.deltaY > 0) {
        sizeChange(size / 0.9);  // Уменьшаем размер
      }
    } else {
      // Если не нажата ПКМ, изменяем distance
      if (e.evt.deltaY < 0) {
        distanceChange(distance * 0.9);
      } else if (e.evt.deltaY > 0) {
        distanceChange(distance / 0.9);
      }
    }
  };

  /** Действия при переключении режима */
  useEffect(() => {
    if (regime !== regimes.addStick && firstPointAddedStick !== null) {
      firstPointAddedStick.deleteRegime(pointRegimes.addedStick);
      firstPointAddedStick = null;
      pointsChange([...points]);
    }
    if (regime !== regimes.groupMoving) resetMoving();
    if (regime !== regimes.groupRotation) resetRotation();
    if (regime !== regimes.groupMirror) resetMirror();
    if (regime !== regimes.groupScale) resetScale();
  }, [regime]);

  const reset = () => {
    regimeChange(constants.regimeDefault);
    angleXChange(constants.angleXDefault);
    angleYChange(constants.angleYDefault);
    distanceChange(constants.distanceDefault);
    sizeChange(constants.size);
    pointsChange([...constants.pointsDefault]);
    sticksChange([...constants.sticksDefault]);
    groupPointsChange([...constants.groupPointsDefault]);

    resetAddPoint();
    resetMoving();
    resetRotation();
    resetMirror();
    resetScale();
  };

  return (
    <div>
      <Context.Provider
        value={{
          centerX: width / 2,
          centerY: height / 2,
          width: width,
          height: height,
        }}
      >
        <div className={classes.header} style={headerStyle}>
          <div>
            <div style={{ display: "flex" }}>

              <RegimeButtons
                regime={regime}
                regimeChange={regimeChange}
                points={points}
                pointsChange={pointsChange}
                sticks={sticks}
                sticksChange={sticksChange}
                reset={reset}
                height={headerHeight}
                padding={headerPadding}
              />
              <div
                  style={{
                    marginTop: "7px",
                    marginLeft: "20px", // Отступ от кнопок
                    fontSize: "18px"
                  }}
              >
                {regime}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <Stage
            width={width}
            height={height}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onWheel={onWheel}
            style={{ background: "#ccddff" }}
          >
            <Layer>
              <DrawFloor params={params} />
              <DrawSticks
                sticks={constants.axes}
                params={params}
                infinity={true}
              />
              <DrawSticks sticks={sticks} params={params} />
              <DrawPoints points={points} params={params} />
              {DrawAddPoint}
              {DrawMoving}
              {DrawRotation}
              {DrawMirror}
              {DrawScale}
            </Layer>
          </Stage>
          <div className={classes.menu} style={menuStyle}>
            {MenuAddPoint}
            {MenuMoving}
            {MenuRotation}
            {MenuMirror}
            {MenuScale}
          </div>
        </div>
      </Context.Provider>
    </div>
  );
};

export default App;
