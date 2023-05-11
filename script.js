const $ = (selector) => document.querySelector(selector),
  canvas = $("#canvas"),
  ctx = canvas.getContext("2d");

let size = 30, isPressed = false, color = "black", x = undefined, y = undefined;

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

const updateSizeOnScreen = () => ($("#size").innerText = size);

canvas.onmousedown = (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
};

canvas.onmouseup = () => {
  isPressed = false;
  x = undefined;
  y = undefined;
};

canvas.onmousemove = (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
};

$("#increase").onclick = () => {
  size += 5;
  if (size > 50) size = 50;
  updateSizeOnScreen();
};

$("#decrease").onclick = () => {
  size -= 5;
  if (size < 5) size = 5;
  updateSizeOnScreen();
};

$("#color").onchange = (e) => (color = e.target.value);

$("#clear").onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
