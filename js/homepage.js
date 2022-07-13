let ham = document.querySelector('.ham');
let nav = document.querySelector('.navbar');
let arrleft = document.querySelector('.arrow-left');
let arrright = document.querySelector('.arrow-right');
let track = 0;
let img = document.querySelector('.cauimg');
let name = document.querySelector('.dname');
let text = document.querySelector('.text');
let details = document.querySelector('.details');
let homedash = document.querySelector('.homedash');

const toogleHam = () => {
  if (nav.classList.contains('animation1')) {
    ham.classList.remove('ham', 'fa-times');
    ham.classList.add('ham', 'fa-bars');
    nav.classList.remove('animation1');
    nav.classList.add('animation2');
  } else {
    ham.classList.remove('ham', 'fa-bars');
    ham.classList.add('ham', 'fa-times');
    nav.classList.remove('animation2');
    nav.classList.add('animation1');
  }
};

const slidelist = [
  {
    image: '../img/avatar-ali.png',
    name: 'Ali bello',
    text: 'The idea behind FarmVestNg is quite good. It has the potential to create jobs for lots of people. It is very easy to do business with them because everything takes place online. I would recommend them to others.',
  },
  {
    image: '../img/avatar-anisha.png',
    name: 'Joshua Ade',
    text: 'I saw FarmVestNg on LinkedIn and visited the website. Chatted with a customer care representative and I got satisfactory answers to my questions. I am positively loving it and am rooting for them.',
  },
  {
    image: '../img/avatar-richard.png',
    name: 'Sola Bello',
    text: 'FarmvestNg is Awesome, please try it and you will never regret it.',
  },
];

const slidefun = () => {
  track++;
  if (track === slidelist.length) {
    track = 0;
  }
  const next = slidelist[track];
  img.src = next.image;
  name.textContent = next.name;
  text.textContent = next.text;
};

const slidefun2 = () => {
  track--;
  if (track === -1) {
    track = 2;
  }
  const next = slidelist[track];
  img.src = next.image;
  name.textContent = next.name;
  text.textContent = next.text;
};

const dashfunc = () => {
  let user = localStorage.getItem('farmdata');
  user = JSON.parse(user);
  if (user.role === 'farmer') {
    window.location.href = '/pages/farmers/f-dashboard.html';
  } else {
    window.location.href = '/pages/investors/i-dashboard.html';
  }
};

ham.addEventListener('click', toogleHam);
arrright.addEventListener('click', slidefun);
arrleft.addEventListener('click', slidefun2);
homedash.addEventListener('click', dashfunc);
