import constants from "../constants/constants";
import pointRegimes from "../constants/pointRegimes";
import stickRegimes from "../constants/stickRegimes";
import Stick from "../entities/Stick";
import getComplex from "./getComplex";

/** Функции для работы с точками */
class WorkWithPoints {
  constructor(
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
    firstPointAddedStickChange,
    highlightedPoint,
    highlightedPointChange,
    highlightedStick,
    highlightedStickChange,
    groupPoints,
    groupPointsChange
  ) {
    this.points = points;
    this.pointsChange = pointsChange;
    this.sticks = sticks;
    this.sticksChange = sticksChange;
    this.params = params;
    this.angleX = angleX;
    this.angleY = angleY;
    this.angleXChange = angleXChange;
    this.angleYChange = angleYChange;
    this.width = width;
    this.height = height;
    this.firstPointAddedStick = firstPointAddedStick;
    this.firstPointAddedStickChange = firstPointAddedStickChange;
    this.highlightedPoint = highlightedPoint;
    this.highlightedPointChange = highlightedPointChange;
    this.highlightedStick = highlightedStick;
    this.highlightedStickChange = highlightedStickChange;
    this.groupPoints = groupPoints;
    this.groupPointsChange = groupPointsChange;

    /** Удалить точку */
    this.deletePoint = (point) => {
      if (firstPointAddedStick === point) firstPointAddedStickChange(null);
      if (highlightedPoint === point) highlightedPointChange(null);
      groupPointsChange(groupPoints.filter((p) => p !== point));
      sticksChange(sticks.filter((s) => s.first !== point && s.last !== point));
      pointsChange(points.filter((p) => p !== point));
    };

    /** Удалить прямую */
    this.deleteStick = (stick) => {
      sticksChange(sticks.filter((s) => s !== stick));
    };
  }

