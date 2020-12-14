const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('node-cron');
const rp = require('request-promise');
const moment = require('moment');
const tz = require('moment-timezone');
const url_api = 'https://api.vhx.tv/products/featured_items?site_id=119312';
let token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2YmZlZmMzNGIyNTdhYTE4Y2E2NDUzNDE2ZTlmZmRjNjk4MDAxMDdhZTQ2ZWJhODg0YTU2ZDBjOGQ4NTYzMzgifQ.eyJhcHBfaWQiOjc2NDMsImV4cCI6MTYwNjI3MTUwNywibm9uY2UiOiIzNDBkMGM4N2QzMDdlNzk4Iiwic2l0ZV9pZCI6MTE5MzEyLCJ1c2VyX2lkIjoyMjY2Nzg4M30.XWVJngZq_5NXCVUfHE4AzHfy1zf5fMHbl2FLXxWk58f3AuFllFmqA4n5ZFZI2rDRje87xanMwiQX_ihguwvPZO32F8s6UgmS-FNecMQ8N9RXhLmB0TzboZ_V5Z2XC6Vb3EIhOcgEtwhxIQEYXzTvWpZF8N8vkrtSo2YbQcemYBzkszxeR1AaYoFOLvnRLSOAxy2OPL-LL4e4l5UbiWuaOs4EKPi6Hj70pfMNbns9o6dobIHtbBm0rm7_xdMvqAX3EquPT-HhGxHpQbiOrlUR9gnQdJlFcBWfwihAsvOSd0MgD8-l-tiayZyowuB34c89O9KMTzPiKcL7Ji0Qb4_I6iJYChX3NZelc9CDPvlrLwiQirER8RPjsHYpZILaYnuH8doHX8ZK9Gp9EsBzH66yCR-sRPvxflhsIb84cRV4N90sOWuBY6cC4ehfFmYiFEzT1NcU38edYes_S80TUiXMrnXTjp6tJp-qN9qDdDggJOkQ3MNHTJhrMbaycNNP6ri-ZMcbkKbthxHAC16IT-UIqGATYyfMcNNHn6a_ePHTStaboTGqBBvZpqTXc7LXO0XN-sNGalNNshPOI9ljYZHj83mqkyF3_Oz8PHcoXrtGc8mlR1SQ7cFbmvNPCXond8NTFG6wnc1qYK_vrx4aZ5bcw2kFm8lIKVrg7cfOta0NQxQ';

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://www.mcflytotalaccess.com/browse';

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

