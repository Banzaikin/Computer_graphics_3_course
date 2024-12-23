/** Умножение матриц */
const mul = (m1, m2) => {
  if (m1.length === 0 || m2.length === 0 || m1[0].length !== m2.length)
    return [];

  let newM = new Array(m1.length);
  for (let i = 0; i < m1.length; i++) newM[i] = new Array(m2[0].length);

  for (let i = 0; i < m1.length; i++)
    for (let j = 0; j < m2[0].length; j++) {
      newM[i][j] = Number(0);
      for (let k = 0; k < m2.length; k++) newM[i][j] += m1[i][k] * m2[k][j];
    }
  return newM;
};

export default mul;
