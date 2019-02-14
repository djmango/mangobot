# mangobot
a hackable discord bot built on discord-js commando

why does this exist?
------
my previous discord bot, dnakbot, suffered from frequent crashes and didnt have the features i was looking for. the commando package was a huge improvement on discord.js and i decided to do a rewrite based upon it.


add mangobot to your server
------
simply open [this](https://goo.gl/qoVTdx) link, and follow the instructions!

features
------
youtube music playback
wikipedia search
guild and user property search
dice roll
economy commands:
	bank
	user balances
	daily credits
	awards
api.ai functionality
administration commands:
	strike system
	operator control lists
javascript evaluation

hacking on mangobot
------
like the code base? feel free to branch off of it, or use the bot yourself!
how to run mangobot yourself:
1.	download the zip file
2.	download the latest version of nodejs from [here](https://nodejs.org) and install
3.  extract the zip file and navigate to the directory using your terminal of choice (must be able to run node)
4.  create a keys folder and make a keys.json file inside. then fill out the file as seen below
5.	``` { "discordtoken": "your discord bot secret key", "botsudo": "your discord id"} ```
6.  in your terminal, run `npm install`
7.  once that completes, run `node --harmony index.js` in your terminal. thats it! your branch of mangobot is now ready for use!
