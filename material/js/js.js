
let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(Renard, taskUrl) {
    // Get the timestamp of the last task completion from localStorage
    const lastCompleted = parseInt(localStorage.getItem(taskUrl + '_timestamp')) || 0;
    const currentTime = Date.now(); // Current time in milliseconds

    // Check if 30 minutes (1800000 ms) have passed since the last task completion
    const timeLimit = 30 * 60 * 1000; // 30 minutes in milliseconds
    if (currentTime - lastCompleted < timeLimit) {
        const timeLeft = Math.floor((timeLimit - (currentTime - lastCompleted)) / 60000); // Time left in minutes
        alert(`You have already completed this task. Please wait ${timeLeft} minute${timeLeft > 1 ? 's' : ''} before completing it again.`);
        return;
    }

    // Update balance with the reward
    balance += reward;
    updateBalance();

    // Save the current timestamp to localStorage
    localStorage.setItem(taskUrl + '_timestamp', currentTime);

    // Save the updated balance to localStorage
    localStorage.setItem('balance', balance);

    // Mark the task as completed (optional)
    localStorage.setItem(taskUrl, 'true');

    // Open the task URL in a new window
    window.open(taskUrl, '_blank');
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Initial balance update on page load
updateBalance();
