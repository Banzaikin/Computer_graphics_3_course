import Point from "../entities/Point";
import Stick from "../entities/Stick";
import pointRegimes from "./pointRegimes";
import regimes from "./regimes";
import stickRegimes from "./stickRegimes";

const constants = {
  size: 1000, // Размер рабочей области (влияет на поле зрения)
  rotatSpeed: 0.21, // Скорость вращения камеры
  headerHeight: 47, // Размер шапки
  headerPadding: 5, // Отступы у шапки
  widthMenu: 230, // Ширина меню
  angleXDefault: 45, // Угол камеры по умолчанию по X
  angleYDefault: -45, // Угол камеры по умолчанию по Y
  distanceDefault: 10, // Растояние до камеры по умолчанию (не влияет на триметрическую)
  pointsDefault: [], // Точки по умолчанию
  sticksDefault: [], // Палки по умолчанию
  addedPointDefault: new Point(0, 0, 0, pointRegimes.added), // Добавляемая точка по умолчанию
  turningPointDefault: new Point(0, 0, 0, pointRegimes.rotation), // Точка поворота по умолчанию
  regimeDefault: regimes.totalRotation, // Режим по умолчанию
  groupPointsDefault: [], // Группировка точек по умолчанию
  // Отступ по умолчанию
  shiftDefault: {
    x: 0,
    y: 0,
    z: 0,
  },
  // Отступ для масшт
  shiftScale: {
    x: 1,
    y: 1,
    z: 1,
  },
  // Углы поворота по умолчанию
  angles: {
    x: 0,
    y: 0,
    z: 0,
  },
  // Оси координат
  axes: [
    new Stick(new Point(0, 0, 0), new Point(1, 0, 0), stickRegimes.frontX),
    new Stick(new Point(0, 0, 0), new Point(0, 1, 0), stickRegimes.frontY),
    new Stick(new Point(0, 0, 0), new Point(0, 0, 1), stickRegimes.frontZ),
    new Stick(new Point(0, 0, 0), new Point(-1, 0, 0), stickRegimes.backX),
    new Stick(new Point(0, 0, 0), new Point(0, -1, 0), stickRegimes.backY),
    new Stick(new Point(0, 0, 0), new Point(0, 0, -1), stickRegimes.backZ),
  ],
};

export default constants;
