const killer = document.querySelector(".killer_block");
const survivor = document.querySelector(".survivor_block");
const parent = document.querySelector(".parent_block");

const size = 50;

const offsetWidth = parent.clientWidth - size;
const offsetHeight = parent.clientHeight - size;

/* ================= PATH SYSTEM ================= */

let path = []; // сюда записываем движения
const delay = 25; // чем больше → тем сильнее отставание

let x = 0;
let y = 0;

let dir = "right";


function moveKiller() {

    if (dir === "right") {
        x += 6;
        if (x >= offsetWidth) dir = "down";
    }

    else if (dir === "down") {
        y += 6;
        if (y >= offsetHeight) dir = "left";
    }

    else if (dir === "left") {
        x -= 6;
        if (x <= 0) dir = "up";
    }

    else if (dir === "up") {
        y -= 6;
        if (y <= 0) dir = "right";
    }

    // сохраняем позицию в историю
    path.push({ x, y });

    // ограничиваем память
    if (path.length > 2000) {
        path.shift();
    }
}


/* ================= SURVIVOR FOLLOWS PATH ================= */

function moveSurvivor() {

    if (path.length < delay) return;

    const target = path[path.length - delay];

    survivor.style.left = target.x + "px";
    survivor.style.top = target.y + "px";
}


/* ================= RENDER KILLER ================= */

function renderKiller() {
    killer.style.left = x + "px";
    killer.style.top = y + "px";
}


/* ================= LOOP ================= */

function loop() {

    moveKiller();
    moveSurvivor();
    renderKiller();

    requestAnimationFrame(loop);
}

loop();