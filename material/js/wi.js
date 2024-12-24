let userBalance = 1000;  // Initial user balance (can be updated dynamically)
        let withdrawalStatus = "No withdrawal made"; // Initial status
        let currentWithdrawal = null; // To hold the current withdrawal request

        document.getElementById('withdrawalForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const withdrawAmount = parseInt(document.getElementById('withdrawAmount').value);
            const address = document.getElementById('address').value;

            // Check if withdrawal amount meets the minimum requirement
            if (withdrawAmount < 1000) {
                alert("Minimum withdrawal amount is 1000 DOGS.");
                return;
            }

            // Check if user has enough balance
            if (withdrawAmount > userBalance) {
                alert("Insufficient balance.");
                return;
            }

            // Update status to pending
            withdrawalStatus = `Withdrawal of ${withdrawAmount} DOGS pending.`;
            currentWithdrawal = {
                amount: withdrawAmount,
                address: address,
                status: "pending"
            };

            updateStatus();

            // Simulate admin approval/rejection after a delay (admin decision made outside of this interface)
            alert("Your withdrawal request is now pending. Wait for admin approval.");
        });

        function updateStatus() {
            document.getElementById('withdrawStatus').textContent = withdrawalStatus;
        }

        // Simulated Admin Approval/Reject functions
        function adminApprove() {
            if (currentWithdrawal && currentWithdrawal.status === "pending") {
                withdrawalStatus = `Withdrawal of ${currentWithdrawal.amount} DOGS paid.`;
                userBalance -= currentWithdrawal.amount; // Deduct the withdrawn amount from user balance
                document.getElementById('user-balance').textContent = userBalance; // Update balance
                currentWithdrawal.status = "paid"; // Set status as paid
                updateStatus();
            } else {
                alert("No pending withdrawal request.");
            }
        }

        function adminReject() {
            if (currentWithdrawal && currentWithdrawal.status === "pending") {
                withdrawalStatus = `Withdrawal of ${currentWithdrawal.amount} DOGS rejected.`;
                currentWithdrawal.status = "rejected"; // Set status as rejected
                updateStatus();
            } else {
                alert("No pending withdrawal request.");
            }
        }
// Update the withdrawal status in the UI
        function updateStatus() {
            document.getElementById('withdrawStatus').textContent = withdrawalStatus;
        }
