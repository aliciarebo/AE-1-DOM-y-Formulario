const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('.fcontrol input'); //Guardo todos los inputs del div fcontrol

//Expresiones regulares para validar los campos de tipo texto.
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{9}$/ // solo admite 9 numeros como en España.
}

let campos = {
  Nombre: false,
  Email: false,
  Telefono: false,
  Direccion: false
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "fname":
      validarCampo(expresiones.nombre, e.target, 'Nombre');
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'Email');
      break;
    case "telef":
      validarCampo(expresiones.telefono, e.target, 'Telefono');
      break;
    case "direccion":
      validarDireccion();
      break;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

const validarCampo = (epresion, input, campo) => {
  if (epresion.test(input.value)) {
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-error');
    document.getElementById(`grupo${campo}`).classList.add('fcontrol-sucess');
    document.querySelector(`#grupo${campo} i`).classList.add('fcontrol-sucess');
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-error');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo${campo}`).classList.add('fcontrol-error');
    document.getElementById(`grupo${campo}`).classList.remove('fcontrol-sucess');
    campos[campo] = false;

  }
}

const validarDireccion = () => {
  const inputDireccion = document.getElementById('direccion');
  if (inputDireccion.value == '') {
    document.getElementById("grupoDireccion").classList.add('fcontrol-error');
    document.getElementById("grupoDireccion").classList.remove('fcontrol-sucess');
    campos['Direccion'] = false;
  } else {
    document.getElementById("grupoDireccion").classList.add('fcontrol-sucess');
    document.getElementById("grupoDireccion").classList.remove('fcontrol-error');
    campos['Direccion'] = true;
  }
}

let radio = document.querySelectorAll('.fradio input');
let check = document.querySelectorAll('.fcheckbox input'); //Guardo todos los inputs del div fcheckbox
let precioBase; // Guarda cada uno de los diferentes precios de la pizza.
let radioValid = false;


//Cada vez que seleccionemos un extra se le añade +1 a la variable precioExtra
let selectedExtra = (e) => {
  let precioExtra = 0; //Guarda la cantidad de ingredientes seleccionados.

  let ingredientes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')); //Todos los inputs de tipo checkbox que están seleccionados.
  for (let i = 0; i < ingredientes.length; i++) { //Recorro todos los inputs de tipo checkbox
    precioExtra += 1; //Añaden +1 a la variable precioExtra.
  }

  return precioExtra;
}


let selectedPizza = (e) => {

  switch (e.target.value) { //El valor de cada radio button
    case "pequeña": //Si el valor es 'pequeña'.
      precioBase = 5; //El valor de la variable es 5.
      break;
    case "mediana":
      precioBase = 10;
      break;
    case "grande":
      precioBase = 15;
  }
}

const validateRadio = (e) => { //Validamos que deba haber una opcion marcada
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioValid = true;

      break;
    } else {
      radioValid = false;
      console.log(radioValid)
    }
  }

}


const validateChecks = () => { //Validamos que deba haber una opcion marcada
  let selected = document.querySelector('input[type=checkbox]:checked');
  if (!selected) {
    return false
  }

  return true
}


radio.forEach(radio => {
  radio.addEventListener('change', selectedPizza);
  radio.addEventListener('change', validateRadio);
})


//Funcion que devuelve un alert con el precio final de la pizza
function precioTotal(precioExtra, precioBase) {
  return swal('Enviado!', 'El precio final de la pizza es: ' + (precioBase + precioExtra) + '$', 'success');
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.Nombre && campos.Email && campos.Telefono && campos.Direccion && radioValid && validateChecks()) {
    precioTotal(selectedExtra(), precioBase);
  } else if (!radioValid) {
    swal('Debes elegir el tamaño de la pizza');
  } else if (!validateChecks()) {
    swal('Debes elegir al menos un ingrediente');
  } else {
    swal("Error", "Rellena todos los campos", "error");
  }
})
