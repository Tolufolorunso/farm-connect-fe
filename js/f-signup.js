let loader = document.querySelector('.loader');

async function postData(event) {
  event.preventDefault();

  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email1').value;
  let phone = document.getElementById('phone').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('confirmpassword').value;

  if (!fullname || !email || !phone || !password) {
    showAuthError('All fields are required');
    return;
  }

  if (password !== passwordconfirm) {
    showAuthError('Password not matched');
    return;
  }

  loader.classList.remove('none');

  // post body data
  const user = {
    name: fullname,
    email: email,
    password: password,
    passwordConfirm: passwordconfirm,
    phoneNumber: phone,
  };

  try {
    const response = await fetch(`${APIUrl}/users/signup/farmer`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    const newUser = await response.json();
    if (newUser.status) {
      showSnackbar(newUser.message, 'green');
      loader.classList.add('none');
      setTimeout(() => {
        window.location.href = '/pages/sign-in.html';
      }, 3000);
    } else {
      loader.classList.add('none');
      if (newUser.message === 'This email already exists') {
        throw new Error(newUser.message);
      }

      let div = document.createElement('div');

      newUser.data.error.split(',').forEach((item) => {
        let i = item.split(':');
        let p = document.createElement('p');
        if (i[0].includes('validation')) {
          p.textContent = i[2].trim();
        } else {
          p.textContent = i[1].trim();
        }
        div.appendChild(p);
      });
      addError();
      error.appendChild(div);
      setTimeout(() => {
        removeError();
      }, 3000);
    }
  } catch (error) {
    loader.classList.add('none');
    showAuthError(error.message);
  }
}

document.getElementById('fpost').addEventListener('submit', postData);
