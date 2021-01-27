const express = require('express'); // Duh
const bot = require('./bot');
var app = express();
const Database = require("@replit/database")
const db = new Database()
const firebase = require('./database/mongo');
var expressWs = require('express-ws')(app);
let admins = ['3653331', '5368574', '3393956', '1340533'];
var markdown = require('markdown').markdown;
let prefix = process.env.prefix;
app.ws('/srnet-ws', (ws, req) => {
  var cli = require('srnet').client('https://srnet.glitchdex.tk');
  cli.on('connect', () => {
    try {
      ws.send('id:' + cli.id);
    } catch (e) { }
  });
  cli.on('allRawData', d => {
    try {
      ws.send('data:' + d);
    } catch (e) { }
  });
  ws.on('message', msg => {
    try {
      if (msg.startsWith('send:')) {
        cli.send(
          msg.split('.')[0].slice(5),
          msg.slice(msg.split('.')[0].length + 1)
        );
      }
    } catch (e) { }
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
    len = `${i}`;
    usr += `<span class="block"><p><a id="entries" href="https://glitchdex.tk/entry?user=${
      v.name
      }">${len}. ${v.name}</a></p></span>`;
  });

  res.send(
    `<!doctype html><meta charset="utf-8"><head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  <div class="topnav bg-green-300 p-1 flex space-x-5 flex items-center justify-center">
  <img src="https://cdn.glitchdex.tk/logo.jpg" href="https://cdn.glitchdex.tk/logo.jpg" class="rounded-full w-8 h-8 flex items-center justify-center"><a href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ${prefix}</a></div><div class="p-2"></div></head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Glitchdex ~ Homepage</title><center><meta name="description" content="Glitchdex is a easy way for users in the Repl.it community get to learn false information"/><meta property="og:image" content="https://cdn.glitchdex.tk/logo.jpg" /><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="#00ffff"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect"><div class="space-y-4 text-white font-mono">` +
    usr +
    `</div></body><style>
			body{
			  background-color: #222;
			}
			</style>`
  );
});

