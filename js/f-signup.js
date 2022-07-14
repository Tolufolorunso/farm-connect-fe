function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');
  loader.classList.remove('none');
  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email1').value;
  let phone = document.getElementById('phone').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('confirmpassword').value;
  let error = document.querySelector('.error');

  error.textContent = '';

  // post body data
  const user = {
    name: fullname,
    email: email,
    password: password,
    passwordConfirm: passwordconfirm,
    phoneNumber: phone,
  };

  // create request object
  const request = new Request(`${APIUrl}/users/signup/farmer`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  // pass request object to `fetch()`
  fetch(request)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'success') {
        window.location.href = '/pages/farmers/apply-success.html';
      } else {
        loader.classList.add('none');
        error.classList.remove('none');
        res.error.map((item) => {
          let element = document.createElement('p');
          element.textContent = item.message;
          element.classList.add('error-item');
          error.appendChild(element);
        });
      }
    });
}

document.getElementById('fpost').addEventListener('submit', postData);
