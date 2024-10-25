

let snakeSpid = 10;
let snakeDirection;
let snakeBody;
let gameInterval;
let score = 0; // Initialize score variable

function initializeGame() {
    snakeDirection = null;
    snakeBody = [{ left: 0, top: 0 }, { left: 0, top: 0 }];
    score = 0; // Reset score
    updateScoreDisplay(); // Update score display
    moveSneak();
    sneakFood();
    hideGameOver();
    hideRestartButton();
}

function controlSnakeMove() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" && snakeDirection !== 'up') {
            snakeDirection = "down";
        } else if (event.key === "ArrowUp" && snakeDirection !== 'down') {
            snakeDirection = "up";
        } else if (event.key === "ArrowLeft" && snakeDirection !== 'right') {
            snakeDirection = "left";
        } else if (event.key === "ArrowRight" && snakeDirection !== 'left') {
            snakeDirection = "right";
        }
        console.log(event.key);
    });
}

controlSnakeMove();

function moveSneak() {
    const playField = document.getElementById("play-field");
    const sneakHead = snakeBody[0];
    gameInterval = setInterval(() => {
        const { height, width } = playField.getBoundingClientRect();

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = { ...snakeBody[i - 1] };
        }

        document.querySelectorAll(".snake-body").forEach((elem) => {
            elem.remove();
        });

        if (snakeDirection === "right") {
            sneakHead.left += snakeSpid;
        }
        if (snakeDirection === "left") {
            sneakHead.left -= snakeSpid;
        }
        if (snakeDirection === "down") {
            sneakHead.top += snakeSpid;
        }
        if (snakeDirection === "up") {
            sneakHead.top -= snakeSpid;
        }

        // Handle snake going out of bounds
        if (sneakHead.left >= width) {
            sneakHead.left = 0;
        }
        if (sneakHead.top >= height) {
            sneakHead.top = 0;
        }
        if (sneakHead.left < 0) {
            sneakHead.left = width - snakeSpid;
        }
        if (sneakHead.top < 0) {
            sneakHead.top = height - snakeSpid;
        }

        for (let i = 0; i < snakeBody.length; i++) {
            let sneakDiv = document.createElement("div");
            sneakDiv.style.left = snakeBody[i].left + "px";
            sneakDiv.style.top = snakeBody[i].top + "px";
            sneakDiv.classList.add("snake-body");
            playField.appendChild(sneakDiv);
        }

        const { left, top } = document.getElementById("snake-food-div").getBoundingClientRect();
        if (Math.round(left) === Math.round(sneakHead.left) && Math.round(top) === Math.round(sneakHead.top)) {
            snakeBody.push({ left: 0, top: 0 });
            score++; // Increment score
            updateScoreDisplay(); // Update score display
            sneakFood();
        }

        for (let i = 2; i < snakeBody.length; i++) {
            if (sneakHead.left === snakeBody[i].left && sneakHead.top === snakeBody[i].top) {
                showGameOver();
                clearInterval(gameInterval);
                showRestartButton();
                return;
            }
        }
    },100);
}

function sneakFood() {
    document.getElementById("snake-food-div")?.remove();
    const playField = document.getElementById("play-field");
    const { height, width } = playField.getBoundingClientRect();

    const sneakFood = document.createElement("div");
    sneakFood.setAttribute("id", "snake-food-div");
    const randomeTop = Math.round((Math.random() * height) / 10) * 10;
    const randomeLeft = Math.round((Math.random() * width) / 10) * 10;

    sneakFood.style.top = randomeTop + "px";
    sneakFood.style.left = randomeLeft + "px";

    playField.appendChild(sneakFood);
}

function showGameOver() {
    const gameOverDiv = document.getElementById("game-over");
    gameOverDiv.style.display = "block"; 
}

function hideGameOver() {
    const gameOverDiv = document.getElementById("game-over");
    gameOverDiv.style.display = "none"; 
}

function showRestartButton() {
    const restartButton = document.getElementById("restart-button");
    restartButton.style.display = "block"; 
}

function hideRestartButton() {
    const restartButton = document.getElementById("restart-button");
    restartButton.style.display = "none"; 
}


function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.textContent = "Score: " + score;
}


document.getElementById("restart-button").addEventListener("click", () => {
    initializeGame(); 
});

initializeGame();
