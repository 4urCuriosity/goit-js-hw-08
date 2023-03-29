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
refs.submitBtn.addEventListener('click', throttle(onSubmitBtnClick, 500));

function onFormInput(e) {
  const inputName = e.target.name;
  const inputValue = e.target.value;
  const savedFormData = loadFromLocalStorage(LOCALSTORAGE_KEY) || {};

  savedFormData[inputName] = inputValue;

  saveToLocalStorage(LOCALSTORAGE_KEY, savedFormData);
}

function onSubmitBtnClick(e) {
  e.preventDefault();
  refs.form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function populateFormInputs() {
  const localStorageFormData = loadFromLocalStorage(LOCALSTORAGE_KEY);
  if (localStorageFormData) {
    Object.entries(localStorageFormData).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
