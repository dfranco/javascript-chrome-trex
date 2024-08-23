document.addEventListener('DOMContentLoaded', () => {
    const dino= document.querySelector('.dino');
    const grid = document.querySelector('.grid');

    const alert = document.getElementById('alert');
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;

    let position = 0;
    function jump() {
        isJumping = true;
        let count = 0;
        let timerId = setInterval(function() {
            if (count === 10) {
                clearInterval(timerId);
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count--;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20)
            }
            position += 30;
            count++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20)
    }
    function control(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump()
            }
        }
    }

    function generateObstacles() {
        let randomTime = Math.random() * 4000;
        let obstaclePosition = 1000;
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function () {
            if (obstaclePosition < 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId);
                alert.innerHTML = 'Game Over';
                isGameOver = true;
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20)
        if (isGameOver === false) setTimeout(generateObstacles, randomTime);
    }
    generateObstacles();

    document.addEventListener('keydown', control)
})