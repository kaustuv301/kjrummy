// Initialize variables
let totalRounds = 0;
let kaustuvScores = [];
let jahnaviScores = [];

// Function to start the game
const startGame = () => {
    totalRounds = parseInt(document.getElementById('roundsInput').value);
    if (isNaN(totalRounds) || totalRounds <= 0) {
        alert("Please enter a valid number of rounds.");
        return;
    }
    kaustuvScores = [];
    jahnaviScores = [];
    displayScoreEntry();
};

// Function to display score entry fields
const displayScoreEntry = () => {
    const scoreEntryDiv = document.getElementById('scoreEntry');
    scoreEntryDiv.innerHTML = '';

    for (let i = 1; i <= totalRounds; i++) {
        // Create a new row every two rounds
        if (i % 2 === 1) {
            var rowDiv = document.createElement('div');
            rowDiv.className = 'row mb-3'; // Create a new row with bottom margin
            scoreEntryDiv.appendChild(rowDiv);
        }

        const roundDiv = document.createElement('div');
        roundDiv.className = 'col-md-6'; // Two columns per row
        roundDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Round ${i}</h5>
                    <label for="kaustuvScore${i}" class="kaustuv-label">Kaustuv:</label>
                    <input type="number" id="kaustuvScore${i}" required class="form-control">
                    <label for="jahnaviScore${i}" class="jahnavi-label">Jahnavi:</label>
                    <input type="number" id="jahnaviScore${i}" required class="form-control">
                </div>
            </div>
        `;
        rowDiv.appendChild(roundDiv); // Append roundDiv to the current row

        // If it's the last round, make sure to append the rowDiv
        if (i === totalRounds) {
            scoreEntryDiv.appendChild(rowDiv);
        }
    }

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Scores';
    submitBtn.className = 'btn btn-primary';
    submitBtn.addEventListener('click', submitScores);
    scoreEntryDiv.appendChild(submitBtn);
};





// Function to submit scores
const submitScores = () => {
    for (let i = 1; i <= totalRounds; i++) {
        const kaustuvScore = parseInt(document.getElementById(`kaustuvScore${i}`).value) || 0;
        const jahnaviScore = parseInt(document.getElementById(`jahnaviScore${i}`).value) || 0;

        kaustuvScores.push(kaustuvScore);
        jahnaviScores.push(jahnaviScore);
    }
    
    saveGameData();
};

// Function to save game data
const saveGameData = () => {
    let allGames = JSON.parse(localStorage.getItem("rummyGames")) || [];
    
    const currentGame = {
        time: new Date().toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        rounds: totalRounds,
        kaustuvScores: kaustuvScores,
        jahnaviScores: jahnaviScores,
        kaustuvTotal: kaustuvScores.reduce((a, b) => a + b, 0),
        jahnaviTotal: jahnaviScores.reduce((a, b) => a + b, 0),
        winner: determineWinner(),
        margin: Math.abs(kaustuvScores.reduce((a, b) => a + b, 0) - jahnaviScores.reduce((a, b) => a + b, 0))
    };

    allGames.push(currentGame);
    localStorage.setItem("rummyGames", JSON.stringify(allGames));
    
    location.href = "scoreboard.html";
};

// Function to determine the winner
const determineWinner = () => {
    const kaustuvTotal = kaustuvScores.reduce((a, b) => a + b, 0);
    const jahnaviTotal = jahnaviScores.reduce((a, b) => a + b, 0);
    
    if (kaustuvTotal < jahnaviTotal) {
        return 'Kaustuv';
    } else if (jahnaviTotal < kaustuvTotal) {
        return 'Jahnavi';
    } else {
        return 'Tie';
    }
};

// Event listener for starting the game
document.getElementById('startGameBtn').addEventListener('click', startGame);