app.get('/add', function(req, res) {
  let hex = '#00ffff';
  if (req.header('X-Replit-User-Id')) {
    if (admins.includes(req.header('X-Replit-User-Id'))) {
      res.send(`<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Add Entries</title><center><meta name="description" content="add a entry (admins only)"/><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="Team ViewSelect">
			  <div class="topnav bg-green-300 p-1 flex space-x-5 flex items-center justify-center">
  <img src="https://cdn.glitchdex.tk/logo.jpg" href="https://cdn.glitchdex.tk/logo.jpg" class="rounded-full w-8 h-8 flex items-center justify-center"><a href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ${prefix}</a></div><div class="p-2"></div>
<h1 class="text-white">Hello, ${req.header('X-Replit-User-Name')}</h1>
<div class="p-2"></div>
<h3 class="text-white">Entry Name:</h3>
<input type="text" id="name" class="outline-none">
<div class="p-2"></div>
<h3 class="text-white">Entry Value:</h4>
<textarea id="value" name="value" class="outline-none" rows="10" columns="60"></textarea>
<div class="p-2"></div>
<h3 class="text-white">Entry Image URL:</h3>
<input type="text" id="url" class="outline-none">
<div class="p-2"></div>
<button onclick="sendEntry()" class="text-green-400 outline-none">Submit</button>
<script>
function sendEntry() {
window.location.href = 'https://glitchdex.tk/admin/entry?name=' + document.getElementById('name').value + '&value=' + document.getElementById('value').value + '&image=' + document.getElementById('url').value
			;
}
</script><style>
			body{
			  background-color: #222;
			}
			</style>`);
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
          .then(
            res.send(
              `<script>window.location.href = 'https://glitchdex.tk/entry?user=${name}';</script>`
            )
          );
      } else {
        const { Webhook, MessageBuilder } = require('discord-webhook-node');
        const hook = new Webhook(process.env.WEBHOOK);

        let embed = `Entry Name: ${name} | Entry Image URL: ${image} | Entry Added By ${req.header(
          'X-Replit-User-Name'
        )}`;
        hook.send(embed);
        firebase.entries
          .addEntry(name, value)
          .then(
            res.send(
              `<script>window.location.href = 'https://glitchdex.tk/entry?user=${name}';</script>`
            )
          );
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
    db.list(title).then(matches => {
      if (JSON.stringify(matches).includes(title)) {
        if (keys.includes(req.query.user)) {
          (async () => {
            info = await firebase.entries.getOneEntry(req.query.user);
            res.send(
              `<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} &#10003;'s entry on Glitchdex</title><meta name="description" content="${info.value}"/><center><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="${title}"><meta property="og:image" content="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" /><div class="p-2"></div><h3 class="text-white">${title} &#10003;</h3></center><center><a href="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg"><img href="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" src="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" alt="${title}" class="float-right rounded-full h-22 w-22 flex items-center justify-center" width="100px" height="100px"></a></center><div class="p-2"></div><center><div class="text-white markdown">${markdown.toHTML(
                info.value.replace(/\\n|\\r\\n|\\n\\r|\\r/g)
              )}</div>
</center><style>body { background-color: #222 } .markdown a{ color: red; }</style>`
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
      }
      else {
        if (keys.includes(req.query.user)) {
          (async () => {
            info = await firebase.entries.getOneEntry(req.query.user);
            res.send(
              `<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}'s entry on Glitchdex</title><meta name="description" content=` +
              `${info.value}` +
              `/><center><link type="application/json+oembed" href="https://glitchdex.tk/discordembed.json"/><meta name="theme-color" content="${hex}"><meta content="Glitchdex" property="og:site_name"><meta name="author" content="${title}"><meta property="og:image" content="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" />  <div class="topnav bg-green-300 p-1 flex space-x-5 flex items-center justify-center">
  <img src="https://cdn.glitchdex.tk/logo.jpg" href="https://cdn.glitchdex.tk/logo.jpg" class="rounded-full w-8 h-8 flex items-center justify-center"><a href="/">Home</a>
  <a href="/add">Add Entries</a>
  <a href="">Bot Prefix: ${prefix}</a></div><div class="p-2"></div><h3 class="text-white">${title}</h3></center><center><a href="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg"><img href="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" src="https://cdn.glitchdex.tk/${
              req.query.user
              }.jpg" alt="${title}" class="float-right rounded-full h-22 w-22 flex items-center justify-center" width="100px" height="100px"></a></center><div class="p-2"></div><center><div class="text-white markdown">${markdown.toHTML(
                info.value.replace(/\\n|\\r\\n|\\n\\r|\\r/g)
              )}</div>
</center><style>body { background-color: #222 } .markdown a{ color: red; }</style>`
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
      }
    });
  });
});
app.get('/raw_entry', function(req, res) {
  // res.send(`Glitchdex is currently down for updates`);
  let info;
  let title = req.query.user;
  let hex = '#00ffff';

  if (title === 'undefined') {
    return res.send("you didn't specify a entry to get information on...");
  } else {
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
  }
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
  if (find === 'undefined') {
    return res.send("you didn't specify a entry name to get an image for...");
  } else {
    firebase.entries.getAllEntries().then(e => {
      keys = [];
      e.forEach(v => {
        keys.push(v.name);
      });
      if (keys.includes(find)) {
        res.send(`https://cdn.glitchdex.tk/${find}.jpg`);
      } else {
        return res.send('that entry does not exist...');
      }
    });
  }
});
app.get('/docs', function(req, res) {
  res.sendFile('docs/index.html', { root: __dirname });
});
app.get('/verified', async function(req, res) {
  db.list().then(keys => { res.json(JSON.stringify(keys)) });
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
app.get('/blacklist', async function(req, res) {
  const blacklisted = await firebase.entries.checkBlacklist(
    req.query.id
  );
  res.send(
    blacklisted
  )
});
app.use(express.static('docs'));
app.get('*', function(req, res) {
  res.status(404).send('404 - Page Not Found');
});
app.listen(8080, function() {
  console.log('Server up!');
});
