let balance = parseInt(localStorage.getItem('balance')) || 0;

// Function to update balance on the UI
function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();

// Function to handle task completion and balance update
function completeTask(reward, taskUrl) {
    const lastCompletionTime = parseInt(localStorage.getItem(taskUrl)) || 0;
    const currentTime = Date.now();
    const timeRemaining = 24 * 60 * 60 * 1000 - (currentTime - lastCompletionTime); // 24 hours in milliseconds

    if (timeRemaining > 0) {
        showAlert(`You need to wait ${Math.ceil(timeRemaining / 1000)} seconds before completing this task again.`);
        return;
    }

    balance += reward;
    updateBalance();

    localStorage.setItem(taskUrl, currentTime.toString()); // Store the current time as the last completion time
    localStorage.setItem('balance', balance);

    window.open(taskUrl, '_blank');
}

// Handle ad button click with a 60-second cooldown
function handleAdCompletion(rewardAmount, button, taskKey) {
    const storedTime = parseInt(localStorage.getItem(taskKey)) || 0;
    const currentTime = Date.now();
    const remainingTime = Math.max(0, 60 * 1000 - (currentTime - storedTime)); // 60 seconds cooldown for ad completion

    if (remainingTime > 0) {
        showAlert(`You need to wait ${Math.ceil(remainingTime / 1000)} seconds before claiming again.`);
        return;
    }

    // Disable the button and start the countdown
    button.disabled = true;
    let countdownTime = Math.ceil(remainingTime / 1000); // Countdown in seconds
    const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            button.textContent = `Wait ${countdownTime--}s`;
        } else {
            // Re-enable the button and reset the text after the countdown ends
            clearInterval(countdownInterval);
            button.disabled = false;
            button.textContent = "🦴 Claim";
        }
    }, 1000);

    // Trigger the ad display
    show_8694372().then(() => {
        // After ad completion, give the reward and update ad completion time
        let currentBalance = balance;

        // Update the coin balance
        currentBalance += rewardAmount;

        // Store the updated balance back in localStorage
        localStorage.setItem('balance', currentBalance);

        // Update the UI to reflect the new balance
        document.getElementById('balance').textContent = currentBalance;

        // Update the ad cooldown (next available time)
        const nextAvailableTime = Date.now() + 60 * 1000; // 60 seconds cooldown for ad
        localStorage.setItem(taskKey, nextAvailableTime);
    }).catch((error) => {
        // Handle any errors that occur during ad display
        console.error('Error displaying ad:', error);
        alert('An error occurred while displaying the ad.');
    });
}

// Helper function to show a styled alert
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
