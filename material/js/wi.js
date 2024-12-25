
// Minimum withdrawal amount
const MIN_WITHDRAWAL = 1000;

// Function to simulate the withdrawal status update after 24 hours
function simulateWithdrawalStatusUpdate(withdrawalId) {
    // After 24 hours, change the status to completed
    setTimeout(async () => {
        try {
            // Simulate the server updating the withdrawal status to 'completed'
            const response = await fetch(`/withdrawal_status/${withdrawalId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Update the withdrawal status on the UI
                displayWithdrawalStatus({ ...data, status: 'completed', completed_at: new Date().toISOString() });
            } else {
                alert("Error fetching withdrawal status: " + data.message);
            }
        } catch (error) {
            console.error("Error updating withdrawal status:", error);
            alert("There was an error updating the withdrawal status.");
        }
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
}

// Make an API request to request a withdrawal
async function requestWithdrawal(userId, amount, dogsAddress) {
    // Check if the withdrawal amount is greater than or equal to the minimum withdrawal limit
    if (amount < MIN_WITHDRAWAL) {
        alert(`Minimum withdrawal is ${MIN_WITHDRAWAL} DOGS.`);
        return; // Exit the function if the amount is less than the minimum
    }

    try {
        const response = await fetch('/request_withdrawal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                amount: amount,
                dogs_address: dogsAddress,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Show the alert message to the user
            alert("Withdrawal submitted successfully!");
            
            // Update the UI to show the new balance
            updateUserBalance(data.new_balance);

            // Show that the withdrawal status is "processing"
            displayWithdrawalStatus({
                status: "processing",
                created_at: new Date().toISOString(),
            });

            // Simulate the status update after 24 hours
            simulateWithdrawalStatusUpdate(data.withdrawal_id);
        } else {
            // Show the error message if withdrawal failed
            alert(data.message);
        }
    } catch (error) {
        console.error("Error making withdrawal request:", error);
        alert("There was an error processing your withdrawal request.");
    }
}

// Function to update the user's balance on the UI
function updateUserBalance(newBalance) {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = `Your current balance: ${newBalance} DOGS`;
    }
}

// Function to check withdrawal status
async function checkWithdrawalStatus(withdrawalId) {
    try {
        const response = await fetch(`/withdrawal_status/${withdrawalId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Show the withdrawal status to the user
            displayWithdrawalStatus(data);
        } else {
            alert("Error fetching withdrawal status: " + data.message);
        }
    } catch (error) {
        console.error("Error fetching withdrawal status:", error);
        alert("There was an error checking the withdrawal status.");
    }
}

// Function to display withdrawal status
function displayWithdrawalStatus(withdrawalData) {
    const statusElement = document.getElementById('withdrawal-status');
    if (statusElement) {
        statusElement.textContent = `Withdrawal Status: ${withdrawalData.status}`;
        if (withdrawalData.completed_at) {
            statusElement.textContent += ` (Completed on: ${new Date(withdrawalData.completed_at).toLocaleString()})`;
        }
    }
}

// Example of how to call the function (you can tie this to a form submission event or a button)
const userId = 'user123'; // Example user ID
const amount = 2000; // Example withdrawal amount
const dogsAddress = '0x1234567890abcdef'; // Example DOGS address

// Request withdrawal when button is clicked (for example)
document.getElementById('withdrawal-btn').addEventListener('click', () => {
    requestWithdrawal(userId, amount, dogsAddress);
});

// Check withdrawal status when button is clicked (for example)
document.getElementById('check-status-btn').addEventListener('click', () => {
    const withdrawalId = 'some_withdrawal_id'; // Replace with actual withdrawal ID
    checkWithdrawalStatus(withdrawalId);
});
