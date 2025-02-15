const panels = document.querySelectorAll('.panel');
const startBtn = document.getElementById('startBtn');
const levelSpan = document.getElementById('level');
let sequence = [];
let playerSequence = [];
let level = 0;
let isPlaying = false;
const nombre = localStorage.getItem('nombreJugador');
const nombreJugadorSpan = document.getElementById('nombreJugadorSpan');
nombreJugadorSpan.textContent = nombre;

const sounds = {
    green: new Audio('../media/verde.mp3'),
    red: new Audio('../media/rojo.mp3'),
    yellow: new Audio('../media/amarillo.mp3'),
    blue: new Audio('../media/azul.mp3')
};


function activatePanel(color) {
    const panel = document.getElementById(color);
    panel.style.opacity = '0.7';
    sounds[color].play();
    setTimeout(() => panel.style.opacity = '1', 300);
}

function nextLevel() {
    level++;
    levelSpan.textContent = level;
    sequence.push(panels[Math.floor(Math.random() * 4)].id);
    playSequence();
}

function playSequence() {
    let i = 0;
    isPlaying = true;
    
    const interval = setInterval(() => {
        activatePanel(sequence[i]);
        i++;
        if(i >= sequence.length) {
            clearInterval(interval);
            isPlaying = false;
            playerSequence = [];
        }
    }, 800);
}

function saveHighscore(name, score) {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    const existingIndex = highscores.findIndex(entry => entry.name === name);
    
    if (existingIndex !== -1) {
        if (score > highscores[existingIndex].score) {
            highscores[existingIndex].score = score;
        }
    } else {
        highscores.push({ name, score });
    }
    
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function checkInput(color) {
    if(isPlaying) return;
    
    activatePanel(color);
    playerSequence.push(color);
    
    if(playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        saveHighscore(nombre, level); 
        alert(`Game Over! Nivel alcanzado: ${level}`);
        startBtn.textContent = 'Start';
        isPlaying = false;
        return;
    }
    
    if(playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    levelSpan.textContent = level;
    startBtn.textContent = 'Restart';
    nextLevel();
}

panels.forEach(panel => {
    panel.addEventListener('click', (e) => {
        if(sequence.length === 0) return;
        checkInput(e.target.id);
    });
});

startBtn.addEventListener('click', startGame);