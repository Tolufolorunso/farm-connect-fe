let APIUrl = `http://localhost:4000/api/v1`;
let imageUrl = 'http://localhost:4000/uploads';

// const APIUrl = `https://farmconnectng.herokuapp.com/api/v1`;
// let imageUrl = 'https://farmconnectng.herokuapp.com/uploads';

let logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  localStorage.removeItem('product');
  window.location.href = '../../index.html';
};

let snackbar = document.getElementById('snackbar');
let error = document.querySelector('.error');

const showSnackbar = (message, type = 'green') => {
  snackbar.classList.add('show');
  snackbar.textContent = message;
  snackbar.style.background = type;
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
};

const removeError = () => {
  error.classList.add('none');
  error.textContent = '';
};

const addError = () => {
  error.classList.remove('none');
};

const disabledBtn = () => {
  let submitBtn = document.querySelector('.submit-btn');
  submitBtn.setAttribute('disabled', true);
  submitBtn.style.backgroundColor = '#ccc';
  submitBtn.style.cursor = 'not-allowed';
};

const enabledBtn = () => {
  let submitBtn = document.querySelector('.submit-btn');
  submitBtn.setAttribute('disabled', false);
  submitBtn.style.backgroundColor = '#144a05';
  submitBtn.style.cursor = 'pointer';
};

const showAuthError = (message, duration = 3000) => {
  addError();
  error.textContent = '';
  error.classList.remove('none');
  error.textContent = message;

  setTimeout(() => {
    removeError();
  }, 3000);
};
