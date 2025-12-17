const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dragonfly = new Image();
dragonfly.src = "dragonfly.png";

let x = 80;
let y = 200;
let velocity = 0;
let gravity = 0.5;
let score = 0;
let gameOver = false;

const pipes = [];
const gap = 150;

const bgm = document.getElementById("bgm");
let musicStarted = false;

document.addEventListener("click", () => {
  velocity = -8;

  if (!musicStarted) {
    bgm.play();
    musicStarted = true;
  }
});

function addPipe() {
  const topHeight = Math.random() * 250 + 50;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: canvas.height - topHeight - gap,
    passed: false
  });
}

setInterval(addPipe, 1800);

function update() {
  if (gameOver) return;

  velocity += gravity;
  y += velocity;

  if (y + 40 > canvas.height || y < 0) {
    gameOver = true;
  }

  pipes.forEach(pipe => {
    pipe.x -= 2;

    if (!pipe.passed && pipe.x + 50 < x) {
      score++;
      pipe.passed = true;

      if (score === 10) {
  const message = document.getElementById("message");
  message.classList.remove("hidden");

  gameOver = true;

  // Dừng nhạc sau khi thắng (tùy chọn, cho nhẹ cảm xúc)
  if (typeof bgm !== "undefined") {
    bgm.volume = 0.4;
  }

  // Chuyển sang Instagram sau 3 giây
  setTimeout(() => {
    window.location.href = "https://www.instagram.com/kalvinwells_/";
  }, 3000);
}
    }

    if (
      x + 40 > pipe.x &&
      x < pipe.x + 50 &&
      (y < pipe.top || y + 40 > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(dragonfly, x, y, 40, 40);

  ctx.fillStyle = "#4caf50";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(
      pipe.x,
      canvas.height - pipe.bottom,
      50,
      pipe.bottom
    );
  });

  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  if (gameOver) {
    ctx.fillText("Game Over", 130, 300);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
