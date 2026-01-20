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

// Audio System
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isMuted = false;
let backgroundMusic = null;

// Sound effect generator
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (isMuted) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Play shoot sound
function playShootSound() {
    playTone(800, 0.1, 'square', 0.2);
}

// Play hit sound
function playHitSound(isGood) {
    if (isGood) {
        playTone(600, 0.15, 'sine', 0.3);
        setTimeout(() => playTone(800, 0.1, 'sine', 0.2), 50);
    } else {
        playTone(200, 0.2, 'sawtooth', 0.3);
    }
}

// Play explosion sound
function playExplosionSound() {
    playTone(100, 0.3, 'sawtooth', 0.4);
}

// Play power-up sound
function playPowerUpSound() {
    playTone(400, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.2), 60);
    setTimeout(() => playTone(800, 0.15, 'sine', 0.3), 120);
}

// Background music (simple melody loop)
function startBackgroundMusic() {
    if (isMuted || backgroundMusic) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33]; // C, D, E, G, E, D
    let noteIndex = 0;

    backgroundMusic = setInterval(() => {
        if (!isMuted && gameRunning) {
            playTone(notes[noteIndex], 0.3, 'triangle', 0.1);
            noteIndex = (noteIndex + 1) % notes.length;
        }
    }, 500);
}

// Stop background music
function stopBackgroundMusic() {
    if (backgroundMusic) {
        clearInterval(backgroundMusic);
        backgroundMusic = null;
    }
}

// Toggle mute
function toggleMute() {
    isMuted = !isMuted;
    const muteBtn = document.getElementById('muteButton');
    if (muteBtn) {
        muteBtn.textContent = isMuted ? '🔇 Unmute' : '🔊 Mute';
    }
}

// Game Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const gameOverlay = document.getElementById('gameOverlay');
const modeSelect = document.getElementById('modeSelect');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const score2Display = document.getElementById('score2');
const lives2Display = document.getElementById('lives2');
const player2Stats = document.getElementById('player2Stats');
const highscoreDisplay = document.getElementById('highscore');

let gameRunning = false;
let gameMode = 'single'; // 'single' or 'two'
let score = 0;
let lives = 3;
let score2 = 0;
let lives2 = 3;
let highscore = 0;
let animationId;
let targets = [];
let bullets = [];
let enemyBullets = [];
let powerUps = [];
let explosions = [];
let gameTime = 0;
let difficultyMultiplier = 1;
let screenShake = 0;
let backgroundParticles = [];

// Load highscore from localStorage
function loadHighscore() {
    const saved = localStorage.getItem('flameShooterHighscore');
    if (saved) {
        highscore = parseInt(saved);
        highscoreDisplay.textContent = highscore;
    }
}

// Save highscore to localStorage
function saveHighscore() {
    localStorage.setItem('flameShooterHighscore', highscore.toString());
    highscoreDisplay.textContent = highscore;
}

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 60,
    speed: 7,
    color: '#00d4ff',
    canShoot: true,
    shootCooldown: 0,
    rapidFire: 0,
    shield: 0,
    doublePoints: 0,
    combo: 0,
    comboTimer: 0,
    multiplier: 1
};

let player2 = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 60,
    speed: 7,
    color: '#ff6600',
    canShoot: true,
    shootCooldown: 0,
    rapidFire: 0,
    shield: 0,
    doublePoints: 0,
    combo: 0,
    comboTimer: 0,
    multiplier: 1
};

const keys = {
    left: false,
    right: false,
    player2Left: false,
    player2Right: false,
    shoot: false,
    player2Shoot: false
};

// Explosion class
class Explosion {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        this.life = 1;

        // Create MASSIVE explosion particles
        for (let i = 0; i < 40; i++) {
            const angle = (Math.PI * 2 * i) / 40;
            const speed = 3 + Math.random() * 5;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 4 + Math.random() * 6,
                life: 1
            });
        }

        // Add inner ring of particles
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 6 + Math.random() * 8,
                life: 1
            });
        }
    }

    update() {
        this.life -= 0.05;
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.life -= 0.05;
            p.size *= 0.95;
        });
    }

    draw() {
        this.particles.forEach(p => {
            ctx.fillStyle = this.color === 'blue'
                ? `rgba(0, 200, 255, ${p.life})`
                : `rgba(255, 100, 0, ${p.life})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color === 'blue' ? '#00d4ff' : '#ff6600';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
    }

    isDead() {
        return this.life <= 0;
    }
}

// PowerUp class
class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = type; // 'rapidfire', 'shield', 'doublepoints'
        this.speed = 2;
        this.pulse = 0;
    }

    update() {
        this.y += this.speed;
        this.pulse += 0.1;
    }

    draw() {
        const pulseSize = Math.sin(this.pulse) * 3;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // Draw icon based on type
        ctx.shadowBlur = 15 + pulseSize;

        if (this.type === 'rapidfire') {
            ctx.shadowColor = '#ffff00';
            ctx.fillStyle = '#ffff00';
            // Draw lightning bolt
            ctx.beginPath();
            ctx.moveTo(-8, -10);
            ctx.lineTo(0, -2);
            ctx.lineTo(-3, 0);
            ctx.lineTo(5, 10);
            ctx.lineTo(0, 2);
            ctx.lineTo(3, 0);
            ctx.closePath();
            ctx.fill();
        } else if (this.type === 'shield') {
            ctx.shadowColor = '#00ff00';
            ctx.fillStyle = '#00ff00';
            // Draw shield
            ctx.beginPath();
            ctx.arc(0, 0, 10 + pulseSize, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 3;
            ctx.stroke();
        } else if (this.type === 'doublepoints') {
            ctx.shadowColor = '#ff00ff';
            ctx.fillStyle = '#ff00ff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('x2', 0, 0);
        }

        ctx.shadowBlur = 0;
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

// Target class - moves horizontally across screen
class Target {
    constructor(isGood, difficulty = 1) {
        this.width = 40;
        this.height = 40;
        this.x = Math.random() < 0.5 ? -this.width : canvas.width;
        this.y = Math.random() * (canvas.height * 0.6); // Upper 60% of screen
        this.speed = (2 + Math.random() * 2) * (this.x < 0 ? 1 : -1) * difficulty;
        this.isGood = isGood;
        this.particles = [];
        this.rotation = 0;

        // Some targets move in a wave pattern
        this.wavePattern = Math.random() < 0.3;
        this.waveOffset = 0;

        // Shooting mechanics (red targets shoot back!)
        this.canShoot = !isGood; // Only red targets shoot
        this.shootTimer = Math.floor(Math.random() * 120) + 60; // Random initial delay
        this.charging = false;
        this.chargeTime = 0;
    }

    update() {
        this.x += this.speed;
        this.rotation += 0.05;

        // Wave movement
        if (this.wavePattern) {
            this.waveOffset += 0.1;
            this.y += Math.sin(this.waveOffset) * 2;
        }

        // Shooting logic
        if (this.canShoot && this.x > 0 && this.x < canvas.width - this.width) {
            this.shootTimer--;

            if (this.shootTimer <= 30 && this.shootTimer > 0) {
                // Charging phase
                this.charging = true;
                this.chargeTime = (30 - this.shootTimer) / 30;
            } else if (this.shootTimer === 0) {
                // Shoot!
                this.shoot();
                this.shootTimer = Math.floor(Math.random() * 90) + 90; // Reset with random delay
                this.charging = false;
                this.chargeTime = 0;
            }
        }

        // Create MORE particle trails for excitement
        if (Math.random() > 0.5) {
            this.particles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                size: Math.random() * 4 + 2,
                life: 1,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3
            });
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.03;
            p.size *= 0.95;
            return p.life > 0;
        });
    }

    shoot() {
        // Find nearest player to shoot at
        let targetPlayer = player;

        if (gameMode === 'two' && lives2 > 0) {
            const dist1 = Math.abs((player.x + player.width / 2) - (this.x + this.width / 2));
            const dist2 = Math.abs((player2.x + player2.width / 2) - (this.x + this.width / 2));
            if (dist2 < dist1) {
                targetPlayer = player2;
            }
        }

        // Create enemy bullet aimed at player
        enemyBullets.push(new EnemyBullet(
            this.x + this.width / 2 - 3,
            this.y + this.height,
            targetPlayer.x + targetPlayer.width / 2,
            targetPlayer.y + targetPlayer.height / 2,
            'red'
        ));
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

        // Draw charging indicator
        if (this.charging) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 20 * this.chargeTime;
            ctx.shadowColor = '#ff0000';
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width / 2 + 5 + (this.chargeTime * 10),
                0,
                Math.PI * 2
            );
            ctx.stroke();

            // Draw warning line to player
            let targetPlayer = player;
            if (gameMode === 'two' && lives2 > 0) {
                const dist1 = Math.abs((player.x + player.width / 2) - (this.x + this.width / 2));
                const dist2 = Math.abs((player2.x + player2.width / 2) - (this.x + this.width / 2));
                if (dist2 < dist1) targetPlayer = player2;
            }

            ctx.strokeStyle = `rgba(255, 0, 0, ${this.chargeTime * 0.3})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(targetPlayer.x + targetPlayer.width / 2, targetPlayer.y + targetPlayer.height / 2);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.shadowBlur = 0;
        }

        // Draw target (spinning flame circle)
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);

        // Create gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width / 2);
        if (this.isGood) {
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(0.5, '#00d4ff');
            gradient.addColorStop(1, '#0088ff');
        } else {
            gradient.addColorStop(0, '#ffff00');
            gradient.addColorStop(0.5, '#ff6600');
            gradient.addColorStop(1, '#ff0000');
        }

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 15 + (this.charging ? this.chargeTime * 20 : 0);
        ctx.shadowColor = this.isGood ? '#00d4ff' : '#ff3300';

        // Draw flame star shape
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const radius = i % 2 === 0 ? this.width / 2 : this.width / 4;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    isOffScreen() {
        return this.x < -this.width || this.x > canvas.width;
    }

    collidesWith(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        );
    }
}

