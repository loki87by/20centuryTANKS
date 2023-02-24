import * as C from "./consts.js";

export function setBrick(x, y, w, h, part) {
  if (part) {
    console.log(part);
  }
  C.CTX.fillStyle = "firebrick";
  C.CTX.fillRect(x, y, w, h);
  C.CTX.strokeStyle = "grey";
  C.CTX.lineWidth = 1;
  C.CTX.moveTo(x, y);
  C.CTX.lineTo(x + w, y);
  C.CTX.moveTo(x, y + h - 1);
  C.CTX.lineTo(x + w - 1, y + h - 1);
  C.CTX.lineWidth = 2;

  if (!part) {
    C.CTX.lineTo(x + w - 1, y + h / 2 - 1);
  }

  if (part === "up") {
    C.CTX.lineTo(x + w - 1, y + h - 1);
  }

  if (part !== "up" || part !== "down") {
    C.CTX.moveTo(x, y + h / 2 - 1);
    C.CTX.lineTo(x + w, y + h / 2 - 1);

    if (!part) {
      C.CTX.moveTo(x + w / 2 - 1, y);
      C.CTX.lineTo(x + w / 2 - 1, y + h / 2);
    }

    if (part === "left") {
      C.CTX.moveTo(x + w / 2 - 1, y / 2);
      C.CTX.lineTo(x + w / 2 - 1, y + h / 2);
    }

    if (part === "right") {
      C.CTX.moveTo(x, y);
      C.CTX.lineTo(x, y + h / 2);
    }
  }

  if (part === "down") {
    C.CTX.moveTo(x + w / 2 - 1, y);
    C.CTX.lineTo(x + w / 2 - 1, y + h);
  }
  C.CTX.stroke();
}

export function setStone(x, y, w, h) {
  const gradient = C.CTX.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, "lightgrey");
  gradient.addColorStop(1, "darkgrey");
  C.CTX.fillStyle = gradient;
  C.CTX.fillRect(x, y, w, h);
  C.CTX.fillStyle = "white";
  C.CTX.fillRect(x + 3, y + 3, w - 6, h - 6);
}

function getPlayerTank(x, y, checkpoints) {
  C.CTX.fillRect(
    x + checkpoints[0] * C.POINT,
    y + checkpoints[1] * C.POINT,
    C.POINT * checkpoints[2],
    C.POINT * checkpoints[3]
  );
  C.CTX.fillRect(
    x + checkpoints[4] * C.POINT,
    y + checkpoints[5] * C.POINT,
    C.POINT * checkpoints[2],
    C.POINT * checkpoints[3]
  );
  C.CTX.beginPath();
  C.CTX.arc(
    x + checkpoints[6] * C.POINT,
    y + checkpoints[7] * C.POINT,
    checkpoints[8] * C.POINT,
    0,
    2 * Math.PI
  );
  C.CTX.fill();
  C.CTX.closePath();
  C.CTX.fillRect(
    x + checkpoints[9] * C.POINT,
    y + checkpoints[10] * C.POINT,
    C.POINT * checkpoints[11],
    C.POINT * checkpoints[12]
  );
  C.CTX.beginPath();
  C.CTX.lineWidth = 1;
  C.CTX.strokeStyle = "black";
  C.CTX.arc(
    x + checkpoints[6] * C.POINT,
    y + checkpoints[7] * C.POINT,
    checkpoints[13] * C.POINT,
    0,
    2 * Math.PI
  );
  C.CTX.moveTo(x + checkpoints[14] * C.POINT, y + checkpoints[15] * C.POINT);
  C.CTX.lineTo(x + checkpoints[16] * C.POINT, y + checkpoints[17] * C.POINT);
  C.CTX.moveTo(x + checkpoints[18] * C.POINT, y + checkpoints[19] * C.POINT);
  C.CTX.lineTo(x + checkpoints[20] * C.POINT, y + checkpoints[21] * C.POINT);
  C.CTX.moveTo(x + checkpoints[22] * C.POINT, y + checkpoints[23] * C.POINT);
  C.CTX.lineTo(x + checkpoints[24] * C.POINT, y + checkpoints[25] * C.POINT);
  C.CTX.moveTo(x + checkpoints[26] * C.POINT, y + checkpoints[27] * C.POINT);
  C.CTX.lineTo(x + checkpoints[28] * C.POINT, y + checkpoints[29] * C.POINT);
  C.CTX.moveTo(x + checkpoints[30] * C.POINT, y + checkpoints[31] * C.POINT);
  C.CTX.lineTo(x + checkpoints[32] * C.POINT, y + checkpoints[33] * C.POINT);
  C.CTX.moveTo(x + checkpoints[34] * C.POINT, y + checkpoints[35] * C.POINT);
  C.CTX.lineTo(x + checkpoints[36] * C.POINT, y + checkpoints[37] * C.POINT);
  C.CTX.moveTo(x + checkpoints[38] * C.POINT, y + checkpoints[39] * C.POINT);
  C.CTX.lineTo(x + checkpoints[40] * C.POINT, y + checkpoints[41] * C.POINT);
  C.CTX.moveTo(x + checkpoints[42] * C.POINT, y + checkpoints[43] * C.POINT);
  C.CTX.lineTo(x + checkpoints[44] * C.POINT, y + checkpoints[45] * C.POINT);
  C.CTX.stroke();
  C.CTX.closePath();
}

