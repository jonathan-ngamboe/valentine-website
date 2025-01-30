var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

let animationStarted = false;
let musicStartTime = 0;
let callbackExecuted = false;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
  var x = Math.random() * canvas.offsetWidth;
  var y = Math.random() * canvas.offsetHeight;
  var radius = Math.random() * 1.2;
  var hue = colorrange[getRandom(0, colorrange.length - 1)];
  var sat = getRandom(50, 100);
  var opacity = Math.random();
  starArray.push({ x, y, radius, hue, sat, opacity });
}

let animationStartTime = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(
  0,
  0,
  window.innerWidth,
  window.innerHeight
);

function drawStars() {
  for (var i = 0; i < stars; i++) {
    var star = starArray[i];

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 360);
    context.fillStyle =
      "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
    context.fill();
  }
}

function updateStars() {
  for (var i = 0; i < stars; i++) {
    if (Math.random() > 0.99) {
      starArray[i].opacity = Math.random();
    }
  }
}

const button = document.getElementById("restartButton");

button.addEventListener("click", async () => {
  const music = document.getElementById("backgroundMusic");
  music.currentTime = 0;

  animationStarted = false;
  animationStartTime = performance.now();
  callbackExecuted = false;

  try {
    await music.play();
    animationStarted = true;

    button.classList.remove("visible");
    setTimeout(() => {
      button.style.display = "none";
    }, 500);
  } catch (error) {
    console.error("Erreur lors du redémarrage:", error);
    button.textContent = "Erreur 😞";
  }
});

function splitText(text, maxWidth, context) {
  text = text.replace(/ ([!?.:;❤🙃😞])/g, "\u00A0$1");

  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + " " + words[i];
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
}

function drawTextWithLineBreaks(text, x, y, fontSize, lineHeight) {
  const margin = 40;
  const maxWidth = window.innerWidth - margin * 2;
  const lines =
    window.innerWidth < 600 ? splitText(text, maxWidth, context) : [text];

  lines.forEach((line, index) => {
    const yPosition = y + index * (fontSize + lineHeight);
    context.fillText(line, x, yPosition);
  });
}

function handleTextAnimation(
  text,
  start,
  duration,
  yPosition,
  fontSize,
  lineHeight,
  elapsedTime
) {
  if (elapsedTime >= start && elapsedTime < start + duration) {
    const progress = elapsedTime - start;

    const fadeInDuration = 300; // milliseconds
    const fadeOutDuration = 300; //  milliseconds

    let currentOpacity = 0;

    if (progress < fadeInDuration) {
      currentOpacity = progress / fadeInDuration;
    } else if (progress < duration - fadeOutDuration) {
      currentOpacity = 1;
    } else {
      currentOpacity =
        1 - (progress - (duration - fadeOutDuration)) / fadeOutDuration;
    }

    currentOpacity = Math.max(0, Math.min(1, currentOpacity));

    context.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
    drawTextWithLineBreaks(
      text,
      canvas.width / 2,
      yPosition,
      fontSize,
      lineHeight
    );
  }
}

