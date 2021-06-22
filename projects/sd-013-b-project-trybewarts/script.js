const maxTextLength = 500;

// validação de login
function addLoginButtonEventListener() {
  const loginButton = document.getElementById('login-button');

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const login = document.querySelector('#login-input').value;
    const senha = document.querySelector('#password-input').value;

    if (login !== 'tryber@teste.com' || senha !== '123456') {
      alert('Login ou senha inválidos.');
    } else {
      alert('Olá, Tryber!');
    }
  });
}

// habilitando e desabilitando botão de submit
function addAgreementCheckboxEventListener() {
  const agreementCheckbox = document.querySelector('#agreement');

  agreementCheckbox.addEventListener('change', (event) => {
    const submitButton = document.querySelector('#submit-btn');

    submitButton.disabled = !event.target.checked;
  });
}

// contador de caracteres
function addTextAreaEventListener() {
  const textarea = document.querySelector('textarea');
  const counter = document.querySelector('#counter');

  counter.innerText = maxTextLength - textarea.value.length;

  textarea.addEventListener('keyup', (event) => {
    counter.innerText = maxTextLength - event.target.value.length;
  });
}

// salvando dados do formulario
function getFormData() {
  return {
    name: window.getName('#input-name'),
    lastName: window.getName('#input-lastname'),
    email: window.getEmail(),
    house: window.getSelectedHouse(),
    family: window.getSelectedFamily(),
    content: window.getSelectedContent(),
    rating: window.getRating(),
    comment: window.getComment(),
  };
}

function createUserDataElement(elementName, text) {
  const element = document.createElement('p');
  element.innerText = `${elementName}: ${text}`;

  return element;
}

// mostrando os dados salvos na tela
function setResponse(formData) {
  const form = document.querySelector('#evaluation-form');
  form.innerHTML = '';

  const fullName = `${formData.name} ${formData.lastName}`;
  const content = formData.content.join(', ');

  form.appendChild(createUserDataElement('Nome', fullName));
  form.appendChild(createUserDataElement('Email', formData.email));
  form.appendChild(createUserDataElement('Casa', formData.house));
  form.appendChild(createUserDataElement('Família', formData.family));
  form.appendChild(createUserDataElement('Matérias', content));
  form.appendChild(createUserDataElement('Avaliação', formData.rating));
  form.appendChild(createUserDataElement('Observações', formData.comment));
}

function createInputWithLabel({ type, name, id, className, labelText }) {
  const label = document.createElement('label');
  label.for = id;

  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = id;
  input.className = className;
  input.value = labelText;

  label.appendChild(input);
  label.innerHTML += labelText;

  return label;
}

// criando familias dinamicamente
function createFamilyInputs(familyArray) {
  const familySection = document.querySelector('.family-section');

  familyArray.forEach((family) => {
    const label = createInputWithLabel({
      type: 'radio',
      name: 'family',
      id: family.toLowerCase(),
      className: '',
      labelText: family,
    });

    familySection.appendChild(label);
  });
}

// criando conteúdos dinamicamente
function createContentInputs(contentArray) {
  const checkboxSection = document.querySelector('.checkbox-section');

  contentArray.forEach((content) => {
    const label = createInputWithLabel({
      type: 'checkbox',
      name: 'content',
      id: content.toLowerCase(),
      className: 'subject',
      labelText: content,
    });

    checkboxSection.appendChild(label);
  });
}

// criando itens de avaliação dinamicamente
function createRatingInputs() {
  const feedbackSection = document.querySelector('.feedback-section');

  for (let i = 1; i < 11; i += 1) {
    const label = createInputWithLabel({
      type: 'radio',
      name: 'rate',
      id: i,
      className: '',
      labelText: i,
    });

    feedbackSection.appendChild(label);
  }
}

function addSubmitButtonEventListener() {
  const submitButton = document.querySelector('#submit-btn');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    try {
      const formData = getFormData();

      setResponse(formData);
    } catch (error) {
      alert(error.message);
    }
  });
}

window.onload = () => {
  const familyArray = ['Frontend', 'Backend', 'FullStack'];
  const contentArray = ['HoFs', 'Jest', 'Promises', 'React', 'SQL', 'Python'];

  createFamilyInputs(familyArray);
  createContentInputs(contentArray);
  createRatingInputs();
  addLoginButtonEventListener();
  addAgreementCheckboxEventListener();
  addTextAreaEventListener();
  addSubmitButtonEventListener();
};
