const $botonEmpezar = document.querySelector("#boton-empezar");
const $tablero = document.querySelector("#tablero");

const $cuadro1 = document.querySelector("#cuadro-A");
const $cuadro2 = document.querySelector("#cuadro-B");
const $cuadro3 = document.querySelector("#cuadro-C");
const $cuadro4 = document.querySelector("#cuadro-D");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 1;

/* Turno Máquina */

$botonEmpezar.onclick = comenzarJuego;

function comenzarJuego() {
  manejarRonda();
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
      actualizarEstado("Turno de la máquina", `Ronda #: ${ronda}`);
      resaltarCuadro(secuenciaMaquina, i);
      opacarCuadro(secuenciaMaquina, i);
    }, i * 500);
  }

  setTimeout(function(){
    actualizarEstado("Su turno", `Ronda #: ${ronda}`);
  },secuenciaMaquina.length * 500)

  habilitarTablero();
  secuenciaJugador = [];

  return secuenciaJugador;
}

function manejarTurnoUsuario(Event) {
  secuenciaJugador.push(Event.target);
  resaltarCuadro(secuenciaJugador, secuenciaJugador.length - 1);
  opacarCuadro(secuenciaJugador, secuenciaJugador.length - 1);

  setTimeout(function () {
    if (
      secuenciaMaquina[secuenciaJugador.length - 1] !==
        secuenciaJugador[secuenciaJugador.length - 1] ||
      secuenciaMaquina.length === 0
    ) {
      actualizarEstado(
        "¡Ha perdido! Presione EMPEZAR para volver a jugar",
        "Ronda #: --"
      );
      bloquearInputJugador($tablero);
      secuenciaJugador = [];
      secuenciaMaquina = [];
      ronda = 1;
    } else if (secuenciaMaquina.length === secuenciaJugador.length) {
      manejarRonda();
      ronda++;
    }
  }, secuenciaMaquina.length * 700);
}

function habilitarTablero() {
  habilitarInputJugador($tablero);
  $tablero.onclick = manejarTurnoUsuario;
}

/* Declaración de funciones */
function actualizarEstado(mensaje, ronda) {
  const $fraseDeEstado = document.querySelector("#frase-de-estado");
  $fraseDeEstado.textContent = mensaje;

  const $ronda = document.querySelector("#ronda");
  $ronda.textContent = ronda;
}

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

