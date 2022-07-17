let userdata = JSON.parse(localStorage.getItem('userData'));
// let loader = document.querySelector('.loader');

document.getElementById('phone').value = userdata.phoneNumber;
document.getElementById('name').value = userdata.name;
document.getElementById('email1').value = userdata.email;
document.getElementById('gender').value = userdata.gender || '';
document.getElementById('state').value = userdata.state || '';
document.getElementById('fileupload').innerHTML = userdata.image || '';
let profileImg = userdata.image
  ? `${imageUrl}/${userdata.image}`
  : '../../img/profile-img.svg';

document.getElementById('profileImg').setAttribute('src', profileImg);

async function postData(event) {
  event.preventDefault();
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

  loader.classList.remove('none2');
  let token = 'JWT ' + localStorage.getItem('token');

  try {
    const response = await fetch(
      `${APIUrl}/users/profile/farmers/${userdata._id}`,
      {
        method: 'PATCH',
        withCredentials: true,
        body: formData,
        headers: new Headers({
          authorization: token,
        }),
      }
    );
    const updatedUser = await response.json();
    console.log(updatedUser);
    loader.classList.add('none2');
    if (updatedUser.status) {
      let user = updatedUser.data.farmer;
      let image = `${imageUrl}/${user.image}`;
      localStorage.setItem('userData', JSON.stringify(user));
      document.getElementById('profileImg').setAttribute('src', image);

      showSnackbar(updatedUser.message, 'green');
    } else {
      console.log(updatedUser.data.errorMessage);
      throw new Error(updatedUser.data.errorMessage);
    }
  } catch (error) {
    console.log(error);
    showSnackbar(error.message, 'red');
  }
}

document.getElementById('profileid').addEventListener('submit', postData);
