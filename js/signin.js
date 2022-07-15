let loader = document.querySelector('.loader');

async function postData(event) {
  event.preventDefault();
  error.textContent = '';

  let email = document.getElementById('email2').value;
  let password = document.getElementById('password1').value;

  if (!email || !password) {
    error.classList.remove('none');
    error.textContent = 'All fields are required';
    return;
  }

  loader.classList.remove('none');

  // post body data
  const user = { email, password };

  try {
    const resp = await fetch(`${APIUrl}/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const res = await resp.json();

    if (res.status) {
      localStorage.setItem('farmconnectUser', res.token);
      localStorage.setItem('farmdata', JSON.stringify(res.user));
      loader.classList.add('none');
      showSnackbar(res.message, 'green');

      setTimeout(() => {
        if (res.user.role === 'investor') {
          window.location.href = '/pages/investors/i-dashboard.html';
        } else if (res.user.role === 'farmer') {
          window.location.href = '/pages/farmers/f-dashboard.html';
        }
      }, 3000);
    } else {
      loader.classList.add('none');
      throw new Error(res.data.error);
    }
  } catch (err) {
    let element = document.createElement('p');
    element.textContent = err.message;
    element.classList.add('error-item');
    error.appendChild(element);
    setTimeout(() => {
      removeError();
    }, 3000);
  }
}

document.getElementById('flogin').addEventListener('submit', postData);
