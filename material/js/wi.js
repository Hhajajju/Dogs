
// User's balance (for the sake of this example, set to 50,000 DOGS)
let userBalance = 50000;

// Minimum withdrawal amount (10,000 Dogs)
const MIN_WITHDRAWAL = 10000;

function processWithdrawal(event) {
    event.preventDefault();  // Prevent form submission to handle via JavaScript
    
    // Get the form inputs
    let amount = parseFloat(document.getElementById("amount").value);
    let dogecoinAddress = document.getElementById("dogs_address").value;

    // Check if the entered amount is at least the minimum withdrawal amount
    if (amount < MIN_WITHDRAWAL) {
        alert("Minimum withdrawal amount is 10,000 DOGS.");
        return false;
    }

    // Check if the user has enough balance
    if (amount > userBalance) {
        alert("Insufficient balance.");
        return false;
    }

    // Deduct the amount from the user's balance (for this simulation)
    userBalance -= amount;

    // Show the withdrawal submission success alert
    alert("Withdrawal request submitted. It can be processed within 3 business days.");

    // Update the status to "Processing"
    document.getElementById("status").style.display = "block";
    document.getElementById("statusText").textContent = "Processing...";

    // Simulate the process of the withdrawal being completed after 3 business days (simulate with 3 seconds)
    setTimeout(() => {
        document.getElementById("statusText").textContent = "Completed";
        document.getElementById("status").classList.add("completed");
    }, 3000);  // 3 seconds delay to simulate 3 business days
}
