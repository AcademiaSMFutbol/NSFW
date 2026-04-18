const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

// Configuración del Personaje (Estilo Patrulla)
const player = {
    x: 100,
    y: 500,
    width: 60,
    height: 40,
    color: "#e74c3c", // Rojo tipo Marshall
    dy: 0,
    jumpForce: 15,
    gravity: 0.8,
    grounded: false
};

// Soporte para Mando (Gamepad API)
window.addEventListener("gamepadconnected", (e) => {
    console.log("Mando conectado: " + e.gamepad.id);
});

function update() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
        const gp = gamepads[0];
        
        // Movimiento horizontal (Stick izquierdo o D-pad)
        if (gp.axes[0] < -0.2) player.x -= 5;
        if (gp.axes[0] > 0.2) player.x += 5;
        
        // Salto (Botón A o X dependiendo del mando)
        if (gp.buttons[0].pressed && player.grounded) {
            player.dy = -player.jumpForce;
            player.grounded = false;
        }
    }

    // Gravedad básica
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y > 600) {
        player.y = 600;
        player.dy = 0;
        player.grounded = true;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar Suelo (Playa)
    ctx.fillStyle = "#f1c40f";
    ctx.fillRect(0, 640, canvas.width, 80);

    // Dibujar Jugador (Simplificado como un bloque con orejas)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "black";
    ctx.fillRect(player.x + 45, player.y + 10, 5, 5); // Ojo
}

update();
