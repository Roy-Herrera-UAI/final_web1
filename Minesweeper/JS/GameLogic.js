"use strict"


function updateMineCounter() {
    var counter = document.getElementById("mine-counter");
    var remaining = bombsTotal - flagsPlaced;
    
    counter.textContent = remaining.toString().padStart(3, "0");
}

boardSetup(8, 8, 8)
updateMineCounter();