const responseTest = {
  "_links": {
    "self": {
      "href": "https://api.vhx.tv/products/featured_items?site=119312&page=1&per_page=50"
    },
    "first": {
      "href": "https://api.vhx.tv/products/featured_items?site=119312&page=1&per_page=50"
    },
    "prev": {
      "href": null
    },
    "next": {
      "href": null
    },
    "last": {
      "href": "https://api.vhx.tv/products/featured_items?site=119312&"
    }
  },
  "count": 3,
  "total": 3,
  "_embedded": {
    "items": [
      {
        "_links": {
          "video_page": {
            "href": "https://www.mcflytotalaccess.com/featured-category/videos/mcfly-games-night"
          }
        },
        "additional_images": {
          "aspect_ratio_16_6": null,
          "aspect_ratio_16_14": null
        },
        "created_at": "2020-12-13T18:42:56Z",
        "description": "",
        "duration": {
          "seconds": 0,
          "formatted": "00:00:00"
        },
        "id": 1220781,
        "name": "McFly Games Night",
        "products": [
          {
            "id": 82497,
            "type": "subscription",
            "name": "McFly Total Access Subscription",
            "sku": "monthly-subscription-133",
            "is_fvod": false
          }
        ],
        "status": "created",
        "thumbnail": {
          "small": "https://vhx.imgix.net/mcflytotalaccess/assets/6bfcaf80-9042-4700-b15a-80efb5ab754c-8063c0ee.png?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240",
          "medium": "https://vhx.imgix.net/mcflytotalaccess/assets/6bfcaf80-9042-4700-b15a-80efb5ab754c-8063c0ee.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640",
          "large": "https://vhx.imgix.net/mcflytotalaccess/assets/6bfcaf80-9042-4700-b15a-80efb5ab754c-8063c0ee.png?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280",
          "source": "https://vhx.imgix.net/mcflytotalaccess/assets/6bfcaf80-9042-4700-b15a-80efb5ab754c-8063c0ee.png",
          "blurred": "https://vhx.imgix.net/mcflytotalaccess/assets/6bfcaf80-9042-4700-b15a-80efb5ab754c-8063c0ee.png?blur=180"
        },
        "title": "McFly Games Night",
        "type": "video",
        "seconds_count": 0,
        "live_video": true,
        "live_status": "started",
        "scheduled_at": "2020-12-14T01:35:00Z",
        "short_description": null,
        "updated_at": "2020-12-13T18:57:31Z",
        "url": "mcfly-games-night"
      },
      {
        "_links": {
          "video_page": {
            "href": "https://www.mcflytotalaccess.com/featured-category/videos/o2-concert-watchalong"
          }
        },
        "additional_images": {
          "aspect_ratio_16_6": null,
          "aspect_ratio_16_14": null
        },
        "created_at": "2020-11-26T15:42:13Z",
        "description": "",
        "duration": {
          "seconds": 8932,
          "formatted": "02:28:52"
        },
        "id": 1195705,
        "name": "O2 Concert Watchalong",
        "status": "complete",
        "thumbnail": {
          "small": "https://vhx.imgix.net/mcflytotalaccess/assets/3bc68583-3068-419a-bdb2-81e5e30bd793-dedf4572.jpg?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240",
          "medium": "https://vhx.imgix.net/mcflytotalaccess/assets/3bc68583-3068-419a-bdb2-81e5e30bd793-dedf4572.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640",
          "large": "https://vhx.imgix.net/mcflytotalaccess/assets/3bc68583-3068-419a-bdb2-81e5e30bd793-dedf4572.jpg?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280",
          "source": "https://vhx.imgix.net/mcflytotalaccess/assets/3bc68583-3068-419a-bdb2-81e5e30bd793-dedf4572.jpg",
          "blurred": "https://vhx.imgix.net/mcflytotalaccess/assets/3bc68583-3068-419a-bdb2-81e5e30bd793-dedf4572.jpg?blur=180"
        },
        "title": "O2 Concert Watchalong",
        "type": "video",
        "seconds_count": 12023407,
        "live_video": false,
        "live_status": "ended",
        "scheduled_at": "2020-11-26T20:00:00Z",
        "short_description": null,
        "updated_at": "2020-11-27T00:35:27Z",
        "url": "o2-concert-watchalong"
      },
      {
        "_links": {
          "video_page": {
            "href": "https://www.mcflytotalaccess.com/featured-category/videos/mcfly-o2-live-4k-master-4k"
          }
        },
        "additional_images": {
          "aspect_ratio_16_6": null,
          "aspect_ratio_16_14": null
        },
        "created_at": "2020-11-19T00:38:17Z",
        "description": "",
        "duration": {
          "seconds": 5981,
          "formatted": "01:39:41"
        },
        "id": 1182909,
        "name": "MCFLY LIVE AT THE O2",
        "status": "complete",
        "thumbnail": {
          "small": "https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240",
          "medium": "https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640",
          "large": "https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280",
          "source": "https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png",
          "blurred": "https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?blur=180"
        },
        "title": "MCFLY LIVE AT THE O2",
        "type": "video",
        "seconds_count": 15888680,
        "live_video": false,
        "live_status": "pending",
        "scheduled_at": null,
        "short_description": null,
        "updated_at": "2020-11-20T08:19:39Z",
        "url": "mcfly-o2-live-4k-master-4k"
      }
    ]
  }
}

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzgwNTU1ODc5MzkyNDc3MTk0.X7wzTw.cZF0N_EMnxEvHYyWF-Y74ilYcAY');

cron.schedule('* * * * *', () => {
  // console.log('Executando a tarefa a cada 1 minuto');
  if (token === '') {
    return;
  }
    rp({
    uri: url_api,
    headers: {
        Authorization: 'Bearer ' + token,
    },
    json: true,
    })
    .then(function (repos) {
        // if (responseTest._embedded.items[0].live_video === true) {
        if (repos._embedded.items[0].live_video === true) {
          console.log('live');
          let beforeTime = moment().subtract(1, "minutes").tz('Europe/London').format('YYYY-MM-DDTHH:mm:00Z');
          let afterTime = moment().tz('Europe/London').format('YYYY-MM-DDTHH:mm:59Z');
            
          console.log('now: ' + moment().format());
          console.log('before: ' + beforeTime);
          console.log('after: ' + afterTime);

          if (
            // moment(responseTest._embedded.items[0].scheduled_at).isBetween(
              moment(repos._embedded.items[0].scheduled_at).isBetween(
              beforeTime,
              afterTime,
              'minutes',
              '[]'
            )
          ) {
            const channel = client.channels.cache.get('780570519992795209');
            channel.send('@everyone McFly is live on MTA!');
          }
        }
    })
    .catch(function(err){
      console.log('linha 209: ', err.error.message);
      token = '';
      refreshToken();
    })
    .catch(function(err){
      console.log('linha 214: ', err.error.message);
    })

  
});

function refreshToken() {
  puppeteer
  .launch({args: ['--no-sandbox']})
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
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
          console.log(token);
        }
      }
    });
  })
  .catch(function(err) {
    //handle error
    console.log('linha 245: ', err);
  })
  .catch(function(err) {
    //handle error
    console.log('linha 249: ', err);
  });

}

app.get('/',function(req,res){
  res.send("We all look the same in the dark");
});

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))