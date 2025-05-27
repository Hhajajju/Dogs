let balance = parseInt(localStorage.getItem('balance')) || 0;

// Update balance in the UI
function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
updateBalance();

// Format milliseconds into readable time
function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let result = '';
    if (hours > 0) result += `${hours} hour${hours !== 1 ? 's' : ''} `;
    if (minutes > 0) result += `${minutes} min${minutes !== 1 ? 's' : ''} `;
    if (seconds >= 0) result += `${seconds} sec${seconds !== 1 ? 's' : ''}`;
    return result.trim();
}

// Task button handler with 24h cooldown
function completeTask(reward, taskUrl, button) {
    const taskKey = button.getAttribute('data-task');
    const lastCompletionTime = parseInt(localStorage.getItem(taskKey)) || 0;
    const currentTime = Date.now();
    const timeRemaining = 24 * 60 * 60 * 1000 - (currentTime - lastCompletionTime); // 24 hours

    const countdownDisplay = button.nextElementSibling;

    if (timeRemaining > 0) {
        let remaining = timeRemaining;
        button.disabled = true;

        const updateCountdown = () => {
            if (remaining <= 0) {
                clearInterval(timerInterval);
                button.disabled = false;
                countdownDisplay.textContent = '';
                return;
            }
            countdownDisplay.textContent = `Remaining: ${formatTime(remaining)}`;
            remaining -= 1000;
        };

        updateCountdown();
        const timerInterval = setInterval(updateCountdown, 1000);
        return;
    }

    balance += reward;
    updateBalance();
    localStorage.setItem(taskKey, currentTime.toString());
    localStorage.setItem('balance', balance);
    window.open(taskUrl, '_blank');
}

// Ad button handler with 60s cooldown
function handleTaskCompletion(rewardAmount, button) {
    const adKey = button.getAttribute('data-task');
    const lastAdTime = parseInt(localStorage.getItem(adKey)) || 0;
    const currentTime = Date.now();
    const remainingTime = Math.max(0, (lastAdTime + 60 * 1000) - currentTime);

    if (remainingTime > 0) {
        showAlert(`You need to wait ${Math.ceil(remainingTime / 1000)} seconds before watching the ad again.`);
        return;
    }

    button.disabled = true;
    let countdownTime = 60;

    const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            button.textContent = `Wait ${countdownTime--}s`;
        } else {
            clearInterval(countdownInterval);
            button.disabled = false;
            button.textContent = "🦴 Claim";
        }
    }, 1000);

    show_8694372().then(() => {
        balance += rewardAmount;
        updateBalance();
        localStorage.setItem('balance', balance);
        localStorage.setItem(adKey, currentTime);

        const notificationBox = document.createElement('div');
        notificationBox.style.position = 'fixed';
        notificationBox.style.top = '50%';
        notificationBox.style.left = '50%';
        notificationBox.style.transform = 'translate(-50%, -50%)';
        notificationBox.style.background = '#fff';
        notificationBox.style.color = '#000';
        notificationBox.style.border = '1px solid #ccc';
        notificationBox.style.borderRadius = '10px';
        notificationBox.style.padding = '20px';
        notificationBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        notificationBox.style.textAlign = 'center';
        notificationBox.style.zIndex = '1000';

        const message = document.createElement('p');
        message.textContent = 'You have watched the ad!';
        message.style.margin = '0 0 15px';
        message.style.fontSize = '16px';

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.style.padding = '10px 20px';
        okButton.style.border = 'none';
        okButton.style.background = '#333';
        okButton.style.color = '#fff';
        okButton.style.borderRadius = '5px';
        okButton.style.cursor = 'pointer';
        okButton.style.transition = 'background 0.3s';

        okButton.addEventListener('mouseover', () => {
            okButton.style.background = '#333';
        });
        okButton.addEventListener('mouseout', () => {
            okButton.style.background = '#555';
        });
        okButton.addEventListener('click', () => {
            document.body.removeChild(notificationBox);
        });

        notificationBox.appendChild(message);
        notificationBox.appendChild(okButton);
        document.body.appendChild(notificationBox);
    }).catch((error) => {
        console.error('Error displaying ad:', error);
        alert('An error occurred while displaying the ad.');
    });
}

// Alert pop-up box
function showAlert(message) {
    const notificationBox = document.createElement('div');
    notificationBox.style.position = 'fixed';
    notificationBox.style.top = '50%';
    notificationBox.style.left = '50%';
    notificationBox.style.transform = 'translate(-50%, -50%)';
    notificationBox.style.background = '#fff';
    notificationBox.style.color = '#000';
    notificationBox.style.border = '1px solid #ccc';
    notificationBox.style.borderRadius = '10px';
    notificationBox.style.padding = '20px';
    notificationBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    notificationBox.style.textAlign = 'center';
    notificationBox.style.zIndex = '1000';

    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.margin = '0 0 15px';
    messageElement.style.fontSize = '16px';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.padding = '10px 20px';
    okButton.style.border = 'none';
    okButton.style.background = '#333';
    okButton.style.color = '#fff';
    okButton.style.borderRadius = '5px';
    okButton.style.cursor = 'pointer';
    okButton.style.transition = 'background 0.3s';

    okButton.addEventListener('mouseover', () => {
        okButton.style.background = '#333';
    });
    okButton.addEventListener('mouseout', () => {
        okButton.style.background = '#555';
    });
    okButton.addEventListener('click', () => {
        document.body.removeChild(notificationBox);
    });

    notificationBox.appendChild(messageElement);
    notificationBox.appendChild(okButton);
    document.body.appendChild(notificationBox);
}
