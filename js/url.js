// let APIUrl = `http://localhost:4000/api/v1`;
// let imageUrl = 'http://localhost:4000/uploads';

const APIUrl = `https://farmconnectng.herokuapp.com/api/v1`;
let imageUrl = 'https://farmconnectng.herokuapp.com/uploads';

// let logout = () => {
//   localStorage.removeItem('farmvestUser');
//   localStorage.removeItem('farmdata');
//   localStorage.removeItem('userdata');
//   localStorage.removeItem('product');
//   window.location.href = '/';
// };

let snackbar = document.getElementById('snackbar');
let error = document.querySelector('.error');

const showSnackbar = (message, type) => {
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

const showAuthError = (message) => {
  addError();
  error.textContent = '';
  error.classList.remove('none');
  error.textContent = message;

  setTimeout(() => {
    removeError();
  }, 3000);
};
