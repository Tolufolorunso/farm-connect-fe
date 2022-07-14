let userdata = JSON.parse(localStorage.getItem('userdata'));

document.getElementById('phone').value = userdata.farmer.phoneNumber;
document.getElementById('name').value = userdata.farmer.name;
document.getElementById('email1').value = userdata.farmer.email;
document.getElementById('gender').value = userdata.farmer.gender || '';
document.getElementById('state').value = userdata.farmer.state || '';
document.getElementById('fileupload').innerHTML = userdata.farmer.image || '';
// document
//   .getElementById('fileupload')
//   .setAttribute('value', userdata.farmer.image || '');
document
  .getElementById('profileImg')
  .setAttribute(
    'src',
    `${imageUrl}/${userdata.farmer.image}` || '../img/profile-img.svg'
  );

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
  const request = new Request(`${APIUrl}/users/profile/farmers/${id}`, {
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
        localStorage.setItem('userdata', JSON.stringify(res.data));
        window.location.href = '/pages/farmers/register-success.html';
      } else {
        loader.classList.add('none');
        error.classList.remove('none');
        error.textContent = res.data.error;
      }
    });
}

document.getElementById('profileid').addEventListener('submit', postData);
