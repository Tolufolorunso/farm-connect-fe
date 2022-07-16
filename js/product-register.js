let check = document.querySelector('.input-check');
let button = document.querySelector('#register');

button.style.backgroundColor = '#ccc';
button.style.cursor = 'not-allowed';
let isChecked = false;

check.addEventListener('click', () => {
  isChecked = check.checked;

  if (isChecked) {
    button.style.backgroundColor = '';
    button.style.cursor = 'pointer';
  } else {
    button.style.backgroundColor = '#ccc';
    button.style.cursor = 'not-allowed';
  }
});

let loader = document.querySelector('.loader');

async function postData(event) {
  event.preventDefault();

  if (isChecked) {
    let farmname = document.getElementById('farmname').value;
    let amountneed = document.getElementById('amountneed').value;
    let duration = document.getElementById('duration').value;
    let returns = document.getElementById('returns').value;
    let invest = document.getElementById('invest').value;
    let fileupload = document.getElementById('fileupload').files[0];

    let farmloc = document.getElementById('farmloc').value;
    let projectdesc = document.getElementById('projectdesc').value;

    let formData = new FormData();
    formData.append('name', farmname);
    formData.append('amountNeeded', amountneed);
    formData.append('durationOfInvestment', duration);
    formData.append('returnsOnInvestment', returns);
    formData.append('minimumInvestmentPerUnit', invest);
    formData.append('image', fileupload);
    formData.append('location', farmloc);
    formData.append('projectDescription', projectdesc);

    let token = 'JWT ' + localStorage.getItem('token');

    loader.classList.remove('none');

    try {
      const response = await fetch(`${APIUrl}/products`, {
        method: 'POST',
        withCredentials: true,
        body: formData,
        headers: new Headers({
          authorization: token,
        }),
      });
      const result = await response.json();
      loader.classList.add('none');

      if (result.status) {
        document.getElementById('farmname').value = '';
        document.getElementById('amountneed').value = '';
        document.getElementById('duration').value = '';
        document.getElementById('returns').value = '';
        document.getElementById('invest').value = '';
        document.getElementById('fileupload').value = '';
        document.getElementById('farmloc').value = '';
        document.getElementById('projectdesc').value = '';
        showSnackbar(result.message);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      showAuthError(error.message, 5000);
    }
  } else {
    button.style.backgroundColor = '#ccc';
  }
}

document.getElementById('productid').addEventListener('submit', postData);
