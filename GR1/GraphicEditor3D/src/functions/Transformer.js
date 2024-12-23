/** Трансформатор (находит новое положение точки при трансформировании) */
class Transformer {
  constructor(cords, baseCords) {
    this.cords = cords;
    this.baseCords = baseCords;
    this.kx = (cords.maxx - cords.minx) / (baseCords.maxx - baseCords.minx);
    this.ky = (cords.maxy - cords.miny) / (baseCords.maxy - baseCords.miny);
    this.kz = (cords.maxz - cords.minz) / (baseCords.maxz - baseCords.minz);

    if (isNaN(this.kx)) this.kx = 1;
    if (isNaN(this.ky)) this.ky = 1;
    if (isNaN(this.kz)) this.kz = 1;
  }

  x(oldX) {
    return (oldX - this.baseCords.minx) * this.kx + this.cords.minx;
  }

  y(oldY) {
    return (oldY - this.baseCords.miny) * this.ky + this.cords.miny;
  }

  z(oldZ) {
    return (oldZ - this.baseCords.minz) * this.kz + this.cords.minz;
  }
}

export default Transformer;
