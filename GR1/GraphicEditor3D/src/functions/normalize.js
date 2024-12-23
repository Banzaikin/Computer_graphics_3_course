/** Нормализовать матрицу */
const normalize = (m) => [
  m[0] / m.at(-1),
  m[1] / m.at(-1),
  m[2] / m.at(-1),
  m.at(-1),
];

export default normalize;
