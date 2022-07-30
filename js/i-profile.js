let user = JSON.parse(localStorage.getItem('userData'));
console.log(user);
let loader = document.querySelector('.loader');
let profileImage = document.querySelectorAll('.profile-img');
profileImage = Array.from(profileImage);

// profileName.textContent = user.name;
document.querySelector('.profile-name1').textContent = user.name;
let userImage = user.image
  ? `${imageUrl}/${user.image}`
  : '../../img/profile-img.svg';

profileImage.map((item) => {
  item.src = userImage;
});

document.getElementById('phone').value = user.phoneNumber;
document.getElementById('name').value = user.name;
document.getElementById('email1').value = user.email;
document.getElementById('gender').value = user.gender || '';
document.getElementById('state').value = user.state || '';

async function postData(event) {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let email = document.getElementById('email1').value;
  let gender = document.getElementById('gender').value;
  let state = document.getElementById('state').value;
  let fileupload = document.getElementById('fileupload').files[0];
  let formData = new FormData();

  loader.classList.remove('none2');

  formData.append('name', name);
  formData.append('email', email);
  formData.append('phoneNumber', phone);
  formData.append('gender', gender);
  formData.append('image', fileupload);
  formData.append('state', state);

  let token = 'JWT ' + localStorage.getItem('token');

  try {
    const response = await fetch(
      `${APIUrl}/users/profile/investor/${user._id}`,
      {
        method: 'PATCH',
        withCredentials: true,
        body: formData,
        headers: new Headers({
          authorization: token,
        }),
      }
    );
    if (response.status === 401 || response.statusText === 'unauthorized') {
      logout();
    }

    const investor = await response.json();
    loader.classList.add('none2');
    console.log(investor);

    if (investor.status) {
      let user = investor.data.investor;
      let image = `${imageUrl}/${user.image}`;
      localStorage.setItem('userData', JSON.stringify(user));
      profileImage.map((item) => {
        item.src = image;
      });
      showSnackbar(investor.message, 'green');
    } else {
      throw new Error(investor.data.errorMessage);
    }
  } catch (error) {
    console.log(error);
    showSnackbar(error.message, 'red');
  }
}

document.getElementById('profileid').addEventListener('submit', postData);

// let logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userData');
//   localStorage.removeItem('product');
//   window.location.href = '../../index.html';
// };

document.querySelector('.dashb').addEventListener('click', logout);
