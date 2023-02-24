const express = require('express')
const router2 = express()

router2.get('/yo', function(req, res) {
    res.send(`Bienvenue`)
})

router2.get('/dd', function(req, res) {
    res.send(`Il est où dédé?`)
})

module.exports = router2