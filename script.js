const splashScreen = document.getElementById('splashScreen');
const startBtn = document.getElementById('startBtn');
const gameTitle = document.getElementById('gameTitle');
const gameArea = document.getElementById('gameArea');
const basket = document.getElementById('basket');
const winMessage = document.getElementById('winMessage');
const sb = document.getElementById('score-box');


let score = 0;
const winningScore = 10;


if(splashScreen.style.display !== 'none'){
    console.log("playing");
}




startBtn.addEventListener('click', () => {
  splashScreen.style.display = 'none';
  gameTitle.style.display = 'block';
  gameArea.style.display = 'block';
  birthdayMusic.play();
});

// Move basket with mouse
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  basket.style.left = `${x}px`;
});

// Create falling hearts
function createHeart() {
  const heart = document.createElement('img');
  heart.src = 'heart.png';
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * 90 + 5}%`;
  gameArea.appendChild(heart);

  let heartInterval = setInterval(() => {
    const heartRect = heart.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.left < basketRect.right &&
      heartRect.right > basketRect.left
    ) {
      score++;
      sb.innerHTML=score;
      console.log(score);
      gameArea.removeChild(heart);
      clearInterval(heartInterval);
      checkWin();
    }

    if (heartRect.top > window.innerHeight) {
      gameArea.removeChild(heart);
      clearInterval(heartInterval);
    }
  }, 100);
}

/*function checkWin() {
  if (score >= winningScore) {
    winMessage.style.display = 'block';
  }
}*/



function checkWin() {
  if (score >= winningScore) {
    const winContent = document.querySelector('.win-content');
    winMessage.style.display = 'flex';
    winContent.style.opacity = '1';
    winContent.style.animation = 'slideUpPop 1.2s ease forwards';
  }
}









// Spawn hearts every 1.5s
setInterval(() => {
  if (gameArea.style.display === 'block') {
    createHeart();
  }
}, 1500);
