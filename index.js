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

const DISCORD_CHANNEL_ID = '780570519992795209';
const DISCORD_KEY = 'NzgwNTU1ODc5MzkyNDc3MTk0.X7wzTw.cZF0N_EMnxEvHYyWF-Y74ilYcAY';

client.login(DISCORD_KEY);

cron.schedule('* * * * *', () => {
  const currentHour = new Date().getHours();
  // I don't think they will be going live during these hours, so I'm skipping it
  if (currentHour < 8 || currentHour > 22) {
    return;
  }

  if (token === '') {
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

      let beforeTime = moment().tz('Europe/London').format('YYYY-MM-DDTHH:mm:00Z');
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

function refreshToken() {
  puppeteer
  .launch({args: ['--no-sandbox']})
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(URL).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    const $ = cheerio.load(html);
    $('script').each((idx, elem) => {
      if (elem.children[0]) {
        if (elem.children[0].data.includes('TOKEN = "')) {
          let tk = elem.children[0].data.replace('TOKEN = "','').split('";')[0];
          token = tk.replace(/ /gi, '').replace(/\r?\n|\r/g, '');

          checkLive();
        }
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  })
  .catch(function(err) {
    console.log(err);
  });

}

// We need a path otherwise it doesn't work on Heroku
app.get('/', (req, res) => {
  res.send('<h1 style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;font-family: \'Open Sans\', sans-serif;">We all look the same in the dark</h1>');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))