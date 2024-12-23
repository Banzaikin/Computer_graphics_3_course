/** Получить комплексную матрицу */
const getComplex = ({ angleX, angleY, distance, size}) => {
  const radian = 57.29577951308232;
  const sin = (angle) => Math.sin(angle / radian);
  const cos = (angle) => Math.cos(angle / radian);

  const sinX = sin(angleX);
  const sinY = sin(angleY);
  const cosX = cos(angleX);
  const cosY = cos(angleY);

  // T - смещение
  // R - вращение
  // S - маштабирование
  // M - зеркало
  // P - проецирование
  // Комплексная матрица - R(angleY) * R(angleX) * P(-1/distance) * S(1/(distance*size))

  return [
    [cosY, sinY * sinX, -sinY * cosX, (sinY * cosX) / size],
    [0, cosX, sinX, -sinX / size],
    [sinY, -cosY * sinX, cosY * cosX, (-cosY * cosX) / size],
    [0, 0, 0, distance / size],
  ];
};

export default getComplex;
