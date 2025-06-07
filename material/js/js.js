let balance = parseInt(localStorage.getItem('balance')) || 0;

// Update balance on the UI
function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

updateBalance();

// Show alert function (simple example)
function showAlert(message) {
    alert(message);
}

// Handle ad button click and cooldown
function handleAdClick(button, rewardAmount = 10) {
    const lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    const currentTime = Date.now();
    const cooldown = 60 * 1000; // 60 seconds cooldown

    if (currentTime - lastAdTime < cooldown) {
        const remainingTime = Math.ceil((cooldown - (currentTime - lastAdTime)) / 1000);
        showAlert(`Please wait ${remainingTime} seconds before watching the ad again.`);
        return;
    }

    // Update balance immediately
    balance += rewardAmount;
    updateBalance();
    localStorage.setItem('balance', balance);

    // Save the current time as last ad watch time
    localStorage.setItem('lastAdTime', currentTime);

    // Disable button and start countdown
    button.disabled = true;
    let countdown = 60;
    button.textContent = `Wait ${countdown}s`;

    const intervalId = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            button.textContent = `Wait ${countdown}s`;
        } else {
            clearInterval(intervalId);
            button.disabled = false;
            button.textContent = "🦴 Claim";
        }
    }, 1000);
}
