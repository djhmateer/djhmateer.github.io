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
const modeSelect = document.getElementById('modeSelect');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const score2Display = document.getElementById('score2');
const lives2Display = document.getElementById('lives2');
const player2Stats = document.getElementById('player2Stats');

let gameRunning = false;
let gameMode = 'single'; // 'single' or 'two'
let score = 0;
let lives = 3;
let score2 = 0;
let lives2 = 3;
let animationId;
let targets = [];
let bullets = [];
let enemyBullets = [];
let powerUps = [];
let explosions = [];
let gameTime = 0;
let difficultyMultiplier = 1;
let screenShake = 0;

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

        // Create explosion particles
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 4,
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

        // Create particle trail
        if (Math.random() > 0.8) {
            this.particles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                size: Math.random() * 3 + 1,
                life: 1,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
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
        this.width = 4;
        this.height = 15;
        this.speed = 10;
        this.color = color;
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
        }
    }

    // Spawn new targets (more frequent with difficulty)
    if (Math.random() < 0.015 * difficultyMultiplier) {
        const isGood = Math.random() < 0.7; // 70% chance of blue target
        targets.push(new Target(isGood, difficultyMultiplier));
    }

    // Spawn power-ups occasionally
    if (Math.random() < 0.002) {
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
            return false;
        }
        if (gameMode === 'two' && powerUp.collidesWith(player2)) {
            activatePowerUp(player2, powerUp.type);
            createScorePopup(player2.x + player2.width / 2, player2.y - 20, 'POWER UP!', '#ffff00');
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

                // Create explosion
                explosions.push(new Explosion(
                    target.x + target.width / 2,
                    target.y + target.height / 2,
                    target.isGood ? 'blue' : 'red'
                ));
                screenShake = 5;

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

            if (player.shield > 0) {
                player.shield = 0;
                createScorePopup(player.x + player.width / 2, player.y, 'SHIELD!', '#00ff00');
            } else {
                lives--;
                livesDisplay.textContent = lives;
                createScorePopup(player.x + player.width / 2, player.y, 'HIT!', '#ff0000');

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

            if (player2.shield > 0) {
                player2.shield = 0;
                createScorePopup(player2.x + player2.width / 2, player2.y, 'SHIELD!', '#00ff00');
            } else {
                lives2--;
                lives2Display.textContent = lives2;
                createScorePopup(player2.x + player2.width / 2, player2.y, 'HIT!', '#ff0000');

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

    // Draw combo indicators
    if (player.combo > 2) {
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffff00';
        ctx.fillText(`x${player.multiplier} COMBO!`, player.x + player.width / 2, player.y - 30);
        ctx.shadowBlur = 0;
    }
    if (gameMode === 'two' && player2.combo > 2) {
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffaa00';
        ctx.fillText(`x${player2.multiplier} COMBO!`, player2.x + player2.width / 2, player2.y - 30);
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
    gameTime = 0;
    difficultyMultiplier = 1;
    screenShake = 0;

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
        gameOverlay.querySelector('p:first-of-type').textContent = `P1: ${score} | P2: ${score2}`;
        gameOverlay.querySelector('p:last-of-type').textContent = winner;
    } else {
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
