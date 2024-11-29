// get game elements and set them as constants
const gameArea = document.getElementById('game-area');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const ball = document.getElementById('ball');

//  all those ball and paddle variables
let ballX = gameArea.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameArea.offsetHeight / 2 - ball.offsetHeight / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let paddleLeftY = gameArea.offsetHeight / 2 - paddleLeft.offsetHeight / 2;
let paddleRightY = gameArea.offsetHeight / 2 - paddleRight.offsetHeight / 2;

const paddleSpeed = 8;
let keysPressed = {};

// the function to fully animate the ball
function animateBall() {
    const ballAnimation = ball.animate(
        [
            { transform: `translate(${ballX}px, ${ballY}px)` },
            { transform: `translate(${ballX + ballSpeedX}px, ${ballY + ballSpeedY}px)` }
        ],
        {
            duration: 16,
            iterations: 1,
            easing: 'linear'
        }
    );

    ballAnimation.onfinish = () => {
        // change ball position to new pos
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // bounce off top and bottom of the border
        if (ballY <= 0 || ballY >= gameArea.offsetHeight - ball.offsetHeight) {
            ballSpeedY *= -1;
        }

        // evrything required for the ball to bounce off of the paddles
        if (
            (ballX <= paddleLeft.offsetWidth &&
                ballY + ball.offsetHeight > paddleLeftY &&
                ballY < paddleLeftY + paddleLeft.offsetHeight) ||
            (ballX >= gameArea.offsetWidth - ball.offsetWidth - paddleRight.offsetWidth &&
                ballY + ball.offsetHeight > paddleRightY &&
                ballY < paddleRightY + paddleRight.offsetHeight)
        ) {
            ballSpeedX *= -1;
            // randomizing the angle the ball bounced off the paddle
            if (Math.random() < 0.5) {
                ballSpeedY += Math.random() * 4;
            } else {
                ballSpeedY -= Math.random() * 4;
            }
        }

        // resets the game once the ball hits the walls
        if (ballX < 0 || ballX > gameArea.offsetWidth) {
            ballX = gameArea.offsetWidth / 2 - ball.offsetWidth / 2;
            ballY = gameArea.offsetHeight / 2 - ball.offsetHeight / 2;
            ballSpeedX = Math.random() > 0.5 ? 4 : -4;
            ballSpeedY = Math.random() > 0.5 ? 4 : -4;
        }

        animateBall();
    };
}

function updatePaddles() {
    // moves the paddles up when you press W or the up arrow
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
        paddleLeftY = Math.max(paddleLeftY - paddleSpeed, 0);
        paddleRightY = Math.max(paddleRightY - paddleSpeed, 0);
    }
    // moves the paddles down when you press S or the down arrow
    if (keysPressed['s'] || keysPressed['ArrowDown']) {
        paddleLeftY = Math.min(paddleLeftY + paddleSpeed, gameArea.offsetHeight - paddleLeft.offsetHeight);
        paddleRightY = Math.min(paddleRightY + paddleSpeed, gameArea.offsetHeight - paddleRight.offsetHeight);
    }

    // this actually animates the change
    paddleLeft.style.transform = `translateY(${paddleLeftY}px)`;
    paddleRight.style.transform = `translateY(${paddleRightY}px)`;

    // this calls to update the paddles before the next frame is shown in the browser
    requestAnimationFrame(updatePaddles);
}

// listens for any and all key presses
document.addEventListener('keydown', (e) => {
    keysPressed[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keysPressed[e.key] = false;
});

// begin animating the game
animateBall();
updatePaddles();