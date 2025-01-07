let balance = parseInt(localStorage.getItem('balance')) || 0;
let adTimers = JSON.parse(localStorage.getItem('adTimers')) || {};

function completeTask(reward, taskUrl) {
    if (localStorage.getItem(taskUrl) === 'true') {
        showAlert('You have already completed this task!');
        return;
    }

    balance += reward;
    updateBalance();

    localStorage.setItem(taskUrl, 'true');
    localStorage.setItem('balance', balance);

    window.open(taskUrl, '_blank');
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();

function handleTaskCompletion(rewardAmount, button, adId) {
    // Check if the ad was clicked previously and the cooldown timer has expired
    let adTimer = adTimers[adId] || 0;
    let currentTime = Date.now();
    let cooldownTime = 60000; // 60 seconds cooldown

    if (currentTime - adTimer < cooldownTime) {
        let remainingTime = Math.ceil((cooldownTime - (currentTime - adTimer)) / 1000);
        showAlert(`Please wait ${remainingTime} more seconds before you can claim again.`);
        return;
    }

    // Disable the button and start the countdown
    button.disabled = true;
    let countdownTime = 60; // 60 seconds for ad watch

    // Update button text every second
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
        // Create a cleaner notification with the site's color scheme
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

        // Retrieve current coin balance from localStorage
        let currentBalance = balance;

        // Update the coin balance
        currentBalance += rewardAmount;

        // Store the updated balance back in localStorage
        localStorage.setItem('balance', currentBalance);

        // Update the UI to reflect the new balance
        document.getElementById('balance').textContent = currentBalance;

        // Update the ad timer for this adId
        adTimers[adId] = Date.now();
        localStorage.setItem('adTimers', JSON.stringify(adTimers));
    }).catch((error) => {
        // Handle any errors that occur during ad display
        console.error('Error displaying ad:', error);
        alert('An error occurred while displaying the ad.');
    });
}

// Helper function to show a styled alert (like in task.js)
function showAlert(message) {
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

    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.margin = '0 0 15px';
    messageElement.style.fontSize = '16px';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.padding = '10px 20px';
    okButton.style.border = 'none';
    okButton.style.background = '#333'; // Medium gray button
    okButton.style.color = '#fff'; // white text
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

    notificationBox.appendChild(messageElement);
    notificationBox.appendChild(okButton);
    document.body.appendChild(notificationBox);
}
