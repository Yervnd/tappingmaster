let score = 0;
const bonus = 10000;  // Set the bonus value
const bonusCooldown = 60 * 60 * 1000;  // 1 hour in milliseconds

// Load the score and last bonus claim time from localStorage when the page loads
window.onload = function() {
    if (localStorage.getItem('score')) {
        score = parseInt(localStorage.getItem('score'));
    }
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Function to increment the score and save it to localStorage
function incrementScore() {
    score++;
    updateScore();
}

// Function to claim the bonus and save it to localStorage
function claimBonus() {
    const lastBonusTime = localStorage.getItem('lastBonusTime');
    const currentTime = new Date().getTime();

    if (lastBonusTime && currentTime - lastBonusTime < bonusCooldown) {
        const remainingTime = Math.ceil((bonusCooldown - (currentTime - lastBonusTime)) / 1000 / 60);
        document.getElementById('message').innerText = `Please wait ${remainingTime} minutes for the next bonus.`;
    } else {
        score += bonus;
        localStorage.setItem('lastBonusTime', currentTime);
        updateScore();
        document.getElementById('message').innerText = 'Bonus claimed successfully!';
    }
}

// Function to update the score display and save it to localStorage
function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
    localStorage.setItem('score', score);
}