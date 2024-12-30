<script>
  window.onload = function() {
    // Wait for Telegram Web App SDK to be initialized
    Telegram.WebApp.ready();

    const body = document.body;
    const image = body.querySelector('#coin');
    const h1 = body.querySelector('h1');

    let coins = localStorage.getItem('coins');
    let total = localStorage.getItem('total');
    let power = localStorage.getItem('power');
    let count = localStorage.getItem('count');

    if (coins == null) {
      localStorage.setItem('coins', '0');
      h1.textContent = '0';
    } else {
      h1.textContent = Number(coins).toLocaleString();
    }

    if (total == null) {
      localStorage.setItem('total', '500');
      body.querySelector('#total').textContent = '/500';
    } else {
      body.querySelector('#total').textContent = `/${total}`;
    }

    if (power == null) {
      localStorage.setItem('power', '500');
      body.querySelector('#power').textContent = '500';
    } else {
      body.querySelector('#power').textContent = power;
    }

    if (count == null) {
      localStorage.setItem('count', '1');
    }

    // Add Telegram Web App specific interactions
    Telegram.WebApp.MainButton.show();
    Telegram.WebApp.MainButton.setText("Collect Coins");
    Telegram.WebApp.MainButton.onClick(() => {
      alert("You clicked the main button!");
    });

    // Handle coin click
    image.addEventListener('click', (e) => {
      let x = e.offsetX;
      let y = e.offsetY;

      // Vibrate the device for a short time (optional)
      if ("vibrate" in navigator) {
        navigator.vibrate(5);
      }

      coins = localStorage.getItem('coins');
      power = localStorage.getItem('power');

      if (Number(power) > 0) {
        // Increase coins and decrease power
        localStorage.setItem('coins', (Number(coins) + 1).toString());
        h1.textContent = (Number(coins) + 1).toLocaleString();

        localStorage.setItem('power', (Number(power) - 1).toString());
        body.querySelector('#power').textContent = (Number(power) - 1).toString();
      }

      // Add animation based on the click position
      if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
      } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
      } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
      } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
      }

      setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
      }, 100);

      // Update the progress bar
      body.querySelector('.progress').style.width = `${(100 * Number(power)) / Number(total)}%`;
    });

    // Periodic update of power and coins
    setInterval(() => {
      count = Number(localStorage.getItem('count'));
      power = Number(localStorage.getItem('power'));
      total = Number(localStorage.getItem('total'));

      if (total > power) {
        let newPower = power + count;
        localStorage.setItem('power', newPower.toString());
        body.querySelector('#power').textContent = newPower;
        body.querySelector('.progress').style.width = `${(100 * newPower) / total}%`;
      }
    }, 1000); // runs every 1000ms (1 second)
  };
</script>