// Bullet class
class Bullet {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 20;
        this.speed = 12;
        this.color = color;
        this.trail = [];
    }

    update() {
        // Add trail
        this.trail.push({ x: this.x + this.width / 2, y: this.y + this.height, life: 1 });
        if (this.trail.length > 8) this.trail.shift();

        // Update trail
        this.trail.forEach(t => t.life -= 0.15);

        this.y -= this.speed;
    }

    draw() {
        // Draw trail
        this.trail.forEach(t => {
            ctx.fillStyle = this.color === '#00d4ff'
                ? `rgba(0, 212, 255, ${t.life * 0.6})`
                : `rgba(255, 102, 0, ${t.life * 0.6})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw bullet with glow
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add bright core
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 15;
        ctx.fillRect(this.x + 1, this.y + 2, this.width - 2, this.height - 4);
        ctx.shadowBlur = 0;
    }

    isOffScreen() {
        return this.y < -this.height;
    }

    collidesWith(target) {
        return (
            this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.y + this.height > target.y
        );
    }
}

// Enemy Bullet class
class EnemyBullet {
    constructor(x, y, targetX, targetY, color) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 12;
        this.color = color;

        // Calculate direction towards target
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 5;

        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;

        // Trail particles
        this.trail = [];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Add trail
        if (Math.random() > 0.5) {
            this.trail.push({
                x: this.x,
                y: this.y,
                life: 1
            });
        }

        // Update trail
        this.trail = this.trail.filter(p => {
            p.life -= 0.05;
            return p.life > 0;
        });
    }

    draw() {
        // Draw trail
        this.trail.forEach(p => {
            ctx.fillStyle = this.color === 'red'
                ? `rgba(255, 50, 0, ${p.life * 0.5})`
                : `rgba(255, 200, 0, ${p.life * 0.5})`;
            ctx.beginPath();
            ctx.arc(p.x + this.width / 2, p.y + this.height / 2, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw bullet
        ctx.fillStyle = this.color === 'red' ? '#ff3300' : '#ffaa00';
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color === 'red' ? '#ff3300' : '#ffaa00';

        // Draw diamond shape
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height / 2);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
    }

    isOffScreen() {
        return this.y > canvas.height || this.y < 0 || this.x < 0 || this.x > canvas.width;
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

// Draw player as a gun/shooter
function drawPlayer(playerObj) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = playerObj.color;

    // Draw gun barrel
    const barrelWidth = 12;
    const barrelHeight = 35;
    const barrelX = playerObj.x + playerObj.width / 2 - barrelWidth / 2;
    const barrelY = playerObj.y - 10;

    const gradient = ctx.createLinearGradient(barrelX, barrelY, barrelX, barrelY + barrelHeight);
    if (playerObj.color === '#00d4ff') {
        gradient.addColorStop(0, '#00d4ff');
        gradient.addColorStop(1, '#0066ff');
    } else {
        gradient.addColorStop(0, '#ff8844');
        gradient.addColorStop(1, '#ff4400');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(barrelX, barrelY, barrelWidth, barrelHeight);

    // Draw gun base/body
    ctx.fillStyle = playerObj.color;
    ctx.beginPath();
    ctx.moveTo(playerObj.x + 10, playerObj.y + 20);
    ctx.lineTo(playerObj.x + playerObj.width - 10, playerObj.y + 20);
    ctx.lineTo(playerObj.x + playerObj.width, playerObj.y + playerObj.height);
    ctx.lineTo(playerObj.x, playerObj.y + playerObj.height);
    ctx.closePath();
    ctx.fill();

    // Draw muzzle flash if recently shot
    if (playerObj.shootCooldown > 0) {
        ctx.fillStyle = playerObj.color === '#00d4ff' ? '#00ffff' : '#ffaa66';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(barrelX + barrelWidth / 2, barrelY, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.shadowBlur = 0;
}

// Update game state
function update() {
    if (!gameRunning) return;

    // Clear canvas with screen shake
    ctx.save();
    if (screenShake > 0) {
        ctx.translate(
            (Math.random() - 0.5) * screenShake,
            (Math.random() - 0.5) * screenShake
        );
        screenShake *= 0.9;
        if (screenShake < 0.1) screenShake = 0;
    }
    ctx.clearRect(-10, -10, canvas.width + 20, canvas.height + 20);

    // Spawn background particles for atmosphere
    if (Math.random() < 0.3) {
        backgroundParticles.push({
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            life: 1,
            color: Math.random() < 0.5 ? '#00d4ff' : '#ff6600'
        });
    }

    // Update and draw background particles
    backgroundParticles = backgroundParticles.filter(p => {
        p.y += p.speed;
        p.life -= 0.005;

        ctx.fillStyle = p.color === '#00d4ff'
            ? `rgba(0, 212, 255, ${p.life * 0.2})`
            : `rgba(255, 102, 0, ${p.life * 0.2})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        return p.y < canvas.height && p.life > 0;
    });
    ctx.shadowBlur = 0;

    // Update game time and difficulty
    gameTime++;
    difficultyMultiplier = 1 + (gameTime / 3600); // Increases every minute

    // Update cooldowns and power-ups
    if (player.shootCooldown > 0) player.shootCooldown--;
    if (player2.shootCooldown > 0) player2.shootCooldown--;
    if (player.rapidFire > 0) player.rapidFire--;
    if (player.shield > 0) player.shield--;
    if (player.doublePoints > 0) player.doublePoints--;
    if (player2.rapidFire > 0) player2.rapidFire--;
    if (player2.shield > 0) player2.shield--;
    if (player2.doublePoints > 0) player2.doublePoints--;

    // Update combo timers
    if (player.comboTimer > 0) {
        player.comboTimer--;
        if (player.comboTimer === 0) {
            player.combo = 0;
            player.multiplier = 1;
        }
    }
    if (player2.comboTimer > 0) {
        player2.comboTimer--;
        if (player2.comboTimer === 0) {
            player2.combo = 0;
            player2.multiplier = 1;
        }
    }

    // Move player 1
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    // Shoot player 1
    const shootCooldown1 = player.rapidFire > 0 ? 5 : 15;
    if (keys.shoot && player.canShoot && player.shootCooldown === 0) {
        bullets.push(new Bullet(
            player.x + player.width / 2 - 2,
            player.y,
            player.color
        ));
        player.shootCooldown = shootCooldown1;
        playShootSound();
    }

    // Move player 2 (if two player mode)
    if (gameMode === 'two') {
        if (keys.player2Left && player2.x > 0) {
            player2.x -= player2.speed;
        }
        if (keys.player2Right && player2.x < canvas.width - player2.width) {
            player2.x += player2.speed;
        }

        // Shoot player 2
        const shootCooldown2 = player2.rapidFire > 0 ? 5 : 15;
        if (keys.player2Shoot && player2.canShoot && player2.shootCooldown === 0) {
            bullets.push(new Bullet(
                player2.x + player2.width / 2 - 2,
                player2.y,
                player2.color
            ));
            player2.shootCooldown = shootCooldown2;
            playShootSound();
        }
    }

    // Spawn new targets (BALANCED)
    if (Math.random() < 0.018 * difficultyMultiplier) {
        const isGood = Math.random() < 0.7; // 70% chance of blue target
        targets.push(new Target(isGood, difficultyMultiplier));
    }

    // Spawn power-ups MORE FREQUENTLY!
    if (Math.random() < 0.005) {
        const types = ['rapidfire', 'shield', 'doublepoints'];
        const type = types[Math.floor(Math.random() * types.length)];
        powerUps.push(new PowerUp(
            Math.random() * (canvas.width - 30),
            -30,
            type
        ));
    }

    // Update and draw targets
    targets = targets.filter(target => {
        target.update();
        target.draw();
        return !target.isOffScreen();
    });

    // Update and draw power-ups
    powerUps = powerUps.filter(powerUp => {
        powerUp.update();
        powerUp.draw();

        // Check collision with players
        if (powerUp.collidesWith(player)) {
            activatePowerUp(player, powerUp.type);
            createScorePopup(player.x + player.width / 2, player.y - 20, 'POWER UP!', '#ffff00');
            playPowerUpSound();
            return false;
        }
        if (gameMode === 'two' && powerUp.collidesWith(player2)) {
            activatePowerUp(player2, powerUp.type);
            createScorePopup(player2.x + player2.width / 2, player2.y - 20, 'POWER UP!', '#ffff00');
            playPowerUpSound();
            return false;
        }

        return !powerUp.isOffScreen();
    });

    // Update and draw bullets
    bullets = bullets.filter(bullet => {
        bullet.update();
        bullet.draw();

        // Check bullet collision with targets
        let hit = false;
        targets = targets.filter(target => {
            if (bullet.collidesWith(target)) {
                hit = true;
                const bulletColor = bullet.color;

                // Create MASSIVE explosion
                explosions.push(new Explosion(
                    target.x + target.width / 2,
                    target.y + target.height / 2,
                    target.isGood ? 'blue' : 'red'
                ));
                screenShake = target.isGood ? 10 : 15; // MORE SHAKE!
                playExplosionSound();
                playHitSound(target.isGood);

                // Determine which player shot the bullet
                if (bulletColor === player.color) {
                    if (target.isGood) {
                        // Increase combo
                        player.combo++;
                        player.comboTimer = 120; // 2 seconds
                        player.multiplier = Math.min(1 + Math.floor(player.combo / 3), 5);

                        const points = 10 * player.multiplier * (player.doublePoints > 0 ? 2 : 1);
                        score += points;
                        scoreDisplay.textContent = score;
                        createScorePopup(target.x + target.width / 2, target.y, `+${points}`, '#00ff00');
                    } else {
                        // Break combo
                        player.combo = 0;
                        player.multiplier = 1;
                        player.comboTimer = 0;

                        if (player.shield > 0) {
                            player.shield = 0;
                            createScorePopup(target.x + target.width / 2, target.y, 'SHIELD!', '#00ff00');
                        } else {
                            lives--;
                            livesDisplay.textContent = lives;
                            createScorePopup(target.x + target.width / 2, target.y, '-1 ❤️', '#ff0000');
                            if (lives <= 0 && (gameMode === 'single' || lives2 <= 0)) {
                                endGame();
                            }
                        }
                    }
                } else if (gameMode === 'two' && bulletColor === player2.color) {
                    if (target.isGood) {
                        // Increase combo
                        player2.combo++;
                        player2.comboTimer = 120;
                        player2.multiplier = Math.min(1 + Math.floor(player2.combo / 3), 5);

                        const points = 10 * player2.multiplier * (player2.doublePoints > 0 ? 2 : 1);
                        score2 += points;
                        score2Display.textContent = score2;
                        createScorePopup(target.x + target.width / 2, target.y, `+${points}`, '#00ff00');
                    } else {
                        // Break combo
                        player2.combo = 0;
                        player2.multiplier = 1;
                        player2.comboTimer = 0;

                        if (player2.shield > 0) {
                            player2.shield = 0;
                            createScorePopup(target.x + target.width / 2, target.y, 'SHIELD!', '#00ff00');
                        } else {
                            lives2--;
                            lives2Display.textContent = lives2;
                            createScorePopup(target.x + target.width / 2, target.y, '-1 ❤️', '#ff0000');
                            if (lives2 <= 0 && lives <= 0) {
                                endGame();
                            }
                        }
                    }
                }

                return false; // Remove target
            }
            return true;
        });

        return !hit && !bullet.isOffScreen();
    });

    // Update and draw explosions
    explosions = explosions.filter(explosion => {
        explosion.update();
        explosion.draw();
        return !explosion.isDead();
    });

    // Update and draw enemy bullets
    enemyBullets = enemyBullets.filter(bullet => {
        bullet.update();
        bullet.draw();

        // Check collision with player 1
        if (lives > 0 && bullet.collidesWith(player)) {
            explosions.push(new Explosion(bullet.x, bullet.y, 'red'));
            screenShake = 8;
            playExplosionSound();

            if (player.shield > 0) {
                player.shield = 0;
                createScorePopup(player.x + player.width / 2, player.y, 'SHIELD!', '#00ff00');
            } else {
                lives--;
                livesDisplay.textContent = lives;
                createScorePopup(player.x + player.width / 2, player.y, 'HIT!', '#ff0000');
                playHitSound(false);

                // Break combo
                player.combo = 0;
                player.multiplier = 1;
                player.comboTimer = 0;

                if (lives <= 0 && (gameMode === 'single' || lives2 <= 0)) {
                    endGame();
                }
            }
            return false;
        }

        // Check collision with player 2
        if (gameMode === 'two' && lives2 > 0 && bullet.collidesWith(player2)) {
            explosions.push(new Explosion(bullet.x, bullet.y, 'red'));
            screenShake = 8;
            playExplosionSound();

            if (player2.shield > 0) {
                player2.shield = 0;
                createScorePopup(player2.x + player2.width / 2, player2.y, 'SHIELD!', '#00ff00');
            } else {
                lives2--;
                lives2Display.textContent = lives2;
                createScorePopup(player2.x + player2.width / 2, player2.y, 'HIT!', '#ff0000');
                playHitSound(false);

                // Break combo
                player2.combo = 0;
                player2.multiplier = 1;
                player2.comboTimer = 0;

                if (lives2 <= 0 && lives <= 0) {
                    endGame();
                }
            }
            return false;
        }

        return !bullet.isOffScreen();
    });

    // Draw players
    if (lives > 0) {
        drawPlayer(player);
        drawPlayerEffects(player);
    }
    if (gameMode === 'two' && lives2 > 0) {
        drawPlayer(player2);
        drawPlayerEffects(player2);
    }

    // Draw MASSIVE combo indicators with pulsing effect
    if (player.combo > 2) {
        const pulse = Math.sin(Date.now() / 100) * 3 + 27;
        ctx.fillStyle = '#ffff00';
        ctx.font = `bold ${pulse}px Arial`;
        ctx.textAlign = 'center';
        ctx.shadowBlur = 20 + Math.sin(Date.now() / 100) * 5;
        ctx.shadowColor = '#ffff00';
        ctx.fillText(`x${player.multiplier} COMBO!`, player.x + player.width / 2, player.y - 35);

        // Add glow rings
        ctx.strokeStyle = `rgba(255, 255, 0, ${0.3 + Math.sin(Date.now() / 100) * 0.2})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 40 + Math.sin(Date.now() / 100) * 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }
    if (gameMode === 'two' && player2.combo > 2) {
        const pulse = Math.sin(Date.now() / 100) * 3 + 27;
        ctx.fillStyle = '#ffaa00';
        ctx.font = `bold ${pulse}px Arial`;
        ctx.textAlign = 'center';
        ctx.shadowBlur = 20 + Math.sin(Date.now() / 100) * 5;
        ctx.shadowColor = '#ffaa00';
        ctx.fillText(`x${player2.multiplier} COMBO!`, player2.x + player2.width / 2, player2.y - 35);

        // Add glow rings
        ctx.strokeStyle = `rgba(255, 170, 0, ${0.3 + Math.sin(Date.now() / 100) * 0.2})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player2.x + player2.width / 2, player2.y + player2.height / 2, 40 + Math.sin(Date.now() / 100) * 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
    }

    ctx.restore();

    // Continue game loop
    if (gameRunning) {
        animationId = requestAnimationFrame(update);
    }
}

