async function postData(event) {
  event.preventDefault();

  let loader = document.querySelector('.loader');
  loader.classList.remove('none');

  let email = document.getElementById('email2').value;
  let password = document.getElementById('password1').value;
  let error = document.querySelector('.error');

  error.textContent = '';
  // const url = 'http://localhost:4000/api/v1/users/login';
  const url = 'https://farmconnectng.herokuapp.com/api/v1/users/login';

  // post body data
  const user = {
    email: email,
    password: password,
  };

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!resp.ok) {
      const msg = `There was an error "${resp.status} ${resp.statusText}"`;
      throw new Error(msg);
    }

    const res = await resp.json();

    if (res.status === 'success') {
      localStorage.setItem('farmconnectUser', res.token);
      localStorage.setItem('farmdata', JSON.stringify(res.user));
      if (res.user.role === 'investor') {
        window.location.href = '/pages/investors/i-dashboard.html';
      } else if (res.user.role === 'farmer') {
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
  } catch (err) {
    // console.log(err);
    // console.log(60, err.message);
    let element = document.createElement('p');
    element.textContent = err.message;
    element.classList.add('error-item');
    error.appendChild(element);
  }
}

document.getElementById('flogin').addEventListener('submit', postData);
