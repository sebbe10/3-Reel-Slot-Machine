document.addEventListener("DOMContentLoaded", () => {
  // Define the symbols on the reels
  const symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "⭐", "🍉"];

  // Function to spin a single reel
  function spinReel() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Function to simulate the spinning of the slot machine
  function spinSlotMachine() {
    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");
    const result = document.getElementById("result");

    // Clear previous result
    result.textContent = "";

    function spin(reel, spins, delay) {
      let count = 0;
      const interval = setInterval(() => {
        reel.textContent = spinReel();
        count++;
        if (count >= spins) {
          clearInterval(interval);
        }
      }, delay);
    }

    // Spin each reel 5 times
    spin(reel1, 5, 100);
    setTimeout(() => spin(reel2, 5, 100), 500);
    setTimeout(() => spin(reel3, 5, 100), 1000);

    // Simulate the spinning process
    setTimeout(() => {
      reel1.textContent = spinReel();
    }, 500);
    setTimeout(() => {
      reel2.textContent = spinReel();
    }, 1000);
    setTimeout(() => {
      reel3.textContent = spinReel();
      // Check if the player won (all three symbols match)
      setTimeout(() => {
        if (
          reel1.textContent === reel2.textContent &&
          reel1.textContent === reel3.textContent
        ) {
          let savedMoney = JSON.parse(localStorage.getItem("savemoney")) || 0;

          let addMoney = Math.floor(Math.random() * 10000);
          savedMoney += addMoney;

          document.getElementById("youWon").innerHTML = `${addMoney} kr`;

          localStorage.setItem("savemoney", JSON.stringify(savedMoney));

          document.getElementById(
            "money"
          ).textContent = `Total summa: ${savedMoney} kr`;
          result.textContent = "Congratulations! You won!";
        } else {
          result.textContent = "Try again!";
          document.getElementById("youWon").innerHTML = "";
        }
      }, 500);
    }, 1500);
  }

  // Add event listener to the spin button
  document
    .getElementById("spinButton")
    .addEventListener("click", spinSlotMachine);

  // Load and display the saved money on page load
  let savedMoney = JSON.parse(localStorage.getItem("savemoney")) || 0;
  document.getElementById(
    "money"
  ).textContent = `Total summa: ${savedMoney} kr`;
});
