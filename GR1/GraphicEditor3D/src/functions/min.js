/** Минимальный элемент в списке */
const min = (points, get = (p) => p) => {
  if (points.length === 0) return 0;
  let min = get(points[0]);
  for (let i = 1; i < points.length; i++) {
    let cord = get(points[i]);
    if (min > cord) min = cord;
  }
  return min;
};

export default min;
