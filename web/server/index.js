const express = require('express');
const next = require('next');

const PORT = process.env.PORT || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const showRoutes = require('./routes/testRoute.js')

    server.use('/api', showRoutes)

    

    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.log(ex.stack);
    process.exit(1);
  });

// https://www.youtube.com/watch?v=kmrJkrW-ha0&t=857s
