let canvas = document.querySelector('canvas')
let ctx = canvas.getContext("2d")

let type = "keydown"
let keysDown = {}

let snake1x = 225
let snake1y = 225
let snake1width = 10
let snake1height = 10

let speed = 1
let angle = 0
let moveAngle = 0


let intervalId = 0

function snake1() {
    ctx.save() //Saves the entire state of the canvas
    ctx.translate(snake1x, snake1y)
    ctx.rotate(angle)
    ctx.fillStyle = '#fff'
    ctx.fillRect(snake1width / -2, snake1height / -2, snake1width, snake1height)
    ctx.restore() //Restores the most recently saved canvas state
}



function newPos() {
    angle += moveAngle * Math.PI / 180
    snake1x += speed * Math.sin(angle)
    snake1y -= speed * Math.cos(angle)
}

function logKey(e) {
    e.preventDefault()
    keysDown[e.keyCode] = (e.type == "keydown")
}

document.addEventListener('keydown', logKey)

document.addEventListener('keyup', logKey)

function startGame() {
    moveAngle = 0
    speed = 1

    if (keysDown && keysDown[37]){
        moveAngle = -1 
    }
    if (keysDown && keysDown[39]){
        moveAngle = 1 
    }
    //TURBO 
    if (keysDown && keysDown[40]){
        newPos() 
    }
    //TEMPORARY PAUSE 
    if (keysDown && keysDown[38]){
        startGame() 
    }


    newPos()
    snake1()
}

intervalId = setInterval(() => {
    requestAnimationFrame(startGame)
}, 20)

