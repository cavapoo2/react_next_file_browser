const express = require('express');
const next = require('next');
const api = require('./operations/get-item');
const dir = require('./operations/directory');

const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';
const tinyOrDev = dev ? 'dev' : 'tiny';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express()
  server.use(morgan(tinyOrDev));
  server.use(express.json());

  // Set up home page as a simple render of the page.
  server.get('/', (req, res) => {
    console.log('Render home page')
    return app.render(req, res, '/', req.query)
  })

  server.post('/dir', async (req, res) => {
    try {
    let files = await dir.filesDirs(req.body.data);
    res.status(201).json(files) ;
    }
    catch(err) {
      console.log(err);
      res.status(500).json({'error':'directory path error'})
    }
  })
  server.post('/clickBrowser', async (req, res) => {
    let path = req.body.data.path;
    let file = req.body.data.file;
    try {
      let files = await dir.showDirectoryOrFileContent(path, file)
      res.status(201).json(files)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ 'error': 'click file browser error' })
    }
  })


  // Serve the item webpage with next.js as the renderer
  server.get('/item', (req, res) => {
    const itemData = api.getItem()
    app.render(req, res, '/item', { itemData })
  })

  // When rendering client-side, we will request the same data from this route
  server.get('/_data/item', (req, res) => {
    const itemData = api.getItem()
    res.json(itemData)
  })

  // Fall-back on other next.js assets.
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
