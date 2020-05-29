import theTetrominoes from "./shapes.js";
import { row } from "./variables.js";

document.addEventListener("DOMContentLoaded", () => {
    let timerId = null;
    let tetrominoPosition = 4;
    let tetrominoRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let tetromino;
    let nextRandom;
    let line = 0;
    let score = 0;

    let colors = [
        "#2d7dbc", // azul
        "#ea5841", // vermelho
        "#12a19b", // verde agua
        "#f4942d", //laranja
        "#ffca24", //amarelo
        "#64ac2f", //verde
        "#a180cb", //roxo
    ];

    const scoreDisplay = document.querySelector("#score span");
    const linesDisplay = document.querySelector("#lines span");
    const startBtn = document.querySelector("#start-button");
    const over = document.querySelector("#game-over");

    let gridCells = Array.from(document.querySelectorAll("#grid div"));

    function generateNextTetromino() {
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    }

    // DrawTetromino the Tetromino
    function DrawTetromino() {
        // Add class and color for each cell of tetromino shape
        tetromino = theTetrominoes[random][tetrominoRotation];
        tetromino.forEach((index) => {
            gridCells[tetrominoPosition + index].classList.add("tetromino");
            gridCells[tetrominoPosition + index].style.backgroundColor =
                colors[random];
        });
    }

    function unDrawTetromino() {
        tetromino.forEach((index) => {
            gridCells[tetrominoPosition + index].classList.remove("tetromino");
            gridCells[tetrominoPosition + index].style.backgroundColor = "";
        });
    }

    function freezeTetromino() {
        if (
            // If exist any cell with class taken bellow of the tetromino Tetromino
            tetromino.some((index) =>
                gridCells[tetrominoPosition + row + index].classList.contains(
                    "taken"
                )
            )
        ) {
            tetromino.forEach((index) =>
                gridCells[tetrominoPosition + index].classList.add("taken")
            );
            random = nextRandom;
            generateNextTetromino();
            tetrominoPosition = 4;
            DrawTetromino();
            displayNextShape();
            addScore();
            gameOver();
        }
    }

    function moveDown() {
        freezeTetromino();
        unDrawTetromino();
        tetrominoPosition += row;
        DrawTetromino();
    }

    function moveLeft() {
        const isAtLeftEdge = tetromino.some(
            (index) => (tetrominoPosition + index) % row === 0
        );

        const isAtRightOfTaken = tetromino.some((index) =>
            gridCells[tetrominoPosition - 1 + index].classList.contains("taken")
        );

        if (isAtLeftEdge || isAtRightOfTaken) {
            return;
        }
        unDrawTetromino();
        tetrominoPosition--;
        DrawTetromino();
    }

    function moveRight() {
        const isAtRightEdge = tetromino.some(
            (index) => (tetrominoPosition + index) % row === row - 1
        );

        const isAtLeftOfTaken = tetromino.some((index) =>
            gridCells[tetrominoPosition + 1 + index].classList.contains("taken")
        );

        if (isAtRightEdge || isAtLeftOfTaken) {
            return;
        }

        unDrawTetromino();
        tetrominoPosition++;
        DrawTetromino();
    }

    function isAtRight() {
        return tetromino.some(
            (index) => (tetrominoPosition + index + 1) % row === 0
        );
    }

    function isAtLeft() {
        return tetromino.some(
            (index) => (tetrominoPosition + index) % row === 0
        );
    }

    function checkRotatedPosition(P) {
        P = P || tetrominoPosition;
        if ((P + 1) % row < 4) {
            if (isAtRight()) {
                tetrominoPosition += 1;
                checkRotatedPosition(P);
            }
        } else if (P % row > 5) {
            if (isAtLeft()) {
                tetrominoPosition -= 1;
                checkRotatedPosition(P);
            }
        }
    }

    function rotate() {
        tetrominoRotation <= 2 ? tetrominoRotation++ : (tetrominoRotation = 0);

        unDrawTetromino();
        tetromino = theTetrominoes[random][tetrominoRotation];
        checkRotatedPosition();
        DrawTetromino();
    }

    function control(event) {
        console.log(event.keyCode);

        switch (event.keyCode) {
            case 37:
                timerId !== null && moveLeft();
                break;

            case 39:
                timerId !== null && moveRight();
                break;

            case 40:
                timerId !== null && moveDown();
                break;

            case 78:
                window.location.reload();
                break;

            case 82:
                timerId !== null && rotate();
                break;

            case 80:
                playStop();
                break;

            default:
                break;
        }
    }

    function playStop() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            startBtn.innerText = "Play (P)";
        } else {
            !nextRandom && generateNextTetromino();
            displayNextShape();
            startBtn.innerText = "Pause (P)";
            timerId = setInterval(moveDown, 200);
            DrawTetromino();
        }
    }

    document.addEventListener("keydown", control);
    startBtn.addEventListener("click", playStop);

    // DISPLAY MINI GRID
    const displayCells = Array.from(
        document.querySelectorAll("#mini-grid .cell")
    );
    const displayWidth = 4;
    let displayIndex = 0;

    const nextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //ilTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth * 2], //sTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    ];

    function displayNextShape() {
        displayCells.forEach((cell) => {
            cell.classList.remove("tetromino");
            cell.style.backgroundColor = "";
        });

        nextTetrominoes[nextRandom].forEach((index) => {
            displayCells[displayIndex + index].classList.add("tetromino");
            displayCells[displayIndex + index].style.backgroundColor =
                colors[random];
        });
    }

    function addScore() {
        for (let i = 0; i < 199; i += row) {
            const gridRow = [
                i,
                i + 1,
                i + 2,
                i + 3,
                i + 4,
                i + 5,
                i + 6,
                i + 7,
                i + 8,
                i + 9,
            ];

            if (
                gridRow.every((index) =>
                    gridCells[index].classList.contains("taken")
                )
            ) {
                score += 15;
                line++;
                scoreDisplay.innerText = score;
                linesDisplay.innerText = line;

                gridRow.forEach((index) => {
                    gridCells[index].classList.remove("taken");
                    gridCells[index].classList.remove("tetromino");
                    gridCells[index].style.backgroundColor = "";
                });
                const cellsRemoved = gridCells.splice(i, row);
                gridCells = cellsRemoved.concat(gridCells);
                gridCells.forEach((cell) => grid.appendChild(cell));
            }
        }
    }

    function gameOver() {
        if (
            tetromino.some((index) =>
                gridCells[tetrominoPosition + index].classList.contains("taken")
            )
        ) {
            startBtn.style.display = "none";
            over.style.display = "block";
            end();
        }
    }

    function end() {
        clearInterval(timerId);
        timerId = null;
    }
});
