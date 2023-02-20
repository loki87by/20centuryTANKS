import LEVELS from "./utils/levels.js";
import { POINT, CTX } from "./utils/consts.js";
import { screenSize, collides, getCollideCoords } from "./utils/helpers.js";
import { setBrick, setStone, setTank } from "./utils/painters.js";
import Wall from "./entities/Wall.js";
import Tank from "./entities/Tank.js";

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let level = 0;
let count = 0;
let frame = null
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
  x: Math.floor(180 * POINT),
  y: Math.floor(490 * POINT),
};
const tank = new Tank(coords, 40, "north", "players", 1, Math.floor(POINT));
TANKS.push(tank);

//events
function tankControls(e) {
  if (e.code === "ArrowUp") {
    const direction = "north";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (TANKS[0].getData().prestep.coords.y < POINT * 10) {
      TANKS[0].replace(TANKS[0].getData().coords.x, POINT * 10);
      return;
    }

    if (
      !MAP.some((item) => {
        if (
          TANKS[0].getData().prestep.coords.y <=
          item.coords.y + item.height
        ) {
          return collides(item, TANKS[0].getData().prestep);
        }
      })
    ) {
      TANKS[0].step();
    } else {
      const index = MAP.findIndex((item) =>
        collides(item, TANKS[0].getData().prestep)
      );
      const { x, y } = getCollideCoords(MAP[index], TANKS[0], direction);
      TANKS[0].replace(x, y);
    }
  }

  if (e.code === "ArrowDown") {
    const direction = "south";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (
      TANKS[0].getData().prestep.coords.y >
      POINT * 530 - TANKS[0].getData().height
    ) {
      TANKS[0].replace(
        TANKS[0].getData().coords.x,
        POINT * 530 - TANKS[0].getData().height
      );
      return;
    }

    if (
      !MAP.some((item) => {
        if (
          TANKS[0].getData().prestep.coords.y +
            TANKS[0].getData().prestep.height >=
          item.coords.y
        ) {
          return collides(item, TANKS[0].getData().prestep);
        }
      })
    ) {
      TANKS[0].step();
    } else {
      const index = MAP.findIndex((item) =>
        collides(item, TANKS[0].getData().prestep)
      );
      const { x, y } = getCollideCoords(MAP[index], TANKS[0], direction);
      TANKS[0].replace(x, y);
    }
  }

  if (e.code === "ArrowLeft") {
    const direction = "west";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (TANKS[0].getData().prestep.coords.x < POINT * 10) {
      TANKS[0].replace(Math.floor(POINT * 10), TANKS[0].getData().coords.y);
      return;
    }

    if (
      !MAP.some((item) => {
        if (TANKS[0].getData().prestep.coords.x <= item.coords.x + item.width) {
          return collides(item, TANKS[0].getData().prestep);
        }
      })
    ) {
      TANKS[0].step();
    } else {
      const index = MAP.findIndex((item) =>
        collides(item, TANKS[0].getData().prestep)
      );
      const { x, y } = getCollideCoords(MAP[index], TANKS[0], direction);
      TANKS[0].replace(x, y);
    }
  }

  if (e.code === "ArrowRight") {
    const direction = "east";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (
      TANKS[0].getData().prestep.coords.x >
      POINT * 530 - TANKS[0].getData().width
    ) {
      TANKS[0].replace(
        POINT * 530 - TANKS[0].getData().width,
        TANKS[0].getData().coords.y
      );
      return;
    }

    if (
      !MAP.some((item) => {
        if (
          TANKS[0].getData().prestep.coords.x +
            TANKS[0].getData().prestep.width >=
          item.coords.x
        ) {
          return collides(item, TANKS[0].getData().prestep);
        }
      })
    ) {
      TANKS[0].step();
    } else {
      const index = MAP.findIndex((item) =>
        collides(item, TANKS[0].getData().prestep)
      );
      const { x, y } = getCollideCoords(MAP[index], TANKS[0], direction);
      TANKS[0].replace(x, y);
    }
  }
}

//
screenSize();

function loop() {
  frame = requestAnimationFrame(loop);

  if (++count < 6 - Math.floor(POINT)) {
    return;
  }

  count = 0;
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

frame = requestAnimationFrame(loop);
document.addEventListener("keydown", tankControls);
