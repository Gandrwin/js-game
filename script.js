//1
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


//2
ballRadius = 10;

//3
let x = canvas.width / 2;
let y = canvas.height - 30;

//4
let dx = 2;
let dy = -2;

//5
let color = "#0095DD";

//6
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//7
let rightPressed = false;
let leftPressed = false;

//8
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//9
//10
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            //11
            status: 1
        };
    }
}

//31
let score = 0;


//33 
var lives = 3;


//12
//13
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}


//14
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


//15
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



//16
function draw() {
    //17
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();


    //18
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;

    }

    //20
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        //21
        if (x > paddleX && x < paddleX + paddleWidth) {
            //22
            dy = -dy * 1.1;
        } else {
            lives--;
            if (!lives) {
                alert("You are not prepared!");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }

    }

    //23
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 2;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 2;
    }


    x += dx;
    y += dy;

    //30
    requestAnimationFrame(draw);
}



//24
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    //25
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    //26
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}



//27
//28
//29
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    //19
                    color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You the baws! Congratulation for your " + score + " points");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


//32
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}


//34
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

//30
draw();







// documenting the process. What every comment means
//1 setup

//2 creating a ball radius for the collision detection

//3 default position for the ball

//4 with how much the position of the ball will be updated

//5 default color for the ball

//6 default position for the ball

//7 key press check

//8 creating the bricks 

//9 looping through the rows and columns to create new bricks

//10 c=columns, r=rows

//11 the "status" property we'll check the value of each brick's in the drawBricks() function before drawing it. If status is 1, then draw it, but if it's 0, then it was hit by the ball and we don't want it on the screen anymore.

//12  without using createjs, in plain js, the element is created between beginPath and closePath

//13 ball

//14 platform

//15 looping through all the bricks in the array and draw them on the screen 

//16 the tock function in createJS. The function "draw" will be updated once every 10 miliseconds using the setInterval propriety

//17 cleaning the code using the clearRect function

//18 bouncing off the "walls" left, right, top, bottom. If either of the two statements is true, reverse the movement of the ball 

//19 changing the color to a random one everytime the ball hits the wall

//20 game over when the ball touches the bottom side of the canvas

//21 checking if the ball hits the platform, creating a collision so it will bounce back

//22 everytime the ball hits the platform the speed will increase with 10%

//23 moving the platform 2 pixels when the right or left key is pressed

//24 adding the events for the key pressing

//25 right arrow

//26 left arrow

//27 collision detection between the ball and bricks

//28 if the brick is active (its status is 1) we will check whether the collision happens; if a collision does occur we'll set the status of the given brick to 0 so it won't be painted on the screen

//29 if "the x position of the ball is greater than the x position of the brick and the x position of the ball is less than the x position of the brick plus its width, and the y position of the ball is greater than the y position of the brick, and the y position of the ball is less than the y position of the brick plus its height" it's true, then reverse the move of the ball

//30 the "draw()" function is now getting executed again and again within a requestAnimationFrame() loop, but instead of a fixed milliseconds frame rate, the browser we will have full contral sync-ing  the framerate accordingly and render the shapes only when needed, to produces a more efficient, smoother animation loop than the older setInterval() method

//31 keeping track of the score

//32 keeping track of the score

//33 keep track of the lives

//34 allowing the user to have 3 lives, weak guy
