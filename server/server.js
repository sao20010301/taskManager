const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config({ path: `${__dirname}/../.env` })

const fetch = (...args) => 
    import('node-fetch').then(({default: fetch}) => fetch(...args))

const app = express()
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 4000

app.get('/login', async function (req, res) {
    console.log(req.query.code)
    const params = `client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${req.query.code}`
    const result = await fetch("https://github.com/login/oauth/access_token?" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    })
    const access_token = await result.json()
    res.cookie("access_token", access_token.access_token, {
        sameSite: "none",
        httpOnly: false,
        secure: "false"
    })
    res.send()
})
app.get('/logout', async function (req, res) {
    console.log("logout")
    res.clearCookie("access_token")
})
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });
app.listen(port, function () {
    console.log("Server running!!")
})
