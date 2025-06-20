// Initialize balance
let balance = 0;

// Load balance when page loads
function loadBalance() {
    // Explicitly initialize balance to 0 if not exists
    if (localStorage.getItem('balance') === null) {
        localStorage.setItem('balance', '0');
    }
    
    const storedBalance = localStorage.getItem('balance');
    balance = parseFloat(storedBalance) || 0; // Use parseFloat instead of parseInt for decimal support
    updateBalance();
}

// Update balance on the UI
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = balance.toFixed(3); // Show 3 decimal places for TON
    }
    // Save to localStorage whenever we update
    localStorage.setItem('balance', balance.toString());
}

// Show alert function
function showAlert(message) {
    alert(message);
}

// Handle ad button click and cooldown
function handleAdClick(button, rewardAmount = 0.001) { // Changed to 0.001 TON as more realistic amount
    const lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    const currentTime = Date.now();
    const cooldown = 60 * 1000; // 60 seconds cooldown

    // Check cooldown
    if (currentTime - lastAdTime < cooldown) {
        const remainingTime = Math.ceil((cooldown - (currentTime - lastAdTime)) / 1000);
        showAlert(`Please wait ${remainingTime} seconds before watching the ad again.`);
        return;
    }

    // Store click time immediately
    localStorage.setItem('lastAdTime', currentTime.toString());
    
    // Update balance
    balance += rewardAmount;
    updateBalance();

    // Disable button and start countdown
    if (button) {
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
                button.textContent = "🦴 Claim"; // Fixed emoji display
            }
        }, 1000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBalance();
    
    // Add click event to ad button
    const adButton = document.getElementById('adButton');
    if (adButton) {
        adButton.addEventListener('click', function() {
            handleAdClick(this, 0.001); // Pass the reward amount explicitly
        });
    }
});
