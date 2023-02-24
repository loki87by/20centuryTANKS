import LEVELS from "./utils/levels.js";
import { POINT, CTX } from "./utils/consts.js";
import { screenSize, collides, getCollideCoords } from "./utils/helpers.js";
import { setBrick, setStone, setTank, setBullet } from "./utils/painters.js";
import Wall from "./entities/Wall.js";
import Tank from "./entities/Tank.js";

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

let level = 0;
let count = 0;
let frame = null;
const MAP = [];
const TANKS = [];
const BULLETS = [];

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
const tank = new Tank(
  coords,
  40,
  0,
  0,
  "north",
  TANKS.length,
  "players",
  1,
  Math.floor(10 * POINT)
);
TANKS.push(tank);

function shiftToTarget(shifting, targets, direction) {
  console.log(shifting, targets, direction)
  const index = targets.findIndex((item) =>
    collides(item, shifting.getData().prestep)
  );
  console.log(index)
  const { x, y } = getCollideCoords(targets[index], shifting, direction);
  console.log(x,y)
  shifting.replace(x, y);
  shifting.stop();
  console.log(shifting)
}

function endCanvas(obj, x, y) {
  obj.replace(x, y);
  obj.stop();

  if (obj.owner) {
    const index = BULLETS.findIndex((item) => item.owner === obj.owner);
    BULLETS.splice(index, 1);
  }
}

//events
function tankControls(e) {
  if (e.code === "Space") {
    if (BULLETS.some((i) => i.owner == TANKS[0].id)) {
      return;
    }
    BULLETS.push(TANKS[0].gang());
    BULLETS[0].step();
  }

  if (e.code === "ArrowUp") {
    const direction = "north";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (TANKS[0].getData().prestep.coords.y < POINT * 10) {
      endCanvas(TANKS[0], TANKS[0].getData().coords.x, POINT * 10);
      return;
    }

    if (
      !MAP.some((item) => {
        if (
          TANKS[0].getData().prestep.coords.y <=
          item.coords.y + item.height
        ) {
          console.log(collides(item, TANKS[0].getData().prestep))
          return collides(item, TANKS[0].getData().prestep);
        }
      })
    ) {
      TANKS[0].step();
    } else {
      //shiftToTarget(TANKS[0], MAP, direction);
      const index = MAP.findIndex((item) =>
        collides(item, TANKS[0].getData().prestep)
      );
      const { x, y } = getCollideCoords(MAP[index], TANKS[0], direction);
      TANKS[0].replace(x, y);
  shifting.stop();
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
      endCanvas(
        TANKS[0],
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
      shiftToTarget(TANKS[0], MAP, direction);
    }
  }

  if (e.code === "ArrowLeft") {
    const direction = "west";

    if (TANKS[0].getData().direction !== direction) {
      TANKS[0].rotate(direction);
    }

    if (TANKS[0].getData().prestep.coords.x < POINT * 10) {
      endCanvas(TANKS[0], Math.floor(POINT * 10), TANKS[0].getData().coords.y);
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
      shiftToTarget(TANKS[0], MAP, direction);
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
      endCanvas(
        TANKS[0],
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
      shiftToTarget(TANKS[0], MAP, direction);
    }
  }
}

function tankStopped(e) {
  if (
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight"
  ) {
    TANKS[0].stop();
  }
}

//
screenSize();

function loop() {
  frame = requestAnimationFrame(loop);

  if (++count < 30 - Math.floor(POINT)) {
    return;
  }

  count = 0;
  CTX.clearRect(0, 0, POINT * 540, POINT * 540);
  CTX.fillStyle = "lightgrey";
  CTX.fillRect(0, 0, POINT * 540, POINT * 540);
  CTX.clearRect(POINT * 10, POINT * 10, POINT * 520, POINT * 520);
  MAP.forEach((item) => {
    const data = item.getData();

    if (data.type[0] === "b") {
      if (data.type === "b") {
        setBrick(data.coords.x, data.coords.y, data.width, data.height);
      } else {
        const part = data.type.replace("b-", "");
        setBrick(data.coords.x, data.coords.y, data.width, data.height, part);
      }
    }

    if (data.type === "s") {
      setStone(data.coords.x, data.coords.y, data.width, data.height);
    }
  });

  TANKS.forEach((tank) => {
    const data = tank.getData();
    setTank(data.coords.x, data.coords.y, data.direction, data.gamer);
    tank.replace(data.coords.x + data.dx, data.coords.y + data.dy);
  });

  BULLETS.forEach((bullet) => {
    const data = bullet.getData();
    setBullet(data.coords.x, data.coords.y, data.direction, data.power);

    if (bullet.getData().prestep.coords.y < POINT * 10) {
      endCanvas(bullet, bullet.getData().coords.x, POINT * 10);
    }

    if (
      bullet.getData().prestep.coords.x >
      POINT * 530 - bullet.getData().width
    ) {
      endCanvas(
        bullet,
        POINT * 530 - bullet.getData().width,
        bullet.getData().coords.y
      );
    }

    if (bullet.getData().prestep.coords.x < POINT * 10) {
      endCanvas(bullet, Math.floor(POINT * 10), bullet.getData().coords.y);
    }

    if (
      bullet.getData().prestep.coords.y >
      POINT * 530 - bullet.getData().height
    ) {
      endCanvas(
        bullet,
        bullet.getData().coords.x,
        POINT * 530 - bullet.getData().height
      );
    }
    bullet.replace(data.coords.x + data.dx, data.coords.y + data.dy);
    MAP.forEach((item) => {
      if (collides(item, bullet.getData().prestep)) {
        shiftToTarget(bullet, MAP, data.direction);
        item.destroy(data.direction)
      }
    });
  });
}

frame = requestAnimationFrame(loop);
document.addEventListener("keydown", tankControls);
document.addEventListener("keyup", tankStopped);
