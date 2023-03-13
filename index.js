// Get the elements from the document
var intervalInput = document.getElementById("interval");
var timerDisplay = document.getElementById("timer");
var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");

// Declare some variables for storing the timer values
var interval; // The interval value in seconds
var duration; // The duration value in milliseconds
var remaining; // The remaining time in milliseconds
var countdown; // The countdown object returned by setInterval()

// Define a function that formats a number into two digits
function formatNumber(number) {
    return number.toString().padStart(2, "0");
}

// Define a function that updates the timer display
function updateTimer() {
    // Calculate the minutes and seconds from the remaining time
    var minutes = Math.floor(remaining / 60000);
    var seconds = Math.floor((remaining % 60000) / 1000);

    // Format and display the timer value
    var timerValue = formatNumber(minutes) + ":" + formatNumber(seconds);
    timerDisplay.textContent = timerValue;

    // Check if the timer has reached zero
    if (remaining === 0) {
        // Stop the countdown
        clearInterval(countdown);

        // Sound an alert
        //alert("Time's up!");
        playSound();

        // Reset the timer
        resetTimer();

        // Start the timer again
        startTimer();
    }
}

// Define a function that starts the timer
function startTimer() {
    // Get the interval value from the input element
    interval = parseInt(intervalInput.value);

    // Validate the interval value
    if (isNaN(interval) || interval < 1 || interval > 60) {
        alert("Please enter a valid number between 1 and 60.");
        return;
    }

    // Convert the interval value to milliseconds
    duration = interval * 1000;

    // Set the remaining time to the duration
    remaining = duration;

    // Update the timer display
    updateTimer();

    // Start the countdown using setInterval()
    countdown = setInterval(function () {
        // Decrease the remaining time by one second
        remaining -= 1000;

        // Update the timer display
        updateTimer();

    },
        // Set the time delay to one second
        1000);
}
// Define a function that pauses the timer
function pauseTimer() {
    // Check if the countdown is running
    if (countdown) {
        // Stop the countdown
        clearInterval(countdown);

        // Set the countdown to null
        countdown = null;
    }
}

// Define a function that resets the timer
function resetTimer() {
    // Check if the countdown is running
    if (countdown) {
        // Stop the countdown
        clearInterval(countdown);

        // Set the countdown to null
        countdown = null;
    }

    // Set the remaining time to the duration
    remaining = duration;

    // Update the timer display
    updateTimer();
}

// Define a function that plays a sound
function playSound() {
    // Create an audio element with an online source
    var audio = new Audio("https://freesound.org/data/previews/80/80921_1022651-lq.mp3");

    // Play the audio
    audio.play();
}

// Add event listeners to the buttons
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);