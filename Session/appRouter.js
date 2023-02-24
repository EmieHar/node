const express = require('express')
const app = express()


const router1 = require('./router1')
const router2 = require('./router2')



app.use('/api1/', router1)
app.use('/api2/', router2)

app.listen(8083,function(){
    console.log('listening on 8082')
})