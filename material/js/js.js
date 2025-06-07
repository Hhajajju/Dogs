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

// New ad functionality with countdown, notification, and storage for the ad timer
function handleTaskCompletion(rewardAmount, button) {
    // Retrieve the last ad completion time from localStorage
    const lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    const currentTime = Date.now();
    const remainingTime = Math.max(0, (lastAdTime + 60 * 1000) - currentTime); // 60 seconds cooldown for the ad

    if (remainingTime > 0) {
        showAlert(`You need to wait ${Math.ceil(remainingTime / 1000)} seconds before watching the ad again.`);
        return;
    }

    // Disable the button and start the countdown
    button.disabled = true;
    let countdownTime = 60; // 60 seconds cooldown

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