// Draw player effects (shield, rapid fire glow)
function drawPlayerEffects(playerObj) {
    // Shield effect
    if (playerObj.shield > 0) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ff00';
        ctx.beginPath();
        ctx.arc(
            playerObj.x + playerObj.width / 2,
            playerObj.y + playerObj.height / 2,
            40 + Math.sin(Date.now() / 100) * 3,
            0,
            Math.PI * 2
        );
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // Rapid fire effect
    if (playerObj.rapidFire > 0) {
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffff00';
        ctx.strokeRect(
            playerObj.x - 5,
            playerObj.y - 5,
            playerObj.width + 10,
            playerObj.height + 10
        );
        ctx.shadowBlur = 0;
    }

    // Double points effect
    if (playerObj.doublePoints > 0) {
        ctx.fillStyle = '#ff00ff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff00ff';
        ctx.fillText('x2', playerObj.x + playerObj.width / 2, playerObj.y + playerObj.height + 20);
        ctx.shadowBlur = 0;
    }
}

// Activate power-up
function activatePowerUp(playerObj, type) {
    if (type === 'rapidfire') {
        playerObj.rapidFire = 300; // 5 seconds
    } else if (type === 'shield') {
        playerObj.shield = 1; // Blocks one hit
    } else if (type === 'doublepoints') {
        playerObj.doublePoints = 360; // 6 seconds
    }
}

// Create score popup effect
function createScorePopup(x, y, text, color) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'absolute';
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.color = color;
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
    score2 = 0;
    lives2 = 3;
    targets = [];
    bullets = [];
    enemyBullets = [];
    powerUps = [];
    explosions = [];
    backgroundParticles = [];
    gameTime = 0;
    difficultyMultiplier = 1;
    screenShake = 0;

    // Start background music
    startBackgroundMusic();

    // Reset player states
    player.shootCooldown = 0;
    player.rapidFire = 0;
    player.shield = 0;
    player.doublePoints = 0;
    player.combo = 0;
    player.comboTimer = 0;
    player.multiplier = 1;

    player2.shootCooldown = 0;
    player2.rapidFire = 0;
    player2.shield = 0;
    player2.doublePoints = 0;
    player2.combo = 0;
    player2.comboTimer = 0;
    player2.multiplier = 1;

    // Position players based on mode
    if (gameMode === 'single') {
        player.x = canvas.width / 2 - 25;
    } else {
        player.x = canvas.width / 4 - 25;
        player2.x = (canvas.width * 3) / 4 - 25;
    }

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    score2Display.textContent = score2;
    lives2Display.textContent = lives2;
    gameOverlay.style.display = 'none';

    update();
}

// Select game mode
function selectMode(mode) {
    gameMode = mode;
    modeSelect.style.display = 'none';
    gameOverlay.style.display = 'flex';

    if (mode === 'two') {
        player2Stats.style.display = 'flex';
        gameOverlay.querySelector('p:first-of-type').textContent = 'P1: A/D + SPACE | P2: J/L + SHIFT - Dodge enemy fire!';
    } else {
        player2Stats.style.display = 'none';
        gameOverlay.querySelector('p:first-of-type').textContent = 'Move: A/D or Arrows | Shoot: SPACE - Dodge enemy fire!';
    }
}

// Mode selection buttons
singlePlayerBtn.addEventListener('click', () => selectMode('single'));
twoPlayerBtn.addEventListener('click', () => selectMode('two'));

// End game
function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    // Stop background music
    stopBackgroundMusic();

    // Check and update highscore
    const finalScore = gameMode === 'two' ? Math.max(score, score2) : score;
    if (finalScore > highscore) {
        highscore = finalScore;
        saveHighscore();
    }

    gameOverlay.style.display = 'flex';
    gameOverlay.querySelector('h3').textContent = 'Game Over!';

    if (gameMode === 'two') {
        let winner = '';
        if (score > score2) {
            winner = 'Player 1 Wins!';
        } else if (score2 > score) {
            winner = 'Player 2 Wins!';
        } else {
            winner = 'It\'s a Tie!';
        }
        gameOverlay.querySelector('p:first-of-type').textContent = `P1: ${score} | P2: ${score2} | Best: ${highscore}`;
        gameOverlay.querySelector('p:last-of-type').textContent = winner;
    } else {
        const isNewHighscore = score === highscore && score > 0;
        gameOverlay.querySelector('p:first-of-type').textContent = `Final Score: ${score}` + (isNewHighscore ? ' 🏆 NEW HIGHSCORE!' : '');

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
    }

    startButton.textContent = 'Play Again';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    // Player 1 controls
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = true;
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Prevent page scroll
        keys.shoot = true;
    }

    // Player 2 controls
    if (gameMode === 'two') {
        if (e.key === 'j' || e.key === 'J') {
            keys.player2Left = true;
        }
        if (e.key === 'l' || e.key === 'L') {
            keys.player2Right = true;
        }
        if (e.key === 'Shift') {
            keys.player2Shoot = true;
        }
    }
});

document.addEventListener('keyup', (e) => {
    // Player 1 controls
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keys.left = false;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keys.right = false;
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
        keys.shoot = false;
    }

    // Player 2 controls
    if (gameMode === 'two') {
        if (e.key === 'j' || e.key === 'J') {
            keys.player2Left = false;
        }
        if (e.key === 'l' || e.key === 'L') {
            keys.player2Right = false;
        }
        if (e.key === 'Shift') {
            keys.player2Shoot = false;
        }
    }
});

// Start button
startButton.addEventListener('click', startGame);

// Mute button
const muteButton = document.getElementById('muteButton');
if (muteButton) {
    muteButton.addEventListener('click', toggleMute);
}

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;
let touchMoved = false;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    touchMoved = true;
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

