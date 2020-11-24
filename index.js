const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('node-cron');
const rp = require('request-promise');
const moment = require('moment');
const tz = require('moment-timezone');
const url = 'https://api.vhx.tv/products/featured_items?site_id=119312';
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2YmZlZmMzNGIyNTdhYTE4Y2E2NDUzNDE2ZTlmZmRjNjk4MDAxMDdhZTQ2ZWJhODg0YTU2ZDBjOGQ4NTYzMzgifQ.eyJhcHBfaWQiOjc2NDMsImV4cCI6MTYwNjE4MTMxOSwibm9uY2UiOiI3ZTcwMmJhZGU3OGJiYjViIiwic2l0ZV9pZCI6MTE5MzEyfQ.eMUeKPeuhk3MCVEOnN0W9VP3GmtNUjd4gJe2bAGtzr-ORQt_JrBaSJ_y8_rE3Nyz_Rg3dtrjnHNEpSFHjuhlmEcfqjcjS73slROEmkwtL5DyRon0jisnzUB41_i0Hn1bYpLabxhFHPt98a05G9aqwcZ0Zo59YwdygVtCrwdZjDEf8Zp_4y6Zh9yJBWFP-vCU0Y4OYWTipcoCdjdrivhZhEiFARXdstyKHMd25KXW9KT7iNOHBunKsLCphC9MWXwpIeZ7iO7ueDGEiofHz-6hdgGt3zXK2-fvJaJ3-ZKHunPG0M9LK5YTuElAsA_TmIsBeylAOIxvAxEe-auLP_nrzSOMn2cOkRKn1JK1eekLgy_2DnCRBdJu8oBEqiXYKUm3pCXo5SKdM-BZUUKdrN5fMBgvvEXvPtHF9mMiWpzfulFsmpSmc2D-BxOiVgKkooUI1KO6b_u6p0LSgS419y5s856Cu78lLolzfA3KEJNwyk5yLfOuPJzKoeAaSkDTGmpD-7cPQK0BUEqmIjQ0b5ME7EFxtKE_eBia1KZB2CJQyx1YO3cM1il41Z5TFNSxXJ6p--VmCPdiKJugpTo9KQf22vpo6mTageo_IFJkf2XwZrLpBunxfZ_e0YFivvz6457ZwG0bJirawiIkQ46KNcXo9Fk7CgIJd7eB8JfqI_sez1c';


