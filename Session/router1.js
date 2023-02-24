const express = require('express')
const router1 = express()

router1.get('/', function(req, res) {
    res.send('Racine de l api router1')
})

router1.get('/about', function(req, res) {
    res.send('a propos')
})

module.exports = router1