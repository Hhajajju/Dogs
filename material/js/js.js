    // Retrieve balance from localStorage
    let balance = parseInt(localStorage.getItem('balance')) || 0;

    // Update balance function
    function updateBalance() {
        document.getElementById('balance').textContent = balance;
    }

    // Function to complete a task
    function completeTask(reward, taskUrl) {
        // Check if the task has already been completed
        if (localStorage.getItem(taskUrl) === 'true') {
            alert('You have already completed this task.');
            return;
        }

        // Add the reward to the balance
        balance += reward;
        updateBalance();

        // Mark the task as completed
        localStorage.setItem(taskUrl, 'true');
        localStorage.setItem('balance', balance);

        // Open the task URL in a new tab
        window.open(taskUrl, '_blank');
    }

    // Handle task completion with a countdown
    function handleTaskCompletion(rewardAmount, button) {
        // Disable the button and start the countdown
        button.disabled = true;
        let countdownTime = 60; // 60 seconds

        // Update button text every second
        const countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                button.textContent = `Wait ${countdownTime--}s`;
            } else {
                // Re-enable the button and reset the text after the countdown ends
                clearInterval(countdownInterval);
                button.disabled = false;
                button.textContent = "🦴 Claim";
            }
        }, 1000);

        // Trigger the ad display
        show_8694372().then(() => {
            // Create a cleaner notification with the site's color scheme
            const notificationBox = document.createElement('div');
            notificationBox.style.position = 'fixed';
            notificationBox.style.top = '50%';
            notificationBox.style.left = '50%';
            notificationBox.style.transform = 'translate(-50%, -50%)';
            notificationBox.style.background = '#fff'; // white background
            notificationBox.style.color = '#000'; // black text
            notificationBox.style.border = '1px solid #ccc'; // Light gray border
            notificationBox.style.borderRadius = '10px';
            notificationBox.style.padding = '20px';
            notificationBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            notificationBox.style.textAlign = 'center';
            notificationBox.style.zIndex = '1000';

            const message = document.createElement('p');
            message.textContent = 'You have watched the ad!';
            message.style.margin = '0 0 15px';
            message.style.fontSize = '16px';

            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.style.padding = '10px 20px';
            okButton.style.border = 'none';
            okButton.style.background = '#333'; // Medium gray button
            okButton.style.color = '#fff'; // black text
            okButton.style.borderRadius = '5px';
            okButton.style.cursor = 'pointer';
            okButton.style.transition = 'background 0.3s';

            // Add hover effect to the button
            okButton.addEventListener('mouseover', () => {
                okButton.style.background = '#333'; // Lighter gray on hover
            });

            okButton.addEventListener('mouseout', () => {
                okButton.style.background = '#555'; // Return to original color
            });

            okButton.addEventListener('click', () => {
                document.body.removeChild(notificationBox);
            });

            notificationBox.appendChild(message);
            notificationBox.appendChild(okButton);
            document.body.appendChild(notificationBox);

            // Retrieve current coin balance from localStorage
            let currentBalance = parseInt(localStorage.getItem('coinBalance')) || 0;

            // Update the coin balance
            currentBalance += rewardAmount;

            // Store the updated balance back in localStorage
            localStorage.setItem('coinBalance', currentBalance);

            // Update the UI to reflect the new balance
            document.getElementById('balance').textContent = currentBalance;
        }).catch((error) => {
            // Handle any errors that occur during ad display
            console.error('Error displaying ad:', error);
            alert('An error occurred while displaying the ad.');
        });
    }

    // Initialize balance display on page load
    updateBalance();
