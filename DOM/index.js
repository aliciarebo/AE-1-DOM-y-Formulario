window.onload = function () {
  let div = document.getElementById('container');
  createForm(div)
};


function createLabel(id) {
  let label = document.createElement('label');
  label.setAttribute('for', id);

  return label;
}

function createTextNode(text) {
  let textNode = document.createTextNode(text)
  return textNode;
}

function createInput(id, type, name, placeholder = '', accept = '') {
  let input = document.createElement('input');
  input.setAttribute('id', id);
  input.setAttribute('type', type);
  input.setAttribute('name', name);

  if (placeholder !== '') {
    input.setAttribute('placeholder', placeholder);
  }

  if (accept !== '') {
    input.setAttribute('accept', accept);
  }

  return input;
}

function createSelect(id, name) {
  let select = document.createElement('select');
  select.setAttribute('id', id);
  select.setAttribute('name', name);

  return select
}

function createSelectOption(value, text) {
  let option = document.createElement('option');
  option.setAttribute('value', value);
  option.appendChild(createTextNode(text))
  return option;
}

function createTextArea(id, name) {
  let textArea = document.createElement('textarea')
  textArea.setAttribute('id', id);
  textArea.setAttribute('name', name);

  return textArea;
}

function createLineBreak() {
  let br = document.createElement('br');
  return br;
}

function insertLinesBreak(form) {
  form.appendChild(createLineBreak());

  form.appendChild(createLineBreak());
}

function createForm(container) {
  // Creo el formulario
  let form = document.createElement('form');
  form.setAttribute('action', '/');

  //Inputs de tipo texto
  let textFields = ['Nombre', 'Apellidos', 'DNI', 'Dirección', 'Teléfono'];

  for (let index = 0; index < textFields.length; index++) {
    const element = textFields[index];
    form.appendChild(createInput(element, 'text', element, element));
    insertLinesBreak(form)
  }

  //Creación radiobutton
  form.appendChild(createTextNode('Selecciona el curso que le interesa:'))

  insertLinesBreak(form)

  let courses = ['Ciberseguridad', 'Big Data', 'Desarrollo Videojuegos', 'UX-UI']

  for (let index = 0; index < courses.length; index++) {
    form.appendChild(createInput(courses[index], 'radio', 'course'))
    form.appendChild(createLabel(courses[index]).appendChild(createTextNode(courses[index])))
    insertLinesBreak(form)
  }

  form.appendChild(createTextNode('Selecciona tu nivel de inglés:'))

  insertLinesBreak(form)

  let englishLevel = ['Bajo', 'Medio', 'Alto', 'Nativo'];

  for (let index = 0; index < englishLevel.length; index++) {
    form.appendChild(createInput(englishLevel[index], 'radio', 'englishLevel'))
    form.appendChild(createLabel(englishLevel[index]).appendChild(createTextNode(englishLevel[index])))
    insertLinesBreak(form)
  }

  //Creación checkbox
  form.appendChild(createTextNode('Selecciona los lenguajes de programación que conoce:'))

  insertLinesBreak(form)

  let progLanguages = ['Java', 'Javascript', 'HTML', 'CSS', 'C#']

  for (let index = 0; index < progLanguages.length; index++) {
    form.appendChild(createInput(progLanguages[index], 'checkbox', progLanguages[index]))
    form.appendChild(createLabel(progLanguages[index]).appendChild(createTextNode(progLanguages[index])))
    insertLinesBreak(form)
  }

  //Creación imágenes
  form.appendChild(createLabel('image').appendChild(createTextNode('Sube tu DNI (foto por delante y por detrás):')))
  insertLinesBreak(form)
  let images = ['Image 1', 'Image 2']

  for (let index = 0; index < 2; index++) {
    form.appendChild(createLabel(images[index]).appendChild(createTextNode(images[index])))
    form.appendChild(createInput(images[index], 'file', images[index], '', 'image/*'))
    insertLinesBreak(form)
  }

  // Creación Selector
  form.appendChild(createLabel('contact').appendChild(createTextNode('Selecciona la forma de contacto:')))
  insertLinesBreak(form)

  let options = ['Email', 'Teléfono']
  let select = createSelect('contact', 'contact');
  for (let index = 0; index < options.length; index++) {
    select.appendChild(createSelectOption(options[index], options[index]))
  }
  form.appendChild(select)
  insertLinesBreak(form)

  // Creación text area
  form.appendChild(createLabel('comments').appendChild(createTextNode('Observaciones')))
  insertLinesBreak(form)
  form.appendChild(createTextArea('comments', 'comments'))

  let submit = document.createElement('input')
  submit.setAttribute('type', 'submit')
  submit.setAttribute('value', 'Enviar')

  insertLinesBreak(form)

  form.appendChild(submit)

  container.appendChild(form);

}
