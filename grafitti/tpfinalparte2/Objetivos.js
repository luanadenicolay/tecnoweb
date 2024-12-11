class Objetivos {
  constructor(posX, posY, tam, img) {
    this.posX = posX;
    this.posY = posY;
    this.tam = tam;
    this.objetivo = img;
    this.vel = random (1, 2);
  }
  mostrar() {
    image (imagenes[5], this.posX, this.posY, this.tam, this.tam);
  }

  movimiento() {
    if (this.posY > height+80) {
      this.reset();
    }
    this.posY += this.vel;
  }
  reset() {
    this.posX = random(0, width - 70);
    this.posY=random(-50, -100);
  }
}
