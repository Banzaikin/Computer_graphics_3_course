import Point from "../entities/Point";
import Stick from "../entities/Stick";

/** Преобразовать данные из текста */
const convertFromText = (text) => {
  let points = [];
  let sticks = [];
  text.split("\n").forEach((t) => {
    let el = t.split(" ");
    if (el[0] === "p") {
      points.push(new Point(Number(el[1]), Number(el[2]), Number(el[3])));
    } else if (el[0] === "s") {
      let nums = el[1].split("/");
      sticks.push([Number(nums[0]), Number(nums[1])]);
    }
  });
  sticks = sticks.map((s) => new Stick(points[s[0]], points[s[1]]));
  return [points, sticks];
};

export default convertFromText;
