const express = require('express');
const path = require('path');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

// Init
const app = express()
const router = express.Router();
const hostname = 'localhost'
const port = 3000

if (process.env.NODE_ENV === 'development') {
  console.log('Setting up live reload server...')

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'index.html'));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLivereload());
}

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use(router)

app.listen(port, () => {
    console.log('Service started successfully...')
    const url = `http://${hostname}:${port}`
  
    try {
      // openBrowser(url)
      console.log(`Browser session started at ${url}`)
    } catch {
      console.log(`Open browser session at ${url}`)
    }
  })

function openBrowser(url) {
    const start = (process.platform === 'darwin'
        ? 'open'
        : process.platform === 'win32'
            ? 'start'
            : 'xdg-open')
    require('child_process').exec(start + ' ' + url)
}