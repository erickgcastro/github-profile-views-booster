require('dotenv').config();
const axios = require('axios');
const { DOMParser } = require('xmldom');

async function run(url) {
  let currentValue = 0;
  while (currentValue < 920463) {
    const { data } = await axios.get(url);

    var parser = new DOMParser();
    var svgDoc = parser.parseFromString(data, 'image/svg+xml');
    const tspans = svgDoc.getElementsByTagName('tspan');

    let value = '';
    for (let i = 0; i < tspans.length; i++) {
      value += tspans[i].textContent + ' ';
    }

    currentValue = Number(value.replace(/ /gi, '').trim());

    console.log(value);
  }
}

run(process.env.SVG_URL);
