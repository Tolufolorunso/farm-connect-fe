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

  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email1').value;
  let phone = document.getElementById('phone').value;
  let password = document.getElementById('password').value;
  let passwordconfirm = document.getElementById('confirmpassword').value;
  let organization = document.getElementById('organization').value;
  let orgemail = document.getElementById('orgemail').value;
  let orgphone = document.getElementById('orgphone').value;
  let investfocus = document.getElementById('investfocus').value;

  if (!fullname || !email || !phone || !password || !investfocus) {
    showAuthError('All fields are required');
    return;
  }

  if (password !== passwordconfirm) {
    showAuthError('Password not matched');
    return;
  }

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

  loader.classList.remove('none');
  try {
    const response = await fetch(`${APIUrl}/users/signup/investor`, {
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

document.getElementById('ipost').addEventListener('submit', postData);
