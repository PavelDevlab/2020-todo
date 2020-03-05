
const express = require('express');
const path = require('path');
const fs  = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('./build/public'));

app.get('*', (req, res) => {
  const indexFile = path.resolve('./build/public/main.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Something went wrong:', err);
      res.status(500).send('Oops, better luck next time!');
      return;
    }

    res.send(data);
  });
});


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`😎 Server is listening on port ${PORT}`);
});
