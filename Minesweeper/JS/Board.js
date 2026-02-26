"use strict";
var BOARD_SIZE = 800;
var SIZE_FORMAT = "px";
var board = document.getElementById("board");
var boardMatrix = [];
var rows;
var cols;
var flagsPlaced = 0;
var revealedCells = 0;
var bombTotal;
function boardSetup(rowQuantity, colQuantity, bombQuantity) {
    bombTotal= bombQuantity;
    boardMatrix = []
    rows = rowQuantity;
    cols = colQuantity;
    board.innerHTML = "";
    flagsPlaced = 0;
    revealedCells = 0;
    document.body.style.setProperty("--board-size", BOARD_SIZE + SIZE_FORMAT);
    for (var rowNumber = 0; rowNumber < rowQuantity; rowNumber++) {
        var row = document.createElement("div");
        row.className = "row";

        board.appendChild(row);
        var rowArray = [];
        for (var colNumber = 0; colNumber < colQuantity; colNumber++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            addCellInteractions(cell, rowNumber, colNumber)
            row.appendChild(cell);
            rowArray.push({
                bomb: false,
                revealed: false,
                flagged: false,
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

function ToggleFlag(cell) {
    if(cell.flagged){
        cell.element.classList.remove("flagged");
        flagsPlaced--;
    }else{
        cell.element.classList.add("flagged");
        flagsPlaced++;
    }
    cell.flagged = !cell.flagged;
    updateMineCounter();
}

function revealCell(cell) {
    revealedCells++;
    cell.revealed = true;
    cell.element.classList.add("revealed");
    if(revealedCells+bombTotal === rows*cols){
        win();
    }
    if(cell.flagged){
        ToggleFlag(cell);
    }
    if (cell.adjacentBombs > 0) {
        cell.element.textContent = cell.adjacentBombs;
        return;

    }
    recursiveReveal(cell.row, cell.col)
}

function recursiveReveal(r, c){
    var adjacentCell;
    for (var dr = -1; dr <= 1; dr++) {
        for (var dc = -1; dc <= 1; dc++) {

            var newR = r + dr;
            var newC = c + dc;

            if (
                newR >= 0 && newR < rows &&
                newC >= 0 && newC < cols
            ) {
                adjacentCell = getCellData(newR, newC)
                if(!adjacentCell.revealed){
                    revealCell(adjacentCell);
                }
            }
        }
    }
}

function countFlagsAround(row, col) {
    var count = 0;

    for (var r = row - 1; r <= row + 1; r++) {
        for (var c = col - 1; c <= col + 1; c++) {

            if (r < 0 || c < 0 || r >= rows || c >= cols)
                continue;

            if (boardMatrix[r][c].flagged)
                count++;
        }
    }

    return count;
}

function chordCell(cell) {
    var row = cell.row;
    var col = cell.col;
    if (!cell.revealed)
        return;

    if (cell.adjacentBombs === 0)
        return;

    var flagCount = countFlagsAround(row, col);
    console.log(flagCount);
    if (flagCount !== cell.adjacentBombs)
        return;
    for (var r = row - 1; r <= row + 1; r++) {
        for (var c = col - 1; c <= col + 1; c++) {

            if (r < 0 || c < 0 || r >= rows || c >= cols)
                continue;

            var neighbor = boardMatrix[r][c];

            if (!neighbor.revealed && !neighbor.flagged) {

                if (neighbor.bomb) {
                    endGame(neighbor);
                    return;
                }

                revealCell(neighbor);
            }
        }
    }
}


function getCellData(r, c) {
    var currentCellData = boardMatrix[r][c];
    return currentCellData;
}

function addCellInteractions(cell, rowNumber, colNumber) {
    cell.addEventListener("click", function (e) {
        leftClickCell(rowNumber, colNumber);
    });
    cell.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        rightClickCell(rowNumber, colNumber);
    });
}

function leftClickCell(r, c) {
    var cell = getCellData(r, c);
    if (cell.flagged) return;
    if (cell.bomb) {
        endGame(cell);
    }else if (cell.revealed){
        chordCell(cell);
    }else{
        revealCell(cell);
    }
}
function rightClickCell(r, c) {
    var cell = getCellData(r, c);
    if(cell.revealed) return;
    ToggleFlag(cell);
}

function endGame(cellExploded) {
    cellExploded.element.classList.add("exploded")
    board.style.pointerEvents = "none";
    showAllBombs();
}

function win() {
    board.style.pointerEvents = "none";
    document.getElementById("face").style.backgroundImage = "url(./Minesweeper/Sprites/minesweeper-swag.gif)";
    showAllBombs();
}

function showAllBombs() {

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {

            var cell = boardMatrix[r][c];
            if (cell.flagged) {
                ToggleFlag(cell);
            }
            if (cell.bomb) {
                cell.element.classList.add("bomb");
            }
        }
    }
}