export function setTank(x, y, dir, gamer) {
  let checkpoints;
  if (gamer === 1) {
    C.CTX.fillStyle = "yellow";
  }
  if (dir === "north") {
    checkpoints = [
      1, 4, 9, 35, 30, 4, 20, 24, 10, 18, 1, 4, 13, 5, 1, 12, 5, 12, 1, 19, 5,
      19, 1, 26, 5, 26, 1, 33, 5, 33, 35, 12, 39, 12, 35, 19, 39, 19, 35, 26,
      39, 26, 35, 33, 39, 33,
    ];
    getPlayerTank(x, y, checkpoints);
  }
  if (dir === "south") {
    checkpoints = [
      1, 1, 9, 35, 30, 1, 20, 16, 10, 18, 26, 4, 13, 5, 1, 8, 5, 8, 1, 15, 5,
      15, 1, 22, 5, 22, 1, 29, 5, 29, 35, 8, 39, 8, 35, 15, 39, 15, 35, 22, 39,
      22, 35, 29, 39, 29,
    ];
    getPlayerTank(x, y, checkpoints);
  }
  if (dir === "east") {
    checkpoints = [
      1, 1, 35, 9, 1, 30, 16, 20, 10, 26, 18, 13, 4, 5, 8, 1, 8, 5, 15, 1, 15,
      5, 22, 1, 22, 5, 29, 1, 29, 5, 8, 35, 8, 39, 15, 35, 15, 39, 22, 35, 22,
      39, 29, 35, 29, 39,
    ];
    getPlayerTank(x, y, checkpoints);
  }
  if (dir === "west") {
    checkpoints = [
      4, 1, 35, 9, 4, 30, 24, 20, 10, 1, 18, 13, 4, 5, 12, 1, 12, 5, 19, 1, 19,
      5, 26, 1, 26, 5, 33, 1, 33, 5, 12, 35, 12, 39, 19, 35, 19, 39, 26, 35, 26,
      39, 33, 35, 33, 39,
    ];
    getPlayerTank(x, y, checkpoints);
  }
}

export function setBullet(x, y, dir, gun) {
  let size = Math.floor(2 * C.POINT);

  if (gun) {
    size = Math.floor(4 * C.POINT);
  }

  C.CTX.fillStyle = "white";

  if (dir === "north") {
    C.CTX.fillRect(x - size / 2, y - 3 * size, size, 3 * size);
  }

  if (dir === "south") {
    C.CTX.fillRect(x - size / 2, y, size, 3 * size);
  }

  if (dir === "west") {
    C.CTX.fillRect(x - 3 * size, y - size / 2, 3 * size, size);
  }

  if (dir === "east") {
    C.CTX.fillRect(x, y - size / 2, 3 * size, size);
  }
}