  /** Вращение всей сцены */
  totalRotation(e) {
    const x = e.evt.clientX;
    const y = e.evt.clientY;

    const startAngleX = this.angleX;
    const startAngleY = this.angleY;

    document.onmousemove = (e) => {
      this.angleXChange(constants.rotatSpeed * (e.clientY - y) + startAngleX);
      this.angleYChange(constants.rotatSpeed * (e.clientX - x) + startAngleY);
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  /** Добавить палку */
  addStick(e) {
    const x = e.evt.layerX;
    const y = e.evt.layerY;

    let near = this.getPointNear(x, y);
    // Если рядом нет точки, то ничего не делать
    if (near === null) return;
    // Если точка первая
    if (this.firstPointAddedStick === null) {
      near.regimes.push(pointRegimes.addedStick);
      this.firstPointAddedStickChange(near);
    }
    // Убрать точку при повторном нажатии
    else if (this.firstPointAddedStick === near) {
      this.firstPointAddedStick.regimes = [
        this.firstPointAddedStick.regimes[0],
        pointRegimes.backlit,
      ];
      this.highlightedPointChange(this.firstPointAddedStick);
      this.firstPointAddedStickChange(null);
    }
    // Нажатие на другую точку
    else {
      const newStick = new Stick(
        this.firstPointAddedStick,
        near,
        stickRegimes.standart
      );

      // Если линии между точками нет, то добавить ее
      if (!this.sticks.some((s) => s.equivalPoint(newStick)))
        this.sticksChange([...this.sticks, newStick]);

      this.firstPointAddedStick.regimes = [
        this.firstPointAddedStick.regimes[0],
      ];
      this.firstPointAddedStickChange(null);
    }

    this.pointsChange([...this.points]);
  }

  /** Подсветить точку при наведении */
  highlightPoint(e) {
    const x = e.evt.layerX;
    const y = e.evt.layerY;
    /** Подсветить точку при наведении */
    const pointsThatCanBeHighlighted = new Set([
      pointRegimes.standart,
      pointRegimes.group,
    ]);

    let near = this.getPointNear(x, y);

    // Если мышь уже на этой точке, то ничего не делать
    if (near === this.highlightedPoint) return;

    // Если была подсвеченная точка, то убрать у нее свет
    if (this.highlightedPoint !== null) {
      this.highlightedPoint.deleteRegime(pointRegimes.backlit);
      this.highlightedPointChange(null);
    }

    // Если рядом точка, которая может быть подсвечена
    if (near !== null && pointsThatCanBeHighlighted.has(near.getRegime())) {
      near.regimes.push(pointRegimes.backlit);
      this.highlightedPointChange(near);
    }

    this.pointsChange([...this.points]);
  }

  /** Подсветить точку или линию при наведении */
  highlightPointOrStick(e) {
    const x = e.evt.layerX;
    const y = e.evt.layerY;

    const pointsThatCanBeHighlighted = new Set([
      pointRegimes.standart,
      pointRegimes.group,
    ]);

    let pointNear = this.getPointNear(x, y);
    let stickNear = this.getStickNear(x, y);

    // Если мышь уже на этой точке, то ничего не делать
    if (pointNear === this.highlightedPoint && pointNear !== null) return;

    // Если была подсвеченная точка, то убрать у нее свет
    if (this.highlightedPoint !== null) {
      this.highlightedPoint.deleteRegime(pointRegimes.backlit);
      this.highlightedPointChange(null);
    }

    // Если была подсвеченная точка, то убрать у нее свет
    if (this.highlightedStick !== null) {
      this.highlightedStick.deleteRegime(stickRegimes.backlit);
      this.highlightedStickChange(null);
    }

    // Если рядом точка, которая может быть подсвечена
    if (
      pointNear !== null &&
      pointsThatCanBeHighlighted.has(pointNear.getRegime())
    ) {
      pointNear.regimes.push(pointRegimes.backlit);
      this.highlightedPointChange(pointNear);
      if (this.highlightedStick !== null) {
        stickNear.deleteRegime(stickRegimes.backlit);
        this.highlightedStickChange(null);
      }
    } else if (stickNear !== null) {
      stickNear.regimes.push(stickRegimes.backlit);
      this.highlightedStickChange(stickNear);
    }

    this.pointsChange([...this.points]);
    this.sticksChange([...this.sticks]);
  }

  /** Удалить точку или палку */
  deletePointOrStick(e) {
    const x = e.evt.layerX;
    const y = e.evt.layerY;

    // Если есть точка рядом, то удалить
    let pointNear = this.getPointNear(x, y);
    if (pointNear !== null) {
      this.deletePoint(pointNear);
      return;
    }

    // Если есть палка рядом, то удалить
    let sn = this.getStickNear(x, y);
    if (sn !== null) {
      this.deleteStick(sn);
    }
  }

  /** Добавить элемент в группу */
  addGroup(e) {
    const x = e.evt.layerX;
    const y = e.evt.layerY;

    let pointNear = this.getPointNear(x, y);
    if (pointNear === null) return;
    // Если элемент уже есть в группе, то убрать из группы
    if (this.groupPoints.indexOf(pointNear) !== -1) {
      pointNear.regimes = [pointRegimes.standart];
      this.groupPointsChange(this.groupPoints.filter((p) => p !== pointNear));
    }
    // Если элемента нет в группе, то добавить в группу
    else {
      pointNear.regimes = [pointRegimes.group];
      this.groupPoints.push(pointNear);
    }

    this.pointsChange([...this.points]);
  }

  /** Найти точку рядом */
  getPointNear(x, y) {
    let minDistance = 20;
    let point = null;
    let distance = null;
    this.points.forEach((p) => {
      let matrix = p.getMatrix(getComplex(this.params));
      let px = this.width / 2 + matrix[0];
      let py = this.height / 2 - matrix[1];
      let d = (px - x) * (px - x) + (py - y) * (py - y);
      if (
        d < minDistance * minDistance &&
        (distance === null || d < distance)
      ) {
        point = p;
        distance = d;
      }
    });
    return point;
  }

  /** Получить палку рядом */
  getStickNear(x, y) {
    let distance = null;
    let stick = null;
    let mimDistance = 20;
    this.sticks.forEach((s) => {
      let complex = getComplex(this.params);
      let matrixFirst = s.first.getMatrix(complex);
      let matrixLast = s.last.getMatrix(complex);
      let xa = this.width / 2 + matrixFirst[0];
      let xb = this.width / 2 + matrixLast[0];
      let ya = this.height / 2 - matrixFirst[1];
      let yb = this.height / 2 - matrixLast[1];
      let t =
        ((x - xa) * (xb - xa) + (y - ya) * (yb - ya)) /
        ((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya));

      if (t < 0) t = 0;
      if (t > 1) t = 1;

      let d =
        ((xa - x + (xb - xa) * t) ** 2 + (ya - y + (yb - ya) * t) ** 2) ** 0.5;

      if (d <= mimDistance && (stick === null || d < distance)) {
        distance = d;
        stick = s;
      }
    });
    return stick;
  }
}

export default WorkWithPoints;
