const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

const bullets = [];
const enemies = [];
let score = 0;
let lives = 3;
let gameOver = false;
let paused = false;
let enemySpawnInterval;
let bulletSpawnInterval;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y); // Top point
    ctx.lineTo(player.x + player.width, player.y + player.height / 2); // Right point
    ctx.lineTo(player.x + player.width / 2, player.y + player.height); // Bottom point
    ctx.lineTo(player.x, player.y + player.height / 2); // Left point
    ctx.closePath();
    ctx.fill();
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Wall collision detection
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function shootBullet() {
    bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10, speed: 7 });
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Remove bullets that go off screen
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function spawnEnemy() {
    const x = Math.random() * (canvas.width - 50);
    enemies.push({ x, y: 0, width: 50, height: 50, speed: 2 });
}

function drawEnemies() {
    ctx.fillStyle = 'green';
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        // Remove enemies that go off screen and decrease lives
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            lives--;
            if (lives === 0) {
                gameOver = true;
            }
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10;

                // Restore one life for every 100 points
                if (score % 100 === 0) {
                    lives++;
                }
            }
        });
    });
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Lives: ' + lives, 10, 50);
}

function update() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 150, canvas.height / 2);
        return;
    }

    if (paused) {
        ctx.fillStyle = 'yellow';
        ctx.font = '50px Arial';
        ctx.fillText('Paused', canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    movePlayer();
    drawBullets();
    drawEnemies();
    detectCollisions();
    drawScore();

    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'd' || e.key === 'D') {
        player.dx = player.speed;
    } else if (e.key === 'a' || e.key === 'A') {
        player.dx = -player.speed;
    } else if (e.key === 'w' || e.key === 'W') {
        player.dy = -player.speed;
    } else if (e.key === 's' || e.key === 'S') {
        player.dy = player.speed;
    } else if (e.key === ' ') {
        paused = !paused;
        if (paused) {
            clearInterval(enemySpawnInterval);
            clearInterval(bulletSpawnInterval);
        } else {
            enemySpawnInterval = setInterval(spawnEnemy, 1000);
            bulletSpawnInterval = setInterval(shootBullet, 500);
            update(); // Resume the game loop
        }
    }
}

function keyUp(e) {
    if (e.key === 'd' || e.key === 'D' || e.key === 'a' || e.key === 'A') {
        player.dx = 0;
    } else if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') {
        player.dy = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

enemySpawnInterval = setInterval(spawnEnemy, 1000);
bulletSpawnInterval = setInterval(shootBullet, 750); // Shoot bullets at regular intervals

update();