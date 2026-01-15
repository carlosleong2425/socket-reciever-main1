let socket;
let nombreCanal = "canal-19"; // DEBE ser el mismo que el del emisor
let valorRecibido = 0;

function setup() {
  createCanvas(400, 200);
  
  // Conexión al servidor (usa tu IP y puerto 3000)
  socket = io('http://206.189.168.40:3000', { 
    transports: ['websocket'] 
  });

  // 1. Confirmar conexión y unirse al canal
  socket.on('connect', () => {
    console.log("✅ Receptor conectado con ID:", socket.id);
    socket.emit('join-channel', nombreCanal);
  });

  // 2. ESCUCHAR el evento que envía el servidor
  socket.on('update-value', (data) => {
    valorRecibido = data;
    console.log("📥 Valor recibido desde el emisor:", valorRecibido);
  });
}

function draw() {
  background(0);
  fill(0, 255, 0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("DATOS DEL EMISOR", width/2, 40);
  
  textSize(60);
  text(valorRecibido + "°", width/2, height/2 + 20);
  
  // Visualización simple
  let xPos = map(valorRecibido, 0, 180, 50, width-50);
  ellipse(xPos, 150, 20, 20);
}