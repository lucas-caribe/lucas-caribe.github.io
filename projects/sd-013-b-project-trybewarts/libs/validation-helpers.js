function getSelectedRadioInput(inputs) {
  let selectedInput = '';

  inputs.forEach((input) => {
    if (input.checked) {
      selectedInput = input.value;
      return null;
    }
  });

  return selectedInput;
}

// salvando informações do formulário
function getName(inputId) {
  const nameInput = document.querySelector(inputId);

  if (!nameInput) return null;

  const name = nameInput.value.trim();

  if (!name.length) {
    throw new Error('Erro! Nome inválido');
  }

  return name;
}

function getEmail() {
  const emailInput = document.querySelector('#input-email');

  if (!emailInput) return null;

  const email = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(emailPattern)) {
    throw new Error('Erro! Email inválido');
  }

  return email;
}

function getSelectedHouse() {
  const houseSelect = document.querySelector('#house');

  if (!houseSelect) return null;

  if (!houseSelect.selectedIndex) {
    throw new Error('Erro! Selecione uma casa');
  }

  return houseSelect.options[houseSelect.selectedIndex].innerText;
}

function getSelectedFamily() {
  const familyInputs = document.querySelectorAll('input[name="family"]');

  if (!familyInputs.length) return null;

  const selectedInput = getSelectedRadioInput(familyInputs);

  if (selectedInput === '') {
    throw new Error('Erro! Selecione uma família');
  }

  return selectedInput;
}

function getSelectedContent() {
  const contentInputs = document.querySelectorAll('input[name="content"]');

  if (!contentInputs.length) return null;

  const selectedInputs = [];

  contentInputs.forEach((input) => {
    if (input.checked) {
      selectedInputs.push(input.value);
    }
  });

  if (!selectedInputs.length) {
    throw new Error('Erro! Selecione ao menos um conteúdo');
  }

  return selectedInputs;
}

function getRating() {
  const ratingInputs = document.querySelectorAll('input[name="rate"]');

  if (!ratingInputs.length) return null;

  const selectedInput = getSelectedRadioInput(ratingInputs);

  if (selectedInput === '') {
    throw new Error('Erro! Dê uma nota de avaliação');
  }

  return selectedInput;
}

function getComment() {
  const textArea = document.querySelector('textarea');

  if (!textArea) return null;

  const text = textArea.value.trim();

  // if (!text.length) {
  //   throw new Error('Erro! Escreva um comentário');
  // }

  return text;
}

getName();
getEmail();
getSelectedHouse();
getSelectedFamily();
getSelectedContent();
getRating();
getComment();