canvas.addEventListener('touchend', (e) => {
    // If tap (not swipe), shoot
    if (!touchMoved) {
        keys.shoot = true;
        setTimeout(() => keys.shoot = false, 50);
    }

    keys.left = false;
    keys.right = false;
    touchMoved = false;
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

// Load highscore when page loads
loadHighscore();

// ===============================================
// INFERNO ARENA - Second Game
// ===============================================

const arenaCanvas = document.getElementById('arenaCanvas');
const arenaCtx = arenaCanvas.getContext('2d');
const arenaStartButton = document.getElementById('arenaStartButton');
const arenaOverlay = document.getElementById('arenaOverlay');
const arenaScoreDisplay = document.getElementById('arenaScore');
const arenaHPDisplay = document.getElementById('arenaHP');
const arenaWaveDisplay = document.getElementById('arenaWave');
const arenaHighscoreDisplay = document.getElementById('arenaHighscore');

let arenaRunning = false;
let arenaScore = 0;
let arenaHP = 100;
let arenaWave = 1;
let arenaKills = 0;
let arenaKillsNeeded = 15;
let arenaHighscore = 0;
let arenaAnimationId;
let arenaEnemies = [];
let arenaBullets = [];
let arenaEnemyBullets = [];
let arenaHealthPacks = [];
let arenaPowerUps = [];
let arenaExplosions = [];
let arenaParticles = [];
let arenaTime = 0;
let arenaSpawnTimer = 0;
let arenaMouseX = 0;
let arenaMouseY = 0;
let arenaMouseDown = false;
let arenaShootCooldown = 0;
let arenaScreenShake = 0;
let arenaCombo = 0;
let arenaComboTimer = 0;
let arenaMultiplier = 1;
let arenaBossActive = false;
let arenaBossDefeated = false;

const arenaKeys = {
    w: false,
    a: false,
    s: false,
    d: false
};

let arenaPlayer = {
    x: arenaCanvas.width / 2,
    y: arenaCanvas.height / 2,
    radius: 15,
    baseRadius: 15,
    speed: 3.5,
    baseSpeed: 3.5,
    angle: 0,
    speedBoost: 0,
    rapidFire: 0,
    tripleShot: 0,
    level: 1,
    xp: 0,
    xpNeeded: 100,
    maxHP: 100,
    gunCount: 1
};

// Load arena highscore
function loadArenaHighscore() {
    const saved = localStorage.getItem('infernoArenaHighscore');
    if (saved) {
        arenaHighscore = parseInt(saved);
        arenaHighscoreDisplay.textContent = arenaHighscore;
    }
}

// Save arena highscore
function saveArenaHighscore() {
    localStorage.setItem('infernoArenaHighscore', arenaHighscore.toString());
    arenaHighscoreDisplay.textContent = arenaHighscore;
}

// Arena Enemy Class
class ArenaEnemy {
    constructor(type, wave) {
        this.type = type; // 'fast', 'tank', 'shooter', or 'boss'
        this.wave = wave; // Store wave for bullet speed scaling

        // Set radius based on type
        if (type === 'boss') {
            this.radius = 60 + (wave * 3); // MASSIVE and grows with wave
        } else if (type === 'tank') {
            this.radius = 20;
        } else if (type === 'shooter') {
            this.radius = 15;
        } else {
            this.radius = 12;
        }

        // Spawn from random edge
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { // Top
            this.x = Math.random() * arenaCanvas.width;
            this.y = -this.radius;
        } else if (edge === 1) { // Right
            this.x = arenaCanvas.width + this.radius;
            this.y = Math.random() * arenaCanvas.height;
        } else if (edge === 2) { // Bottom
            this.x = Math.random() * arenaCanvas.width;
            this.y = arenaCanvas.height + this.radius;
        } else { // Left
            this.x = -this.radius;
            this.y = Math.random() * arenaCanvas.height;
        }

        // Set stats based on type (SCALES WITH WAVE - BALANCED SPEED)
        if (type === 'boss') {
            this.speed = 0.6 + (wave * 0.06); // SLOW but MASSIVE
            this.hp = 30 + (wave * 8); // MUCH more HP
            this.color = '#ff00ff';
            this.canShoot = true;
            this.shootTimer = Math.max(25, 60 - (wave * 2));
            this.damage = 15 + (wave * 3); // More damage
            this.xpValue = 100 + (wave * 20); // More XP reward
        } else if (type === 'shooter') {
            this.speed = 0.9 + (wave * 0.1);
            this.hp = 3 + Math.floor(wave / 3);
            this.color = '#ffaa00';
            this.canShoot = true;
            this.shootTimer = Math.max(25, Math.floor(Math.random() * 60) + 50 - (wave * 3));
            this.damage = 8 + Math.floor(wave / 2);
            this.xpValue = 15 + (wave * 2);
        } else if (type === 'tank') {
            this.speed = 1.1 + (wave * 0.12);
            this.hp = 4 + Math.floor(wave / 2);
            this.color = '#0066ff';
            this.canShoot = false;
            this.damage = 10 + Math.floor(wave / 2);
            this.xpValue = 12 + wave;
        } else { // fast
            this.speed = 1.6 + (wave * 0.18);
            this.hp = 1 + Math.floor(wave / 5);
            this.color = '#ff3300';
            this.canShoot = false;
            this.damage = 5 + Math.floor(wave / 3);
            this.xpValue = 8 + wave;
        }

        this.maxHP = this.hp;
        this.angle = 0;
        this.shootCooldown = 0;
    }

    update() {
        // Move towards player
        const dx = arenaPlayer.x - this.x;
        const dy = arenaPlayer.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Shooter enemies keep distance
        const targetDist = (this.type === 'shooter' || this.type === 'boss') ? 150 : 0;

        if (dist > targetDist) {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
            this.angle = Math.atan2(dy, dx);
        } else if (this.type === 'shooter' || this.type === 'boss') {
            // Move away if too close
            if (dist < targetDist - 20) {
                this.x -= (dx / dist) * this.speed;
                this.y -= (dy / dist) * this.speed;
            }
            this.angle = Math.atan2(dy, dx);
        }

        // Shooting logic
        if (this.canShoot) {
            this.shootTimer--;
            this.shootCooldown = Math.max(0, this.shootCooldown - 1);

            if (this.shootTimer <= 0 && this.shootCooldown === 0) {
                // Shoot at player
                const bulletAngle = Math.atan2(arenaPlayer.y - this.y, arenaPlayer.x - this.x);

                if (this.type === 'boss') {
                    // Boss shoots 8 bullets in a wide spread (MASSIVE FIREPOWER)
                    for (let i = -3; i <= 4; i++) {
                        arenaEnemyBullets.push(new ArenaEnemyBullet(
                            this.x + Math.cos(bulletAngle) * this.radius,
                            this.y + Math.sin(bulletAngle) * this.radius,
                            bulletAngle + (i * 0.2),
                            this.wave
                        ));
                    }
                } else {
                    // Regular shooter
                    arenaEnemyBullets.push(new ArenaEnemyBullet(
                        this.x + Math.cos(bulletAngle) * this.radius,
                        this.y + Math.sin(bulletAngle) * this.radius,
                        bulletAngle,
                        this.wave
                    ));
                }

                this.shootTimer = this.type === 'boss' ? 40 : Math.floor(Math.random() * 40) + 30;
                this.shootCooldown = 8;
            }
        }

        // Create trail particles
        if (Math.random() > 0.7) {
            arenaParticles.push({
                x: this.x,
                y: this.y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1,
                size: Math.random() * (this.type === 'boss' ? 5 : 3) + 1,
                color: this.color
            });
        }
    }

    draw() {
        arenaCtx.save();
        arenaCtx.translate(this.x, this.y);
        arenaCtx.rotate(this.angle);

        // Draw enemy with different visuals
        const gradient = arenaCtx.createRadialGradient(0, 0, 0, 0, 0, this.radius);

        if (this.type === 'boss') {
            // MASSIVE WARRIOR BOSS
            const pulse = Math.sin(Date.now() / 200) * 8;
            arenaCtx.shadowBlur = 40 + pulse;
            arenaCtx.shadowColor = '#ff00ff';

            // Draw main body (armored core)
            const bodyGradient = arenaCtx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 0.7);
            bodyGradient.addColorStop(0, '#ffff00');
            bodyGradient.addColorStop(0.4, '#ff00ff');
            bodyGradient.addColorStop(1, '#660066');
            arenaCtx.fillStyle = bodyGradient;
            arenaCtx.beginPath();
            arenaCtx.arc(0, 0, this.radius * 0.7, 0, Math.PI * 2);
            arenaCtx.fill();

            // Draw armor plates (hexagonal)
            arenaCtx.strokeStyle = '#ffaa00';
            arenaCtx.lineWidth = 4;
            arenaCtx.shadowBlur = 20;
            for (let ring = 0; ring < 3; ring++) {
                arenaCtx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const radius = (this.radius * 0.4) + (ring * 12);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) arenaCtx.moveTo(x, y);
                    else arenaCtx.lineTo(x, y);
                }
                arenaCtx.closePath();
                arenaCtx.stroke();
            }

            // Draw massive shoulder spikes
            arenaCtx.fillStyle = '#ff0000';
            arenaCtx.shadowColor = '#ff0000';
            arenaCtx.shadowBlur = 25;
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12;
                const innerR = this.radius * 0.7;
                const outerR = this.radius + 15 + pulse;

                arenaCtx.beginPath();
                arenaCtx.moveTo(Math.cos(angle - 0.1) * innerR, Math.sin(angle - 0.1) * innerR);
                arenaCtx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
                arenaCtx.lineTo(Math.cos(angle + 0.1) * innerR, Math.sin(angle + 0.1) * innerR);
                arenaCtx.closePath();
                arenaCtx.fill();
            }

            // Draw weapons (rotating blades)
            arenaCtx.fillStyle = '#ffffff';
            arenaCtx.strokeStyle = '#ffff00';
            arenaCtx.lineWidth = 5;
            arenaCtx.shadowColor = '#ffff00';
            arenaCtx.shadowBlur = 30;

            const bladeRotation = (Date.now() / 500);
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) + bladeRotation;
                arenaCtx.save();
                arenaCtx.rotate(angle);

                // Blade
                arenaCtx.beginPath();
                arenaCtx.moveTo(this.radius * 0.3, -8);
                arenaCtx.lineTo(this.radius * 1.2, -4);
                arenaCtx.lineTo(this.radius * 1.3, 0);
                arenaCtx.lineTo(this.radius * 1.2, 4);
                arenaCtx.lineTo(this.radius * 0.3, 8);
                arenaCtx.closePath();
                arenaCtx.fill();
                arenaCtx.stroke();

                arenaCtx.restore();
            }

            // Draw crown/helmet
            arenaCtx.fillStyle = '#ffaa00';
            arenaCtx.strokeStyle = '#ff0000';
            arenaCtx.lineWidth = 3;
            arenaCtx.shadowColor = '#ffaa00';
            arenaCtx.shadowBlur = 20;
            for (let i = 0; i < 5; i++) {
                const angle = -Math.PI / 2 + (i - 2) * 0.4;
                const baseX = Math.cos(angle) * (this.radius * 0.7);
                const baseY = Math.sin(angle) * (this.radius * 0.7);
                const tipX = Math.cos(angle) * (this.radius * 0.9);
                const tipY = Math.sin(angle) * (this.radius * 0.9);

                arenaCtx.beginPath();
                arenaCtx.moveTo(baseX - 8, baseY);
                arenaCtx.lineTo(tipX, tipY);
                arenaCtx.lineTo(baseX + 8, baseY);
                arenaCtx.closePath();
                arenaCtx.fill();
                arenaCtx.stroke();
            }

            // Reset shadow
            arenaCtx.shadowBlur = 0;
        } else if (this.type === 'shooter') {
            // Shooter has gun
            gradient.addColorStop(0, '#ffff88');
            gradient.addColorStop(1, this.color);
            arenaCtx.fillStyle = gradient;
            arenaCtx.shadowBlur = 15;
            arenaCtx.shadowColor = this.color;
            arenaCtx.beginPath();
            arenaCtx.arc(0, 0, this.radius, 0, Math.PI * 2);
            arenaCtx.fill();

            // Draw gun
            arenaCtx.fillStyle = '#333333';
            arenaCtx.shadowBlur = 5;
            arenaCtx.fillRect(this.radius / 2, -4, this.radius, 8);
        } else if (this.type === 'tank') {
            gradient.addColorStop(0, '#88ccff');
            gradient.addColorStop(1, '#003399');
            arenaCtx.fillStyle = gradient;
            arenaCtx.shadowBlur = 15;
            arenaCtx.shadowColor = this.color;
            arenaCtx.beginPath();
            arenaCtx.arc(0, 0, this.radius, 0, Math.PI * 2);
            arenaCtx.fill();
        } else { // fast
            gradient.addColorStop(0, '#ffaa00');
            gradient.addColorStop(1, '#990000');
            arenaCtx.fillStyle = gradient;
            arenaCtx.shadowBlur = 15;
            arenaCtx.shadowColor = this.color;
            arenaCtx.beginPath();
            arenaCtx.arc(0, 0, this.radius, 0, Math.PI * 2);
            arenaCtx.fill();
        }

        // Draw eyes/direction indicator
        if (this.type === 'boss') {
            // Glowing red eyes for boss
            arenaCtx.fillStyle = '#ff0000';
            arenaCtx.shadowBlur = 20;
            arenaCtx.shadowColor = '#ff0000';
            arenaCtx.beginPath();
            arenaCtx.arc(this.radius / 4, -10, 8, 0, Math.PI * 2);
            arenaCtx.fill();
            arenaCtx.beginPath();
            arenaCtx.arc(this.radius / 4, 10, 8, 0, Math.PI * 2);
            arenaCtx.fill();
            arenaCtx.shadowBlur = 0;
        } else {
            arenaCtx.fillStyle = '#ffffff';
            arenaCtx.shadowBlur = 0;
            arenaCtx.beginPath();
            arenaCtx.arc(this.radius / 3, 0, 3, 0, Math.PI * 2);
            arenaCtx.fill();
        }

        arenaCtx.restore();

        // Draw HP bar
        if ((this.type === 'tank' || this.type === 'boss' || this.type === 'shooter') && this.hp < this.maxHP) {
            arenaCtx.fillStyle = '#ff0000';
            arenaCtx.fillRect(this.x - this.radius, this.y - this.radius - 10, this.radius * 2, 5);
            arenaCtx.fillStyle = '#00ff00';
            arenaCtx.fillRect(this.x - this.radius, this.y - this.radius - 10, (this.radius * 2) * (this.hp / this.maxHP), 5);
        }
    }

    collidesWithPlayer() {
        const dx = this.x - arenaPlayer.x;
        const dy = this.y - arenaPlayer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + arenaPlayer.radius;
    }

    hit() {
        this.hp--;
        return this.hp <= 0;
    }
}

// Arena Bullet Class
class ArenaBullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 12;
        this.radius = 4;
        this.life = 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 0.02;
    }

    draw() {
        arenaCtx.fillStyle = `rgba(255, 200, 0, ${this.life})`;
        arenaCtx.shadowBlur = 15;
        arenaCtx.shadowColor = '#ffaa00';
        arenaCtx.beginPath();
        arenaCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        arenaCtx.fill();
        arenaCtx.shadowBlur = 0;

        // Bullet trail
        arenaCtx.fillStyle = `rgba(255, 100, 0, ${this.life * 0.5})`;
        arenaCtx.beginPath();
        arenaCtx.arc(
            this.x - Math.cos(this.angle) * 10,
            this.y - Math.sin(this.angle) * 10,
            this.radius / 2,
            0,
            Math.PI * 2
        );
        arenaCtx.fill();
    }

    isOffScreen() {
        return this.x < 0 || this.x > arenaCanvas.width ||
               this.y < 0 || this.y > arenaCanvas.height ||
               this.life <= 0;
    }

    collidesWithEnemy(enemy) {
        const dx = this.x - enemy.x;
        const dy = this.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + enemy.radius;
    }
}

// Health Pack Class
class HealthPack {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.pulse = 0;
        this.life = 600; // 10 seconds
    }

    update() {
        this.pulse += 0.1;
        this.life--;
    }

    draw() {
        const pulseSize = Math.sin(this.pulse) * 3;
        arenaCtx.fillStyle = '#00ff00';
        arenaCtx.shadowBlur = 20 + pulseSize;
        arenaCtx.shadowColor = '#00ff00';
        arenaCtx.beginPath();
        arenaCtx.arc(this.x, this.y, this.radius + pulseSize, 0, Math.PI * 2);
        arenaCtx.fill();

        // Draw cross
        arenaCtx.strokeStyle = '#ffffff';
        arenaCtx.lineWidth = 3;
        arenaCtx.shadowBlur = 0;
        arenaCtx.beginPath();
        arenaCtx.moveTo(this.x - 8, this.y);
        arenaCtx.lineTo(this.x + 8, this.y);
        arenaCtx.moveTo(this.x, this.y - 8);
        arenaCtx.lineTo(this.x, this.y + 8);
        arenaCtx.stroke();
    }

    collidesWithPlayer() {
        const dx = this.x - arenaPlayer.x;
        const dy = this.y - arenaPlayer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + arenaPlayer.radius;
    }

    isExpired() {
        return this.life <= 0;
    }
}

// Arena Enemy Bullet Class
class ArenaEnemyBullet {
    constructor(x, y, angle, wave = 1) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 7 + (wave * 0.3);
        this.radius = 6;
        this.life = 1;
        this.damage = 8 + Math.floor(wave / 2);
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 0.015;
    }

    draw() {
        arenaCtx.fillStyle = `rgba(255, 50, 0, ${this.life})`;
        arenaCtx.shadowBlur = 15;
        arenaCtx.shadowColor = '#ff3300';
        arenaCtx.beginPath();
        arenaCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        arenaCtx.fill();
        arenaCtx.shadowBlur = 0;
    }

    isOffScreen() {
        return this.x < 0 || this.x > arenaCanvas.width ||
               this.y < 0 || this.y > arenaCanvas.height ||
               this.life <= 0;
    }

    collidesWithPlayer() {
        const dx = this.x - arenaPlayer.x;
        const dy = this.y - arenaPlayer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + arenaPlayer.radius;
    }
}

// Arena Power-Up Class
class ArenaPowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.type = type; // 'speed', 'rapidfire', 'tripleshot'
        this.pulse = 0;
        this.life = 600;
    }

    update() {
        this.pulse += 0.1;
        this.life--;
    }

    draw() {
        const pulseSize = Math.sin(this.pulse) * 3;

        if (this.type === 'speed') {
            arenaCtx.fillStyle = '#00ffff';
            arenaCtx.shadowColor = '#00ffff';
        } else if (this.type === 'rapidfire') {
            arenaCtx.fillStyle = '#ffff00';
            arenaCtx.shadowColor = '#ffff00';
        } else { // tripleshot
            arenaCtx.fillStyle = '#ff00ff';
            arenaCtx.shadowColor = '#ff00ff';
        }

        arenaCtx.shadowBlur = 20 + pulseSize;
        arenaCtx.beginPath();
        arenaCtx.arc(this.x, this.y, this.radius + pulseSize, 0, Math.PI * 2);
        arenaCtx.fill();

        arenaCtx.shadowBlur = 0;
        arenaCtx.fillStyle = '#ffffff';
        arenaCtx.font = 'bold 18px Arial';
        arenaCtx.textAlign = 'center';
        arenaCtx.textBaseline = 'middle';

        if (this.type === 'speed') {
            arenaCtx.fillText('>>>', this.x, this.y);
        } else if (this.type === 'rapidfire') {
            arenaCtx.fillText('⚡', this.x, this.y);
        } else {
            arenaCtx.fillText('×3', this.x, this.y);
        }
    }

    collidesWithPlayer() {
        const dx = this.x - arenaPlayer.x;
        const dy = this.y - arenaPlayer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + arenaPlayer.radius;
    }

    isExpired() {
        return this.life <= 0;
    }
}

