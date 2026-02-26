"use strict"
var currentPlayer = "";

function updateMineCounter() {
    var counter = document.getElementById("mine-counter");
    var remaining = bombTotal - flagsPlaced;
    counter.textContent = remaining.toString().padStart(3, "0");
}
function startGame(){
    boardSetup(8, 8, 10)
    updateMineCounter();
}