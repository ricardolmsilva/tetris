document.addEventListener('DOMContentLoaded', () => {

    // Create the grid of the game
    const grid = document.querySelector('#grid')
    for(let i = 0; i < 200; i++) {
        const square = document.createElement('div')
        square.classList.add('item')
        square.innerText = i
        grid.appendChild(square)
    }

    // Columns of grid
    const width = 10

    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')

    
    const squares = Array.from(document.querySelectorAll('.item'))


    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    // Randomly select one of the Tetrominoes and its fist rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    // Draw the Tetromino
    function draw() {
        // For each index selected add class and color
        current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        })
    } 

    function undraw(){
        current.forEach(index=>{
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    draw()
    setInterval(() => {
        undraw()
        currentPosition = currentPosition + width
        draw()
    }, 1000);

  
})



