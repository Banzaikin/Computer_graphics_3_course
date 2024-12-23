import stickRegimes from "../constants/stickRegimes";

class Stick {
  constructor(first, last, regime = stickRegimes.standart) {
    this.first = first;
    this.last = last;
    this.regimes = [regime];
  }

  getRegime() {
    return this.regimes[this.regimes.length - 1];
  }

  deleteRegime(regime) {
    this.regimes = this.regimes.filter((r) => r !== regime);
  }

  equivalPoint(stick) {
    return (
      (this.first === stick.first && this.last === stick.last) ||
      (this.first === stick.last && this.last === stick.first)
    );
  }
}

export default Stick;
