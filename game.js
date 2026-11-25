//  Game state
let gameStarted = false;   // becomes true after a valid Start Game
let wins = 0;              // score counters
let losses = 0;
let draws = 0;
let round = 0;             // current round number
let results = [];          // stores "Win", "Lose" or "Draw" for every round

// startGame(): check the name and start the game
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    // Stop if the name is empty
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Welcome message and start date/time
    document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started: " + Date();

    gameStarted = true;    // allow playRound() to run
}

// getComputerChoice(): random choice from an array =
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3);   // 0, 1 or 2
    return choices[index];
}

// playRound(): play one round
function playRound(playerChoice) {
    // Block play until Start Game has been clicked with a name
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let result;

    // Decide the winner with if...else
    if (playerChoice === computerChoice) {
        result = "Draw";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        result = "Win";
    } else {
        result = "Lose";
    }

    // Change both images with src
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Show the result message and set its colour
    let resultText = document.getElementById("result");
    if (result === "Win") {
        resultText.innerHTML = "You win! " + capitalise(playerChoice) + " beats " + computerChoice + ".";
        resultText.style.color = "green";
        wins++;
    } else if (result === "Lose") {
        resultText.innerHTML = "You lose! " + capitalise(computerChoice) + " beats " + playerChoice + ".";
        resultText.style.color = "red";
        losses++;
    } else {
        resultText.innerHTML = "It's a draw! You both chose " + playerChoice + ".";
        resultText.style.color = "grey";
        draws++;
    }

    // Update the scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store the result and add a row to the history table
    results.push(result);
    round++;
    document.getElementById("history").innerHTML +=
        "<tr><td>" + round + "</td><td>" + capitalise(playerChoice) +
        "</td><td>" + capitalise(computerChoice) + "</td><td>" + result + "</td></tr>";
}

//  showSummary(): count wins with a for loop
function showSummary() {
    let total = results.length;

    if (total === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let percent = Math.round((winCount / total) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + total + " rounds and won " + percent + "%";
}

//  resetGame(): put everything back to the start =====
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Keep only the header row of the history table
    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

    // Show the default images again
  // Clear the name, welcome message and start time, and require Start Game again
  document.getElementById("playerName").value = "";
  document.getElementById("welcome").innerHTML = "";
  document.getElementById("startTime").innerHTML = "";
  gameStarted = false;
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}

//  Helper: "rock" -> "Rock"
function capitalise(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
