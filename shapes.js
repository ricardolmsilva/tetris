import { row } from "./variables.js";
// L shape
const lTetromino = [
    [0, 1, row + 1, row * 2 + 1],
    [2, row, row + 1, row + 2],
    [1, row + 1, row * 2 + 1, row * 2 + 2],
    [row, row + 1, row + 2, row * 2],
];

// Inverted L shape
const ilTetromino = [
    [1, row + 1, row * 2 + 1, 2],
    [row, row + 1, row + 2, row * 2 + 2],
    [1, row + 1, row * 2 + 1, row * 2],
    [row, row * 2, row * 2 + 1, row * 2 + 2],
];

//  Z shape
const zTetromino = [
    [0, row, row + 1, row * 2 + 1],
    [row + 1, row + 2, row * 2, row * 2 + 1],
    [0, row, row + 1, row * 2 + 1],
    [row + 1, row + 2, row * 2, row * 2 + 1],
];

// S shape
const sTetromino = [
    [1, row, row + 1, row * 2],
    [row, row + 1, row * 2 + 1, row * 2 + 2],
    [1, row, row + 1, row * 2],
    [row, row + 1, row * 2 + 1, row * 2 + 2],
];

// T shape
const tTetromino = [
    [1, row, row + 1, row + 2],
    [1, row + 1, row + 2, row * 2 + 1],
    [row, row + 1, row + 2, row * 2 + 1],
    [1, row, row + 1, row * 2 + 1],
];

// O shape
const oTetromino = [
    [0, 1, row, row + 1],
    [0, 1, row, row + 1],
    [0, 1, row, row + 1],
    [0, 1, row, row + 1],
];

// I shape
const iTetromino = [
    [1, row + 1, row * 2 + 1, row * 3 + 1],
    [row, row + 1, row + 2, row + 3],
    [1, row + 1, row * 2 + 1, row * 3 + 1],
    [row, row + 1, row + 2, row + 3],
];

const theTetrominoes = [
    lTetromino,
    ilTetromino,
    zTetromino,
    sTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
];

export default theTetrominoes;
