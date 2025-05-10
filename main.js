const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const setupBtn = document.getElementById('setupBtn');
const numInput = document.getElementById('numInput');

let score = 0;
let nextTarget = 1;
let totalTargets = 0;
let currentTargetCount = 0;

gameArea.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

setupBtn.addEventListener('click', () => {
  const targetCount = parseInt(numInput.value);
  if (!isNaN(targetCount) && targetCount > 0) {
    score = 0;
    updateScore();
    currentTargetCount = targetCount;
    setupTargets(currentTargetCount);
  }
});

function setupTargets(count) {
  gameArea.innerHTML = '';
  nextTarget = 1;
  totalTargets = count;

  const gameAreaRect = gameArea.getBoundingClientRect();

  for (let i = 1; i <= count; i++) {
    const target = document.createElement('div');
    target.classList.add('target');
    target.textContent = i;

    const size = 40;
    const maxX = gameAreaRect.width - size;
    const maxY = gameAreaRect.height - size;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;


    target.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      const number = parseInt(target.textContent);
      if (number === nextTarget) {
        target.remove();
        nextTarget++;

        if (nextTarget > totalTargets) {

          score++;
          updateScore();

          setTimeout(() => {
            setupTargets(currentTargetCount);
          }, 1000);
        }
      }
    });

    gameArea.appendChild(target);
  }
}

function updateScore() {
  scoreBoard.textContent = `Score: ${score}`;
}

// RESETBTN
document.addEventListener('keydown', function(event){
  if (event.ctrlKey && event.key === 'o') {
    event.preventDefault();
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
  }
});