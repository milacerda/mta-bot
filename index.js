const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('node-cron');
const rp = require('request-promise');
const moment = require('moment');
const tz = require('moment-timezone');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const URL = 'https://www.mcflytotalaccess.com/browse';
const URL_API = 'https://api.vhx.tv/products/featured_items?site_id=119312';
let token = '';

const DISCORD_CHANNEL_ID = '';
const DISCORD_KEY = '';

client.login(DISCORD_KEY);

cron.schedule('5 * * * *', () => {
  const currentHour = new Date().getHours();
  // I don't think they will be going live during these hours, so I'm skipping it
  if (currentHour < 8 || currentHour > 22) {
    return;
  }

  if (token === '') {
    refreshToken();
    return;
  }

  checkLive();
  
});

function checkLive() {
  rp({
    uri: URL_API,
    headers: {
      Authorization: 'Bearer ' + token,
    },
    json: true,
  })
  .then(function (repos) {
    if (repos._embedded.items[0].live_video === true) {

      let beforeTime = moment().subtract(5, 'minutes').tz('Europe/London').format('YYYY-MM-DDTHH:mm:00Z');
      let afterTime = moment().tz('Europe/London').format('YYYY-MM-DDTHH:mm:59Z');

      if (
          moment(repos._embedded.items[0].scheduled_at).isBetween(
          beforeTime,
          afterTime,
          'minutes',
          '[]'
        )
      ) {
        const channel = client.channels.cache.get(DISCORD_CHANNEL_ID);
        // Edit your message here
        channel.send('@everyone McFly is live on MTA!');
      }
    }
  })
  .catch(function(err){
    console.log(err.error.message);
    token = '';
    refreshToken();
  })
  .catch(function(err){
    console.log(err.error.message);
  })
}

async function refreshToken() {
  const browser = await puppeteer
  .launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const tab = await browser.newPage();
  const html = await (await tab.goto(URL)).content();
  const $ = cheerio.load(html);

  $('script').each((idx, elem) => {
    if (elem.children[0]) {
      if (elem.children[0].data.includes('TOKEN = "')) {
        let tk = elem.children[0].data.replace('TOKEN = "','').split('";')[0];
        token = tk.replace(/ /gi, '').replace(/\r?\n|\r/g, '');
        console.log('New token: ', token);
        checkLive();
      }
    }
  });

  browser.close();
}

// We need a path otherwise it doesn't work on Heroku
app.get('/', (req, res) => {
  res.send('<h1 style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;font-family: \'Open Sans\', sans-serif;">We all look the same in the dark</h1>');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))