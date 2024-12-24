let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
    // Get the last completion time of the task (if exists)
    let lastCompletedTime = localStorage.getItem(taskUrl);
    
    // If the task has already been completed
    if (lastCompletedTime) {
        // Calculate the difference between current time and last completion time
        let currentTime = new Date().getTime();
        let elapsedTime = currentTime - parseInt(lastCompletedTime);
        
        // If less than 1 hour has passed (3600000 ms = 1 hour)
        if (elapsedTime < 3600000) {
            let remainingTime = 3600000 - elapsedTime;
            let remainingMinutes = Math.ceil(remainingTime / 60000); // convert ms to minutes
            alert(`You need to wait ${remainingMinutes} minute(s) before completing this task again.`);
            return;
        }
    }

    // Update balance after task completion
    balance += reward;
    updateBalance();

    // Store the current time as the last completion time for the task
    localStorage.setItem(taskUrl, new Date().getTime().toString());

    // Store the updated balance
    localStorage.setItem('balance', balance);

    // Open the task URL in a new tab
    window.open(taskUrl, '_blank');
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();
