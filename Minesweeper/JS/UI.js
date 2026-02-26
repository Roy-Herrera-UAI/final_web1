document.getElementById("top").style.display = "none";
document.getElementById("board").style.display = "none";

document.getElementById("startBtn").addEventListener("click", function () {
    var input = document.getElementById("playerName").value.trim();
    var error = document.getElementById("errorMsg");
    if (input.length < 3) {
        error.textContent = "El nombre debe tener al menos 3 letras.";
        return;
    }
    currentPlayer = input;
    document.getElementById("startScreen").style.display = "none";
    
    document.getElementById("top").style.display = "flex";
    document.getElementById("board").style.display = "flex";
    startGame();
});