const express = require('express')
const app = express()
const user = require("./routes/user");

app.use(express.json())

app.get("/user", user)
app.post("/user/create", user)
app.post("/user/login", user)

app.listen(3000)