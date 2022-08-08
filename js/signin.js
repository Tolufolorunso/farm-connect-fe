let loader = document.querySelector('.loader');
let localUser = localStorage.getItem('userData');
if (localUser) {
  let user = JSON.parse(localUser);
  if (user.role === 'farmer') {
    window.location.href = '/pages/farmers/f-dashboard.html';
  } else {
    window.location.href = '/pages/investors/i-dashboard.html';
  }
}

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

  // disabledBtn();

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
    console.log(res.user);
    if (res.status) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userData', JSON.stringify(res.user));
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
    showAuthError(err.message);
  }
}

document.getElementById('flogin').addEventListener('submit', postData);
