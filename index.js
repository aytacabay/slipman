// Canvas, Width, Height
const table = document.getElementById('table');
const wrapper = document.getElementById('wrapper');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

const boxImg = document.getElementById('box');
const bugImg = document.getElementById('bug');
const cloudImg = document.getElementById('cloud');

// NOTE AUDIO ---------------------------------------------------

let back = new Audio();
let dead = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let bottom = new Audio();

back.src = "audio/Off Limits.wav";
dead.src = "audio/dead.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
bottom.src = "audio/down.mp3";

// NOTE ROD BOX AND CLOUDS ---------------------------------------------------

let rod = [];
let cloud = [];
let box = 20;

// Rod created.
let i;
for (i = 0; i < (canvasWidth / 20); i++) {
    rod.push({
        x: Math.floor(Math.random() * 35) * box,
        y: 0
    })
}

// Cloud created
let n;
for (n = 0; n < 12; n++) {
    cloud.push({
        x: 40,
        y: Math.round(Math.random() * 10) * box
    })
}

// NOTE KEYCODE SLIP-MAN ---------------------------------------------------
let keyCode;
let slip_man = { x: 320, y: canvasHeight - 40 };

function keyFunc(event) {
    keyCode = event.keyCode;

    switch (keyCode) {
        case 37:
            left.play()
            slip_man.x += -box;
            break;
        case 38:
            up.play()
            slip_man.y += -box;
            break;
        case 39:
            right.play()
            slip_man.x += box;
            break;
        case 40:
            bottom.play()
            slip_man.y += box;
            break;
        default:
            break;
    }

}

document.addEventListener('keydown', keyFunc)


// NOTE INTERVAL RULES ---------------------------------------------------

// ROD FOR INCREMENT
let incrementY = 0;

// Is Slip man life
let life = true;

// DRAWING FOR INTERVAL
let interval = setInterval(drawing, 35);

// DRAWING FUNC
function drawing() {
    back.play()
    // Clear Canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Slip-Man Drawing
    context.fillStyle = '#5900ff';
    context.drawImage(bugImg, slip_man.x, slip_man.y, box, box);

    // Cloud Drawing And Rules
    context.shadowColor = '#293a80';
    context.shadowBlur = 2;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 5;

    context.drawImage(cloudImg, cloud[0].x + 400, cloud[0].y + 200, box * 10, box * 10);
    context.drawImage(cloudImg, cloud[1].x + 200, cloud[1].y + 700, box * 10, box * 10);
    context.drawImage(cloudImg, cloud[2].x + -70, cloud[2].y + 50, box * 5, box * 5);
    context.drawImage(cloudImg, cloud[3].x + -20, cloud[3].y + 10, box * 5, box * 5);
    context.drawImage(cloudImg, cloud[4].x + 300, cloud[4].y + 300, box * 3, box * 3);
    context.drawImage(cloudImg, cloud[5].x + 250, cloud[5].y + 250, box * 7, box * 7);
    context.drawImage(cloudImg, cloud[6].x + 350, 20, box * 10, box * 10);
    context.drawImage(cloudImg, cloud[7].x + 240, cloud[1].y + 300, box * 3, box * 3);
    context.drawImage(cloudImg, cloud[8].x + -20, cloud[2].y + 400, box * 3, box * 3);
    context.drawImage(cloudImg, cloud[9].x + -90, cloud[3].y + 100, box * 8, box * 8);
    context.drawImage(cloudImg, cloud[10].x + 50, cloud[4].y + 300, box * 1, box * 1);
    context.drawImage(cloudImg, cloud[11].x + 150, cloud[5].y + 450, box * 2, box * 2);

    // Rod Y Value Increment
    incrementY += 10;

    // Rod Rules
    let i, x;
    for (i = 0; i < rod.length; i++) {
        // Y VARS FOR INCREMENT.
        rod[i].y = incrementY;
        // IF ROD[0].y > canvasHeight TRUE increment reset
        if (rod[0].y > canvasHeight) {
            // Increment Reset
            incrementY = -20;
            // Increment reloading, all X element new value.
            for (x = 0; x < rod.length; x++) {
                rod[x].x = Math.floor(Math.random() * 35) * box;
            }
        }
        // SLIP_MAN WITH ROD Elements equal GAME OVER !
        if (slip_man.x === rod[i].x && slip_man.y === rod[i].y) {
            dead.play()
            life = false
        }
        // Rod Drawing
        context.drawImage(boxImg, rod[i].x, rod[i].y, 20, 20);
    }

    // Slip-Man Frame Control Rules
    if (slip_man.x > canvasWidth - 20) slip_man.x = slip_man.x - 20
    if (slip_man.x < 0) slip_man.x = slip_man.x + 20
    if (slip_man.y > canvasHeight - 20) slip_man.y = slip_man.y - 20
    if (slip_man.y < 0) slip_man.y = slip_man.y + 20

    // Is he life ?
    if (!life) {
        context.beginPath();
        context.fillStyle = 'tomato';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        context.closePath();

        context.beginPath();
        context.fillStyle = 'whitesmoke';
        context.font = '40px sans-serif';
        context.fillText('GAME OVER', 240, 360, 1000);
        context.closePath();

        document.removeEventListener('keydown', keyFunc)
        back.pause()
        clearInterval(interval)
    }

}
