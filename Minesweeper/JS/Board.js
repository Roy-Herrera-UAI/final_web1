"use strict";
var BOARD_SIZE = 1000;
var SIZE_FORMAT = "px";
var board = document.getElementById("board");
function boardSetup(rowQuantity, colQuantity) {
    board.innerHTML = "";
    board.style.setProperty("--row-quantity", rowQuantity);
    board.style.setProperty("--col-quantity", colQuantity);
    board.style.setProperty("--board-size", BOARD_SIZE + SIZE_FORMAT);
    board.style.setProperty("--cell-size", (BOARD_SIZE / colQuantity) + SIZE_FORMAT);
    for (var rowNumber = 0; rowNumber < rowQuantity; rowNumber++) {
        var row = document.createElement("div");
        row.className = "row";
        row.setAttribute("row-number", rowNumber);
        board.appendChild(row)
        for (var colNumber = 0; colNumber < colQuantity; colNumber++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.setAttribute("position", [colNumber, rowNumber]);
            row.appendChild(cell);
        }
    }
}

function populateBombs(bombQuantity) {

    var cells = board.getElementsByClassName("cell");
    var totalCells = cells.length;

    if (bombQuantity > totalCells) {
        console.error("Too many bombs.");
        return;
    }

    var bombsPlaced = 0;

    while (bombsPlaced < bombQuantity) {

        var randomIndex = Math.floor(Math.random() * totalCells);
        var cell = cells[randomIndex];

        if (!cell.classList.contains("bomb")) {
            cell.classList.add("bomb");
            cell.setAttribute("is-bomb", "true");
            bombsPlaced++;
        }
    }
}