const $botonEmpezar = document.querySelector("#boton-empezar");
const $tablero = document.querySelector("#tablero");

const $cuadro1 = document.querySelector("#cuadro-A");
const $cuadro2 = document.querySelector("#cuadro-B");
const $cuadro3 = document.querySelector("#cuadro-C");
const $cuadro4 = document.querySelector("#cuadro-D");

let secuenciaMaquina = [];
let secuenciaJugador = [];


/* Turno Máquina */

$botonEmpezar.onclick = comenzarJuego;

function comenzarJuego() {
  
  manejarRonda();
  habilitarTablero();

}

function manejarRonda() {
  bloquearInputJugador($tablero);
  const indiceCuadro = elegirIndice();
  elegirCuadro(
    secuenciaMaquina,
    indiceCuadro,
    $cuadro1,
    $cuadro2,
    $cuadro3,
    $cuadro4
  );

  for (let i = 0; i < secuenciaMaquina.length; i++) {
    setTimeout(function () {
      resaltarCuadro(secuenciaMaquina, i);
      opacarCuadro(secuenciaMaquina, i);
    }, i * 500);
  }

  habilitarInputJugador($tablero);
}

function manejarTurnoUsuario(Event) {
  const cuadro = Event.target;
  secuenciaJugador.push(cuadro);
  resaltarCuadro(secuenciaJugador, secuenciaJugador.length - 1);
  opacarCuadro(secuenciaJugador, secuenciaJugador.length - 1);

  if (secuenciaMaquina[secuenciaJugador.length - 1] !== cuadro) {
    console.log("PERDIÓ");
    secuenciaMaquina = [];
  } else if (secuenciaMaquina.length === secuenciaJugador.length) {
    setTimeout(function () {
      manejarRonda();
    }, secuenciaMaquina.length * 1000);
  }
}

function habilitarTablero() {
  $tablero.onclick = manejarTurnoUsuario;
}

// function manejarRondaJugador() {
//   let cantidadDeClicks = 0;
//   for (let i = 0; i < secuenciaMaquina.length; i++) {
//     //$tablero.onclick = function (Event) {
//     //secuenciaJugador.push(Event.target);
//     setTimeout(function () {
//       resaltarCuadro(secuenciaJugador, cantidadDeClicks);
//       opacarCuadro(secuenciaJugador, cantidadDeClicks);
//       cantidadDeClicks++;
//     }, cantidadDeClicks * 500);
//   }
//   //}
// }

function avanzarRonda() {
  setTimeout(function () {
    if (compararJugadas(secuenciaJugador, secuenciaMaquina)) {
      ronda++;
    } else {
      console.log("FIN JUEGO");
      secuenciaMaquina = [];
      ronda = 0;
      clearInterval(idIntervalo);
    }
  }, secuenciaMaquina.length * 1000);

  return ronda;
}

/* Declaración de funciones */
function elegirIndice() {
  const numeroElegido = Math.floor(Math.random() * 4) + 1;

  return numeroElegido;
}

function resaltarCuadro(secuencia, i) {
  secuencia[i].style.opacity = "1";
}

function opacarCuadro(secuencia, i) {
  setTimeout(function () {
    secuencia[i].style.opacity = "0.5";
  }, 300);
}

function bloquearInputJugador($tablero) {
  $tablero.style.pointerEvents = "none";
}

function habilitarInputJugador($tablero) {
  $tablero.style.pointerEvents = "auto";
}

function compararJugadas(secuenciaJugador, secuenciaMaquina) {
  for (let i = 0; i < secuenciaMaquina.length; i++) {
    if (secuenciaMaquina[i] !== secuenciaJugador[i]) {
      return false;
    }
  }
  return true;
}

function elegirCuadro(
  secuencia,
  indiceCuadro,
  cuadro1,
  cuadro2,
  cuadro3,
  cuadro4
) {
  if (indiceCuadro === 1) {
    secuencia.push(cuadro1);
  } else if (indiceCuadro === 2) {
    secuencia.push(cuadro2);
  } else if (indiceCuadro === 3) {
    secuencia.push(cuadro3);
  } else {
    secuencia.push(cuadro4);
  }

  return secuencia;
}
