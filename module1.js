let canvas = document.querySelector('canvas')
let ctx = canvas.getContext("2d")

let type = "keydown"
let keysDown = {}

let snake1x = 200
let snake1y = 200
let snake1width = 10
let snake1height = 10

let speed = 1
let angle = 0
let moveAngle = 0

let pastPos = []


let intervalId = 0

function snake1() {
    ctx.save() //Saves the entire state of the canvas
    ctx.translate(snake1x, snake1y)
    pastPos.push(snake1x, snake1y)
    console.log(pastPos)
    ctx.rotate(angle)
    ctx.fillStyle = '#fff'
    ctx.fillRect(snake1width / -2, snake1height / -2, snake1width, snake1height)
    ctx.restore() //Restores the most recently saved canvas state
}



function snakeBorderCollision() {
    if(snake1x > canvas.width || snake1x < 0 || snake1y > canvas.height){
        clearInterval(intervalId)
        alert('GAME OVER')
    }
    
    if(snake1y < 0){
        snake1y = canvas.height
    }
    
    pastPos.filter((item, index) => {
        if((pastPos.indexOf(item) != index) === true){
          console.log('strawberry')
        }
      });
      
    /*
    pastPos.forEach((item, index) => {
        pastPos.forEach((item2, index2) => {
          if(index !== index2 && parseInt(item[0]) === parseInt(item2[0]) && parseInt(item[1]) === parseInt(item2[1])){
            console.log('banana')
          }
        })
              }
            )
    */
    /*
    for (let i=0; i < pastPos.length; i++){
        if(pastPos(i) === currentPos[0]){
            clearInterval(intervalId)
            alert('GAME OVER')
        }
    }
     */
}

function newPos() {
    angle += moveAngle * Math.PI / 180 //0.01744
    //sin(0)=0        sin(1)=1
    snake1x += speed * Math.sin(angle)
    //cos(0)=1       cos(1)=0
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
    //left
    if (keysDown && keysDown[37]){
        moveAngle = -1 
    }
    //right
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
    snakeBorderCollision()
}

intervalId = setInterval(() => {
    requestAnimationFrame(startGame)
}, 200)

