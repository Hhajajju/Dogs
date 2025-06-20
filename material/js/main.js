// DOM Elements
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
const progressBar = body.querySelector('.progress');

// Game State - Initialize all values to 0
const gameState = {
    coins: 0,        // Start at 0 coins
    total: 500,      // Max power capacity
    power: 0,        // Start at 0 power
    count: 1,        // Power recharge rate
    lastAdTime: 0    // Last ad watch time
};

// Initialize Game
function initGame() {
    // Load from localStorage - default to 0 if not exists
    gameState.coins = parseInt(localStorage.getItem('coins')) || 0;
    gameState.power = parseInt(localStorage.getItem('power')) || 0;
    gameState.count = parseInt(localStorage.getItem('count')) || 1;
    gameState.lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    
    // Keep total fixed at 500 (no need to load from storage)
    gameState.total = 500;

    // Update UI
    updateUI();
    
    // Start power recharge loop
    setInterval(rechargePower, 1000);
}

// Update all UI elements
function updateUI() {
    h1.textContent = gameState.coins.toLocaleString();
    body.querySelector('#power').textContent = gameState.power;
    body.querySelector('#total').textContent = `/${gameState.total}`;
    progressBar.style.width = `${(gameState.power / gameState.total) * 100}%`;
}

// Save game state to localStorage
function saveGame() {
    localStorage.setItem('coins', gameState.coins.toString());
    localStorage.setItem('power', gameState.power.toString());
    localStorage.setItem('count', gameState.count.toString());
    localStorage.setItem('lastAdTime', gameState.lastAdTime.toString());
}

// Handle coin click
function handleCoinClick(e) {
    if (gameState.power <= 0) return;

    // Visual feedback
    applyClickEffect(e.offsetX, e.offsetY);
    
    // Update game state
    gameState.coins += 1;
    gameState.power -= 1;
    
    // Save and update
    saveGame();
    updateUI();
}

// Apply visual click effect
function applyClickEffect(x, y) {
    if (navigator.vibrate) navigator.vibrate(5);

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
}

// Recharge power over time
function rechargePower() {
    if (gameState.power < gameState.total) {
        gameState.power += gameState.count;
        if (gameState.power > gameState.total) {
            gameState.power = gameState.total;
        }
        saveGame();
        updateUI();
    }
}

// Handle ad reward
function handleAdReward(rewardAmount = 10) {
    const currentTime = Date.now();
    const cooldown = 60 * 1000; // 60 seconds cooldown
    
    // Check cooldown
    if (currentTime - gameState.lastAdTime < cooldown) {
        const remaining = Math.ceil((cooldown - (currentTime - gameState.lastAdTime)) / 1000);
        alert(`Please wait ${remaining} seconds before watching another ad.`);
        return false;
    }
    
    // Apply reward
    gameState.coins += rewardAmount;
    gameState.lastAdTime = currentTime;
    
    // Save and update
    saveGame();
    updateUI();
    
    return true;
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    image.addEventListener('click', handleCoinClick);
});
