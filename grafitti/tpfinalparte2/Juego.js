class Juego {

  constructor() {
    this.personaje = new Personaje(width/2, height/2, 20);
    this.objetivos = [];
    for (let i=0; i<20; i++) {
      this.objetivos[i] = new Objetivos (random(0, width), 0, 80);
    }
    this.puntos = 0;
    this.estado = "pantalla inicio";
    this.botones = new Botones ();
    this.tiempoInicio = null;
    this.tiempoLimite = 30000;
    this.tiempoTranscurrido = 0;
  }

  mostrar() {
    this.pantallas();
    if (this.estado === "juego") {
      this.personaje.mostrar();
      this.colision();
      this.contador();
      this.tiempo();

      for (let i = 0; i < 5; i++) {
        this.objetivos[i].mostrar();
        this.objetivos[i].movimiento();
      }
    }
  }



  reiniciarJuego() {
    this.personaje = new Personaje(width / 2, height / 2, 20);
    this.objetivos = [];
    for (let i = 0; i < 20; i++) {
      this.objetivos.push(new Objetivos(random(0, width), 0, 80));
    }
    this.puntos = 0;
    this.vidas = 3;
    this.estado = "pantalla inicio";
    this.tiempoInicio = null; // Reinicia el tiempo de inicio
    this.tiempoLimite = 30000;
    this.tiempoTranscurrido = 0; // Reinicia el tiempo transcurrido
  }



  contador() {
    image (imagenes[6], 550, 10, 50, 50);
    textSize (30);
    fill (255);
    text(this.puntos, 600, 50);
  }

  resultados () {
    if (this.puntos >= 10) {
      this.estado = "ganaste";
    }
  }

  colision() {
    for (let i = 0; i < this.objetivos.length; i++) {
      let distancia = dist(this.personaje.x, this.personaje.y, this.objetivos[i].posX, this.objetivos[i].posY);

      if (distancia < (this.objetivos[i].tam/2 )) {
        this.puntos++;
        this.objetivos[i].reset();
      }
      
      if (this.puntos >= 10){
       this.estado = "ganaste"; 
      }
    }
  }

  tiempo() {
    if (this.estado === "juego") {
      if (!this.tiempoInicio) {
        this.tiempoInicio = millis();
      }
      this.tiempoTranscurrido = millis() - this.tiempoInicio;
      textSize(25);
      text("Tiempo: " + floor((this.tiempoLimite - this.tiempoTranscurrido) / 1000), 500, 100);

      if (this.tiempoTranscurrido >= this.tiempoLimite) {
        this.estado = "perdiste";
      }
    }
  }

  pantallas() {
    if (this.estado === "pantalla inicio") {
      image(imagenes[0], 0, 0, width, height);
      this.botones.botonesInicio();
      if (sonido.isPlaying()) {
        sonido.stop();
      }
    } else if (this.estado === "instrucciones") {
      image(imagenes[9], 0, 0, width, height);
    } else if (this.estado === "ganaste") {
      image(imagenes[2], 0, 0);
    } else if (this.estado === "perdiste") {
      image(imagenes[4], 0, 0);
      if(!sonido.isPlaying()){
      sonido.play();
      }
    } else if (this.estado === "creditos") {
      image(imagenes[7], 0, 0);
      image(imagenes[8], 15, 240, 50, 50);
    } else if (this.estado === "juego") {
      image(imagenes[3], 0, 0);
    }
  }

  controlBotones() {
    if (this.estado === "pantalla inicio") {

      if (this.botones.mouse(200, 310, 230, 70)) {
        this.estado = "instrucciones";
      }

      if (this.botones.mouse(250, 390, 150, 50)) {
        this.estado = "creditos";
      }
    } else if (this.estado === "creditos") {
      if (this.botones.mouse(15, 240, 50, 50)) {
        this.estado="pantalla inicio";
      }
    }
  }

  controlTeclas() {
    if (this.estado === "instrucciones" && keyCode === ENTER) {
      this.estado = "juego";
    } else if (this.estado === "juego") {
      if (keyCode === RIGHT_ARROW) {
        this.personaje.moverD();
      } else if (keyCode === LEFT_ARROW) {
        this.personaje.moverI();
      }
    } else if ((this.estado === "ganaste" || this.estado === "perdiste") && key === 'r') {
      this.reiniciarJuego();
    }
  }
}
