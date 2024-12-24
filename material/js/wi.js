
        document.getElementById("withdrawalForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let withdrawAmount = document.getElementById("withdrawAmount").value;
            let userBalance = parseInt(document.getElementById("user-balance").innerText);

            if (withdrawAmount < 1000) {
                alert("Minimum withdrawal is 1000 DOGS");
                return;
            }

            if (withdrawAmount > userBalance) {
                alert("Insufficient balance");
                return;
            }

            // Submit withdrawal request (this would be handled by your backend)
            document.getElementById("withdrawStatus").innerText = "Withdrawal request submitted. Awaiting admin approval...";
            // Update balance after request (you would update this with backend data)
            document.getElementById("user-balance").innerText = userBalance - withdrawAmount;

             // Here you would send data to the server to process the withdrawal (using AJAX or a backend)
            // For now, we're simulating a backend response
            setTimeout(() => {
                alert("Your withdrawal is now under admin review.");
            }, 1000);
        });                                                      
