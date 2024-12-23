import pointRegimes from "../constants/pointRegimes";
import mul from "../functions/mul";
import normalize from "../functions/normalize";

class Point {
  constructor(x, y, z, regime = pointRegimes.standart) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.regimes = [regime];
  }

  rotate(x, y, z) {
    const radian = 57.29577951308232;
    const sin = (angle) => Math.sin(angle / radian);
    const cos = (angle) => Math.cos(angle / radian);

    const sinX = sin(x);
    const sinY = sin(y);
    const sinZ = sin(z);
    const cosX = cos(x);
    const cosY = cos(y);
    const cosZ = cos(z);

    const rx = [
      [1, 0, 0, 0],
      [0, cosX, sinX, 0],
      [0, -sinX, cosX, 0],
      [0, 0, 0, 1],
    ];
    const ry = [
      [cosY, 0, -sinY, 0],
      [0, 1, 0, 0],
      [sinY, 0, cosY, 0],
      [0, 0, 0, 1],
    ];
    const rz = [
      [cosZ, sinZ, 0, 0],
      [-sinZ, cosZ, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    const complex = mul(mul(rx, ry), rz);
    let matrix = [[this.x, this.y, this.z, 1]];
    matrix = mul(matrix, complex);
    this.x = matrix[0][0];
    this.y = matrix[0][1];
    this.z = matrix[0][2];
  }

  getRegime() {
    return this.regimes[this.regimes.length - 1];
  }

  deleteRegime(regime) {
    this.regimes = this.regimes.filter((r) => r !== regime);
  }

  clone() {
    let newPoint = new Point(this.x, this.y, this.z);
    newPoint.regimes = [...this.regimes];
    return newPoint;
  }

  getMatrix(complex) {
    let matrix = [[this.x, this.y, this.z, 1]];
    matrix = mul(matrix, complex);
    matrix = normalize(matrix[0]);
    return matrix;
  }

  getMatrixInfinity(complex) {
    let matrix = [[this.x, this.y, this.z, 0]];
    matrix = mul(matrix, complex);
    matrix = normalize(matrix[0]);
    return matrix;
  }
}

export default Point;
