const formulario = document.getElementById('formulario');


document.addEventListener('DOMContentLoaded', function() {
    
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombreInput = document.getElementById('nombre');
        const nombre = nombreInput.value.trim();
    
        if (nombre === '') {
            alert('No puedes iniciar sin ingresar un nombre');
        } else {
            localStorage.setItem('nombreJugador', nombre);
    
            window.location.href = 'juego.html?nombre=${encodeURIComponent(nombre)}';
        }
    });
    
    const highscoresBody = document.getElementById('highscoresBody');
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.sort((a, b) => b.score - a.score);
    
    highscoresBody.innerHTML = '';
    highscores.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        highscoresBody.appendChild(row);
    });
});

