class Ficha {
  constructor(posicion, id) {
    this.posicionSiguiente = posicion;
    this.posicionActual = this.posicionSiguiente;
    this.id = id;
  }
}

class Peon extends Ficha {
  constructor(posicion, id) {
    super(posicion, id);
    this.fichaMovida = false;
    this.clicked = false;
    this.firstMoveDone = false;
  }

  createFicha() {
    this.ficha = document.createElement("img");
    this.ficha.setAttribute("src", `/img/peon.png`);
    this.ficha.classList.add("ficha");
    this.ficha.classList.add("peon");
    this.ficha.id = this.id;
    document.getElementById(this.posicionActual).appendChild(this.ficha);
    return this.ficha;
  }

  moveFicha() {
    //Crea un evento que comienza cuando el elemento está siendo arrastrado
    this.ficha.addEventListener("dragstart", (e) => {
      if (e) {
        // Se coloca un timeout para que el elemento no desaparezca apenas es tocado
        setTimeout(() => {
            for (const casillero of document.querySelectorAll('.dropzone')) {
                casillero.classList.remove("dropzone")
            }
          this.fichaMovida = true;
          this.ficha.classList.add("hide");
          this.mostrarPosiblesMovimientos().forEach((e) => {
            document.getElementById(e).classList.add("dropzone");
          });
        });
      }
    });

    this.ficha.addEventListener("click", (e) => {
      if (document.getElementsByClassName('dropzone').length === 0) {
        this.mostrarPosiblesMovimientos().forEach((e) => {
          document.getElementById(e).classList.toggle("dropzone");
        });
      }
      else{
        for (const casillero of document.querySelectorAll('.dropzone')) {
            casillero.classList.remove("dropzone")
        }
        this.mostrarPosiblesMovimientos().forEach((e) => {
            document.getElementById(e).classList.toggle("dropzone");
          });
      }
    });

    //Recorro la lista de nodos allCasillas para agregar los eventos a cada casilla
    for (const casilla of allCasillas) {
      casilla.addEventListener("dragenter", (e) => {
        if (!e.target.classList.contains("dropzone") && this.fichaMovida) {
          e.target.classList.add("undroppable");
        }
        e.preventDefault();
      });

      casilla.addEventListener("dragover", (e) => {
        if (!e.target.classList.contains("dropzone") && this.fichaMovida) {
          e.target.classList.add("undroppable"); //Le agrega el borde cuando el objeto está sobre el casillero
        }
        this.posicionSiguiente = e.target.id;
        e.preventDefault();
      });

      casilla.addEventListener("dragleave", (e) => {
        if (!e.target.classList.contains("dropzone") && this.fichaMovida) {
          e.target.classList.remove("undroppable"); //Le quita el borde cuando el objeto deja de pasar sobre la casilla
        }
      });

      casilla.addEventListener("dragend", (e) => {
        this.fichaMovida = false;
        this.ficha.classList.remove("hide"); //Si la ficha no se asigna a una nueva posicion se le quita el hide
        for (const casillero of document.querySelectorAll('.dropzone')) {
            casillero.classList.remove("dropzone")
        }
      });

      casilla.addEventListener("drop", (e) => {
        //Se ejecuta cuando el elemento es dropeado en el target

        e.preventDefault();
        if (
          e.target.classList.contains("dropzone") &&
          this.fichaMovida &&
          !e.target.hasChildNodes() 
        ) {
          e.target.appendChild(this.ficha); //Lo agrega al objetivo del evento
          this.ficha.classList.remove("hide"); //Retiro la clase que lo hace invisible
          this.posicionActual = e.target.id;
          this.firstMoveDone = true;
        }
        e.target.classList.remove("undroppable"); //Le quita el borde cuando el objeto es depositado en la casilla
      });
    }
  }

  mostrarPosiblesMovimientos() {
    let posiblesMovimientos = [];
    if (!this.firstMoveDone) {
      posiblesMovimientos.push(
        +this.posicionActual[0] + 2 + this.posicionActual[1]
      );
      posiblesMovimientos.push(
        +this.posicionActual[0] + 1 + this.posicionActual[1]
      );
    } else {
      posiblesMovimientos.push(
        +this.posicionActual[0] + 1 + this.posicionActual[1]
      );
    }
    return posiblesMovimientos;
  }
}