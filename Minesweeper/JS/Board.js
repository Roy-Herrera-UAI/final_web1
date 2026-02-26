"use strict";
var BOARD_SIZE = 800;
var SIZE_FORMAT = "px";
var board = document.getElementById("board");
var boardMatrix = [];
var rows;
var cols;
function boardSetup(rowQuantity, colQuantity, bombQuantity) {
    boardMatrix = []
    rows = rowQuantity;
    cols = colQuantity;
    board.innerHTML = "";
    board.style.setProperty("--board-size", BOARD_SIZE + SIZE_FORMAT);
    for (var rowNumber = 0; rowNumber < rowQuantity; rowNumber++) {
        var row = document.createElement("div");
        row.className = "row";

        board.appendChild(row);
        var rowArray = [];
        for (var colNumber = 0; colNumber < colQuantity; colNumber++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            (function (r, c) {
                cell.addEventListener("click", function () {
                    revealCell(r, c);
                });
            })(rowNumber, colNumber);
            row.appendChild(cell);
            rowArray.push({
                bomb: false,
                revealed: false,
                adjacentBombs: 0,
                element: cell,
                row: rowNumber,
                col: colNumber
            });
        }
        boardMatrix.push(rowArray);
    }
    populateBombs(bombQuantity)
    calculateAdjacents();
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

        if (!boardMatrix[r][c].bomb) {
            boardMatrix[r][c].bomb = true;
            bombsPlaced++;
            boardMatrix[r][c].element.style.setProperty("background", "red")
        }
    }
}

function calculateAdjacents() {
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {

            if (boardMatrix[r][c].bomb) continue;

            var count = 0;

            for (var dr = -1; dr <= 1; dr++) {
                for (var dc = -1; dc <= 1; dc++) {

                    if (dr === 0 && dc === 0) continue;

                    var newR = r + dr;
                    var newC = c + dc;

                    if (
                        newR >= 0 && newR < rows &&
                        newC >= 0 && newC < cols &&
                        boardMatrix[newR][newC].bomb
                    ) {
                        count++;
                    }
                }
            }
            boardMatrix[r][c].adjacentBombs = count;
        }
    }
}

function flagCell(cell) {

}

function revealCell(cell) {
    var cellObj = boardMatrix[r][c];
    console.log("Clicked:", r, c);
}

function chordCell(cell) {

}