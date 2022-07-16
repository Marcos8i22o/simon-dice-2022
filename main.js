const $botonEmpezar = document.querySelector("#boton-empezar");
const $tablero = document.querySelector("#tablero");

const $cuadros = document.querySelectorAll(".cuadro");

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
  elegirCuadro(secuenciaMaquina, indiceCuadro, $cuadros);

  const TIEMPO_DISPONIBLE = 500;

  for (let i = 0; i < secuenciaMaquina.length; i++) {
    setTimeout(function () {
      actualizarEstado("Turno de la máquina", `Ronda #: ${ronda}`);
      resaltarCuadro(secuenciaMaquina, i);
      opacarCuadro(secuenciaMaquina, i);
    }, i * TIEMPO_DISPONIBLE);
  }

  setTimeout(function () {
    actualizarEstado("Su turno", `Ronda #: ${ronda}`);
    habilitarTablero();
  }, secuenciaMaquina.length * TIEMPO_DISPONIBLE);

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
  const numeroElegido = Math.floor(Math.random() * $cuadros.length) + 1;

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

function elegirCuadro(secuencia, indiceCuadro, $cuadros) {
  for (let i = 0; i < $cuadros.length; i++) {
    if (indiceCuadro === i + 1) {
      secuencia.push($cuadros[indiceCuadro]);
    }
  }
  return secuencia;
}
