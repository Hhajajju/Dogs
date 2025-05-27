let balance = parseInt(localStorage.getItem('balance')) || 0;

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();

// Function to handle task completion and balance update with per-button timers
function completeTask(button, reward, taskUrl) {
    const lastCompletionTime = parseInt(localStorage.getItem(taskUrl)) || 0;
    const currentTime = Date.now();
    const timeRemaining = 24 * 60 * 60 * 1000 - (currentTime - lastCompletionTime);

    if (timeRemaining > 0) {
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);

        let timeMessage = "You need to wait ";
        if (hours > 0) timeMessage += `${hours} hour${hours !== 1 ? 's' : ''} `;
        if (minutes > 0) timeMessage += `${minutes} min${minutes !== 1 ? 's' : ''} `;
        if (seconds > 0) timeMessage += `${seconds} sec${seconds !== 1 ? 's' : ''}`;
        timeMessage = timeMessage.trim() + " before completing this task again.";

        showAlert(timeMessage);
        return;
    }

    balance += reward;
    updateBalance();
    localStorage.setItem(taskUrl, currentTime.toString());
    localStorage.setItem('balance', balance);
    window.open(taskUrl, '_blank');

    startTaskCountdown(button, 24 * 60 * 60); // Start a new 24-hour countdown
}

function startTaskCountdown(button, totalSeconds) {
    let remaining = totalSeconds;

    const updateButton = () => {
        const hrs = Math.floor(remaining / 3600);
        const mins = Math.floor((remaining % 3600) / 60);
        const secs = remaining % 60;

        let label = '';
        if (hrs > 0) label += `${hrs} hour${hrs !== 1 ? 's' : ''} `;
        if (mins > 0) label += `${mins} min${mins !== 1 ? 's' : ''} `;
        if (secs > 0 || (!hrs && !mins)) label += `${secs} sec${secs !== 1 ? 's' : ''}`;

        button.textContent = `Wait ${label.trim()}`;
    };

    updateButton();
    button.disabled = true;

    const interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(interval);
            button.textContent = "✅ Task Available";
            button.disabled = false;
        } else {
            updateButton();
        }
    }, 1000);
}

// Ad functionality with independent per-button timers
function handleTaskCompletion(rewardAmount, button) {
    const adKey = button.dataset.adKey || 'lastAdTime';
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
        let currentBalance = parseInt(localStorage.getItem('balance')) || 0;
        currentBalance += rewardAmount;
        localStorage.setItem('balance', currentBalance);
        document.getElementById('balance').textContent = currentBalance;
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
