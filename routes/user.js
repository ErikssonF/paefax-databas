const express = require('express')
const router = express.Router();
let userDB = require("../userDatabase.js");

const bcrypt = require('bcrypt')

router.get('/user', (req, res) => {
    let select = "SELECT * FROM users";

    rowData = [];

    userDB.all(select, (error, rows) =>{

        if(error){
            console.log(error)
            res.status(500).send();
        } else{
    
     rows.forEach((row) => {
        rowData.push(row);
        })
        console.log(rowData);
    }
})

    console.log(rowData);

    res.status(201).send();
  });

router.post('/user/create', async (req, res) => {

    try {

        //sätt ifsats för att kolla om användare finns
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { username: req.body.name, password: hashedPassword }
     
      //try catch block runt db-calls
      let insert = "INSERT INTO users (username, password) VALUES (?,?)";
      userDB.run(insert,[user.username, user.password]);

      res.status(201).send()
    } catch {
      res.status(500).send()
    }
})
  
router.post('/user/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.name)
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