// Level up player
function levelUpPlayer() {
    arenaPlayer.level++;
    arenaPlayer.xp = 0;
    arenaPlayer.xpNeeded = Math.floor(arenaPlayer.xpNeeded * 1.5);

    // Grow bigger
    arenaPlayer.radius = arenaPlayer.baseRadius + (arenaPlayer.level * 2);

    // Add more guns every 2 levels
    if (arenaPlayer.level % 2 === 0) {
        arenaPlayer.gunCount = Math.min(arenaPlayer.gunCount + 1, 5);
    }

    // Increase max HP
    arenaPlayer.maxHP += 20;
    arenaHP = Math.min(arenaHP + 20, arenaPlayer.maxHP);
    arenaHPDisplay.textContent = arenaHP;

    // Increase speed slightly
    arenaPlayer.baseSpeed += 0.3;
    arenaPlayer.speed = arenaPlayer.baseSpeed;

    createArenaPopup(`⬆️ LEVEL ${arenaPlayer.level}! ⬆️`, '#ffff00', arenaPlayer.x, arenaPlayer.y - 50);
    playPowerUpSound();
}

// Draw arena player
function drawArenaPlayer() {
    arenaCtx.save();
    arenaCtx.translate(arenaPlayer.x, arenaPlayer.y);
    arenaCtx.rotate(arenaPlayer.angle);

    // Draw player body
    const gradient = arenaCtx.createRadialGradient(0, 0, 0, 0, 0, arenaPlayer.radius);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#0088ff');

    arenaCtx.fillStyle = gradient;
    arenaCtx.shadowBlur = 20 + (arenaPlayer.level * 2);
    arenaCtx.shadowColor = '#00ffff';
    arenaCtx.beginPath();
    arenaCtx.arc(0, 0, arenaPlayer.radius, 0, Math.PI * 2);
    arenaCtx.fill();

    // Draw multiple guns based on gunCount
    arenaCtx.fillStyle = '#ffffff';
    arenaCtx.shadowBlur = 10;

    for (let i = 0; i < arenaPlayer.gunCount; i++) {
        const offset = arenaPlayer.gunCount > 1 ? ((i - (arenaPlayer.gunCount - 1) / 2) * 8) : 0;
        arenaCtx.fillRect(arenaPlayer.radius / 2, offset - 3, arenaPlayer.radius, 6);
    }

    // Muzzle flash
    if (arenaShootCooldown > 8) {
        arenaCtx.fillStyle = '#ffff00';
        arenaCtx.shadowBlur = 25;
        arenaCtx.shadowColor = '#ffff00';
        for (let i = 0; i < arenaPlayer.gunCount; i++) {
            const offset = arenaPlayer.gunCount > 1 ? ((i - (arenaPlayer.gunCount - 1) / 2) * 8) : 0;
            arenaCtx.beginPath();
            arenaCtx.arc(arenaPlayer.radius * 1.5, offset, 5, 0, Math.PI * 2);
            arenaCtx.fill();
        }
    }

    arenaCtx.restore();
}

// Update arena game
function updateArena() {
    if (!arenaRunning) return;

    arenaCtx.save();

    // Screen shake
    if (arenaScreenShake > 0) {
        arenaCtx.translate(
            (Math.random() - 0.5) * arenaScreenShake,
            (Math.random() - 0.5) * arenaScreenShake
        );
        arenaScreenShake *= 0.9;
        if (arenaScreenShake < 0.1) arenaScreenShake = 0;
    }

    // Clear canvas
    arenaCtx.fillStyle = '#1a0a0a';
    arenaCtx.fillRect(0, 0, arenaCanvas.width, arenaCanvas.height);

    // Draw arena border
    arenaCtx.strokeStyle = '#ff3300';
    arenaCtx.lineWidth = 3;
    arenaCtx.shadowBlur = 15;
    arenaCtx.shadowColor = '#ff3300';
    arenaCtx.strokeRect(10, 10, arenaCanvas.width - 20, arenaCanvas.height - 20);
    arenaCtx.shadowBlur = 0;

    arenaTime++;
    if (arenaShootCooldown > 0) arenaShootCooldown--;

    // Move player
    let moveX = 0;
    let moveY = 0;
    if (arenaKeys.w) moveY -= 1;
    if (arenaKeys.s) moveY += 1;
    if (arenaKeys.a) moveX -= 1;
    if (arenaKeys.d) moveX += 1;

    // Normalize diagonal movement
    if (moveX !== 0 && moveY !== 0) {
        moveX *= 0.707;
        moveY *= 0.707;
    }

    arenaPlayer.x += moveX * arenaPlayer.speed;
    arenaPlayer.y += moveY * arenaPlayer.speed;

    // Keep player in bounds
    arenaPlayer.x = Math.max(arenaPlayer.radius + 15, Math.min(arenaCanvas.width - arenaPlayer.radius - 15, arenaPlayer.x));
    arenaPlayer.y = Math.max(arenaPlayer.radius + 15, Math.min(arenaCanvas.height - arenaPlayer.radius - 15, arenaPlayer.y));

    // Update player angle to face mouse
    arenaPlayer.angle = Math.atan2(arenaMouseY - arenaPlayer.y, arenaMouseX - arenaPlayer.x);

    // Update power-ups
    if (arenaPlayer.speedBoost > 0) {
        arenaPlayer.speedBoost--;
        arenaPlayer.speed = arenaPlayer.baseSpeed * 1.75;
        if (arenaPlayer.speedBoost === 0) arenaPlayer.speed = arenaPlayer.baseSpeed;
    }
    if (arenaPlayer.rapidFire > 0) arenaPlayer.rapidFire--;
    if (arenaPlayer.tripleShot > 0) arenaPlayer.tripleShot--;

    // Update combo timer
    if (arenaComboTimer > 0) {
        arenaComboTimer--;
        if (arenaComboTimer === 0) {
            arenaCombo = 0;
            arenaMultiplier = 1;
        }
    }

    // Auto shoot when mouse down (faster base fire rate for more enemies)
    const shootCooldown = arenaPlayer.rapidFire > 0 ? 4 : 8;
    if (arenaMouseDown && arenaShootCooldown === 0) {
        // Shoot bullets based on gunCount
        for (let i = 0; i < arenaPlayer.gunCount; i++) {
            const offset = arenaPlayer.gunCount > 1 ? ((i - (arenaPlayer.gunCount - 1) / 2) * 8) : 0;
            const gunX = arenaPlayer.x + Math.cos(arenaPlayer.angle) * arenaPlayer.radius + Math.cos(arenaPlayer.angle + Math.PI / 2) * offset;
            const gunY = arenaPlayer.y + Math.sin(arenaPlayer.angle) * arenaPlayer.radius + Math.sin(arenaPlayer.angle + Math.PI / 2) * offset;

            if (arenaPlayer.tripleShot > 0) {
                // Triple shot from each gun
                for (let j = -1; j <= 1; j++) {
                    arenaBullets.push(new ArenaBullet(gunX, gunY, arenaPlayer.angle + (j * 0.15)));
                }
            } else {
                arenaBullets.push(new ArenaBullet(gunX, gunY, arenaPlayer.angle));
            }
        }
        arenaShootCooldown = shootCooldown;
        playShootSound();
    }

    // Spawn enemies (FEWER ENEMIES - REDUCED SPAWN RATE)
    arenaSpawnTimer++;
    const spawnRate = Math.max(60, 120 - (arenaWave * 4));

    // Check for boss wave (only on wave 5, and only once per game)
    if (arenaWave === 5 && !arenaBossActive && !arenaBossDefeated && arenaEnemies.length === 0) {
        arenaBossActive = true;
        arenaEnemies.push(new ArenaEnemy('boss', arenaWave));
        createArenaPopup('⚔️ MASSIVE WARRIOR BOSS! ⚔️', '#ff00ff', arenaCanvas.width / 2, arenaCanvas.height / 2);
        playExplosionSound();
        // Extra dramatic effect
        arenaScreenShake = 20;
    } else if (arenaSpawnTimer > spawnRate && !arenaBossActive) {
        arenaSpawnTimer = 0;

        // Spawn fewer enemies (max 3 instead of 5)
        const spawnCount = Math.min(1 + Math.floor(arenaWave / 3), 3);

        for (let i = 0; i < spawnCount; i++) {
            // More variety and shooters in later waves
            let type;
            const rand = Math.random();
            if (arenaWave >= 3 && rand < (0.15 + (arenaWave * 0.02))) {
                type = 'shooter';
            } else if (rand < 0.60) {
                type = 'fast';
            } else {
                type = 'tank';
            }

            arenaEnemies.push(new ArenaEnemy(type, arenaWave));
        }
    }

    // Reduced additional spawn chance
    if (!arenaBossActive && Math.random() < (0.0003 + (arenaWave * 0.0002))) {
        const type = Math.random() < 0.70 ? 'fast' : (Math.random() < 0.6 ? 'tank' : 'shooter');
        arenaEnemies.push(new ArenaEnemy(type, arenaWave));
    }

    // Spawn power-ups occasionally (slightly increased for more enemies)
    if (Math.random() < 0.0012 && arenaPowerUps.length < 1) {
        const types = ['speed', 'rapidfire', 'tripleshot'];
        const type = types[Math.floor(Math.random() * types.length)];
        arenaPowerUps.push(new ArenaPowerUp(
            50 + Math.random() * (arenaCanvas.width - 100),
            50 + Math.random() * (arenaCanvas.height - 100),
            type
        ));
    }

    // Spawn health packs more frequently
    if (Math.random() < 0.0015 && arenaHealthPacks.length < 1) {
        arenaHealthPacks.push(new HealthPack(
            50 + Math.random() * (arenaCanvas.width - 100),
            50 + Math.random() * (arenaCanvas.height - 100)
        ));
    }

    // Update particles
    arenaParticles = arenaParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        p.size *= 0.95;

        arenaCtx.fillStyle = `rgba(${p.color === '#ff3300' ? '255, 50, 0' : '0, 100, 255'}, ${p.life})`;
        arenaCtx.beginPath();
        arenaCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        arenaCtx.fill();

        return p.life > 0;
    });

    // Update and draw bullets
    arenaBullets = arenaBullets.filter(bullet => {
        bullet.update();
        bullet.draw();

        // Check collision with enemies
        let hit = false;
        arenaEnemies = arenaEnemies.filter(enemy => {
            if (bullet.collidesWithEnemy(enemy)) {
                hit = true;
                if (enemy.hit()) {
                    // Enemy destroyed
                    arenaExplosions.push(new Explosion(enemy.x, enemy.y, enemy.type === 'fast' ? 'red' : 'blue'));
                    arenaScreenShake = 5;

                    // Combo system
                    arenaCombo++;
                    arenaComboTimer = 120;
                    arenaMultiplier = Math.min(1 + Math.floor(arenaCombo / 5), 5);

                    // Calculate points
                    let basePoints = 10;
                    if (enemy.type === 'tank') basePoints = 20;
                    if (enemy.type === 'shooter') basePoints = 25;
                    if (enemy.type === 'boss') {
                        basePoints = 200;
                        arenaBossActive = false;
                        arenaBossDefeated = true;
                        createArenaPopup('⚔️ WARRIOR DEFEATED! ⚔️', '#ffff00', arenaCanvas.width / 2, arenaCanvas.height / 2 - 50);
                        arenaScreenShake = 25;
                    }

                    const points = basePoints * arenaMultiplier;
                    arenaScore += points;
                    arenaScoreDisplay.textContent = arenaScore;

                    // Gain XP
                    arenaPlayer.xp += enemy.xpValue;
                    if (arenaPlayer.xp >= arenaPlayer.xpNeeded) {
                        levelUpPlayer();
                    }

                    // Increment kill counter
                    arenaKills++;
                    if (arenaKills >= arenaKillsNeeded) {
                        arenaWave++;
                        arenaKills = 0;
                        arenaWaveDisplay.textContent = arenaWave;
                        createArenaPopup('⬆️ WAVE ' + arenaWave + '! ⬆️', '#ffff00', arenaCanvas.width / 2, 100);
                        playPowerUpSound();
                    }

                    createArenaPopup(`+${points}` + (arenaMultiplier > 1 ? ` x${arenaMultiplier}` : ''), '#00ff00', enemy.x, enemy.y);
                    playExplosionSound();
                    playHitSound(true);
                    return false;
                }
                playHitSound(true);
                return true;
            }
            return true;
        });

        return !hit && !bullet.isOffScreen();
    });

    // Update and draw enemies
    arenaEnemies.forEach(enemy => {
        enemy.update();
        enemy.draw();

        // Check collision with player
        if (enemy.collidesWithPlayer()) {
            arenaHP -= enemy.damage;
            arenaHPDisplay.textContent = Math.max(0, arenaHP);
            arenaScreenShake = 10;
            createArenaPopup(`-${enemy.damage} HP`, '#ff0000', arenaPlayer.x, arenaPlayer.y - 30);
            playHitSound(false);

            // Break combo
            arenaCombo = 0;
            arenaMultiplier = 1;
            arenaComboTimer = 0;

            // Remove enemy
            const index = arenaEnemies.indexOf(enemy);
            if (index > -1) {
                arenaEnemies.splice(index, 1);
                arenaExplosions.push(new Explosion(enemy.x, enemy.y, 'red'));
            }

            if (arenaHP <= 0) {
                endArena();
            }
        }
    });

    // Update and draw enemy bullets
    arenaEnemyBullets = arenaEnemyBullets.filter(bullet => {
        bullet.update();
        bullet.draw();

        if (bullet.collidesWithPlayer()) {
            arenaHP -= bullet.damage;
            arenaHPDisplay.textContent = Math.max(0, arenaHP);
            arenaScreenShake = 8;
            createArenaPopup(`-${bullet.damage} HP`, '#ff0000', arenaPlayer.x, arenaPlayer.y - 30);
            arenaExplosions.push(new Explosion(bullet.x, bullet.y, 'red'));
            playHitSound(false);

            // Break combo
            arenaCombo = 0;
            arenaMultiplier = 1;
            arenaComboTimer = 0;

            if (arenaHP <= 0) {
                endArena();
            }

            return false;
        }

        return !bullet.isOffScreen();
    });

    // Update and draw power-ups
    arenaPowerUps = arenaPowerUps.filter(powerUp => {
        powerUp.update();
        powerUp.draw();

        if (powerUp.collidesWithPlayer()) {
            if (powerUp.type === 'speed') {
                arenaPlayer.speedBoost = 300;
                createArenaPopup('SPEED BOOST!', '#00ffff', arenaPlayer.x, arenaPlayer.y - 30);
            } else if (powerUp.type === 'rapidfire') {
                arenaPlayer.rapidFire = 360;
                createArenaPopup('RAPID FIRE!', '#ffff00', arenaPlayer.x, arenaPlayer.y - 30);
            } else if (powerUp.type === 'tripleshot') {
                arenaPlayer.tripleShot = 300;
                createArenaPopup('TRIPLE SHOT!', '#ff00ff', arenaPlayer.x, arenaPlayer.y - 30);
            }
            playPowerUpSound();
            return false;
        }

        return !powerUp.isExpired();
    });

    // Update and draw health packs
    arenaHealthPacks = arenaHealthPacks.filter(pack => {
        pack.update();
        pack.draw();

        if (pack.collidesWithPlayer() && arenaHP < arenaPlayer.maxHP) {
            const healAmount = 20;
            arenaHP = Math.min(arenaPlayer.maxHP, arenaHP + healAmount);
            arenaHPDisplay.textContent = arenaHP;
            createArenaPopup(`+${healAmount} HP`, '#00ff00', arenaPlayer.x, arenaPlayer.y - 30);
            playPowerUpSound();
            return false;
        }

        return !pack.isExpired();
    });

    // Update and draw explosions
    arenaExplosions = arenaExplosions.filter(explosion => {
        explosion.update();
        explosion.draw();
        return !explosion.isDead();
    });

    // Draw player
    drawArenaPlayer();

    // Draw player power-up effects
    if (arenaPlayer.speedBoost > 0) {
        arenaCtx.strokeStyle = '#00ffff';
        arenaCtx.lineWidth = 3;
        arenaCtx.shadowBlur = 20;
        arenaCtx.shadowColor = '#00ffff';
        arenaCtx.beginPath();
        arenaCtx.arc(arenaPlayer.x, arenaPlayer.y, arenaPlayer.radius + 10, 0, Math.PI * 2);
        arenaCtx.stroke();
        arenaCtx.shadowBlur = 0;
    }

    if (arenaPlayer.rapidFire > 0) {
        arenaCtx.strokeStyle = '#ffff00';
        arenaCtx.lineWidth = 2;
        arenaCtx.shadowBlur = 15;
        arenaCtx.shadowColor = '#ffff00';
        arenaCtx.strokeRect(
            arenaPlayer.x - arenaPlayer.radius - 5,
            arenaPlayer.y - arenaPlayer.radius - 5,
            arenaPlayer.radius * 2 + 10,
            arenaPlayer.radius * 2 + 10
        );
        arenaCtx.shadowBlur = 0;
    }

    if (arenaPlayer.tripleShot > 0) {
        arenaCtx.strokeStyle = '#ff00ff';
        arenaCtx.lineWidth = 3;
        arenaCtx.shadowBlur = 20;
        arenaCtx.shadowColor = '#ff00ff';
        for (let i = 0; i < 3; i++) {
            arenaCtx.beginPath();
            arenaCtx.arc(arenaPlayer.x, arenaPlayer.y, arenaPlayer.radius + 5 + (i * 5), 0, Math.PI * 2);
            arenaCtx.stroke();
        }
        arenaCtx.shadowBlur = 0;
    }

    // Draw combo indicator
    if (arenaCombo > 4) {
        arenaCtx.fillStyle = '#ffff00';
        arenaCtx.font = 'bold 32px Arial';
        arenaCtx.textAlign = 'center';
        arenaCtx.shadowBlur = 15;
        arenaCtx.shadowColor = '#ffff00';
        arenaCtx.fillText(`x${arenaMultiplier} COMBO!`, arenaCanvas.width / 2, 60);
        arenaCtx.shadowBlur = 0;
    }

    // Draw XP bar at top of screen
    const xpBarWidth = 300;
    const xpBarHeight = 25;
    const xpBarX = (arenaCanvas.width - xpBarWidth) / 2;
    const xpBarY = 20;
    const xpPercent = arenaPlayer.xp / arenaPlayer.xpNeeded;

    // Background
    arenaCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    arenaCtx.fillRect(xpBarX - 5, xpBarY - 5, xpBarWidth + 10, xpBarHeight + 10);

    // Border
    arenaCtx.strokeStyle = '#ffffff';
    arenaCtx.lineWidth = 2;
    arenaCtx.strokeRect(xpBarX, xpBarY, xpBarWidth, xpBarHeight);

    // XP Fill
    const gradient = arenaCtx.createLinearGradient(xpBarX, xpBarY, xpBarX + xpBarWidth, xpBarY);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#0088ff');
    arenaCtx.fillStyle = gradient;
    arenaCtx.fillRect(xpBarX + 2, xpBarY + 2, (xpBarWidth - 4) * xpPercent, xpBarHeight - 4);

    // Level text
    arenaCtx.fillStyle = '#ffffff';
    arenaCtx.font = 'bold 16px Arial';
    arenaCtx.textAlign = 'center';
    arenaCtx.textBaseline = 'middle';
    arenaCtx.shadowBlur = 3;
    arenaCtx.shadowColor = '#000000';
    arenaCtx.fillText(`LEVEL ${arenaPlayer.level} - ${arenaPlayer.xp}/${arenaPlayer.xpNeeded} XP`, arenaCanvas.width / 2, xpBarY + xpBarHeight / 2);
    arenaCtx.shadowBlur = 0;

    // Draw kills counter below XP bar
    const killsY = xpBarY + xpBarHeight + 20;
    arenaCtx.fillStyle = '#ffff00';
    arenaCtx.font = 'bold 18px Arial';
    arenaCtx.shadowBlur = 5;
    arenaCtx.shadowColor = '#000000';
    arenaCtx.fillText(`Kills: ${arenaKills}/${arenaKillsNeeded} until Wave ${arenaWave + 1}`, arenaCanvas.width / 2, killsY);
    arenaCtx.shadowBlur = 0;

    arenaCtx.restore();

    if (arenaRunning) {
        arenaAnimationId = requestAnimationFrame(updateArena);
    }
}

