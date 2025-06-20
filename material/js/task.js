<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Completion System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .task-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 10px 2px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .task-button:hover {
            background-color: #45a049;
        }
        .task-button.cooldown-active {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        #balance {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
        }
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.3s;
        }
        .notification-success {
            background-color: #dff0d8;
            border-color: #d6e9c6;
            color: #3c763d;
        }
        .notification-error {
            background-color: #f2dede;
            border-color: #ebccd1;
            color: #a94442;
        }
        .notification.fade-out {
            opacity: 0;
        }
        .notification-close {
            margin-left: 15px;
            color: #333;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="balance-container">
        Your Balance: <span id="balance">0</span> TON
    </div>

    <div class="task-buttons-container">
        <button class="task-button" id="task1">🦴 Claim TON</button>
        <button class="task-button" id="task2">🦴 Claim TON</button>
    </div>

    <script>
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
                
                button.addEventListener('click', () => handleTaskClick(button, 0.001)); // 0.001 TON reward
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
                showSuccessNotification(`+${rewardAmount} TON earned!`);
            }).catch(error => {
                console.error("Ad error:", error);
                resetCooldown(button); // Reset if ad fails
                showErrorNotification('Ad failed to load. Please try again.');
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
            button.textContent = "🦴 Claim TON";
            
            const interval = taskCooldowns.get(button);
            if (interval) clearInterval(interval);
            taskCooldowns.delete(button);
        }

        function updateButtonText(button, seconds) {
            button.textContent = seconds > 0 ? `Wait ${seconds}s` : "🦴 Claim TON";
        }

        // Reward processing
        function processReward(amount) {
            const balance = parseFloat(localStorage.getItem('balance')) || 0;
            const newBalance = balance + amount;
            localStorage.setItem('balance', newBalance.toString());
            updateBalanceDisplay(newBalance);
        }

        function updateBalanceDisplay(balance) {
            const balanceElement = document.getElementById('balance');
            if (balanceElement) {
                balanceElement.textContent = balance.toFixed(3); // Show 3 decimal places for TON
            }
        }

        // Notification system
        function showSuccessNotification(message) {
            const notification = createNotification(message, 'notification-success');
            showNotification(notification);
        }

        function showErrorNotification(message) {
            const notification = createNotification(message, 'notification-error');
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
            // Initialize balance to 0 if not exists
            if (localStorage.getItem('balance') === null) {
                localStorage.setItem('balance', '0');
            }
            
            // Load and display balance
            const balance = parseFloat(localStorage.getItem('balance')) || 0;
            updateBalanceDisplay(balance);
            
            // Initialize tasks
            initializeTasks();
        });
    </script>
</body>
</html>
