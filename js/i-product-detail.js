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
  // console.log(mininvest);

  let product = JSON.parse(localStorage.getItem('product'));
  // console.log(product);
  // console.log(product.amountCollected);
  // console.log(product.amount);
  // console.log(product.amountCollected / product.amount);

  if (product.amountCollected > 0) {
    pfund = (product.amountCollected / product.amount) * 100;
  } else {
    pfund = 0;
  }

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

let funddetail = document.querySelectorAll('.fund-detail');
funddetail = Array.from(funddetail);
let product = JSON.parse(localStorage.getItem('product'));
let data = JSON.parse(localStorage.getItem('userData'));
let mim = product.minvest;
let token = 'JWT ' + localStorage.getItem('token');
let invest = document.querySelector('.now');
let invest1 = document.getElementById('invest1');

let amountcollected = product.amountCollected;
funddetail.map((newitem) => {
  if (product.amount === product.amountCollected) {
    newitem.textContent = 'Funded';
    invest.disabled = true;
  }
});

function payWithPaystack() {
  console.log('hello');
  let unit = document.getElementById('unit').value;
  let amount = parseFloat(unit) * parseFloat(mim);
  let error = document.querySelector('.error');
  checkamount = parseFloat(amount) + parseFloat(amountcollected);
  if (checkamount > parseFloat(product.amount)) {
    error.classList.remove('none');
    error.textContent =
      'Reduce your unit to be able to buy part of this product';
    return;
  }
  let payamount = amount * 100;
  var handler = PaystackPop.setup({
    key: 'pk_test_ab5e989518814ccdaebff2ebda9a81462de717e7',
    email: data.email,
    amount: payamount,
    currency: 'NGN',
    ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
      custom_fields: [
        {
          display_name: 'Mobile Number',
          variable_name: 'mobile_number',
          value: data.phoneNumber,
        },
      ],
    },
    callback: function (response) {
      // post body data
      const investment = {
        investor: data._id,
        name: product.name,
        returns: product.returns,
        duration: product.duration,
        product: product.id,
        amountInvested: amount,
        ref: response.reference,
      };

      console.log(response);
      console.log(investment);
      console.log(data);

      // create request object
      const request = new Request(`${APIUrl}/investment`, {
        method: 'POST',
        body: JSON.stringify(investment),
        withCredentials: true,
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      });

      // pass request object to `fetch()`
      fetch(request)
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            window.location.href = '/pages/farmers/register-success.html';
          } else {
            loader.classList.add('none');
            error.classList.remove('none');
          }
        });
    },
    onClose: function () {
      alert('window closed');
    },
  });
  handler.openIframe();
}

invest1.addEventListener('click', payWithPaystack);