// Create arena popup
function createArenaPopup(text, color, x = null, y = null) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'absolute';
    popup.style.left = (x !== null ? x : arenaCanvas.width / 2) + 'px';
    popup.style.top = (y !== null ? y : arenaCanvas.height / 2) + 'px';
    popup.style.color = color;
    popup.style.fontSize = '24px';
    popup.style.fontWeight = 'bold';
    popup.style.pointerEvents = 'none';
    popup.style.animation = 'popupFloat 1s ease-out forwards';
    popup.style.zIndex = '1000';
    popup.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';

    document.querySelector('.game-container:last-of-type').appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

// Start arena game
function startArena() {
    arenaRunning = true;
    arenaScore = 0;
    arenaHP = 100;
    arenaWave = 1;
    arenaKills = 0;
    arenaKillsNeeded = 15;
    arenaEnemies = [];
    arenaBullets = [];
    arenaEnemyBullets = [];
    arenaHealthPacks = [];
    arenaPowerUps = [];
    arenaExplosions = [];
    arenaParticles = [];
    arenaTime = 0;
    arenaSpawnTimer = 0;
    arenaShootCooldown = 0;
    arenaScreenShake = 0;
    arenaCombo = 0;
    arenaComboTimer = 0;
    arenaMultiplier = 1;
    arenaBossActive = false;
    arenaBossDefeated = false;

    arenaPlayer.x = arenaCanvas.width / 2;
    arenaPlayer.y = arenaCanvas.height / 2;
    arenaPlayer.radius = arenaPlayer.baseRadius;
    arenaPlayer.speed = arenaPlayer.baseSpeed;
    arenaPlayer.speedBoost = 0;
    arenaPlayer.rapidFire = 0;
    arenaPlayer.tripleShot = 0;
    arenaPlayer.level = 1;
    arenaPlayer.xp = 0;
    arenaPlayer.xpNeeded = 100;
    arenaPlayer.maxHP = 100;
    arenaPlayer.gunCount = 1;

    arenaScoreDisplay.textContent = arenaScore;
    arenaHPDisplay.textContent = arenaHP;
    arenaWaveDisplay.textContent = arenaWave;
    arenaOverlay.style.display = 'none';

    // Start background music
    startBackgroundMusic();

    updateArena();
}

// End arena game
function endArena() {
    arenaRunning = false;
    cancelAnimationFrame(arenaAnimationId);

    // Stop background music
    stopBackgroundMusic();

    if (arenaScore > arenaHighscore) {
        arenaHighscore = arenaScore;
        saveArenaHighscore();
    }

    arenaOverlay.style.display = 'flex';
    arenaOverlay.querySelector('h3').textContent = 'Game Over!';

    const isNewHighscore = arenaScore === arenaHighscore && arenaScore > 0;
    arenaOverlay.querySelector('p:first-of-type').textContent = `Final Score: ${arenaScore} | Wave: ${arenaWave}` +
        (isNewHighscore ? ' 🏆 NEW RECORD!' : '');

    let message = '';
    if (arenaScore < 100) {
        message = 'Keep fighting!';
    } else if (arenaScore < 300) {
        message = 'Nice battle!';
    } else if (arenaScore < 600) {
        message = 'Impressive survival!';
    } else {
        message = 'Legendary warrior!';
    }
    arenaOverlay.querySelector('p:last-of-type').textContent = message;

    arenaStartButton.textContent = 'Play Again';
}

// Arena mouse events
arenaCanvas.addEventListener('mousemove', (e) => {
    const rect = arenaCanvas.getBoundingClientRect();
    arenaMouseX = e.clientX - rect.left;
    arenaMouseY = e.clientY - rect.top;
});

arenaCanvas.addEventListener('mousedown', (e) => {
    if (arenaRunning) {
        arenaMouseDown = true;
    }
});

arenaCanvas.addEventListener('mouseup', () => {
    arenaMouseDown = false;
});

arenaCanvas.addEventListener('mouseleave', () => {
    arenaMouseDown = false;
});

// Arena keyboard events
document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'W') arenaKeys.w = true;
    if (e.key === 'a' || e.key === 'A') arenaKeys.a = true;
    if (e.key === 's' || e.key === 'S') arenaKeys.s = true;
    if (e.key === 'd' || e.key === 'D') arenaKeys.d = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W') arenaKeys.w = false;
    if (e.key === 'a' || e.key === 'A') arenaKeys.a = false;
    if (e.key === 's' || e.key === 'S') arenaKeys.s = false;
    if (e.key === 'd' || e.key === 'D') arenaKeys.d = false;
});

// Arena start button
arenaStartButton.addEventListener('click', startArena);

