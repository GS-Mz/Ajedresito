class Game {
  constructor() {
    this.tablero = new Tablero();
    this.jugadores = [new JugadorNegras("Gonzalo"), new JugadorBlancas("User")]
  }

  nuevoJuego() {
    //tablero
    this.tablero.asignarId();
    this.tablero.colorear();
    //jugadores
    this.jugadores[1].turno = true;
    this.jugadores[0].asignarPeones();
    this.jugadores[1].asignarPeones();
    
    
  }
}
