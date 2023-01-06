const tablero = document.querySelector(".tablero");
const allCasillas = document.querySelectorAll(".tableroCasillero");

console.log(allCasillas);

let casillas = [
    "8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H",
    "7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H",
    "6A", "6B", "6C", "6D", "6E", "6F", "6G", "6H",
    "5A", "5B", "5C", "5D", "5E", "5F", "5G", "5H",
    "4A", "4B", "4C", "4D", "4E", "4F", "4G", "4H",
    "3A", "3B", "3C", "3D", "3E", "3F", "3G", "3H",
    "2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H",
    "1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H"
];

let fichas = [];

for (let i = 0; i < 2; i++) {
  let o = document.createElement("img");
  fichas.push(o);
}

console.log(fichas);

//Asigno los ID a cada casilla del tablero
for (let i = 0; i < tablero.children.length; i++) {
  tablero.children[i].id = casillas[i];
  tablero.children[i].classList.add("dropzone");
}

//Asigno los colores a los tableros
for (let i = 0; i < 64; i++) {
  let casillaActual = tablero.children[i].id;
  if (casillaActual[0] % 2 == 0) {
    if (
      casillaActual[1] == "B" ||
      casillaActual[1] == "D" ||
      casillaActual[1] == "F" ||
      casillaActual[1] == "H"
    ) {
      document
        .getElementById(casillaActual)
        .classList.add("casilleroPrincipal");
    } else
      document
        .getElementById(tablero.children[i].id)
        .classList.add("casilleroSecundario");
  } else {
    if (
      casillaActual[1] == "B" ||
      casillaActual[1] == "D" ||
      casillaActual[1] == "F" ||
      casillaActual[1] == "H"
    ) {
      document
        .getElementById(casillaActual)
        .classList.add("casilleroSecundario");
    } else
      document
        .getElementById(tablero.children[i].id)
        .classList.add("casilleroPrincipal");
  }
}

let bool = true;

class Ficha {
  constructor(tipo, posicion, id) {
    this.posicionSiguiente = posicion;
    this.posicionActual = this.posicionSiguiente;
    this.tipo = tipo;
    this.ficha = fichas[id];
    this.id = id;
  }
}

// class PeonW extends Ficha {
//   createFicha(){
//         this.ficha.setAttribute("src", `/img/peonW.png`);
//         this.ficha.classList.add("ficha");
//         this.ficha.classList.add("peonW");
//         document.getElementById(this.posicionActual).appendChild(this.ficha);
//     return this.ficha;
//   }

//   moverFicha() {

//     if(bool){
//       this.ficha.addEventListener("dragstart", (e) => {
//         //Crea un evento que comienza cuando el elemento está siendo arrastrado
//         if (e) {
//           setTimeout(() => {
//             // Se coloca un timeout para que el elemento no desaparezca apenas es tocado
//             this.ficha.classList.add("hide");
//           });
//         }
//       });

//       for (const casilla of allCasillas) {
//         //Recorro la lista de nodos allCasillas para agregar los eventos a cada casilla
//         casilla.addEventListener("dragenter", (e) => {
//           if (e.target.classList.contains("dropzone")) {
//             e.target.classList.add("drag-over");
//           }
//           e.preventDefault();
//         });

//         casilla.addEventListener("dragover", (e) => {
//           if (e.target.classList.contains("dropzone")) {
//             e.target.classList.add("drag-over"); //Le agrega el borde cuando el objeto está sobre el casillero
//           }
//           e.preventDefault();
//         });

//         casilla.addEventListener("dragleave", (e) => {
//           if (e.target.classList.contains("dropzone")) {
//             e.target.classList.remove("drag-over"); //Le quita el borde cuando el objeto deja de pasar sobre la casilla
//           }
//         });

//         casilla.addEventListener("dragend", (e) =>{
//           this.ficha.classList.remove("hide"); //Si la ficha no se asigna a una nueva posicion se le quita el hide
//         })

//         casilla.addEventListener("drop", (e) => {
//           //Se ejecuta cuando el elemento es dropeado en el target
//           if (e.target.classList.contains("dropzone")) {
//             e.target.classList.remove("drag-over"); //Le quita el borde cuando el objeto es depositado en la casilla
//           }
//           e.preventDefault();
//           if (e.target.classList.contains("dropzone")) {
//             this.ficha.parentNode.removeChild(this.ficha); //Elimina el propio elemento del nodo padre
//             e.target.appendChild(this.ficha); //Lo agrega al objetivo del evento
//             this.ficha.classList.remove("hide"); //Retiro la clase que lo hace invisible
//           }
//         });
//         bool = false;
//       }
//     }
//     }
// }

class Peon extends Ficha {

  createFicha() {
    this.ficha.setAttribute("src", `/img/peon.png`);
    this.ficha.classList.add("ficha");
    this.ficha.classList.add("peon");
    this.ficha.id = this.id;
    this.droppable = false;
    document.getElementById(this.posicionActual).appendChild(this.ficha);
    return this.ficha;
  }

  moverFicha() {
    if(this.id === id){
    this.ficha.addEventListener("dragstart", (e) => {
      console.log(e.target.parentNode.childNodes[0].id)
      console.log(this.ficha.id)
      //Crea un evento que comienza cuando el elemento está siendo arrastrado
      if (e) {
        setTimeout(() => {
          // Se coloca un timeout para que el elemento no desaparezca apenas es tocado
          this.ficha.classList.add("hide");
        });
          
          //Recorro la lista de nodos allCasillas para agregar los eventos a cada casilla
          for (const casilla of allCasillas) {
            casilla.addEventListener("dragenter", (e) => {
              if (e.target.classList.contains("dropzone")) {
                e.target.classList.add("drag-over");
              }
              e.preventDefault();
            });

            casilla.addEventListener("dragover", (e) => {
              if (e.target.classList.contains("dropzone")) {
                e.target.classList.add("drag-over"); //Le agrega el borde cuando el objeto está sobre el casillero
                this.posicionSiguiente = e.target.id;
              }
              e.preventDefault();
            });

            casilla.addEventListener("dragleave", (e) => {
              if (e.target.classList.contains("dropzone")) {
                e.target.classList.remove("drag-over"); //Le quita el borde cuando el objeto deja de pasar sobre la casilla
              }
            });

            casilla.addEventListener("dragend", (e) => {
              this.ficha.classList.remove("hide"); //Si la ficha no se asigna a una nueva posicion se le quita el hide
            });

            casilla.addEventListener("drop", (e) => {
              //Se ejecuta cuando el elemento es dropeado en el target
              if (e.target.classList.contains("dropzone")) {
                e.target.classList.remove("drag-over"); //Le quita el borde cuando el objeto es depositado en la casilla
                this.ficha.parentNode.removeChild(fichas[this.id]); //Elimina el propio elemento del nodo padre
                e.target.appendChild(fichas[this.id]); //Lo agrega al objetivo del evento
                this.ficha.classList.remove("hide"); //Retiro la clase que lo hace invisible
                this.posicionActual = this.posicionSiguiente;
                e.preventDefault();
              }
            });
          }
      }
      else{
        console.log("??")
      }
    });
  }
}
}

let peon = new Peon("peon", "2H", 0);
let peon2 = new Peon("peon", "4H", 1);


peon2.createFicha();
peon2.moverFicha();

peon.createFicha();
