// ===== TASK COMPLETION SYSTEM ===== //
// Global cooldown tracker
const taskCooldowns = new Map();

// Initialize task buttons on page load
function initializeTasks() {
    document.querySelectorAll('.task-button').forEach(button => {
        const taskId = button.id || 'default-task';
        const lastCompletion = localStorage.getItem(`taskCooldown_${taskId}`);
        const now = Date.now();
        
        if (lastCompletion) {
            const cooldownRemaining = 60000 - (now - parseInt(lastCompletion));
            if (cooldownRemaining > 0) {
                startCooldown(button, Math.floor(cooldownRemaining / 1000));
            }
        }
        
        button.addEventListener('click', () => handleTaskClick(button, 10)); // Default 10 coin reward
    });
}

// Handle task button click
function handleTaskClick(button, rewardAmount) {
    const taskId = button.id || 'default-task';
    
    // Prevent multiple clicks
    if (button.classList.contains('cooldown-active')) return;
    
    // Start cooldown immediately (optimistic UI update)
    startCooldown(button, 60);
    localStorage.setItem(`taskCooldown_${taskId}`, Date.now().toString());
    
    // Show ad and process reward
    showAd().then(() => {
        processReward(rewardAmount);
        showSuccessNotification(rewardAmount);
    }).catch(error => {
        console.error("Ad error:", error);
        resetCooldown(button); // Reset if ad fails
        showErrorNotification();
    });
}

// Cooldown management
function startCooldown(button, seconds) {
    button.classList.add('cooldown-active');
    button.disabled = true;
    
    let remaining = seconds;
    updateButtonText(button, remaining);
    
    const interval = setInterval(() => {
        remaining--;
        updateButtonText(button, remaining);
        
        if (remaining <= 0) {
            clearInterval(interval);
            resetCooldown(button);
        }
    }, 1000);
    
    // Store interval reference for cleanup
    taskCooldowns.set(button, interval);
}

function resetCooldown(button) {
    button.classList.remove('cooldown-active');
    button.disabled = false;
    button.textContent = "🦴 Claim";
    
    const interval = taskCooldowns.get(button);
    if (interval) clearInterval(interval);
    taskCooldowns.delete(button);
}

function updateButtonText(button, seconds) {
    button.textContent = seconds > 0 ? `Wait ${seconds}s` : "🦴 Claim";
}

// Reward processing
function processReward(amount) {
    const balance = parseInt(localStorage.getItem('balance')) || 0;
    const newBalance = balance + amount;
    localStorage.setItem('balance', newBalance.toString());
    updateBalanceDisplay(newBalance);
}

function updateBalanceDisplay(balance) {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = balance.toLocaleString();
    }
}

// Notification system (using your existing CSS classes)
function showSuccessNotification(rewardAmount) {
    const notification = createNotification(
        `+${rewardAmount} coins earned!`,
        'notification-success'
    );
    showNotification(notification);
}

function showErrorNotification() {
    const notification = createNotification(
        'Ad failed to load. Please try again.',
        'notification-error'
    );
    showNotification(notification);
}

function createNotification(message, className) {
    const notification = document.createElement('div');
    notification.className = `notification ${className}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            <button class="notification-close">OK</button>
        </div>
    `;
    
    return notification;
}

function showNotification(notification) {
    document.body.appendChild(notification);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Ad service integration (mock implementation)
function showAd() {
    return new Promise((resolve, reject) => {
        // Replace with your actual ad service integration
        const success = Math.random() > 0.1; // 90% success rate for testing
        
        setTimeout(() => {
            success ? resolve() : reject(new Error('Ad failed'));
        }, 2000);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeTasks();
    
    // Initialize balance display
    const balance = parseInt(localStorage.getItem('balance')) || 0;
    updateBalanceDisplay(balance);
});
