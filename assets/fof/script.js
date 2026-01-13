// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Game Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const gameOverlay = document.getElementById('gameOverlay');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let gameRunning = false;
let score = 0;
let lives = 3;
let animationId;
let flames = [];
let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 60,
    speed: 7
};

const keys = {
    left: false,
    right: false
};

// Flame class
class Flame {
    constructor(isGood) {
        this.x = Math.random() * (canvas.width - 30);
        this.y = -30;
        this.width = 30;
        this.height = 40;
        this.speed = 2 + Math.random() * 2;
        this.isGood = isGood;
        this.particles = [];
    }

    update() {
        this.y += this.speed;

        // Create particle trail
        if (Math.random() > 0.7) {
            this.particles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height,
                size: Math.random() * 5 + 2,
                life: 1
            });
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.y += 2;
            p.life -= 0.02;
            p.size *= 0.95;
            return p.life > 0;
        });
    }

    draw() {
        // Draw particles
        this.particles.forEach(p => {
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            if (this.isGood) {
                gradient.addColorStop(0, `rgba(0, 200, 255, ${p.life})`);
                gradient.addColorStop(1, `rgba(0, 100, 255, 0)`);
            } else {
                gradient.addColorStop(0, `rgba(255, 50, 0, ${p.life})`);
                gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);
            }
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw flame shape
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height);

        // Create gradient for flame
        const gradient = ctx.createLinearGradient(0, -this.height, 0, 0);
        if (this.isGood) {
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(0.5, '#0088ff');
            gradient.addColorStop(1, '#0044ff');
        } else {
            gradient.addColorStop(0, '#ff3300');
            gradient.addColorStop(0.5, '#ff6600');
            gradient.addColorStop(1, '#ff0000');
        }

        ctx.fillStyle = gradient;

        // Draw flame shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-15, -10, -15, -20, -10, -30);
        ctx.bezierCurveTo(-5, -35, 0, -this.height, 0, -this.height);
        ctx.bezierCurveTo(0, -this.height, 5, -35, 10, -30);
        ctx.bezierCurveTo(15, -20, 15, -10, 0, 0);
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.isGood ? '#00d4ff' : '#ff3300';
        ctx.fill();

        ctx.restore();
    }

    isOffScreen() {
        return this.y > canvas.height;
    }

    collidesWith(player) {
        return (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        );
    }
}

// Draw player
function drawPlayer() {
    // Draw player as a collector/bucket
    const gradient = ctx.createLinearGradient(
        player.x,
        player.y,
        player.x,
        player.y + player.height
    );
    gradient.addColorStop(0, '#00d4ff');
    gradient.addColorStop(1, '#0066ff');

    ctx.fillStyle = gradient;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00d4ff';

    // Draw bucket shape
    ctx.beginPath();
    ctx.moveTo(player.x + 5, player.y);
    ctx.lineTo(player.x + player.width - 5, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Draw rim
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(player.x + 5, player.y);
    ctx.lineTo(player.x + player.width - 5, player.y);
    ctx.stroke();

    ctx.shadowBlur = 0;
}

// Update game state
function update() {
    if (!gameRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // Spawn new flames
    if (Math.random() < 0.02) {
        const isGood = Math.random() < 0.7; // 70% chance of blue flame
        flames.push(new Flame(isGood));
    }

    // Update and draw flames
    flames = flames.filter(flame => {
        flame.update();
        flame.draw();

        // Check collision
        if (flame.collidesWith(player)) {
            if (flame.isGood) {
                score += 10;
                scoreDisplay.textContent = score;
                createScorePopup(player.x + player.width / 2, player.y, '+10');
            } else {
                lives--;
                livesDisplay.textContent = lives;
                createScorePopup(player.x + player.width / 2, player.y, '-1 ❤️');
                if (lives <= 0) {
                    endGame();
                }
            }
            return false;
        }

        return !flame.isOffScreen();
    });

    // Draw player
    drawPlayer();

    // Continue game loop
    if (gameRunning) {
        animationId = requestAnimationFrame(update);
    }
}

// Create score popup effect
function createScorePopup(x, y, text) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'absolute';
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.color = text.includes('+') ? '#00ff00' : '#ff0000';
    popup.style.fontSize = '24px';
    popup.style.fontWeight = 'bold';
    popup.style.pointerEvents = 'none';
    popup.style.animation = 'popupFloat 1s ease-out forwards';
    popup.style.zIndex = '1000';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes popupFloat {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-popup]')) {
        style.setAttribute('data-popup', 'true');
        document.head.appendChild(style);
    }

    document.querySelector('.game-container').appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

// Start game
function startGame() {
    gameRunning = true;
    score = 0;
    lives = 3;
    flames = [];
    player.x = canvas.width / 2 - 25;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    gameOverlay.style.display = 'none';

    update();
}

// End game
function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    gameOverlay.style.display = 'flex';
    gameOverlay.querySelector('h3').textContent = 'Game Over!';
    gameOverlay.querySelector('p:first-of-type').textContent = `Final Score: ${score}`;

    let message = '';
    if (score < 50) {
        message = 'Keep practicing!';
    } else if (score < 150) {
        message = 'Nice work!';
    } else if (score < 300) {
        message = 'Impressive!';
    } else {
        message = 'You\'re on fire!';
    }

    gameOverlay.querySelector('p:last-of-type').textContent = message;
    startButton.textContent = 'Play Again';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = false;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = false;
    }
});

// Start button
startButton.addEventListener('click', startGame);

// Mobile touch controls
let touchStartX = 0;
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const diff = touchX - touchStartX;

    if (diff < -5) {
        keys.left = true;
        keys.right = false;
    } else if (diff > 5) {
        keys.right = true;
        keys.left = false;
    }

    touchStartX = touchX;
});

canvas.addEventListener('touchend', () => {
    keys.left = false;
    keys.right = false;
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});
