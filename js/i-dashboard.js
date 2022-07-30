let logoutbutton = document.querySelector('.dashb');

let nav3 = document.querySelector('.navbar');
let ham3 = document.querySelector('.ham');
let slide1 = document.getElementById('side-slide');
let slideclose = document.querySelector('.side-close');
let products = document.querySelectorAll('.products-card');
products = Array.from(products);
let main = document.querySelector('.main');
let profileName = document.querySelector('.profile-name');
let profileName1 = document.querySelector('.profile-name1');
let profileImage = document.querySelectorAll('.profile-img');
profileImage = Array.from(profileImage);

let featitems = document.querySelector('.feat-items');
let loader = document.querySelector('.loader');

let slide3 = document.getElementById('side-slide');
let slideclose3 = document.querySelector('.side-close');

const sideBarOpen1 = () => {
  main.classList.remove('width1');
  document.getElementById('side-bar').classList.remove('anima2', 'move');
  document.getElementById('side-bar').classList.add('anima1');
  slide3.classList.add('none');
  main.classList.add('width2');
};

const sideBarClose1 = () => {
  main.classList.remove('width2');
  slide3.classList.remove('none');
  document.getElementById('side-bar').classList.remove('anima1');
  document.getElementById('side-bar').classList.add('anima2');
  main.classList.add('width1');
};

slide3.addEventListener('click', sideBarOpen1);
slideclose3.addEventListener('click', sideBarClose1);

const toogleHam3 = () => {
  if (nav3.classList.contains('animation4')) {
    ham3.classList.remove('ham', 'fa-times');
    ham3.classList.add('ham', 'fa-bars');
    nav3.classList.remove('animation4');
    nav3.classList.add('animation3');
  } else {
    ham3.classList.remove('ham', 'fa-bars');
    ham3.classList.add('ham', 'fa-times');
    nav3.classList.remove('animation3');
    nav3.classList.add('animation4');
  }
};

// let logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userData');
//   localStorage.removeItem('product');
//   window.location.href = '../../index.html';
// };

let productfunc = () => {
  window.location.href = '../investors/i-product-detail.html';
};

ham3.addEventListener('click', toogleHam3);
logoutbutton.addEventListener('click', logout);
products.map((item) => {
  item.addEventListener('click', productfunc);
});

(async function () {
  let user = JSON.parse(localStorage.getItem('userData'));
  let token = 'JWT ' + localStorage.getItem('token').toString();

  profileName.textContent = user.name;
  profileName1.textContent = user.name;
  let userImage = user.image
    ? `${imageUrl}/${user.image}`
    : '../../img/profile-img.svg';

  profileImage.map((item) => {
    item.src = userImage;
  });

  try {
    const response = await fetch(`${APIUrl}/users/investors/${user._id}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    if (response.status === 401 || response.statusText === 'unauthorized') {
      logout();
    }

    const userData = await response.json();

    if (userData.status) {
      let user = userData.data.investor;
      localStorage.setItem('userData', JSON.stringify(user));
      profileName.textContent = user.name;
      profileName1.textContent = user.name;
      let userImage = user.image
        ? `${imageUrl}/${user.image}`
        : '../../img/profile-img.svg';

      profileImage.map((item) => {
        item.src = userImage;
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    console.log(error);
    showSnackbar(error.message);
  }

  fetch(`${APIUrl}/products/`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401 || response.statusText === 'unauthorized') {
        logout();
      }
      return response.json();
    })
    .then((allProducts) => {
      console.log(allProducts);
      let productsArr = allProducts.data.filter((prod) => {
        return prod.featured;
      });

      if (loader) {
        loader.classList.add('none2');
      }

      productsArr.map((item) => {
        let productCard = document.createElement('div');
        productCard.classList.add('products-card');
        let image = document.createElement('img');
        image.src = `${imageUrl}/${item.image}`;

        let desc = document.createElement('div');
        desc.classList.add('desc');
        let h6 = document.createElement('h6');
        h6.textContent = item.name;
        h6.classList.add('product-text');
        let h62 = document.createElement('h6');
        h62.classList.add('amount');
        h62.innerHTML = `<span>&#8358;${item.amountNeeded}</span>`;
        desc.appendChild(h6);
        desc.appendChild(h62);

        productCard.setAttribute('data-name', item.name);
        productCard.setAttribute('data-image', item.image);
        productCard.setAttribute('data-amount', item.amountNeeded);
        productCard.setAttribute('data-duration', item.durationOfInvestment);
        productCard.setAttribute('data-returns', item.returnsOnInvestment);
        productCard.setAttribute('data-investors', item.investors);
        productCard.setAttribute('data-desc', item.projectDescription);
        productCard.setAttribute('data-location', item.location);
        productCard.setAttribute(
          'data-mininvest',
          item.minimumInvestmentPerUnit
        );
        productCard.setAttribute('data-id', item._id);
        productCard.setAttribute('data-amountcollected', item.amountCollected);

        productCard.appendChild(image);

        productCard.appendChild(desc);

        if (featitems) {
          featitems.appendChild(productCard);
        }
      });

      let products = document.querySelectorAll('.products-card');
      products = Array.from(products);

      let productfunc = (item) => {
        localStorage.removeItem('product');
        let data = {
          name: item.dataset.name,
          image: item.dataset.image,
          amount: item.dataset.amount,
          duration: item.dataset.duration,
          returns: item.dataset.returns,
          investors: item.dataset.investors,
          desc: item.dataset.desc,
          location: item.dataset.location,
          minvest: item.dataset.mininvest,
          id: item.dataset.id,
          amountCollected: item.dataset.amountcollected,
        };

        localStorage.setItem('product', JSON.stringify(data));
        window.location.href = '../investors/i-product-detail.html';
      };

      products.map((item) => {
        item.addEventListener('click', () => productfunc(item));
      });
    })
    .catch((err) => {
      console.log(err);
      loader.classList.add('none2');
    });
})();
