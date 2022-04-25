'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then(response => response.text())
    .then(data => {
      document.querySelector('#fortune-text').innerText = data;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({zipcode: zipcode}).toString();
  const url = `/weather.json?${queryString}`;

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(url)
    .then(response => response.json())
    .then(jsonData => {
      console.log('jsonData: ', jsonData);
      document.querySelector('#weather-info').innerHTML = jsonData.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  }

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      //show result message text in #order-status
      let orderStatus = document.querySelector('#order-status')
      orderStatus.innerHTML = responseJson.msg;
      //if order status is error
      if (responseJson.code === 'ERROR') {
        //make message red
        orderStatus.classList.add('order-error');      
      }

    });

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
