import LEVELS from "./utils/levels.js";
import { POINT, CTX } from "./utils/consts.js";
import { screenSize, setBrick, setStone } from './utils/helpers.js'
import { Wall } from "./entities/Wall.js";

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let level = 0;
const MAP = [];
LEVELS[level].forEach((item, index) => {
  for (let i = 0; i < item.length; i++) {
    if (item[i] !== "") {
      const coords = {
        x: i * 20 + 10,
        y: index * 20 + 10,
      };
      const wall = new Wall(coords, 20, item[i]);
      MAP.push(wall);
    }
  }
});

screenSize()

function loop() {
  requestAnimationFrame(loop);
  CTX.clearRect(0, 0, POINT * 540, POINT * 540);
  CTX.fillStyle = "lightgrey";
  CTX.fillRect(0, 0, POINT * 540, POINT * 540);
  CTX.clearRect(POINT *10, POINT * 10, POINT * 520, POINT * 520);
  MAP.forEach((item) => {
    const data = item.getData()

    if (data.type === 'b') {
        setBrick(data.x, data.y, data.width, data.height)
    }

    if (data.type === 's') {
        setStone(data.x, data.y, data.width, data.height)
    }
  })
}

requestAnimationFrame(loop);
