const express = require('express'); // Duh
const Database = require('@replit/database');
const bot = require('./bot2');
const db = new Database();
const dbFunc = require('./database/db');
var app = express();
const Keyv = require('keyv');
const poll = new Keyv('sqlite://poll.sqlite');
var expressWs = require('express-ws')(app);
let admins = ['3653331'];
var markdown = require('markdown').markdown;
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
	const users = await db.list();
	let usr = '';
	let len;
	let i = 0;
	users.forEach(v => {
		i++;
		len = `${i}. `;
		usr += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${v}">${len}${v}</a></p>`;
	});
	res.send(
		`<!doctype html><meta charset="utf-8"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>All Entries</title><center><meta name="description" content="view all entries that's currently on Glitchdex"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect"><h3 class="title">Glitchdex Home</h3><hr>
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
  }
</script>` +
			usr +
			`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
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
}</style>`
	);
});
app.get('/search', async function(req, res) {
	if (req.query.query.length === 0) {
		const users = await db.list();
		let usr = '';
		let len;
		let i = 0;
		users.forEach(v => {
			i++;
			len = `${i}. `;
			usr += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${v}">${len}${v}</a></p>`;
		});
		res.send(
			`<!doctype html><meta charset="utf-8"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>All Entries</title><center><meta name="description" content="view all entries that's currently on Glitchdex"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect"><h3 class="title">Glitchdex Home</h3><hr>
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
}
</script>` +
				usr +
				`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
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
}</style>`
		);
	} else {
		const results = await db.list(req.query.query);
		let srh = '';
		results.forEach(v => {
			srh += `<p><a id="entries" href="https://glitchdex.tk/entry?user=${v}">${v}</a></p>`;
		});
		res.send(
			`<!doctype html><meta charset="utf-8"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>All Entries</title><center><meta name="description" content="view all entries that's currently on Glitchdex"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect"><h3 class="title">Glitchdex Home</h3><hr>
<div class="wrap">
   <div class="search">
      <input type="text" class="searchTerm" id="searchTerm" placeholder="What are you looking for?">
      <button type="submit" onclick="sendQuery()" class="searchButton">🔎</button>
     </button>
   </div>
</div>
<script>
function sendQuery() {
location.replace("https://glitchdex.tk/search?query=" + document.getElementById("searchTerm").value);
}
</script>` +
				srh +
				`</body><style>body { background-color: #222; margin: 0 auto; }
.entries, a{ color: yellowgreen; font-weight: bolder; text-decoration: none; }
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
}</style>`
		);
	}})
app.get('/add', function (req, res){
let hex = '#00ffff';
    if (req.header('X-Replit-User-Id')) {
if (admins.includes(req.header('X-Replit-User-Id'))){
    res.send(`<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Add Entries</title><center><meta name="description" content="add a entry (admins only)"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
<h1>Hello, ${req.header('X-Replit-User-Name')}</h1>
<h3 class="name">Entry Name:</h3>
<input type="text" id="name">
<hr>
<h3 class="value">Entry Value:</h4>
<textarea id="value" name="value" rows="10" columns="60"></textarea>
<hr>
<button onclick="sendEntry()">Submit</button>
<script>
function sendEntry() {
window.location.href = 'https://glitchdex.tk/admin/entry?name=' + document.getElementById('name').value + '&value=' + document.getElementById('value').value + '&id=' + ${req.header("X-Replit-User-Id")} ;
}
</script>`)
    }
else {
   res.send(`hello, ${req.header("X-Replit-User-Name")} you are not a Glitchdex admin`)
}}
 else {
        res.sendFile(__dirname + '/replauth/login.html'); // Send a login page if they are not.
    }
})
app.get('/admin/entry', function (req, res) {
if (req.query.id) {
if (admins.includes(req.query.id)){
 let name = req.query.name;
 let value = req.query.value;
 db.set(name, value).then(res.send(`successfully added entry`))
}
else {
  res.send('you are not a admin')
}}
else {
  res.send(`you are not logged in`)
}})
app.get('/ping', function(req, res) {
	console.log('recieved ping');
	res.send('sent ping');
});
app.get('/entry', function(req, res) {
	let info;
	let title = req.query.user;
	let hex = '#00ffff';
	db.list().then(keys => {
		if (keys.includes(req.query.user)) {
			(async () => {
				info = await db.get(req.query.user);
				res.send(
					`<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><center><meta name="description" content="${info}"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="${title}"><h3 class="value">${title}</h3></center><hr><center><div style="text-align: left;color: white;font-family: Monospace;">${markdown.toHTML(
						info.replace(/\. /g, '.\n\n')
					)}</div></center><style>body{ background-color: #222; } .value{ color:white; } .tts { height: 95px; width: 210px; background:transparent; }</style>`
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
	let info;
	let title = req.query.user;
	let hex = '#00ffff';
	db.list().then(keys => {
		if (keys.includes(req.query.user)) {
			(async () => {
				returnedrawdata = await db.get(req.query.user);
				res.send(`${returnedrawdata}`);
			})();
		} else {
			res.send(`404 - Entry Not Found`);
		}
	});
});
app.get('/rawentries', function(req, res) {
	db.list().then(keys => {
		res.send(keys);
	});
});
app.get('/docs', function(req, res) {
	res.sendFile('Public/index.html', { root: __dirname });
});
app.get('/pollresults', function(req, res) {
	let pollid;
	pollid = req.query.id;
	if (pollid === undefined) {
		res.send("you didn't specify the poll id in the query");
	} else {
		let results;
		results = `poll id: ${pollid} |  results: YES - 75% NO - 25%`;
		res.send(
			`<title>Results for Poll: ${pollid}</title><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="description" content="${results}"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><h3>${results}</h3>`
		);
	}
});
app.get('/status', async function(req, res) {
	const fetch = require('node-fetch');
	async function getUptime() {
		return (
			Math.round(
				+(await fetch(
					'https://api.uptimerobot.com/v2/getMonitors?api_key=' +
						process.env.YOURKEY,
					{
						method: 'post',
						body: '{"custom_uptime_ratios":"7"}',
						headers: { 'Content-Type': 'application/json' }
					}
				).then(a => a.json())).monitors[6].custom_uptime_ratio * 10
			) /
				10 +
			'%'
		);
	}
	res.send(`Uptime: ` + (await getUptime()));
});
app.use(express.static('Public'));
app.get('*', function(req, res) {
	res.status(404).send('404 - Page Not Found');
});
app.listen(8080, function() {
	console.log('Server up!');
});
