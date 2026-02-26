"use strict";
var BOARD_SIZE = 1000;
var SIZE_FORMAT = "px";
var board = document.getElementById("board");


var boardMatrix = [];
// cellsMatrix[row][col] = {
//     bomb: false,
//     revealed: false,
//     element: cell
// };

var rows;
var cols;

function boardSetup(rowQuantity, colQuantity) {
    board.innerHTML = "";
    board.style.setProperty("--row-quantity", rowQuantity);
    board.style.setProperty("--col-quantity", colQuantity);
    board.style.setProperty("--board-size", BOARD_SIZE + SIZE_FORMAT);
    board.style.setProperty("--cell-size", (BOARD_SIZE / colQuantity) + SIZE_FORMAT);
    for (var rowNumber = 0; rowNumber < rowQuantity; rowNumber++) {
        var row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        var rowArray = [];

        for (var colNumber = 0; colNumber < colQuantity; colNumber++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            row.appendChild(cell);
            rowArray.push({
                bomb: false,
                revealed: false,
                adjacentBombs: 0,
                element: cell,
                row: r,
                col: c
            });
        }
        boardMatrix.push(row);

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

        var r = Math.floor(Math.random() * rows);
        var c = Math.floor(Math.random() * cols);

        if (!boardMatrix[r][c].contains("bomb")) {
            boardMatrix[r][c].bomb = true;
            bombsPlaced++;
        }
    }
}
