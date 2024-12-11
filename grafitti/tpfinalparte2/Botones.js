class Botones {

  constructor(bx, by, tam) {
    bx = bx;
    by = by;
    tam = tam;
  }

  botonesInicio(bx, by, tam) {
    // Botón "COMENZAR"
    fill(200);
    rect(this.bx, this.by, this.tam, this.tam);

    // Botón "CRÉDITOS"
    fill(200);
    rect(this.bx, this.by+100, this.tam, this.tam);
  }

  mouse(x, y, ancho, alto) {
    return mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
  }

  detectarBoton() {
    if (this.botones.mouse(220, 250, 200, 50)) {
      this.estado = "juego";
    }
    if (this.botones.mouse(220, 360, 200, 50)) {
      this.estado = "creditos";
    }
  }

}
