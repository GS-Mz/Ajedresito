class Ficha {
  constructor(posicion, id) {
    this.posicionSiguiente = posicion;
    this.posicionActual = this.posicionSiguiente;
    this.id = id;
  }

  resetMovimientos(){
    for (const casillero of document.querySelectorAll(".tableroCasillero")) {
      casillero.classList.remove("eatzone");
      casillero.classList.remove("dropzone");
    }
  }
}

class PeonNegro extends Ficha {
  constructor(posicion, id, player) {
    super(posicion, id);
    this.fichaMovida = false;
    this.clicked = false;
    this.firstMoveDone = false;
    this.player = player;
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
      if (e && newGame.jugadores[0].turno) {
        // Se coloca un timeout para que el elemento no desaparezca apenas es tocado
        setTimeout(() => {
          this.resetMovimientos()
          this.fichaMovida = true;
          this.ficha.classList.add("hide");
          this.mostrarPosiblesMovimientos().forEach((e) => {
            try {
              if (document.getElementById(e).childNodes.length === 0) {
                document.getElementById(e).classList.toggle("dropzone");
              }
            } catch (error) {}
          });
          //Muestra posibles ataques
          this.mostrarPosiblesAtaques().forEach((e) => {
            if (document.getElementById(e).childNodes.length > 0 && document.getElementById(e).childNodes[0].id[0] === "B") {
              try {
                document.getElementById(e).classList.add("eatzone");
              } catch (error) {}
            }
          });
        });
      }
    });

    this.ficha.addEventListener("click", (e) => {
      newGame.jugadores[0].peones.forEach(e => { /*Recorro todas las fichas negras y le saco el clicked*/
        e.clicked = false;
      });
      this.clicked = true;
      this.resetMovimientos()
      if (newGame.jugadores[0].turno) {
        this.mostrarPosiblesMovimientos().forEach((e) => {
          if(document.getElementById(e).childNodes.length === 0){
            document.getElementById(e).classList.toggle("dropzone");
          }
        });

        //----------------------------------------------------------------//

        this.mostrarPosiblesAtaques().forEach((e) => {
          try {
            if (document.getElementById(e).childNodes[0].id[0] === "B") {
              document.getElementById(e).classList.toggle("eatzone");
            }
          } catch (error){}
        });
      }

    });

    //Recorro la lista de nodos allCasillas para agregar los eventos a cada casilla
    for (const casilla of allCasillas) {
      casilla.addEventListener("click", (e) =>{
        if (
          casilla.classList.contains("dropzone") &&
          this.clicked &&
          newGame.jugadores[0].turno &&
          !casilla.hasChildNodes()
        ) {
          casilla.appendChild(this.ficha); //Lo agrega al objetivo del evento
          this.posicionActual = e.target.id;
          this.clicked = false;
          this.firstMoveDone = true;
          newGame.jugadores[0].turno = false;
          newGame.jugadores[1].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Blancas)";
          this.resetMovimientos()
        }
        
        if (
          casilla.classList.contains("eatzone") && 
          newGame.jugadores[0].turno &&
          this.clicked
          ){
            casilla.removeChild(casilla.children[0]);
            casilla.appendChild(this.ficha);
  
            this.posicionActual = e.target.id;
            newGame.jugadores[0].turno = false;
            newGame.jugadores[1].turno = true;
            document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Blancas)";
            this.resetMovimientos()
          }
      })
      

      casilla.addEventListener("dragenter", (e) => {
        if (!e.target.classList.contains("dropzone") && this.fichaMovida) {
          e.target.classList.add("undroppable");
        }
        if (e.target.classList.contains("eatzone")) {
          e.target.childNodes[0].classList.add("hide");
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
        if (e.target.classList.contains("eatzone")) {
          e.target.childNodes[0].classList.remove("hide");
        }
      });

      casilla.addEventListener("dragend", (e) => {
        for (const casilleroAtaque of document.querySelectorAll(".eatzone")) {
          casilleroAtaque.classList.remove("eatzone");
        }
        this.fichaMovida = false;
        this.ficha.classList.remove("hide"); //Si la ficha no se asigna a una nueva posicion se le quita el hide
        try {
          for (const casillero of document.querySelectorAll(".dropzone")) {
            casillero.classList.remove("dropzone");
          }
        } catch (error) {}
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
          this.ficha.classList.remove("hide"); //Retiro la clase que lo hace hide
          this.posicionActual = e.target.id;
          this.firstMoveDone = true;
          newGame.jugadores[0].turno = false;
          newGame.jugadores[1].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Blancas)";
        }

        //---------------------------------------------//
        if (e.target.classList.contains("eatzone") && this.fichaMovida) {
          e.target.removeChild(e.target.children[0]);
          e.target.appendChild(this.ficha);

          this.ficha.classList.remove("hide");
          this.posicionActual = e.target.id;
          newGame.jugadores[0].turno = false;
          newGame.jugadores[1].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Blancas)";
          e.target.classList.remove("eatzone");
        }

        e.target.classList.remove("undroppable"); //Le quita el borde cuando el objeto es depositado en la casilla
      });
    }
  }

  mostrarPosiblesAtaques() {
    let posiblesAtaques = [];
    let letraANumero = this.posicionActual[1].charCodeAt() - 64;
    let posiblesMovimiento1 = String.fromCharCode(64 + (letraANumero + 1));
    let posiblesMovimiento2 = String.fromCharCode(64 + (letraANumero - 1));
    if (letraANumero + 1 > 0 && letraANumero + 1 < 9) {
      posiblesAtaques.push(+this.posicionActual[0] + 1 + posiblesMovimiento1);
    }
    if (letraANumero - 1 > 0 && letraANumero - 1 < 9) {
      posiblesAtaques.push(+this.posicionActual[0] + 1 + posiblesMovimiento2);
    }
    return posiblesAtaques;
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

class PeonBlanca extends Ficha {
  constructor(posicion, id, player) {
    super(posicion, id);
    this.fichaMovida = false;
    this.clicked = false;
    this.firstMoveDone = false;
    this.player = player;
    this.comestibles = [];
  }

  createFicha() {
    this.ficha = document.createElement("img");
    this.ficha.setAttribute("src", `/img/peonW.png`);
    this.ficha.classList.add("ficha");
    this.ficha.classList.add("peon");
    this.ficha.id = this.id;
    this.ficha.ondragover = (event) => {
      event.preventDefault();
    };
    document.getElementById(this.posicionActual).appendChild(this.ficha);
    return this.ficha;
  }

  moveFicha() {
    //Crea un evento que comienza cuando el elemento está siendo arrastrado
    this.ficha.addEventListener("dragstart", (e) => {
      if (e && newGame.jugadores[1].turno) {
        // Se coloca un timeout para que el elemento no desaparezca apenas es tocado
        setTimeout(() => {
          this.resetMovimientos()
          this.fichaMovida = true;
          this.ficha.classList.add("hide");
          this.mostrarPosiblesMovimientos().forEach((e) => {
            try {
              if (document.getElementById(e).childNodes.length === 0) {
                document.getElementById(e).classList.toggle("dropzone");
              }
            } catch (error) {}
          });
          //Muestra posibles ataques
          this.mostrarPosiblesAtaques().forEach((e) => {
            if (document.getElementById(e).childNodes.length > 0 && document.getElementById(e).childNodes[0].id[0] === "N") {
              try {
                document.getElementById(e).classList.add("eatzone");
              } catch (error) {}
            }
          });
        });
      }
    });

    this.ficha.addEventListener("click", (e) => {
      newGame.jugadores[1].peones.forEach(e => { /*Recorro todas las fichas blancas y le saco el clicked*/
        e.clicked = false;
      });
      this.clicked = true;
      this.resetMovimientos()
      if (newGame.jugadores[1].turno) {
        this.mostrarPosiblesMovimientos().forEach((e) => {
          if(document.getElementById(e).childNodes.length === 0){
            document.getElementById(e).classList.toggle("dropzone");
          }
        });

        //----------------------------------------------------------------//

        this.mostrarPosiblesAtaques().forEach((e) => {
          try {
            if (document.getElementById(e).childNodes[0].id[0] === "N") {
              document.getElementById(e).classList.toggle("eatzone");
              this.comestibles.push(document.getElementById(e))
            }
          } catch (error){}
        });
      }

      for (const casilla of this.comestibles) {
        console.log(casilla)
        casilla.firstChild.addEventListener("click", e =>{
          if (
            newGame.jugadores[1].turno &&
            this.clicked
            ){
              console.log("estoy dentro")
              casilla.removeChild(casilla.firstChild);
              casilla.appendChild(this.ficha);
              
              
              this.comestibles = [];
              this.posicionActual = casilla.id;
              newGame.jugadores[1].turno = false;
              newGame.jugadores[0].turno = true;
              document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Negras)";
              this.resetMovimientos()
            }
        })
      }

    });

    //Recorro la lista de nodos allCasillas para agregar los eventos a cada casilla
    for (const casilla of allCasillas) {
      casilla.addEventListener("click", (e) =>{
        if (
          casilla.classList.contains("dropzone") &&
          this.clicked &&
          newGame.jugadores[1].turno &&
          !casilla.hasChildNodes()
        ) {
          casilla.appendChild(this.ficha); //Lo agrega al objetivo del evento
          this.posicionActual = e.target.id;
          this.clicked = false;
          this.firstMoveDone = true;
          newGame.jugadores[1].turno = false;
          newGame.jugadores[0].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Negras)";
          this.resetMovimientos()
        }
        
      })


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
        for (const casillero of document.querySelectorAll(".dropzone")) {
          casillero.classList.remove("dropzone");
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
          this.ficha.classList.remove("hide"); //Retiro la clase que lo hace hide
          this.posicionActual = e.target.id;
          this.firstMoveDone = true;
          newGame.jugadores[1].turno = false;
          newGame.jugadores[0].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Negras)";
        }

        //---------------------------------------------//
        if (e.target.classList.contains("eatzone") && this.fichaMovida) {
          e.target.removeChild(e.target.children[0]);
          e.target.appendChild(this.ficha);

          this.ficha.classList.remove("hide");
          this.posicionActual = e.target.id;
          newGame.jugadores[1].turno = false;
          newGame.jugadores[0].turno = true;
          document.querySelector(".turn").innerHTML = "Turno de " + this.player + " (Negras)";
          e.target.classList.remove("eatzone");
        }

        e.target.classList.remove("undroppable"); //Le quita el borde cuando el objeto es depositado en la casilla
      });
    }


    

  }


  mostrarPosiblesMovimientos() {
    let posiblesMovimientos = [];
    if (!this.firstMoveDone) {
      posiblesMovimientos.push(
        +this.posicionActual[0] - 2 + this.posicionActual[1]
      );
      posiblesMovimientos.push(
        +this.posicionActual[0] - 1 + this.posicionActual[1]
      );
    } else {
      posiblesMovimientos.push(
        +this.posicionActual[0] - 1 + this.posicionActual[1]
      );
    }
    return posiblesMovimientos;
  }

  mostrarPosiblesAtaques() {
    let posiblesAtaques = [];
    let letraANumero = this.posicionActual[1].charCodeAt() - 64;
    let posiblesMovimiento1 = String.fromCharCode(64 + (letraANumero + 1));
    let posiblesMovimiento2 = String.fromCharCode(64 + (letraANumero - 1));
    if (letraANumero + 1 > 0 && letraANumero + 1 < 9) {
      posiblesAtaques.push(+this.posicionActual[0] - 1 + posiblesMovimiento1);
    }
    if (letraANumero - 1 > 0 && letraANumero - 1 < 9) {
      posiblesAtaques.push(+this.posicionActual[0] - 1 + posiblesMovimiento2);
    }
    return posiblesAtaques;
  }
}
