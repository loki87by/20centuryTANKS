import LEVELS from "./utils/levels.js";
import { POINT, CTX } from "./utils/consts.js";
import { screenSize, collides } from "./utils/helpers.js";
import { setBrick, setStone, setTank } from "./utils/painters.js";
import Wall from "./entities/Wall.js";
import Tank from "./entities/Tank.js";

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let level = 0;
const MAP = [];
const TANKS = [];

//map
LEVELS[level].forEach((item, index) => {
  for (let i = 0; i < item.length; i++) {
    if (item[i] !== "") {
      const coords = {
        x: Math.floor(i * 20 * POINT + 10 * POINT),
        y: Math.floor(index * 20 * POINT + 10 * POINT),
      };
      const wall = new Wall(coords, 20, item[i]);
      MAP.push(wall);
    }
  }
});

//tanks
const coords = {
  x: 180 * POINT,
  y: 490 * POINT,
};
const tank = new Tank(coords, 40, "north", "players", 1, 6);
TANKS.push(tank);

//events
function tankControls(e) {
  if (e.code === "ArrowUp") {
    const direction = "north";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    console.log(
      !MAP.some((item) => collides(item, TANKS[0].getData().prestep))
    );

    if (!MAP.some((item) => collides(item, TANKS[0].getData().prestep))) {
      TANKS[0].step();
    }
  }

  if (e.code === "ArrowDown") {
    const direction = "south";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    console.log(
      !MAP.some((item) => collides(item, TANKS[0].getData().prestep))
    );

    if (!MAP.some((item) => collides(item, TANKS[0].getData().prestep))) {
      TANKS[0].step();
    }
  }

  if (e.code === "ArrowLeft") {
    const direction = "west";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    console.log(
      !MAP.some((item) => collides(item, TANKS[0].getData().prestep))
    );

    if (!MAP.some((item) => collides(item, TANKS[0].getData().prestep))) {
      TANKS[0].step();
    }
  }

  if (e.code === "ArrowRight") {
    const direction = "east";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    console.log(
      !MAP.some((item) => collides(item, TANKS[0].getData().prestep))
    );

    if (!MAP.some((item) => collides(item, TANKS[0].getData().prestep))) {
      TANKS[0].step();
    }
  }
}

//
screenSize();

function loop() {
  requestAnimationFrame(loop);
  CTX.clearRect(0, 0, POINT * 540, POINT * 540);
  CTX.fillStyle = "lightgrey";
  CTX.fillRect(0, 0, POINT * 540, POINT * 540);
  CTX.clearRect(POINT * 10, POINT * 10, POINT * 520, POINT * 520);
  MAP.forEach((item) => {
    const data = item.getData();

    if (data.type === "b") {
      setBrick(data.coords.x, data.coords.y, data.width, data.height);
    }

    if (data.type === "s") {
      setStone(data.coords.x, data.coords.y, data.width, data.height);
    }
  });

  TANKS.forEach((tank) => {
    const data = tank.getData();
    setTank(data.coords.x, data.coords.y, data.direction, data.gamer);
  });
}

requestAnimationFrame(loop);
document.addEventListener("keydown", tankControls);
