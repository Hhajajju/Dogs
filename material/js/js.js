let balance = parseInt(localStorage.getItem('balance')) || 0;

// Function to update balance on the UI
function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();

// Function to format time in HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Function to handle task completion and balance update
function completeTask(reward, taskUrl, button) {
    const lastCompletionTime = parseInt(localStorage.getItem(taskUrl)) || 0;
    const currentTime = Date.now();
    const timeRemaining = 24 * 60 * 60 * 1000 - (currentTime - lastCompletionTime); // 24 hours in milliseconds

    if (timeRemaining > 0) {
        showAlert(`You need to wait ${formatTime(timeRemaining)} before completing this task again.`);
        return;
    }

    // Disable only the clicked task button
    button.disabled = true;
    let countdownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Store completion time immediately
    localStorage.setItem(taskUrl, currentTime.toString());
    
    // Start countdown for this specific task
    const countdownInterval = setInterval(() => {
        const currentRemaining = 24 * 60 * 60 * 1000 - (Date.now() - currentTime);
        
        if (currentRemaining > 0) {
            button.textContent = `Wait ${formatTime(currentRemaining)}`;
        } else {
            clearInterval(countdownInterval);
            button.disabled = false;
            button.textContent = "Complete Task";
        }
    }, 1000);

    balance += reward;
    updateBalance();
    localStorage.setItem('balance', balance);
    window.open(taskUrl, '_blank');
}

// New ad functionality with countdown, notification, and storage for the ad timer
function handleTaskCompletion(rewardAmount, button) {
    // Retrieve the last ad completion time from localStorage
    const lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    const currentTime = Date.now();
    const remainingTime = Math.max(0, (lastAdTime + 60 * 1000) - currentTime); // 60 seconds cooldown for the ad

    if (remainingTime > 0) {
        showAlert(`You need to wait ${formatTime(remainingTime)} before watching the ad again.`);
        return;
    }

    // Disable only the clicked ad button
    button.disabled = true;
    let countdownTime = 60 * 1000; // 60 seconds in milliseconds

    // Update button text every second
    const countdownInterval = setInterval(() => {
        const currentRemaining = Math.max(0, (lastAdTime + 60 * 1000) - Date.now());
        
        if (currentRemaining > 0) {
            button.textContent = `Wait ${formatTime(currentRemaining)}`;
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
        let currentBalance = parseInt(localStorage.getItem('balance')) || 0;

        // Update the coin balance
        currentBalance += rewardAmount;

        // Store the updated balance back in localStorage
        localStorage.setItem('balance', currentBalance);

        // Update the UI to reflect the new balance
        document.getElementById('balance').textContent = currentBalance;

        // Store the current time as the last ad completion time
        localStorage.setItem('lastAdTime', currentTime);

        // Show the notification after watching the ad
        const notificationBox = document.createElement('div');
        notificationBox.style.position = 'fixed';
        notificationBox.style.top = '50%';
        notificationBox.style.left = '50%';
        notificationBox.style.transform = 'translate(-50%, -50%)';
        notificationBox.style.background = '#fff'; // white background
        notificationBox.style.color = '#000'; // black text
        notificationBox.style.border = '1px solid #ccc'; // Light gray border
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
        okButton.style.background = '#333'; // Medium gray button
        okButton.style.color = '#fff'; // black text
        okButton.style.borderRadius = '5px';
        okButton.style.cursor = 'pointer';
        okButton.style.transition = 'background 0.3s';

        // Add hover effect to the button
        okButton.addEventListener('mouseover', () => {
            okButton.style.background = '#333'; // Lighter gray on hover
        });

        okButton.addEventListener('mouseout', () => {
            okButton.style.background = '#555'; // Return to original color
        });

        okButton.addEventListener('click', () => {
            document.body.removeChild(notificationBox);
        });

        notificationBox.appendChild(message);
        notificationBox.appendChild(okButton);
        document.body.appendChild(notificationBox);
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
