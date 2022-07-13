let check = document.querySelector('.input-check');
let button = document.querySelector('#register');

check.addEventListener('click', () => {
  if (check.checked) {
    button.disabled = false;
  }
});

function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');
  loader.classList.remove('none');
  let farmname = document.getElementById('farmname').value;
  let amountneed = document.getElementById('amountneed').value;
  let duration = document.getElementById('duration').value;
  let returns = document.getElementById('returns').value;
  let invest = document.getElementById('invest').value;
  let fileupload = document.getElementById('fileupload').files[0];
  console.log(fileupload);
  let farmloc = document.getElementById('farmloc').value;
  let projectdesc = document.getElementById('projectdesc').value;

  let formData = new FormData();
  formData.append('name', farmname);
  formData.append('amountNeeded', amountneed);
  formData.append('durationOfInvestment', duration);
  formData.append('returnsOnInvestment', returns);
  formData.append('minimumInvestmentPerUnit', invest);
  formData.append('image', fileupload);
  formData.append('location', farmloc);
  formData.append('projectDescription', projectdesc);

  let error = document.querySelector('.error');

  error.textContent = '';
  const url = 'https://farmconnectng.herokuapp.com/api/v1/products';
  // const url = 'http://localhost:4000/api/v1/products';

  console.log(formData);
  let token = 'JWT ' + localStorage.getItem('farmconnectUser').toString();

  // create request object
  const request = new Request(url, {
    method: 'POST',
    withCredentials: true,
    body: formData,
    headers: new Headers({
      authorization: token,
    }),
  });

  // pass request object to `fetch()`
  fetch(request)
    .then((res) => res.json())
    .then((res) => {
      console.log(58, res);
      if (res.status === 'success') {
        window.location.href = '/pages/farmers/register-success.html';
      } else {
        console.log(res);
        loader.classList.add('none');
        error.classList.remove('none');
        error.textContent = res.data.error;
      }
    });
}

document.getElementById('productid').addEventListener('submit', postData);
