const path = require('path');
const express = require('express');
// const router = require('./lib/router');
const cors = require('cors');
const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve API requests from the router

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../index.html'));
});

app.get('/api', (req, res) => {
  res.status(200).send('server works!');
});
// Serve app production bundle
// app.use(express.static('dist/client'));

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for..."),
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
