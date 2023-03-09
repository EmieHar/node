require('./db/connect');
const express = require('express');
const userRouter = require('./routers/router');
const ejs = require('ejs');

const app = express();

const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(userRouter);

app.set('view engine','ejs');

app.listen(port, () => {
    console.log('ecoute sur port',port);
});