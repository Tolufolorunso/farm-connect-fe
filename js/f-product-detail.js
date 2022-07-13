// let imageUrl = 'http://localhost:4000/uploads';
// let imageUrl = 'https://farmconnectng.herokuapp.com/uploads';
(function () {
  let pfund;
  let producttext = document.querySelectorAll('.name');
  producttext = Array.from(producttext);
  let location = document.querySelectorAll('.rlocation');
  location = Array.from(location);
  let amount = document.querySelectorAll('.amount');
  amount = Array.from(amount);
  let fund = document.querySelectorAll('.fund');
  fund = Array.from(fund);
  let return1 = document.querySelectorAll('.return1');
  return1 = Array.from(return1);
  let duration = document.querySelectorAll('.duration');
  duration = Array.from(duration);
  let funddetail = document.querySelectorAll('.fund-detail');
  funddetail = Array.from(funddetail);
  let text = document.querySelectorAll('.text');
  text = Array.from(text);
  let img = document.querySelectorAll('.imgd');
  img = Array.from(img);
  let mininvest = document.querySelector('.mininvest');
  console.log(mininvest);

  let product = JSON.parse(localStorage.getItem('product'));
  if (product.amountcollected) {
    pfund = (product.amount / product.amountcollected) * 100;
  } else {
    pfund = 0;
  }
  console.log('pr', product);
  producttext.map((item) => {
    item.textContent = product.name;
  });
  location.map((item) => {
    item.textContent = product.location;
  });
  amount.map((item) => {
    item.innerHTML = `<span>&#8358;${product.amount}</span>`;
  });
  return1.map((item) => {
    item.innerHTML = `<span>${product.returns}%</span>`;
  });
  duration.map((item) => {
    item.innerHTML = `<span>${product.duration} Months</span>`;
  });
  fund.map((item) => {
    item.innerHTML = `<span>${pfund}% funded</span>`;
  });
  text.map((item) => {
    item.textContent = product.desc;
  });
  img.map((item) => {
    item.src = `${imageUrl}/${product.image}`;
  });
  mininvest.innerHTML = `<span>&#8358;${product.minvest}</span>`;
})();
