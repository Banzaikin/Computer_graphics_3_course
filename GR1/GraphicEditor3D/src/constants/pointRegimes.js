import PointRegime from "../entities/PointRegime";

/** Режимы работы точек */
const pointRegimes = {
  standart: new PointRegime(4, "#1E90FF", 0, "#FFFFFF"), // Стандартный
  backlit: new PointRegime(5, "#FF6347", 0, "#FFFFFF"), // Подсвеченная (при наведении)
  added: new PointRegime(4, "#FFFFFF", 2, "#3CB371"), // При добавлении точки
  addedStick: new PointRegime(5, "#FFFFFF", 0, "#A9A9A9"), // Первая выбранная точка при добавлении линии
  group: new PointRegime(4, "#FFFFFF", 2, "#FFDAB9"), // В группе
  moving: new PointRegime(5, "#FFA07A", 0, "#FFFFFF"), // В группе при перемещении
  rotation: new PointRegime(5, "#ce6868", 0, "#FFFFFF"), // В группе при вращении
  mirror: new PointRegime(5, "#FFD700", 0, "#FFFFFF"), // В группе при зеркалировании
  scale: new PointRegime(5, "#BA55D3", 0, "#FFFFFF"), // В группе при масштабировании
  mirrorFrame: new PointRegime(4, "#98FB98", 0, "#FFFFFF"), // У рамки при зеркалировании
};

export default pointRegimes;
