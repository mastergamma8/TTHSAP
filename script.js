const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;  // Ширина для вертикальной ориентации
canvas.height = 600; // Высота для вертикальной ориентации

const playerImg = new Image();
playerImg.src = 'player.png'; // Изображение персонажа
const boxImg = new Image();
boxImg.src = 'box.png'; // Изображение ящика

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5
};

let boxes = [];
let score = 0;
let gameStarted = false;

// Функция для генерации ящиков
function createBox() {
    const box = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        speed: Math.random() * 2 + 1
    };
    boxes.push(box);
}

// Функция для обновления игры
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Отображение игрока
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    
    // Отображение ящиков
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        box.y += box.speed;
        
        if (box.y > canvas.height) {
            boxes.splice(i, 1);
            i--;
        } else {
            ctx.drawImage(boxImg, box.x, box.y, box.width, box.height);
        }
    }

    // Проверка столкновений
    for (let i = 0; i < boxes.length; i++) {
        if (collision(player, boxes[i])) {
            boxes.splice(i, 1);
            score += 5;
            i--;
        }
    }

    requestAnimationFrame(update);
}

// Проверка столкновения
function collision(rect1, rect2) {
    return !(rect2.x > rect1.x + rect1.width ||
             rect2.x + rect2.width < rect1.x ||
             rect2.y > rect1.y + rect1.height ||
             rect2.y + rect2.height < rect1.y);
}

// Генерируем ящики каждые 2 секунды
setInterval(createBox, 2000);

// Обрабатываем нажатия клавиш
document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

// Начать игру
document.getElementById('startGame').addEventListener('click', () => {
    document.getElementById('startScreen').classList.add('hidden');
    gameStarted = true;
    update(); // Начинаем обновление игры
});

// Закрыть магазин
document.getElementById('closeShop').addEventListener('click', () => {
    document.getElementById('shop').classList.add('hidden');
});
