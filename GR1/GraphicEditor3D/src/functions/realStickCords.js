/** Реальные координаты точек на экране */
const realStickCords = (matrix1, matrix2, width, height) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const x1 = centerX + matrix1[0];
  const y1 = centerY - matrix1[1];
  const x2 = centerX + matrix2[0];
  const y2 = centerY - matrix2[1];

  /** Получить координаты точки, уходящей за камеру */
  const getCords = (x1, y1, x2, y2) => {
    let wallX = x2 - x1 < 0 ? 0 : width;
    let wallY = y2 - y1 < 0 ? 0 : height;
    let ytox = (wallX * y2 - wallX * y1 - x1 * y2 + y1 * x2) / (x2 - x1);
    let xtoy = (wallY * x1 - wallY * x2 - x1 * y2 + y1 * x2) / (y1 - y2);

    if (ytox > 0 && ytox < height) xtoy = wallX;
    else ytox = wallY;

    return [xtoy, ytox];
  };

  // Если обе точки за границами экрана, то ничего не рисовать
  if (
    (x1 > width || x1 < 0) &&
    (x2 > width || x2 < 0) &&
    (y1 > height || y1 < 0) &&
    (y2 > height || y2 < 0)
  ) {
    return [];
  }
  // Если обе точки за камерой, то ничего не рисовать
  else if (matrix1.at(-1) < 0 && matrix2.at(-1) < 0) {
    return [];
  }
  // Если обе точки перед камерой, то провести линию между точками
  else if (matrix1.at(-1) > 0 && matrix2.at(-1) > 0) {
    return [x1, y1, x2, y2];
  }
  // Если первая точка за камерой, то провести линию от второй точки до границы экрана так, чтобы линия уходила в точку схода
  else if (matrix1.at(-1) < 0 && matrix2.at(-1) > 0) {
    let cords = getCords(x1, y1, x2, y2);
    return [cords[0], cords[1], x2, y2];
  }
  // Если вторая точка за камерой, то провести линию от первой точки до границы экрана так, чтобы линия уходила в точку схода
  else if (matrix1.at(-1) > 0 && matrix2.at(-1) < 0) {
    let cords = getCords(x2, y2, x1, y1);
    return [x1, y1, cords[0], cords[1]];
  }
};

export default realStickCords;
