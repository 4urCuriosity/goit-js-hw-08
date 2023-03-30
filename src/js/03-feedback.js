import throttle from 'lodash.throttle';
import { saveToLocalStorage, loadFromLocalStorage } from './storage-service';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';

populateFormInputs();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.submitBtn.addEventListener('click', onSubmitBtnClick);

function onFormInput(e) {
  const inputName = e.target.name;
  const inputValue = e.target.value;
  const savedFormData = loadFromLocalStorage(LOCALSTORAGE_KEY) || {};

  savedFormData[inputName] = inputValue;

  saveToLocalStorage(LOCALSTORAGE_KEY, savedFormData);
}

function onSubmitBtnClick(e) {
  const errorSet = new Set();

  e.preventDefault();

  validateInputs(errorSet);

  if (errorSet.size === 0) {
    refs.form.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}

function validateInputs(errorSet) {
  emailValidate(errorSet);
  textareaValidate(errorSet);
}

function emailValidate(errorSet) {
  const emailValue = refs.emailInput.value.trim();

  if (emailValue === '') {
    refs.emailInput.classList.add('error');
    errorSet.add(refs.emailInput.name);
  } else if (!isEmail(emailValue)) {
    refs.emailInput.classList.add('error');
    errorSet.add(refs.emailInput.name);
  } else if (refs.emailInput.classList.value.includes('error')) {
    refs.emailInput.classList.remove('error');
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function textareaValidate(errorSet) {
  const textareaValue = refs.textarea.value.trim();

  if (textareaValue === '') {
    refs.textarea.classList.add('error');
    errorSet.add(refs.textarea.name);
  } else if (refs.textarea.classList.value.includes('error')) {
    refs.textarea.classList.remove('error');
  }
}

function populateFormInputs() {
  const localStorageFormData = loadFromLocalStorage(LOCALSTORAGE_KEY);
  if (localStorageFormData) {
    Object.entries(localStorageFormData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
