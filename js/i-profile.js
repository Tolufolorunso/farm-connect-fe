let user = JSON.parse(localStorage.getItem('userdata'));

document.getElementById('phone').value = user.phoneNumber;
document.getElementById('name').value = user.name;
document.getElementById('email1').value = user.email;
document.getElementById('gender').value = user.gender || '';
document.getElementById('state').value = user.state || '';

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
  let id = user._id;

  error.textContent = '';

  let token = 'JWT ' + localStorage.getItem('farmconnectUser').toString();

  // create request object
  const request = new Request(`${APIUrl}/users/profile/investor/${id}`, {
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
      if (res.status) {
        localStorage.setItem('userdata', JSON.stringify(res.data.investor));
        window.location.href = '/pages/farmers/register-success.html';
      } else {
        loader.classList.add('none');
        error.classList.remove('none');
        error.textContent = res.data.error;
      }
    });
}

document.getElementById('profileid').addEventListener('submit', postData);

let logout = () => {
  localStorage.removeItem('farmconnectUser');
  localStorage.removeItem('farmdata');
  localStorage.removeItem('userdata');
  window.location.href = '../../index.html';
};

document.querySelector('.dashb').addEventListener('click', logout);
