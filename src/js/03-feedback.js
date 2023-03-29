import throttle from 'lodash.throttle';
import { saveToLocalStorage, loadFromLocalStorage } from './storage-service';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const localStorageFormData = loadFromLocalStorage(LOCALSTORAGE_KEY);
let savedFormData = localStorageFormData || {};

populateFormInputs();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.submitBtn.addEventListener('click', throttle(onSubmitBtnClick, 500));

function onFormInput(e) {
  const inputName = e.target.name;
  const inputValue = e.target.value;

  savedFormData[inputName] = inputValue;

  saveToLocalStorage(LOCALSTORAGE_KEY, savedFormData);
}

function onSubmitBtnClick(e) {
  e.preventDefault();
  refs.form.reset();
  localStorage.clear();
  savedFormData = {};
}

function populateFormInputs() {
  if (localStorageFormData) {
    refs.emailInput.value = savedFormData.email || '';
    refs.textarea.value = savedFormData.message || '';
  }
}
