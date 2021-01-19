const express = require('express'); // Duh
const bot = require('./bot');
var app = express();
const firebase = require('./database/mongo');
var expressWs = require('express-ws')(app);
let admins = ['3653331', '5368574', '3393956'];
var markdown = require('markdown').markdown;
let prefix = process.env.prefix;
app.ws('/srnet-ws', (ws, req) => {
	var cli = require('srnet').client('https://srnet.glitchdex.tk');
	cli.on('connect', () => {
		try {
			ws.send('id:' + cli.id);
		} catch (e) {}
	});
	cli.on('allRawData', d => {
		try {
			ws.send('data:' + d);
		} catch (e) {}
	});
	ws.on('message', msg => {
		try {
			if (msg.startsWith('send:')) {
				cli.send(
					msg.split('.')[0].slice(5),
					msg.slice(msg.split('.')[0].length + 1)
				);
			}
		} catch (e) {}
	});
});
app.get('/', async (req, res) => {
	let usr = '';
	let len;
	const entries = await firebase.entries.getAllEntries();
	let fields = [];
	let i = 0;

	entries.forEach(v => {
		i++;
		len = `${i}. `;
		usr += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${
			v.name
		}">${len}${v.name}</a></p>`;
	});
	res.send(
		`<!doctype html><meta charset="utf-8"><head>
  <center><div class="topnav">
  <a class="active" href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ` +
			prefix +
			`</a>
</div></center><hr class="secret"></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Glitchdex ~ Homepage</title><center><meta name="description" content="Glitchdex is a easy way for users in the Repl.it community get to learn false information"/><meta property="og:image" content="https://cdn.glitchdex.tk/logo.jpg" /><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" id="searchButton" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
  }</script>` +
			usr +
			`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
.secret{
 border: none;
 background-color: transparent;
 color: transparent;
 border-block-end-color: transparent;
}
/* Add a black background color to the top navigation */
.topnav {
  float: center;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  /*text-align: center;*/
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.title{ color: yellowgreen; }
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.search {
  width: 95%;
  position: relative;
  display: flex;
}
.searchButton{
  width: 40px;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 37px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}
.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}
p{
  color: yellowgreen;
}
</style>`
	);
});
app.get('/search', async function(req, res) {
	if (req.query.query.length === 0) {
		const users = await firebase.entries.getAllEntries();
		let usr = '';
		let len;
		let i = 0;
		users.forEach(v => {
			i++;
			len = `${i}. `;
			usr += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${
				v.name
			}">${len}${v.name}</a></p>`;
		});
		res.send(
			`<!doctype html><meta charset="utf-8"><head>
  <center><div class="topnav">
  <a class="active" href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ` +
				prefix +
				`</a>
</div></center><hr class="secret"></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Glitchdex ~ Homepage</title><center><meta name="description" content="Glitchdex is a easy way for users in the Repl.it community get to learn false information"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" id="searchButton" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
  }</script>` +
				usr +
				`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
.secret{
 border: none;
 background-color: transparent;
 color: transparent;
 border-block-end-color: transparent;
}
/* Add a black background color to the top navigation */
.topnav {
  float: center;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  /*text-align: center;*/
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.title{ color: yellowgreen; }
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.search {
  width: 95%;
  position: relative;
  display: flex;
}
.searchButton{
  width: 40px;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 37px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}
.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}
p{
  color: yellowgreen;
}
</style>`
		);
	} else {
		const results = await firebase.entries.getEntry(req.query.query);
		let srh = '';
		if (!results) {
			return res.send(
				`<!doctype html><meta charset="utf-8"><head>
  <center><div class="topnav">
  <a class="active" href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ` +
					prefix +
					`</a>
</div></center><hr class="secret"></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Glitchdex ~ Homepage</title><center><meta name="description" content="Glitchdex is a easy way for users in the Repl.it community get to learn false information"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" id="searchButton" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
  }</script><p class="entries">Nothing Found!</p></body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
.secret{
 border: none;
 background-color: transparent;
 color: transparent;
 border-block-end-color: transparent;
}
/* Add a black background color to the top navigation */
.topnav {
  float: center;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  /*text-align: center;*/
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.title{ color: yellowgreen; }
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.search {
  width: 95%;
  position: relative;
  display: flex;
}
.searchButton{
  width: 40px;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 37px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}
.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}
p{
  color: yellowgreen;
}
</style>`
			);
		}
		results.forEach(v => {
			srh += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${
				v.name
			}">${v.name}</a></p>`;
		});
		res.send(
			`<!doctype html><meta charset="utf-8"><head>
  <center><div class="topnav">
  <a class="active" href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ` +
				prefix +
				`</a>
</div></center><hr class="secret"></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Glitchdex ~ Homepage</title><center><meta name="description" content="Glitchdex is a easy way for users in the Repl.it community get to learn false information"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" id="searchButton" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
  }</script>` +
				srh +
				`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
.secret{
 border: none;
 background-color: transparent;
 color: transparent;
 border-block-end-color: transparent;
}
/* Add a black background color to the top navigation */
.topnav {
  float: center;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  /*text-align: center;*/
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.title{ color: yellowgreen; }
@import url(https://fonts.googleapis.com/css?family=Open+Sans);
.search {
  width: 95%;
  position: relative;
  display: flex;
}
.searchButton{
  width: 40px;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 37px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}
.searchTerm {
  width: 100%;
  border: 3px solid #00B4CC;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus{
  color: #00B4CC;
}
p{
  color: yellowgreen;
}
</style>`
		);
	}
});
app.get('/add', function(req, res) {
	let hex = '#00ffff';
	if (req.header('X-Replit-User-Id')) {
		if (admins.includes(req.header('X-Replit-User-Id'))) {
			res.send(`<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Add Entries</title><center><meta name="description" content="add a entry (admins only)"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<h1 class="title">Hello, ${req.header('X-Replit-User-Name')}</h1>
<h3 class="name">Entry Name:</h3>
<input type="text" id="name" class="text">
<hr>
<h3 class="value">Entry Value:</h4>
<textarea id="value" name="value" class="textarea" rows="10" columns="60"></textarea>
<hr>
<h3 class="name">Entry Image URL:</h3>
<input type="text" id="url" class="text">
<hr>
<button onclick="sendEntry()" class="submit">Submit</button>
<script>
function sendEntry() {
window.location.href = 'https://glitchdex.tk/admin/entry?name=' + document.getElementById('name').value + '&value=' + document.getElementById('value').value + '&image=' + document.getElementById('url').value
			;
}
</script><style>body{ background-color: #222; } .title{ color: white; } .name { color: white; } .value{ color: white; } .textarea{ background-color: purple; outline: none; background-color: purple; outline: none; border-radius: 25px;
  padding: 20px;
  width: 200px;
  height: 150px; } .text{ background-color: purple; outline: none; border-radius: 25px;
  padding: 20px;
  width: 200px;
  height: 150px; } .submit{ background-color: purple; outline: none; border-radius: 25px;
  padding: 20px; }</style>`);
		} else {
			res.send(
				`hello, ${req.header(
					'X-Replit-User-Name'
				)} you are not a Glitchdex admin`
			);
		}
	} else {
		res.sendFile(__dirname + '/replauth/login.html'); // Send a login page if they are not.
	}
});
app.get('/admin/entry', function(req, res) {
	if (req.header('X-Replit-User-Id')) {
		if (admins.includes(req.header('X-Replit-User-Id'))) {
			let name = req.query.name;
			let value = req.query.value;
			let image = req.query.image;
			if (image.length === 0) {
				firebase.entries
					.addEntry(name, value)
					.then(res.send(`successfully added entry`));
			} else {
				const { Webhook, MessageBuilder } = require('discord-webhook-node');
				const hook = new Webhook(process.env.WEBHOOK);

				let embed = `Entry Name: ${name} | Entry Image URL: ${image} | Entry Added By ${req.header(
					'X-Replit-User-Name'
				)}`;
				hook.send(embed);
				firebase.entries
					.addEntry(name, value)
					.then(res.send(`successfully added entry`));
			}
		} else {
			res.send('you are not a admin');
		}
	} else {
		res.send(`you are not logged in`);
	}
});
app.get('/ping', function(req, res) {
	console.log('recieved ping');
	res.send('sent ping');
});
app.get('/entry', function(req, res) {
	let info;
	let title = req.query.user;
	let hex = '#00ffff';
	firebase.entries.getAllEntries().then(e => {
		keys = [];
		e.forEach(v => {
			keys.push(v.name);
		});
		if (keys.includes(req.query.user)) {
			(async () => {
				info = await firebase.entries.getOneEntry(req.query.user);
				res.send(
					`<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}'s entry on Glitchdex</title>
					<meta name="description" content='` +
						info.value +
						`'/><center><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="${title}"><meta property="og:image" content="https://cdn.glitchdex.tk/${
							req.query.user
						}.jpg" /><h3 class="value">${title}</h3></center><center><a href="https://cdn.glitchdex.tk/${
							req.query.user
						}.jpg"><img href="https://cdn.glitchdex.tk/${
							req.query.user
						}.jpg" src="https://cdn.glitchdex.tk/${
							req.query.user
						}.jpg" alt="${title}" class="image" width="100px" height="100px"></a></center><hr class="secret"><center><div class="lol">${markdown.toHTML(
							info.value.replace(/\\n|\\r\\n|\\n\\r|\\r/g, '  \n')
						)}</div></center><style>body{ background-color: #222; display: block; } .value{ color:white; } .image { position: float; margin: 0; /*right: -5;*/ border-radius: 50px; } .tts { height: 95px; width: 210px; background:transparent; } .lol{ position: float; bottom: 10; text-align: center; color: white; font-family: "Times New Roman", Times, serif; } .secret{ background-color: transparent; color: transparent; border: none; border-block-end-color: none;}</style>`
				);
			})();
		} else {
			res.send(
				`<meta name="viewport" content="width=device-width, initial-scale=1.0"><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><title>${
					req.query.user
				} is not a valid entry</title><meta name="description" content="ask a admin to add the entry for you"/><center><h4 class="value">` +
					req.query.user +
					' is not a valid entry, ask a admin to add the entry for you</h4></center><style>body{ background-color: #222; } .value{ color: white; }'
			);
		}
	});
});
app.get('/raw_entry', function(req, res) {
	// res.send(`Glitchdex is currently down for updates`);
	let info;
	let title = req.query.user;
	let hex = '#00ffff';
	firebase.entries.getAllEntries().then(e => {
		keys = [];
		e.forEach(v => {
			keys.push(v.name);
		});
		if (keys.includes(req.query.user)) {
			(async () => {
				returnedrawdata = await firebase.entries.getOneEntry(req.query.user);
				res.send(`${returnedrawdata.value}`);
			})();
		} else {
			res.send(`404 - Entry Not Found`);
		}
	});
});
app.get('/rawentries', async function(req, res) {
	firebase.entries.getAllEntries().then(e => {
		keys = [];
		e.forEach(v => {
			keys.push(v.name);
		});
		res.send(keys);
	});
});
app.get('/raw_image', function(req, res) {
	let find = req.query.find;
	res.send(`https://cdn.glitchdex.tk/${find}.jpg`);
});
app.get('/docs', function(req, res) {
	res.sendFile('docs/index.html', { root: __dirname });
});
app.get('/uptime', async function(req, res) {
	const fetch = require('node-fetch');
	async function getUptime() {
		return (
			Math.round(
				+(await fetch(
					'https://api.uptimerobot.com/v2/getMonitors?api_key=' +
						process.env.YOURKEY,
					{
						method: 'post',
						body: '{"custom_uptime_ratios":"4"}',
						headers: { 'Content-Type': 'application/json' }
					}
				).then(a => a.json())).monitors[4].custom_uptime_ratio * 10
			) /
				10 +
			'%'
		);
	}
	res.send(
		`<head><meta name="description" content="Uptime: ${await getUptime()}"/><title>Glitchdex Server Uptime</title></head>Uptime: ${await getUptime()}`
	);
});
app.use(express.static('docs'));
app.get('*', function(req, res) {
	res.status(404).send('404 - Page Not Found');
});
app.listen(8080, function() {
	console.log('Server up!');
});
