<script async src="https://telegram.org/js/telegram-web-app.js"></script>

<script>
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
    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
      // Increase coins and decrease power
      localStorage.setItem('coins', `${Number(coins) + 1}`);
      h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

      localStorage.setItem('power', `${Number(power) - 1}`);
      body.querySelector('#power').textContent = `${Number(power) - 1}`;
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
    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
  });

  // Periodic update of power and coins
  setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    if (Number(total) > power) {
      localStorage.setItem('power', `${Number(power) + Number(count)}`);
      body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
      body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
  }, 1000);

</script>
