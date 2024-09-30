let countdownInterval;
let targetDate;
let paused = false;
let remainingTime;

// Start the countdown
function startCountdown() {
  // Clear any existing interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const targetDateInput = document.getElementById("target-date").value;
  targetDate = new Date(targetDateInput).getTime();

  if (isNaN(targetDate)) {
    alert("Please enter a valid date and time.");
    return;
  }

  paused = false; // Reset paused state
  updateCountdown(); // Start countdown
}

// Update the countdown every second
function updateCountdown() {
  countdownInterval = setInterval(() => {
    if (!paused) {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Countdown Finished!";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      remainingTime = distance; // Save the remaining time
    }
  }, 1000);
}

// Pause the countdown
function pauseCountdown() {
  paused = true;
  clearInterval(countdownInterval);
}

// Resume the countdown
function resumeCountdown() {
  if (paused) {
    paused = false;
    // Set targetDate to the current time plus remaining time
    targetDate = new Date().getTime() + remainingTime;
    updateCountdown();
  }
}

// Restart the countdown
function restartCountdown() {
  clearInterval(countdownInterval);
  document.getElementById("target-date").value = ""; // Clear input field
  document.getElementById("days").innerHTML = "";
  document.getElementById("hours").innerHTML = "";
  document.getElementById("minutes").innerHTML = "";
  document.getElementById("seconds").innerHTML = "";
  paused = false;
}
