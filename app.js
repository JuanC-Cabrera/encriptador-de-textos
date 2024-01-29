//Variable para obtener todo lo relacionado con la etiqueta <textarea>
const cadena = document.getElementById("cadena");
//Se valida en tiempo real el evento de precionar una tecla esta informacion se almacena en la variable 'e'
cadena.addEventListener("keydown", (e) => {
  //La variable caracterValido limita los caracteres que son admitidos a las letras de la 'a' a la 'z'
  const caracterValido = /[a-z]/;
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
