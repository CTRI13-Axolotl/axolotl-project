const path = require('path');
const express = require('express');
const petRouter = require('./routes/petRouter');
const userController = require('./controllers/userController');
const cors = require('cors');
const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve app production bundle
app.use(express.static(path.resolve(__dirname, '../src')));

// Serve API requests from the router
app.use('/api/pets', petRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../index.html'));
});

app.get('/login', userController.verifyUser, (req, res) => {
  res.status(200);
});

app.post('/login', userController.createUser, (req, res) => {
  // res.status(200).redirect('/'); //THIS IS THE PROFILE PAGE?? "/"
  res.status(200).json(res.locals.newUser);
}); //when you land at '/'

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
