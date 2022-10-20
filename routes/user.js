const express = require('express')
const router = express.Router();
let userDB = require("../userDatabase.js");

const bcrypt = require('bcrypt')

const users = []

const user2 = {};

router.get('/user', (req, res) => {
    res.json(users)
  });

router.post('/user/create', async (req, res) => {

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { name: req.body.name, password: hashedPassword }
      user2 = user;
      users.push(user)
      res.status(201).send()
    } catch {
      res.status(500).send()
    }
    console.log(user2);
})
  
router.post('/user/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
});
  
module.exports = router;