const responseTest = {
  _links: {
    self: {
      href:
        'https://api.vhx.tv/products/featured_items?site=119312&page=1&per_page=50',
    },
    first: {
      href:
        'https://api.vhx.tv/products/featured_items?site=119312&page=1&per_page=50',
    },
    prev: {
      href: null,
    },
    next: {
      href: null,
    },
    last: {
      href: 'https://api.vhx.tv/products/featured_items?site=119312&',
    },
  },
  count: 3,
  total: 3,
  _embedded: {
    items: [
      {
        _links: {
          video_page: {
            href:
              'https://www.mcflytotalaccess.com/featured-category/videos/streamy-weamy',
          },
        },
        additional_images: {
          aspect_ratio_16_6: null,
          aspect_ratio_16_14: null,
        },
        created_at: '2020-11-23T18:00:12Z',
        description: '',
        duration: {
          seconds: 8900,
          formatted: '02:28:20',
        },
        id: 1190426,
        name: 'Streamy Weamy',
        status: 'complete',
        thumbnail: {
          small:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8b22001a-f4f3-4139-bdf2-2212b4703fc3.jpg?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240',
          medium:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8b22001a-f4f3-4139-bdf2-2212b4703fc3.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640',
          large:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8b22001a-f4f3-4139-bdf2-2212b4703fc3.jpg?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280',
          source:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8b22001a-f4f3-4139-bdf2-2212b4703fc3.jpg',
          blurred:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8b22001a-f4f3-4139-bdf2-2212b4703fc3.jpg?blur=180',
        },
        title: 'Streamy Weamy',
        type: 'video',
        seconds_count: 5227373,
        live_video: true,
        live_status: 'ended',
        scheduled_at: '2020-11-24T01:31:00Z',
        short_description: null,
        updated_at: '2020-11-23T23:09:15Z',
        url: 'streamy-weamy',
      },
      {
        _links: {
          video_page: {
            href:
              'https://www.mcflytotalaccess.com/featured-category/videos/get-tbag-out-of-here',
          },
        },
        additional_images: {
          aspect_ratio_16_6: null,
          aspect_ratio_16_14: null,
        },
        created_at: '2020-11-22T20:57:50Z',
        description: '',
        duration: {
          seconds: 0,
          formatted: '00:00:00',
        },
        id: 1189034,
        name: 'Get TBAG Out Of Here',
        products: [
          {
            id: 82497,
            type: 'subscription',
            name: 'Mcfly Total Access Subscription',
            sku: 'monthly-subscription-133',
            is_fvod: false,
          },
        ],
        status: 'created',
        thumbnail: {
          small:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8bfefd29-5e77-4702-9ab3-4d5e980c6e70.jpg?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240',
          medium:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8bfefd29-5e77-4702-9ab3-4d5e980c6e70.jpg?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640',
          large:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8bfefd29-5e77-4702-9ab3-4d5e980c6e70.jpg?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280',
          source:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8bfefd29-5e77-4702-9ab3-4d5e980c6e70.jpg',
          blurred:
            'https://vhx.imgix.net/mcflytotalaccess/assets/8bfefd29-5e77-4702-9ab3-4d5e980c6e70.jpg?blur=180',
        },
        title: 'Get TBAG Out Of Here',
        type: 'video',
        seconds_count: 795286,
        live_video: true,
        live_status: 'disconnected',
        scheduled_at: '2020-11-22T20:57:49Z',
        short_description: null,
        updated_at: '2020-11-22T22:18:19Z',
        url: 'get-tbag-out-of-here',
      },
      {
        _links: {
          video_page: {
            href:
              'https://www.mcflytotalaccess.com/featured-category/videos/mcfly-o2-live-4k-master-4k',
          },
        },
        additional_images: {
          aspect_ratio_16_6: null,
          aspect_ratio_16_14: null,
        },
        created_at: '2020-11-19T00:38:17Z',
        description: '',
        duration: {
          seconds: 5981,
          formatted: '01:39:41',
        },
        id: 1182909,
        name: 'MCFLY LIVE AT THE O2',
        status: 'complete',
        thumbnail: {
          small:
            'https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=135&q=20&w=240',
          medium:
            'https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=360&q=70&w=640',
          large:
            'https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?auto=format%2Ccompress&fit=crop&h=720&q=75&w=1280',
          source:
            'https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png',
          blurred:
            'https://vhx.imgix.net/mcflytotalaccess/assets/b9ef7f10-70f0-4550-a362-0f5e5af7f7d6-30219422.png?blur=180',
        },
        title: 'MCFLY LIVE AT THE O2',
        type: 'video',
        seconds_count: 12564390,
        live_video: false,
        live_status: 'pending',
        scheduled_at: null,
        short_description: null,
        updated_at: '2020-11-20T08:19:39Z',
        url: 'mcfly-o2-live-4k-master-4k',
      },
    ],
  },
};

client.on('message', (msg) => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NzgwNTU1ODc5MzkyNDc3MTk0.X7wzTw.cZF0N_EMnxEvHYyWF-Y74ilYcAY');

cron.schedule('* * * * *', () => {
  console.log('Executando a tarefa a cada 1 minuto');
    rp({
    uri: url,
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
            const channel = client.channels.cache.get('780570519992795209');
            channel.send('@everyone McFly is live on MTA!');
          }
        }
    })
    .catch(function (err) {
        console.log(err);
    });
  
});