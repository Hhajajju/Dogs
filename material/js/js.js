let balance = parseInt(localStorage.getItem('balance')) || 0;

function completeTask(reward, taskUrl) {
    const lastCompletedTime = parseInt(localStorage.getItem(taskUrl + '_timestamp')) || 0;
    const currentTime = Date.now();

    // Check if 2 hours (7200000 milliseconds) have passed since last completion
    if (currentTime - lastCompletedTime < 7200000) {
        alert('You can only complete this task once every 2 hours.');
        return;
    }

    if (localStorage.getItem(taskUrl) === 'true') {
        alert('You have already completed this task.');
        return;
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

updateBalance();
