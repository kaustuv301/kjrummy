// Display all games stored in localStorage on the scoreboard
document.addEventListener("DOMContentLoaded", function () {
  let allGames = JSON.parse(localStorage.getItem("rummyGames")) || [];

  let scoreboardBody = document.getElementById("scoreboardBody");
  let winnerSummaryBody = document.getElementById("winnerSummaryBody");

  scoreboardBody.innerHTML = "";
  let kaustuvWins = 0;
  let jahnaviWins = 0;

  allGames.forEach(game => {
      let row = document.createElement("tr");

      row.innerHTML = `
          <td>${game.time}</td>
          <td>${game.winner}</td>
          <td>${game.margin}</td>
          <td>${game.kaustuvTotal}</td>
          <td>${game.jahnaviTotal}</td>
      `;
      scoreboardBody.appendChild(row);

      // Count wins
      if (game.winner === 'Kaustuv') {
          kaustuvWins++;
      } else if (game.winner === 'Jahnavi') {
          jahnaviWins++;
      }
  });

  // Populate winner summary
  winnerSummaryBody.innerHTML = `
      <tr>
          <td>Kaustuv</td>
          <td>${kaustuvWins}</td>
      </tr>
      <tr>
          <td>Jahnavi</td>
          <td>${jahnaviWins}</td>
      </tr>
  `;
});

// Remove last score button functionality
document.getElementById("removeLastScoreBtn").addEventListener("click", function() {
  let allGames = JSON.parse(localStorage.getItem("rummyGames")) || [];
  
  if (allGames.length > 0) {
      if (confirm("Are you sure you want to remove the last game?")) {
          allGames.pop(); // Remove the last game
          localStorage.setItem("rummyGames", JSON.stringify(allGames));
          alert("Last game removed!");
          location.reload(); // Refresh the page
      }
  } else {
      alert("No games to remove.");
  }
});

// Start new game button functionality
document.getElementById("startNewGameBtn").addEventListener("click", function() {
  localStorage.removeItem("currentGame"); // Clear current game data
  location.href = 'index.html'; // Redirect to the setup page
});
