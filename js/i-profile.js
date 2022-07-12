let userdata = JSON.parse(localStorage.getItem('userdata'));
let data = userdata.data;
console.log(data);
document.getElementById('phone').value = data.investor.phoneNumber;
document.getElementById('name').value = data.investor.name;
document.getElementById('email1').value = data.investor.email;
document.getElementById('gender').value = data.investor.gender || '';
document.getElementById('state').value = data.investor.state || '';

function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');
  loader.classList.remove('none2');
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email1').value;
  let gender = document.getElementById('gender').value;
  let state = document.getElementById('state').value;
  let fileupload = document.getElementById('fileupload').files[0];

  let formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phoneNumber', phone);
  formData.append('gender', gender);
  formData.append('image', fileupload);
  formData.append('state', state);

  let error = document.querySelector('.error');
  let user = JSON.parse(localStorage.getItem('farmdata'));
  let id = user.id;

  error.textContent = '';
  const url = `https://farmconnectng.herokuapp.com/api/v1/user/profile/investor/${id}`;

  let token = 'JWT ' + localStorage.getItem('farmconnectUser').toString();

  // create request object
  const request = new Request(url, {
    method: 'PATCH',
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
      if (res.status === 'success') {
        localStorage.setItem('userdata', JSON.stringify(res));
        window.location.href = '/pages/farmers/register-success.html';
      } else {
        console.log(res);
        loader.classList.add('none');
        error.classList.remove('none');
        error.textContent = res.data.error;
      }
    });
}

document.getElementById('profileid').addEventListener('submit', postData);
