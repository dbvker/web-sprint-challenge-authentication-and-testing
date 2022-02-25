const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./auth-model');

router.post('/register', async (req, res, next) => {
 const { username, password } = req.body;

 if (!username || !password || req.body === null) {
  next({ message: 'username and password required' })
 } else if (username) {
    const checkUsername = await User.findBy({ username: username }).first();
    if (checkUsername) {
      next({ message: 'username taken' })
    } else {
     const passwordHash = bcrypt.hashSync(password, 8);
      User.addUser({ username, password: passwordHash })
       .then(added => {
         res.status(200).json(added)
       }).catch(next)
    }
 }
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
