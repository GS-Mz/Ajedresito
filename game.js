class Game {
  constructor(p1, p2) {
    this.tablero = new Tablero();
    this.jugadores = [new JugadorNegras(p1), new JugadorBlancas(p2)]
  }

  nuevoJuego() {
    //tablero
    this.tablero.asignarId();
    this.tablero.colorear();
    //jugadores
    this.jugadores[1].turno = true;
    this.jugadores[0].asignarPeones();
    this.jugadores[1].asignarPeones();
    document.querySelector(".turn").innerHTML = "Turno de " + this.jugadores[1].nombre + " (Blancas)"
    
    
  }
}