// Load arena highscore
loadArenaHighscore();

// ===============================================
// FLAME DASH - Third Game
// ===============================================

const dashCanvas = document.getElementById('dashCanvas');
const dashCtx = dashCanvas.getContext('2d');
const dashStartButton = document.getElementById('dashStartButton');
const dashOverlay = document.getElementById('dashOverlay');
const dashScoreDisplay = document.getElementById('dashScore');
const dashHPDisplay = document.getElementById('dashHP');
const dashHighscoreDisplay = document.getElementById('dashHighscore');

let dashRunning = false;
let dashScore = 0;
let dashHP = 100;
let dashHighscore = 0;
let dashAnimationId;
let dashFallingItems = [];
let dashParticles = [];
let dashExplosions = [];
let dashPowerUps = [];
let dashSpeed = 2;
let dashSpawnTimer = 0;
let dashCombo = 0;
let dashComboTimer = 0;
let dashMultiplier = 1;
let dashScreenShake = 0;
let dashMagnetActive = 0;
let dashInvincible = 0;
let dashScoreBoost = 0;
let dashDashCooldown = 0;

const dashKeys = {
    left: false,
    right: false
};

let dashPlayer = {
    x: dashCanvas.width / 2 - 25,
    y: dashCanvas.height - 100,
    width: 50,
    height: 50,
    speed: 8,
    trail: []
};

// Load dash highscore
function loadDashHighscore() {
    const saved = localStorage.getItem('flameDashHighscore');
    if (saved) {
        dashHighscore = parseInt(saved);
        dashHighscoreDisplay.textContent = dashHighscore;
    }
}

// Save dash highscore
function saveDashHighscore() {
    localStorage.setItem('flameDashHighscore', dashHighscore.toString());
    dashHighscoreDisplay.textContent = dashHighscore;
}

// Dash Explosion Class
class DashExplosion {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        this.life = 1;

        // Create MASSIVE explosion
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 * i) / 60;
            const speed = 4 + Math.random() * 8;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 5 + Math.random() * 10,
                life: 1
            });
        }
    }

    update() {
        this.life -= 0.04;
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.04;
        });
    }

    draw() {
        if (!this.particles || this.particles.length === 0) return;

        this.particles.forEach(p => {
            if (!p || p.life <= 0) return;

            dashCtx.fillStyle = this.color === 'gold'
                ? `rgba(255, 200, 0, ${p.life})`
                : `rgba(255, 0, 0, ${p.life})`;
            dashCtx.shadowBlur = 20;
            dashCtx.shadowColor = this.color === 'gold' ? '#ffaa00' : '#ff0000';
            dashCtx.beginPath();
            dashCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            dashCtx.fill();
        });
        dashCtx.shadowBlur = 0;
    }

    isDead() {
        return this.life <= 0;
    }
}

// Dash Power-Up Class
class DashPowerUp {
    constructor(type) {
        this.type = type; // 'magnet', 'invincible', 'scoreboost', 'dash'
        this.x = Math.random() * (dashCanvas.width - 40) + 20;
        this.y = -30;
        this.size = 30;
        this.speed = dashSpeed + 1;
        this.rotation = 0;

        if (type === 'magnet') {
            this.color = '#ff00ff';
            this.symbol = '🧲';
        } else if (type === 'invincible') {
            this.color = '#00ffff';
            this.symbol = '⭐';
        } else if (type === 'scoreboost') {
            this.color = '#ffff00';
            this.symbol = '💎';
        } else {
            this.color = '#ffffff';
            this.symbol = '⚡';
        }
    }

    update() {
        this.y += this.speed;
        this.rotation += 0.1;
    }

    draw() {
        if (!dashCtx) return;

        dashCtx.save();
        dashCtx.translate(this.x, this.y);
        dashCtx.rotate(this.rotation);

        // Pulsing glow
        const pulse = Math.sin(Date.now() / 100) * 10 + 30;
        dashCtx.shadowBlur = pulse;
        dashCtx.shadowColor = this.color;
        dashCtx.fillStyle = this.color;
        dashCtx.beginPath();
        dashCtx.arc(0, 0, this.size, 0, Math.PI * 2);
        dashCtx.fill();

        // Draw symbol
        dashCtx.shadowBlur = 0;
        dashCtx.font = '24px Arial';
        dashCtx.textAlign = 'center';
        dashCtx.textBaseline = 'middle';
        dashCtx.fillText(this.symbol, 0, 0);

        dashCtx.restore();
    }

    isOffScreen() {
        return this.y > dashCanvas.height + this.size;
    }

    collidesWith(player) {
        return (
            this.x - this.size < player.x + player.width &&
            this.x + this.size > player.x &&
            this.y - this.size < player.y + player.height &&
            this.y + this.size > player.y
        );
    }
}

// Falling Item Class
class FallingItem {
    constructor(type) {
        this.type = type; // 'good', 'bad', 'health'
        this.x = Math.random() * (dashCanvas.width - 40) + 20;
        this.y = -30;
        this.size = 25;
        this.speed = dashSpeed + Math.random() * 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.magnetized = false;

        if (type === 'good') {
            this.color = '#ffaa00';
            this.value = 10;
        } else if (type === 'bad') {
            this.color = '#ff0000';
            this.damage = 15;
        } else {
            this.color = '#00ff00';
            this.heal = 20;
        }
    }

    update() {
        // Magnet effect pulls good items toward player
        if (dashMagnetActive > 0 && this.type === 'good') {
            const dx = (dashPlayer.x + dashPlayer.width / 2) - this.x;
            const dy = (dashPlayer.y + dashPlayer.height / 2) - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 200) {
                this.magnetized = true;
                this.x += (dx / dist) * 6;
                this.y += (dy / dist) * 6;
            } else {
                this.y += this.speed;
            }
        } else {
            this.y += this.speed;
        }

        this.rotation += this.rotationSpeed;

        // Add trail particles for magnetized items
        if (this.magnetized && Math.random() < 0.5) {
            dashParticles.push({
                x: this.x,
                y: this.y,
                size: Math.random() * 3 + 1,
                speed: 0,
                life: 1,
                color: '#ffaa00'
            });
        }
    }

    draw() {
        if (!dashCtx) return;

        dashCtx.save();
        dashCtx.translate(this.x, this.y);
        dashCtx.rotate(this.rotation);

        if (this.type === 'good') {
            // Golden flame
            const gradient = dashCtx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, '#ffff00');
            gradient.addColorStop(0.5, '#ffaa00');
            gradient.addColorStop(1, '#ff6600');
            dashCtx.fillStyle = gradient;
            dashCtx.shadowBlur = 20;
            dashCtx.shadowColor = '#ffaa00';

            // Draw flame shape
            dashCtx.beginPath();
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                const radius = i % 2 === 0 ? this.size : this.size * 0.6;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) dashCtx.moveTo(x, y);
                else dashCtx.lineTo(x, y);
            }
            dashCtx.closePath();
            dashCtx.fill();
        } else if (this.type === 'bad') {
            // Red danger fire
            const gradient = dashCtx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, '#ff6600');
            gradient.addColorStop(0.5, '#ff0000');
            gradient.addColorStop(1, '#990000');
            dashCtx.fillStyle = gradient;
            dashCtx.shadowBlur = 25;
            dashCtx.shadowColor = '#ff0000';

            // Draw spiky danger
            dashCtx.beginPath();
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI) / 6;
                const radius = i % 2 === 0 ? this.size * 1.2 : this.size * 0.5;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (i === 0) dashCtx.moveTo(x, y);
                else dashCtx.lineTo(x, y);
            }
            dashCtx.closePath();
            dashCtx.fill();
        } else {
            // Green health
            dashCtx.fillStyle = '#00ff00';
            dashCtx.shadowBlur = 20;
            dashCtx.shadowColor = '#00ff00';
            dashCtx.beginPath();
            dashCtx.arc(0, 0, this.size, 0, Math.PI * 2);
            dashCtx.fill();

            // Draw cross
            dashCtx.strokeStyle = '#ffffff';
            dashCtx.lineWidth = 4;
            dashCtx.shadowBlur = 0;
            dashCtx.beginPath();
            dashCtx.moveTo(-this.size * 0.6, 0);
            dashCtx.lineTo(this.size * 0.6, 0);
            dashCtx.moveTo(0, -this.size * 0.6);
            dashCtx.lineTo(0, this.size * 0.6);
            dashCtx.stroke();
        }

        dashCtx.shadowBlur = 0;
        dashCtx.restore();
    }

    isOffScreen() {
        return this.y > dashCanvas.height + this.size;
    }

    collidesWith(player) {
        return (
            this.x - this.size < player.x + player.width &&
            this.x + this.size > player.x &&
            this.y - this.size < player.y + player.height &&
            this.y + this.size > player.y
        );
    }
}

// Draw dash player
function drawDashPlayer() {
    if (!dashCtx || !dashPlayer) return;

    // Add trail
    if (!dashPlayer.trail) dashPlayer.trail = [];
    dashPlayer.trail.push({ x: dashPlayer.x + dashPlayer.width / 2, y: dashPlayer.y + dashPlayer.height / 2, life: 1 });
    if (dashPlayer.trail.length > 10) dashPlayer.trail.shift();

    // Draw trail
    dashPlayer.trail.forEach((t, index) => {
        t.life -= 0.1;
        const gradient = dashCtx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 15);
        gradient.addColorStop(0, `rgba(0, 255, 255, ${t.life * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 150, 255, 0)`);
        dashCtx.fillStyle = gradient;
        dashCtx.beginPath();
        dashCtx.arc(t.x, t.y, 15, 0, Math.PI * 2);
        dashCtx.fill();
    });

    // Draw player
    const gradient = dashCtx.createRadialGradient(
        dashPlayer.x + dashPlayer.width / 2,
        dashPlayer.y + dashPlayer.height / 2,
        0,
        dashPlayer.x + dashPlayer.width / 2,
        dashPlayer.y + dashPlayer.height / 2,
        dashPlayer.width / 2
    );
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#0088ff');

    dashCtx.fillStyle = gradient;
    dashCtx.shadowBlur = 30;
    dashCtx.shadowColor = '#00ffff';
    dashCtx.beginPath();
    dashCtx.arc(
        dashPlayer.x + dashPlayer.width / 2,
        dashPlayer.y + dashPlayer.height / 2,
        dashPlayer.width / 2,
        0,
        Math.PI * 2
    );
    dashCtx.fill();

    // Draw player core
    dashCtx.fillStyle = '#ffffff';
    dashCtx.shadowBlur = 20;
    dashCtx.beginPath();
    dashCtx.arc(
        dashPlayer.x + dashPlayer.width / 2,
        dashPlayer.y + dashPlayer.height / 2,
        dashPlayer.width / 4,
        0,
        Math.PI * 2
    );
    dashCtx.fill();
    dashCtx.shadowBlur = 0;
}

