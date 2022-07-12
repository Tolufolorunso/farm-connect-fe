function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');
  loader.classList.remove('none');

  let email = document.getElementById('email2').value;
  let password = document.getElementById('password1').value;
  let error = document.querySelector('.error');

  error.textContent = '';
  // const url = 'https://localhost:4000/api/v1/users/login';
  const url = 'https://farmconnectng.herokuapp.com/api/v1/users/login';

  // post body data
  const user = {
    email: email,
    password: password,
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
      console.log(34, res);
      if (res.status === 'success') {
        localStorage.setItem('farmconnectUser', res.token);
        localStorage.setItem('farmdata', JSON.stringify(res.data));
        if (res.data.role === 'investor') {
          window.location.href = '/pages/investors/i-dashboard.html';
        } else if (res.data.role === 'farmer') {
          window.location.href = '/pages/farmers/f-dashboard.html';
        }
      } else {
        if (res.data) {
          loader.classList.add('none');
          error.classList.remove('none');
          error.textContent = res.data.error;
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
      }
    })
    .catch((err) => {
      console.log(60, err);
      let element = document.createElement('p');
      element.textContent = err.message;
      element.classList.add('error-item');
      error.appendChild(element);
    });
}

document.getElementById('flogin').addEventListener('submit', postData);
