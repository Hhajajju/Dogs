let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
    const lastCompletedTime = parseInt(localStorage.getItem(taskUrl + '_timestamp')) || 0;
    const currentTime = Date.now();

    // Check if 2 hours (7200000 milliseconds) have passed since last completion
    if (currentTime - lastCompletedTime < 7200000) {
        disableButtonForTime(taskUrl, 7200000 - (currentTime - lastCompletedTime)); // Disable button for the remaining time
        return;
    }

    if (localStorage.getItem(taskUrl) === 'true') {
        return; // Task already completed
    }

    // Update balance and timestamp
    balance += reward;
    updateBalance();
    localStorage.setItem('balance', balance);

    // Mark the task as completed and store the current time
    localStorage.setItem(taskUrl, 'true');
    localStorage.setItem(taskUrl + '_timestamp', currentTime);

    window.open(taskUrl, '_blank');
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Function to disable the button for a certain amount of time (in milliseconds)
function disableButtonForTime(taskUrl, remainingTime) {
    const button = document.getElementById(taskUrl + '_button'); // Assuming button has ID based on taskUrl

    // Disable the button
    button.disabled = true;

    // Show remaining time in seconds (optional: update this on the button or in a message)
    const remainingSeconds = Math.ceil(remainingTime / 1000);
    button.textContent = `Please wait ${remainingSeconds} seconds`;

    // After the remaining time, re-enable the button and update its text
    setTimeout(() => {
        button.disabled = false;
        button.textContent = 'Complete Task';
    }, remainingTime);
}

// Example call to initialize the button and balance display
document.addEventListener('DOMContentLoaded', function() {
    updateBalance();
    const taskUrl = "https://example.com"; // Replace with your task URL
    const button = document.getElementById(taskUrl + '_button');
    
    // Initially, check if the button should be disabled
    const lastCompletedTime = parseInt(localStorage.getItem(taskUrl + '_timestamp')) || 0;
    const currentTime = Date.now();
    if (currentTime - lastCompletedTime < 7200000) {
        disableButtonForTime(taskUrl, 7200000 - (currentTime - lastCompletedTime));
    }
});
