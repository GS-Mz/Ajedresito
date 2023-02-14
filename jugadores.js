class Jugadores {
  constructor(nombre) {
    this.nombre = nombre;
    this.win = false;
    this.turno = false;
  }
}

class JugadorNegras extends Jugadores {
  constructor(nombre) {
    super(nombre)
    this.peones = [];
    this.nombre = nombre;
  }

  asignarPeones() {
    let peon1 = new PeonNegro("2A", "NP1", this.nombre);
    peon1.createFicha();
    peon1.moveFicha();

    let peon2 = new PeonNegro("2B", "NP2", this.nombre);
    peon2.createFicha();
    peon2.moveFicha();

    let peon3 = new PeonNegro("2C", "NP3", this.nombre);
    peon3.createFicha();
    peon3.moveFicha();

    let peon4 = new PeonNegro("2D", "NP4", this.nombre);
    peon4.createFicha();
    peon4.moveFicha();

    let peon5 = new PeonNegro("2E", "NP5", this.nombre);
    peon5.createFicha();
    peon5.moveFicha();

    let peon6 = new PeonNegro("2F", "NP6", this.nombre);
    peon6.createFicha();
    peon6.moveFicha();

    let peon7 = new PeonNegro("2G", "NP7", this.nombre);
    peon7.createFicha();
    peon7.moveFicha();

    let peon8 = new PeonNegro("2H", "NP8", this.nombre);
    peon8.createFicha();
    peon8.moveFicha();

    this.peones.push(peon1, peon2, peon3, peon4, peon5, peon6, peon7, peon8);
  }
}

class JugadorBlancas extends Jugadores {
    constructor(nombre) {
      super(nombre)
      this.nombre = nombre;
      this.peones = [];
    }
  
    asignarPeones() {
      let peon1 = new PeonBlanca("7A", "BP1", this.nombre);
      peon1.createFicha();
      peon1.moveFicha();
  
      let peon2 = new PeonBlanca("7B", "BP2", this.nombre);
      peon2.createFicha();
      peon2.moveFicha();
  
      let peon3 = new PeonBlanca("7C", "BP3", this.nombre);
      peon3.createFicha();
      peon3.moveFicha();
  
      let peon4 = new PeonBlanca("7D", "BP4", this.nombre);
      peon4.createFicha();
      peon4.moveFicha();
  
      let peon5 = new PeonBlanca("7E", "BP5", this.nombre);
      peon5.createFicha();
      peon5.moveFicha();
  
      let peon6 = new PeonBlanca("7F", "BP6", this.nombre);
      peon6.createFicha();
      peon6.moveFicha();
  
      let peon7 = new PeonBlanca("7G", "BP7", this.nombre);
      peon7.createFicha();
      peon7.moveFicha();
  
      let peon8 = new PeonBlanca("7H", "BP8", this.nombre);
      peon8.createFicha();
      peon8.moveFicha();
  
      this.peones.push(peon1, peon2, peon3, peon4, peon5, peon6, peon7, peon8);
    }
  }
