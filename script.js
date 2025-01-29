var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

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

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
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

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
    if (button.textContent === "Clique ici! ❤") {
      button.textContent = "Envoi en cours...";
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            button.textContent = "Vérifie tes emails 🙃";
          } else {
            console.error('Erreur:', data.error);
            button.textContent = "Erreur 😞";
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          button.textContent = "Erreur 😞";
        });
    }
  });

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px 'Montserrat'";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(255, 255, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Chaque jour, j'ai du mal à réaliser la chance que j'ai...", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("Chaque jour, j'ai du mal à réaliser la chance que j'ai...", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["Dans cet univers infini,", "parmi des milliards d'étoiles et à travers les âges..."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Dans cet univers infini, parmi des milliards d'étoiles et à travers les âges...", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Dans cet univers infini,", "parmi des milliards d'étoiles et à travers les âges..."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Dans cet univers infini, parmi des milliards d'étoiles et à travers les âges...", canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("le destin m'a offert le plus beau des cadeaux : partager ma vie avec toi.", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("le destin m'a offert le plus beau des cadeaux : partager ma vie avec toi.", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("C'est magique, presque irréel...", canvas.width/2, canvas.height/2);
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("C'est magique, presque irréel...", canvas.width/2, canvas.height/2);
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["et pourtant c'est bien réel,", "j'ai l'immense bonheur de t'avoir à mes côtés."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("et pourtant c'est bien réel, j'ai l'immense bonheur de t'avoir à mes côtés.", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["et pourtant c'est bien réel,", "j'ai l'immense bonheur de t'avoir à mes côtés."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("et pourtant c'est bien réel, j'ai l'immense bonheur de t'avoir à mes côtés.", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["Je t'aime Eulalie,", "d'un amour plus grand que toutes les étoiles de l'univers..."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("Je t'aime Eulalie, d'un amour plus grand que toutes les étoiles de l'univers...", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    
    if(frameNumber >= 2750 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["et j'ai hâte de passer tout mon temps à", "partager cet amour avec toi !"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("et j'ai hâte de passer tout mon temps à partager cet amour avec toi !", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
        context.fillText("Joyeuse Saint-Valentin mon amour ❤", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        button.style.display = "block";
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
