# McFly MTA Bot

This is a Discord Bot that announces when McFly is live on MTA (www.mcflytotalaccess.com)


## Installation

Run on CLI:
npm install


## Replace these variables:

DISCORD_KEY = Your Discord API KEY

DISCORD_CHANNEL_ID = The ID of the channel where you want to send the notification
(https://stackoverflow.com/questions/41515134/discord-bot-cant-get-channel-by-name)


## Heroku

Run on CLI: 
heroku buildpacks:add jontewks/puppeteer

You will have to install an add-on (New Relic), because if it stays idle for too long it crashes.

On Heroku dashboard:
Go to Resources -> type New relic on the search bar -> choose New Relic APM
Choose the Free Plan -> Submit Order Form
Click on New Relic APM link

On New Relic website:
Click on Synthetics on the top bar
Create Monitor

Monitor URL: The heroku url for the app
Choose 5 min on the bottom
Choose London on the right