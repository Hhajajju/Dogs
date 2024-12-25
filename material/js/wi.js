// Initial balance (this value can be dynamically set or fetched from your backend)
let userBalance = 5000;  // Example starting balance
const MIN_WITHDRAWAL = 1000;  // Minimum withdrawal amount

// Function to update the balance (could be linked to UI)
function updateBalance() {
    console.log(`Current Balance: ${userBalance} DOGS`);
}

// Function to handle the withdrawal process
async function requestWithdrawal(amount, dogsAddress) {
    // Check if the withdrawal amount meets the minimum withdrawal requirement
    if (amount < MIN_WITHDRAWAL) {
        alert(`Minimum withdrawal is ${MIN_WITHDRAWAL} DOGS.`);
        return;
    }

    // Check if the user has sufficient balance
    if (amount > userBalance) {
        alert("Insufficient balance.");
        return;
    }

    // Deduct the withdrawn amount from the balance
    userBalance -= amount;

    // Show successful withdrawal message
    alert("Withdrawal submitted successfully!");

    // Show withdrawal status as "processing"
    displayWithdrawalStatus("processing");

    // Simulate 24-hour delay before completing the withdrawal
    setTimeout(() => {
        // After 24 hours, update withdrawal status to "completed"
        displayWithdrawalStatus("completed");
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Optionally update the balance on the page
    updateBalance();
}

// Function to update the withdrawal status (could be linked to UI)
function displayWithdrawalStatus(status) {
    console.log(`Withdrawal Status: ${status}`);
}

// Event listener for the withdrawal button (assuming button with id 'withdrawal-btn' exists)
document.getElementById('withdrawal-btn').addEventListener('click', () => {
    const amount = parseInt(document.getElementById('amount').value, 10); // Get the withdrawal amount
    const dogsAddress = document.getElementById('dogsAddress').value;  // Get the DOGS address

    if (!amount || !dogsAddress) {
        alert('Please enter a valid amount and DOGS address.');
        return;
    }

    requestWithdrawal(amount, dogsAddress);
});

// Event listener for the check status button (assuming button with id 'check-status-btn' exists)
document.getElementById('check-status-btn').addEventListener('click', () => {
    // Display the current withdrawal status (this could be dynamically displayed in the UI)
    alert(`Current withdrawal status: ${document.getElementById('withdrawal-status').textContent}`);
});
