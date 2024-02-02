//Variable para obtener todo lo relacionado con la etiqueta <textarea>
var cadena = document.getElementById("cadena");
//Se valida en tiempo real el evento de precionar una tecla esta informacion se almacena en la variable 'e'
cadena.addEventListener("keydown", (e) => {
  //La variable caracterValido limita los caracteres que son admitidos a las letras de la 'a' a la 'z'
  const caracterValido = /[a-zñ ]/;
  /*
    Aqui se hace la validacion de que el caracter ingresado NO sea igual a un caracterValido.
    En caso de no ser un caracter valido:
    - Se limita la accion a no poder escribirlo en nuestro textarea con preventDefault()
    - Se muestra una alerta para infornar al usuario que cometio un error ingresando un caracter invalido
    */
  if (!caracterValido.test(e.key)) {
    mostrarAlerta();
    e.preventDefault();
  }
});

cadena.addEventListener("paste", (e) => {
  const caracterValido = /[a-zñ ]/;
  var cadena = e.clipboardData.getData("text/plain");
  var bandera = "ok";

  for (let i = 0; i < cadena.length; i++) {
    if (!caracterValido.test(cadena[i])) {
      bandera = "";
      mostrarAlerta();
      e.preventDefault();
    }
  }

  estadoBoton(bandera);
});

//Funcion para mostrar la alerta
function mostrarAlerta() {
  var alert = document.querySelector(".alert");
  alert.className = "alert show";
  setTimeout(function () {
    ocultarAlerta();
  }, 3000);
}

//Funcion para ocultar la alerta
function ocultarAlerta() {
  var alert = document.querySelector(".alert");
  alert.className = "alert hide";
}

//Funcion para activar o desactivar los botones
function estadoBoton(valor) {
  let button1 = document.querySelector("#boton1");
  let button2 = document.querySelector("#boton2");
  var soloEspacios = true;

  for (let i = 0; i < valor.length; i++) {
    if (valor[i] != " ") {
      soloEspacios = false;
    }
  }

  if (valor === "" || soloEspacios == true) {
    button1.disabled = true;
    button2.disabled = true;
    button1.className = "boton";
    button2.className = "boton";
  } else {
    button1.disabled = false;
    button2.disabled = false;
    button1.className = "boton activo";
    button2.className = "boton activo";
  }
}

function obtenerTexto() {
  var texto = document.querySelector("#cadena");
  return texto.value;
}

//Funcion para encriptar
function encriptar() {
  texto = obtenerTexto();
  var resultado = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] == "a") {
      resultado = resultado + "ai";
    } else if (texto[i] == "e") {
      resultado = resultado + "enter";
    } else if (texto[i] == "i") {
      resultado = resultado + "imes";
    } else if (texto[i] == "o") {
      resultado = resultado + "ober";
    } else if (texto[i] == "u") {
      resultado = resultado + "ufat";
    } else {
      resultado = resultado + texto[i];
    }
  }
  ocultarMuñeco();
  desactivarBotones();
  limpiarTextarea();
  mostrarResultado();
  mostrarResultado(texto, resultado, "encriptado");
  document.querySelector("#boton-copiar").className = "";
  document.querySelector("#aviso-copiado").className = "ocultar";
}

function desactivarBotones() {
  document.querySelector("#boton1").className = "boton";
  document.querySelector("#boton2").className = "boton";
  document.querySelector("#boton1").disabled = true;
  document.querySelector("#boton2").disabled = true;
}

function ocultarMuñeco() {
  contenido = document.querySelector("#cont-ocultar");
  contenido.className = "ocultar";
}

function mostrarResultado(textoOriginal, resultado, funcion) {
  var textResultado = document.querySelector("#texto-resultado");
  var contentResultado = document.querySelector("#content-resultado");
  var tituloResultado = document.querySelector("#titulo-resultado");
  var tipoFuncion = document.querySelector("#tipoFuncion");

  tipoFuncion.textContent = `${funcion} es:`;
  contentResultado.className = "";
  tituloResultado.textContent = `"${textoOriginal}"`;
  textResultado.textContent = resultado;
}

function limpiarTextarea() {
  document.querySelector("#cadena").value = "";
}

const copiarContenido = async () => {
  let texto = document.getElementById("texto-resultado").innerHTML;
  try {
    await navigator.clipboard.writeText(texto);
    document.querySelector("#boton-copiar").className = "ocultar";
    document.querySelector("#aviso-copiado").className = "";
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
};
