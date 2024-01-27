require('dotenv').config();
const axios = require('axios');
const { DOMParser } = require('xmldom');
const z = require('zod');

const envSchema = z.object({
  SVG_URL: z.string(),
  MAX_COUNT: z.string().refine((value) => +value),
});

async function run(url) {
  envSchema.parse(process.env);

  let currentValue = 0;
  while (currentValue < process.env.MAX_COUNT) {
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