function drawText(elapsedTime) {
  const fontSize = Math.min(30, Math.max(16, window.innerWidth / 24));
  const lineHeight = Math.max(8, window.innerWidth / 75);
  const isMobile = window.innerWidth < 600;

  context.font = `${fontSize}px 'Montserrat'`;
  context.textAlign = "center";

  context.shadowColor = "rgba(255, 255, 255, 1)";
  context.shadowBlur = 8;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  const verticalSpacing = isMobile ? fontSize * 3 : 50;
  const basePosition = canvas.height / 2 - verticalSpacing;

  function timeToMs(timeString) {
    if (!timeString) return 0;
    const [minutes, seconds] = timeString.split(":");
    return (parseInt(minutes) * 60 + parseFloat(seconds)) * 1000;
  }

  const texts = [
    {
      text: "♪ ♪ ♪",
      start: timeToMs("00:00.00"),
      end: timeToMs("00:09.20"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Eulalie",
      start: timeToMs("00:09.20"),
      end: timeToMs("00:12.33"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Wrap me up in all your",
      start: timeToMs("00:12.33"),
      end: timeToMs("00:15.79"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I want ya in my arms",
      start: timeToMs("00:15.79"),
      end: timeToMs("00:21.57"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Oh, let me hold ya",
      start: timeToMs("00:21.57"),
      end: timeToMs("00:27.19"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I'll never let you go again like I did",
      start: timeToMs("00:27.19"),
      end: timeToMs("00:33.25"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Oh, I used to say",
      start: timeToMs("00:33.25"),
      end: timeToMs("00:37.43"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I would never fall in love again until I found her",
      start: timeToMs("00:37.43"),
      end: timeToMs("00:44.72"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I said, I would never fall unless it's you I fall into",
      start: timeToMs("00:44.72"),
      end: timeToMs("00:52.27"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I was lost within the darkness, but then I found her",
      start: timeToMs("00:52.27"),
      end: timeToMs("00:59.58"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I found you",
      start: timeToMs("00:59.58"),
      end: timeToMs("01:06.94"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Eulalie",
      start: timeToMs("01:09.47"),
      end: timeToMs("01:12.56"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Pulled me in, I asked to love her",
      start: timeToMs("01:12.56"),
      end: timeToMs("01:20.34"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Once again you fell, I caught ya",
      start: timeToMs("01:20.34"),
      end: timeToMs("01:27.26"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I'll never let you go again like I did",
      start: timeToMs("01:27.26"),
      end: timeToMs("01:33.68"),
      yPosition: canvas.height / 2,
    },
    {
      text: "Oh, l used to say",
      start: timeToMs("01:33.68"),
      end: timeToMs("01:37.42"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I would never fall in love again until I found her",
      start: timeToMs("01:37.42"),
      end: timeToMs("01:44.80"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I said I would never fall unless it's you I fall into",
      start: timeToMs("01:44.80"),
      end: timeToMs("01:52.27"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I was lost within the darkness, but then I found her",
      start: timeToMs("01:52.27"),
      end: timeToMs("01:59.67"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I found you",
      start: timeToMs("01:59.67"),
      end: timeToMs("02:07.86"),
      yPosition: canvas.height / 2,
    },
    {
      text: "♪ ♪ ♪",
      start: timeToMs("02:07.86"),
      end: timeToMs("02:22.83"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I would never fall in love again until I found her",
      start: timeToMs("02:22.83"),
      end: timeToMs("02:30.34"),
      yPosition: canvas.height / 2,
    },
    {
      text: "I said, I would never fall unless it's you I fall into",
      start: timeToMs("02:30.34"),
      end: timeToMs("02:37.86"),
      yPosition: basePosition - verticalSpacing,
    },
    {
      text: "I was lost within the darkness, but then I found her",
      start: timeToMs("02:37.86"),
      end: timeToMs("02:45.80"),
      yPosition: basePosition,
    },
    {
      text: "I found you",
      start: timeToMs("02:45.80"),
      end: timeToMs("03:00.00"),
      yPosition: basePosition + verticalSpacing,
    },
    {
      text: "Joyeuse Saint-Valentin ma princesse ❤️",
      start: timeToMs("03:00.00"),
      end: timeToMs("99:99.99"),
      yPosition: canvas.height / 2,
      callback: () => {
        const button = document.getElementById("restartButton");
        if (button) {
          const lastTextY = canvas.height / 2; 
          button.style.top = `${lastTextY + 60}px`; 
          button.style.display = "block";
          setTimeout(() => {
            button.classList.add("visible");
          }, 50);
        }
      },
    },
  ];

  texts.forEach(({ text, start, end, callback, yPosition }) => {
    const duration = end - start;
    if (callback && elapsedTime >= start && !callbackExecuted) {
      callback();
      callbackExecuted = true;
    }
    handleTextAnimation(
      text,
      start,
      duration,
      yPosition || basePosition,
      fontSize,
      lineHeight,
      elapsedTime
    );
  });

  context.shadowColor = "transparent";
  context.shadowBlur = 0;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
}

function draw() {
  context.putImageData(baseFrame, 0, 0);

  drawStars();
  updateStars();

  if (animationStarted) {
    const elapsed = performance.now() - animationStartTime;
    drawText(elapsed);
  }

  window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

// Audio
document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const startButton = document.getElementById("startButton");
  const music = document.getElementById("backgroundMusic");
  const starfield = document.getElementById("starfield");

  starfield.style.opacity = "0";
  starfield.style.display = "block";

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    music.setAttribute("playsinline", "");
  }

  music.addEventListener("play", () => {
    animationStartTime = performance.now();
    animationStarted = true;
  });

  startButton.addEventListener("click", async () => {
    try {
      const transitionOverlay = document.getElementById("transition-overlay");

      transitionOverlay.classList.add("active");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      welcomeScreen.style.display = "none";

      await music.play();
      frameNumber = 0;

      starfield.style.opacity = "1";

      await new Promise((resolve) => setTimeout(resolve, 500));

      transitionOverlay.classList.remove("active");

      setTimeout(() => {
        animationStarted = true;
        transitionOverlay.style.display = "none";
      }, 1000);
    } catch (error) {
      console.error("Erreur lecture musique:", error);
    }
  });
});

window.requestAnimationFrame(draw);
