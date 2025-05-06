const gameArea = document.getElementById('gameArea');
const setupBtn = document.getElementById('setupBtn');
const numTargetsInput = document.getElementById('numTargets');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;
let targets = [];
let expectedNumber = 1;
let totalTargets = 0;

function createTargets(num) {
    gameArea.innerHTML = '';
    targets = [];
    expectedNumber = 1;
    totalTargets = num;

    for (let i = 1; i <= num; i++) {
        const target = document.createElement('div');
        target.classList.add('target');
        target.textContent = i;
        gameArea.appendChild(target);
        targets.push(target);

        moveTarget(target);

        target.addEventListener('click', () => handleTargetClick(target));
    }
}

function moveTarget(target) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - target.offsetWidth;
    const maxY = gameAreaRect.height - target.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.left = `${randomX}px;`;
    target.style.top = `${randomY}px`;
}

function handleTargetClick(target) {
    if (parseInt(target.textContent) === expectedNumber) {
        target.remove();
        expectedNumber++;

        if (expectedNumber > totalTargets) {
            score++;
            scoreBoard.textContent = `Score: ${score}`;

            setTimeout(() => {
                createTargets(totalTargets); 
            }, );
        }
    }
}

setupBtn.addEventListener('click', () => {
    const num = parseInt(numTargetsInput.value);
    if (!isNaN(num) && num > 0) {
        score = 0;
        scoreBoard.textContent = `Score: ${score}`;
        createTargets(num);
    }
});

document.addEventListener('keydown', function(event){
  if (event.ctrlKey && event.key === 'o') {
    event.preventDefault();
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
  }
});