// Update dash game
function updateDash() {
    if (!dashRunning || !dashCtx) return;

    try {

    // Screen shake
    dashCtx.save();
    if (dashScreenShake > 0) {
        dashCtx.translate(
            (Math.random() - 0.5) * dashScreenShake,
            (Math.random() - 0.5) * dashScreenShake
        );
        dashScreenShake *= 0.9;
        if (dashScreenShake < 0.1) dashScreenShake = 0;
    }

    // Clear canvas
    dashCtx.fillStyle = '#0a0a0a';
    dashCtx.fillRect(0, 0, dashCanvas.width, dashCanvas.height);

    // Draw background gradient with pulsing effect
    const pulse = Math.sin(Date.now() / 200) * 0.05;
    const bgGradient = dashCtx.createLinearGradient(0, 0, 0, dashCanvas.height);
    bgGradient.addColorStop(0, `rgba(${26 + pulse * 50}, ${10 + pulse * 50}, 10, 1)`);
    bgGradient.addColorStop(1, '#0a0a0a');
    dashCtx.fillStyle = bgGradient;
    dashCtx.fillRect(0, 0, dashCanvas.width, dashCanvas.height);

    // Spawn TONS of background particles
    if (Math.random() < 0.5) {
        dashParticles.push({
            x: Math.random() * dashCanvas.width,
            y: -10,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 5 + 2,
            life: 1,
            color: Math.random() < 0.5 ? '#ff6600' : '#ffaa00'
        });
    }

    // Update and draw particles
    dashParticles = dashParticles.filter(p => {
        p.y += p.speed;
        p.life -= 0.01;

        const colorMap = {
            '#ff6600': `rgba(255, 102, 0, ${p.life * 0.4})`,
            '#ffaa00': `rgba(255, 170, 0, ${p.life * 0.4})`
        };
        dashCtx.fillStyle = colorMap[p.color] || `rgba(255, 102, 0, ${p.life * 0.4})`;
        dashCtx.shadowBlur = 15;
        dashCtx.shadowColor = p.color;
        dashCtx.beginPath();
        dashCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        dashCtx.fill();

        return p.y < dashCanvas.height && p.life > 0;
    });
    dashCtx.shadowBlur = 0;

    // Update explosions
    if (!dashExplosions) dashExplosions = [];
    dashExplosions = dashExplosions.filter(exp => {
        if (!exp) return false;
        exp.update();
        exp.draw();
        return !exp.isDead();
    });

    // Update timers
    if (dashMagnetActive > 0) dashMagnetActive--;
    if (dashInvincible > 0) dashInvincible--;
    if (dashScoreBoost > 0) dashScoreBoost--;
    if (dashDashCooldown > 0) dashDashCooldown--;
    if (dashComboTimer > 0) {
        dashComboTimer--;
    } else {
        dashCombo = 0;
        dashMultiplier = 1;
    }

    // Move player
    if (dashKeys.left && dashPlayer.x > 0) {
        dashPlayer.x -= dashPlayer.speed;
    }
    if (dashKeys.right && dashPlayer.x < dashCanvas.width - dashPlayer.width) {
        dashPlayer.x += dashPlayer.speed;
    }

    // Spawn falling items (MUCH MORE FREQUENT!)
    dashSpawnTimer++;
    const spawnRate = Math.max(8, 30 - Math.floor(dashScore / 50));

    if (dashSpawnTimer > spawnRate) {
        dashSpawnTimer = 0;

        // Spawn 1-3 items at once!
        const spawnCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < spawnCount; i++) {
            const rand = Math.random();
            let type;
            if (rand < 0.70) {
                type = 'good';
            } else if (rand < 0.85) {
                type = 'bad';
            } else {
                type = 'health';
            }

            dashFallingItems.push(new FallingItem(type));
        }
    }

    // Spawn power-ups occasionally
    if (Math.random() < 0.003) {
        const types = ['magnet', 'invincible', 'scoreboost', 'dash'];
        const type = types[Math.floor(Math.random() * types.length)];
        dashPowerUps.push(new DashPowerUp(type));
    }

    // Update speed based on score
    dashSpeed = 2 + (dashScore / 100);

    // Update and draw power-ups
    dashPowerUps = dashPowerUps.filter(powerup => {
        powerup.update();
        powerup.draw();

        // Check collision
        if (powerup.collidesWith(dashPlayer)) {
            if (powerup.type === 'magnet') {
                dashMagnetActive = 300;
                createDashPopup('🧲 MAGNET!', '#ff00ff', powerup.x, powerup.y);
            } else if (powerup.type === 'invincible') {
                dashInvincible = 300;
                createDashPopup('⭐ INVINCIBLE!', '#00ffff', powerup.x, powerup.y);
            } else if (powerup.type === 'scoreboost') {
                dashScoreBoost = 300;
                createDashPopup('💎 2X SCORE!', '#ffff00', powerup.x, powerup.y);
            } else {
                dashDashCooldown = 0;
                createDashPopup('⚡ DASH READY!', '#ffffff', powerup.x, powerup.y);
            }
            playPowerUpSound();
            dashExplosions.push(new DashExplosion(powerup.x, powerup.y, 'gold'));
            dashScreenShake = 10;
            return false;
        }

        return !powerup.isOffScreen();
    });

    // Update and draw falling items
    dashFallingItems = dashFallingItems.filter(item => {
        item.update();
        item.draw();

        // Check collision
        if (item.collidesWith(dashPlayer)) {
            if (item.type === 'good') {
                // Combo system!
                dashCombo++;
                dashComboTimer = 180;
                dashMultiplier = Math.min(1 + Math.floor(dashCombo / 3), 10);

                const points = item.value * dashMultiplier * (dashScoreBoost > 0 ? 2 : 1);
                dashScore += points;
                dashScoreDisplay.textContent = dashScore;
                playPowerUpSound();
                createDashPopup(`+${points}` + (dashMultiplier > 1 ? ` x${dashMultiplier}` : ''), '#ffaa00', item.x, item.y);

                // MASSIVE EXPLOSION
                dashExplosions.push(new DashExplosion(item.x, item.y, 'gold'));
                dashScreenShake = 5 + dashMultiplier;
            } else if (item.type === 'bad') {
                if (dashInvincible === 0) {
                    dashHP -= item.damage;
                    dashHPDisplay.textContent = Math.max(0, dashHP);
                    playHitSound(false);
                    createDashPopup(`-${item.damage} HP`, '#ff0000', item.x, item.y);
                    dashScreenShake = 20;

                    // Break combo
                    dashCombo = 0;
                    dashMultiplier = 1;
                    dashComboTimer = 0;

                    // Explosion
                    dashExplosions.push(new DashExplosion(item.x, item.y, 'red'));

                    if (dashHP <= 0) {
                        endDash();
                    }
                } else {
                    // Invincible - destroy bad item
                    createDashPopup('BLOCKED!', '#00ffff', item.x, item.y);
                    dashExplosions.push(new DashExplosion(item.x, item.y, 'red'));
                }
            } else {
                dashHP = Math.min(100, dashHP + item.heal);
                dashHPDisplay.textContent = dashHP;
                playPowerUpSound();
                createDashPopup(`+${item.heal} HP`, '#00ff00', item.x, item.y);
                dashExplosions.push(new DashExplosion(item.x, item.y, 'gold'));
                dashScreenShake = 8;
            }
            return false;
        }

        return !item.isOffScreen();
    });

    // Draw invincibility effect
    if (dashInvincible > 0) {
        dashCtx.strokeStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(Date.now() / 50) * 0.3})`;
        dashCtx.lineWidth = 5;
        dashCtx.shadowBlur = 30;
        dashCtx.shadowColor = '#00ffff';
        dashCtx.beginPath();
        dashCtx.arc(
            dashPlayer.x + dashPlayer.width / 2,
            dashPlayer.y + dashPlayer.height / 2,
            dashPlayer.width + 10 + Math.sin(Date.now() / 100) * 5,
            0,
            Math.PI * 2
        );
        dashCtx.stroke();
        dashCtx.shadowBlur = 0;
    }

    // Draw player
    drawDashPlayer();

    // Draw magnet range
    if (dashMagnetActive > 0) {
        dashCtx.strokeStyle = `rgba(255, 0, 255, ${0.2 + Math.sin(Date.now() / 100) * 0.1})`;
        dashCtx.lineWidth = 3;
        dashCtx.shadowBlur = 20;
        dashCtx.shadowColor = '#ff00ff';
        dashCtx.beginPath();
        dashCtx.arc(
            dashPlayer.x + dashPlayer.width / 2,
            dashPlayer.y + dashPlayer.height / 2,
            200,
            0,
            Math.PI * 2
        );
        dashCtx.stroke();
        dashCtx.shadowBlur = 0;
    }

    // Draw MASSIVE combo indicator
    if (dashCombo > 2) {
        const pulse = Math.sin(Date.now() / 80) * 5 + 35;
        dashCtx.fillStyle = '#ffff00';
        dashCtx.font = `bold ${pulse}px Arial`;
        dashCtx.textAlign = 'center';
        dashCtx.shadowBlur = 30 + Math.sin(Date.now() / 80) * 10;
        dashCtx.shadowColor = '#ffff00';
        dashCtx.fillText(`x${dashMultiplier} COMBO!`, dashCanvas.width / 2, 80);

        // Combo bar
        const comboPercent = dashComboTimer / 180;
        dashCtx.fillStyle = `rgba(255, 255, 0, 0.3)`;
        dashCtx.fillRect(dashCanvas.width / 2 - 100, 100, 200 * comboPercent, 10);
        dashCtx.strokeStyle = '#ffff00';
        dashCtx.lineWidth = 2;
        dashCtx.strokeRect(dashCanvas.width / 2 - 100, 100, 200, 10);

        dashCtx.shadowBlur = 0;
    }

    // Draw power-up status indicators
    let statusY = 30;
    if (dashMagnetActive > 0) {
        dashCtx.fillStyle = '#ff00ff';
        dashCtx.font = 'bold 16px Arial';
        dashCtx.textAlign = 'left';
        dashCtx.shadowBlur = 10;
        dashCtx.shadowColor = '#ff00ff';
        dashCtx.fillText(`🧲 Magnet: ${Math.ceil(dashMagnetActive / 60)}s`, 20, statusY);
        statusY += 25;
    }
    if (dashInvincible > 0) {
        dashCtx.fillStyle = '#00ffff';
        dashCtx.font = 'bold 16px Arial';
        dashCtx.textAlign = 'left';
        dashCtx.shadowBlur = 10;
        dashCtx.shadowColor = '#00ffff';
        dashCtx.fillText(`⭐ Invincible: ${Math.ceil(dashInvincible / 60)}s`, 20, statusY);
        statusY += 25;
    }
    if (dashScoreBoost > 0) {
        dashCtx.fillStyle = '#ffff00';
        dashCtx.font = 'bold 16px Arial';
        dashCtx.textAlign = 'left';
        dashCtx.shadowBlur = 10;
        dashCtx.shadowColor = '#ffff00';
        dashCtx.fillText(`💎 2x Score: ${Math.ceil(dashScoreBoost / 60)}s`, 20, statusY);
        statusY += 25;
    }

    // Draw speed indicator
    dashCtx.fillStyle = '#ffffff';
    dashCtx.font = 'bold 18px Arial';
    dashCtx.textAlign = 'left';
    dashCtx.shadowBlur = 5;
    dashCtx.shadowColor = '#ffffff';
    dashCtx.fillText(`Speed: ${dashSpeed.toFixed(1)}x`, 20, statusY);
    dashCtx.shadowBlur = 0;

    dashCtx.restore();

    } catch (error) {
        console.error('Dash game error:', error);
        // Don't crash, just log the error
    }

    if (dashRunning) {
        dashAnimationId = requestAnimationFrame(updateDash);
    }
}

// Create dash popup
function createDashPopup(text, color, x, y) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'absolute';
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.color = color;
    popup.style.fontSize = '24px';
    popup.style.fontWeight = 'bold';
    popup.style.pointerEvents = 'none';
    popup.style.animation = 'popupFloat 1s ease-out forwards';
    popup.style.zIndex = '1000';
    popup.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';

    const container = document.getElementById('game3');
    if (container) {
        const gameContainer = container.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.appendChild(popup);
            setTimeout(() => popup.remove(), 1000);
        }
    }
}

// Start dash game
function startDash() {
    if (!dashCanvas || !dashCtx) {
        console.error('Canvas not initialized');
        return;
    }

    dashRunning = true;
    dashScore = 0;
    dashHP = 100;
    dashFallingItems = [];
    dashParticles = [];
    dashExplosions = [];
    dashPowerUps = [];
    dashSpeed = 2;
    dashSpawnTimer = 0;
    dashCombo = 0;
    dashComboTimer = 0;
    dashMultiplier = 1;
    dashScreenShake = 0;
    dashMagnetActive = 0;
    dashInvincible = 0;
    dashScoreBoost = 0;
    dashDashCooldown = 0;

    dashPlayer.x = dashCanvas.width / 2 - 25;
    dashPlayer.trail = [];

    dashScoreDisplay.textContent = dashScore;
    dashHPDisplay.textContent = dashHP;
    dashOverlay.style.display = 'none';

    startBackgroundMusic();
    updateDash();
}

// End dash game
function endDash() {
    dashRunning = false;
    cancelAnimationFrame(dashAnimationId);

    stopBackgroundMusic();

    if (dashScore > dashHighscore) {
        dashHighscore = dashScore;
        saveDashHighscore();
    }

    dashOverlay.style.display = 'flex';
    dashOverlay.querySelector('h3').textContent = 'Game Over!';

    const isNewHighscore = dashScore === dashHighscore && dashScore > 0;
    dashOverlay.querySelector('p:first-of-type').textContent = `Final Score: ${dashScore}` +
        (isNewHighscore ? ' 🏆 NEW RECORD!' : '');

    let message = '';
    if (dashScore < 100) {
        message = 'Keep dashing!';
    } else if (dashScore < 300) {
        message = 'Nice dodging!';
    } else if (dashScore < 600) {
        message = 'Impressive reflexes!';
    } else {
        message = 'You\'re unstoppable!';
    }
    dashOverlay.querySelector('p:last-of-type').textContent = message;

    dashStartButton.textContent = 'Play Again';
}

// Dash keyboard events
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        dashKeys.left = true;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        dashKeys.right = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        dashKeys.left = false;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        dashKeys.right = false;
    }
});

// Dash start button
dashStartButton.addEventListener('click', startDash);

// Load dash highscore
loadDashHighscore();
