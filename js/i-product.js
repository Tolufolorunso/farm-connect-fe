let logoutbutton = document.querySelector('.dashb');

let nav2 = document.querySelector('.navbar');
let ham2 = document.querySelector('.ham');
let main = document.querySelector('.main');
let profileName = document.querySelector('.profile-name');
let profileName1 = document.querySelector('.profile-name1');
let profileImage = document.querySelectorAll('.profile-img');
profileImage = Array.from(profileImage);
let featitems = document.querySelector('.feat-items');
let loader = document.querySelector('.loader');
loader.classList.remove('none2');

let slide2 = document.getElementById('side-slide');
let slideclose1 = document.querySelector('.side-close');

const sideBarOpen1 = () => {
  main.classList.remove('width1');
  document.getElementById('side-bar').classList.remove('anima2', 'move');
  document.getElementById('side-bar').classList.add('anima1');
  slide2.classList.add('none');
  main.classList.add('width2');
};

const sideBarClose1 = () => {
  main.classList.remove('width2');
  slide2.classList.remove('none');
  document.getElementById('side-bar').classList.remove('anima1');
  document.getElementById('side-bar').classList.add('anima2');
  main.classList.add('width1');
};

slide2.addEventListener('click', sideBarOpen1);
slideclose1.addEventListener('click', sideBarClose1);

const toogleHam2 = () => {
  if (nav2.classList.contains('animation4')) {
    ham2.classList.remove('ham', 'fa-times');
    ham2.classList.add('ham', 'fa-bars');
    nav2.classList.remove('animation4');
    nav2.classList.add('animation3');
  } else {
    ham2.classList.remove('ham', 'fa-bars');
    ham2.classList.add('ham', 'fa-times');
    nav2.classList.remove('animation3');
    nav2.classList.add('animation4');
  }
};

logoutbutton.addEventListener('click', logout);
ham2.addEventListener('click', toogleHam2);

(async function () {
  let user = JSON.parse(localStorage.getItem('userData'));
  let token = 'JWT ' + localStorage.getItem('token');

  profileName.textContent = user.name;
  profileName1.textContent = user.name;
  profileImage.map((item) => {
    item.src = `${imageUrl}/${user.image}`;
  });

  try {
    const response = await fetch(`${APIUrl}/products`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        authorization: token,
      },
    });

    if (response.status === 401 || response.statusText === 'unauthorized') {
      logout();
    }

    const result = await response.json();

    arr = result.data;
    loader.classList.add('none2');
    arr.map((item) => {
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
      productCard.setAttribute('data-mininvest', item.minimumInvestmentPerUnit);
      productCard.setAttribute('data-id', item._id);
      productCard.setAttribute('data-amountcollected', item.amountCollected);

      productCard.appendChild(image);
      productCard.appendChild(desc);
      featitems.appendChild(productCard);
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
  } catch (error) {
    console.log(error);
  }
})();
