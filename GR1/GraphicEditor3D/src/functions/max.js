/** Максимальный элемент в списке */
const max = (points, get = (p) => p) => {
  if (points.length === 0) return 0;
  let max = get(points[0]);
  for (let i = 1; i < points.length; i++) {
    let cord = get(points[i]);
    if (max < cord) max = cord;
  }
  return max;
};

export default max;
