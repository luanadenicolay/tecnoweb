class Personaje {
  constructor(x, y, vel, img) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.personaje = img;
    this.puntos = 0;
  }
  mostrar() {
    image (imagenes [1], this.x, this.y, 80, 320);
  }

  moverD() {
    if (this.x<width-80) {
      this.x += this.vel;
    }
  }
  moverI() {
    if (this.x>0) {
      this.x -= this.vel;
    }
  }
}
