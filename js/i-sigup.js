function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');

  loader.classList.remove('none');
  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email1').value;
  let phone = document.getElementById('phone').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('confirmpassword').value;
  let organization = document.getElementById('organization').value;
  let orgemail = document.getElementById('orgemail').value;
  let orgphone = document.getElementById('orgphone').value;
  let investfocus = document.getElementById('investfocus').value;

  let error = document.querySelector('.error');

  error.textContent = '';
  const url = 'https://farmconnectng.herokuapp.com/api/v1/user/signup/investor';
  // const url = 'http://localhost:4000/api/v1/users/signup/investor';

  // post body data
  const user = {
    name: fullname,
    email: email,
    password: password,
    passwordConfirm: passwordconfirm,
    phoneNumber: phone,
    organization: organization,
    businessEmail: orgemail,
    businessPhoneNumber: orgphone,
    investmentFocus: investfocus,
  };

  // create request object
  const request = new Request(url, {
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

document.getElementById('ipost').addEventListener('submit', postData);
