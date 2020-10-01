// GLOBAL VARIABLES

let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")

let type = "keydown"
let keysDown;

let snake1x 
let snake1y
let snake1width
let snake1height

let snake2x
let snake2y
let snake2width
let snake2height

let speed

let angle
let angle2

let moveAngle
let moveAngle2

let pastPos
let pastPos2

let intervalId

let player1score
let player2score

let myMusic
myMusic = new Audio("./music/dandelion.mp3")

let gameIsStarting = true

// FUNCTIONS

function create(){
    document.getElementById('splash').innerHTML = '<canvas id="someId" width="750" height="500"></canvas>'
    canvas = document.querySelector('canvas')
    ctx = canvas.getContext('2d')
    initializeVariables()
    intervalId = setInterval(() => {
        requestAnimationFrame(startGame)
    }, 20)
    myMusic.play()
}

function initializeVariables() {
    keysDown = {}

    snake1x = 400 
    snake1y = 400
    snake1width = 10
    snake1height = 10

    snake2x = 200
    snake2y = 400
    snake2width = 10
    snake2height = 10

    speed = 1

    angle = 0
    angle2 = 0

    moveAngle = 0
    moveAngle2 = 0

    pastPos = []
    pastPos2 = []
    intervalId = 0
    console.log(gameIsStarting)
    if(gameIsStarting){
        player1score = 3
        player2score = 3
        gameIsStarting = false
        player1.innerText = player1score
        player2.innerText = player2score
    }
    
}

function snake1() {
    ctx.save() 
    ctx.translate(snake1x, snake1y)

    let snake1xInt = Number(parseInt(snake1x))
    let snake1yInt = Number(parseInt(snake1y))
    if (pastPos.length === 0 || pastPos[pastPos.length-1][0] !== snake1xInt || pastPos[pastPos.length-1][1] !== snake1yInt) {
        pastPos.push([snake1xInt, snake1yInt])
    }

    ctx.rotate(angle)
    ctx.fillStyle = '#fff'
    ctx.fillRect(snake1width / -2, snake1height / -2, snake1width, snake1height)
    ctx.restore() 
}

function snake2(){
    ctx.save() 
    ctx.translate(snake2x, snake2y)

    let snake2xInt = Number(parseInt(snake2x))
    let snake2yInt = Number(parseInt(snake2y))
    if (pastPos2.length === 0 || pastPos2[pastPos2.length-1][0] !== snake2xInt || pastPos2[pastPos2.length-1][1] !== snake2yInt) {
        pastPos2.push([snake2xInt, snake2yInt])
    }

    ctx.rotate(angle)
    ctx.fillStyle = '#000000'
    ctx.fillRect(snake2width / -2, snake2height / -2, snake2width, snake2height)
    ctx.restore()
}

function gameOver(){
    gameIsStarting = true
    document.getElementById('splash').innerHTML  = `<div class="cmon"><h1>Game over</h1><p>Just click the button and play again</p><button id="button2">Start Game</button></div>`
    document.getElementById("button2").addEventListener("click", create)
}


function match(){
    player1score--
    player1.innerText = player1score
}

function match2(){
    player2score--
    player2.innerText = player2score
}

function gameOverCheck(){
    if(player1score === 0){
        gameOver()
    }
    if(player2score === 0){
        gameOver()
    }
}

function snakeCollision() {
    
    if(snake1x > canvas.width || snake1x < 0 || snake1y > canvas.height || snake1y < 0){
        clearInterval(intervalId)
        match()
        gameOverCheck()
        if (!gameIsStarting){
            setTimeout(create, 3000)
        }
    }
    
    if(snake2x > canvas.width || snake2x < 0 || snake2y > canvas.height || snake2y < 0){
        clearInterval(intervalId)
        match2()
        gameOverCheck()
        if (!gameIsStarting){
            setTimeout(create, 3000)
        }
    }
    
    pastPos.forEach((item, index) => {
        if(index !== (pastPos.length - 1) && parseInt(snake1x) === parseInt(item[0]) && parseInt(snake1y) === parseInt(item[1])){
            clearInterval(intervalId)
            match()
            gameOverCheck()
            if (!gameIsStarting){
                setTimeout(create, 3000)
            }
        }
    })

    pastPos2.forEach((item, index) => {
        if(index !== (pastPos2.length - 1) && parseInt(snake2x) === parseInt(item[0]) && parseInt(snake2y) === parseInt(item[1])){
            clearInterval(intervalId)
            match2()
            gameOverCheck()
            if (!gameIsStarting){
                setTimeout(create, 3000)
            }
        }
    })
    
    pastPos.forEach((item, index) => {
        if(index !== (pastPos.length - 1) && parseInt(snake2x) === parseInt(item[0]) && parseInt(snake2y) === parseInt(item[1])){
            clearInterval(intervalId)
            match2()
            gameOverCheck()
            if (!gameIsStarting){
                setTimeout(create, 3000)
            }
        }
    })

    pastPos2.forEach((item, index) => {
        if(index !== (pastPos2.length - 1) && parseInt(snake1x) === parseInt(item[0]) && parseInt(snake1y) === parseInt(item[1])){
            clearInterval(intervalId)
            match()
            gameOverCheck()
            if (!gameIsStarting){
                setTimeout(create, 3000)
            }
        }
    })
}

function newPos() {
    angle += moveAngle * Math.PI / 180 //0.01744
    //sin(0)=0        sin(1)=1
    snake1x += speed * Math.sin(angle)
    //cos(0)=1       cos(1)=0
    snake1y -= speed * Math.cos(angle)
}

function newPos2() {
    angle2 += moveAngle2 * Math.PI / 180
    snake2x += speed * Math.sin(angle2)
    snake2y -= speed * Math.cos(angle2)
}

function logKey(e) {
    e.preventDefault()
    keysDown[e.keyCode] = (e.type == "keydown")
}

function startGame() {
    moveAngle = 0
    moveAngle2 = 0
    speed = 1
    //left
    if (keysDown && keysDown[37]){
        moveAngle = -1 
    }
    //right
    if (keysDown && keysDown[39]){
        moveAngle = 1 
    }
    //TURBO 
    if (keysDown && keysDown[38]){
        newPos() 
    }
    //TEMPORARY PAUSE 
    if (keysDown && keysDown[40]){
        startGame() 
    }

    //left A
    if (keysDown && keysDown[65]){
        moveAngle2 = -1 
    }
    //right D
    if (keysDown && keysDown[68]){
        moveAngle2 = 1 
    }
    //TURBO W
    if (keysDown && keysDown[87]){
        newPos2() 
    }
    //TEMPORARY PAUSE S
    if (keysDown && keysDown[83]){
        startGame() 
    }
    
    newPos()
    newPos2()
    snake1()
    snake2()
    snakeCollision()
}

// EVENT LISTENERS

document.getElementById("button").addEventListener("click", create)

document.addEventListener('keydown', logKey)

document.addEventListener('keyup', logKey)
