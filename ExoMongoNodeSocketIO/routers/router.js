const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const memoryStore = new MemoryStore();

router.use(session({
    store: memoryStore,
    secret: 'une phrase pour hash',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:246060*1000}
}))

router.get('/', (req, res) => res.render('signup'));

router.post('/signup', (req, res) => {
    const { nom, prenom, email, password, verifpassword } = req.body;

    if (!nom || !prenom || !email || !password || !verifpassword) {        
        res.render('signup', {message: 'Tous les champs doivent être remplis'});
        return;
    }

    if (password !== verifpassword) {
        res.render('signup', {message: 'Les mots de passe ne correspondent pas'});
        return;
    }

    const newUser = new User({
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
    });

    newUser.save()
        .then(() => res.render('signin', {message: 'Utilisateur enregistré avec succès'}))
        .catch(error => res.status(500).render('signup', {message: 'Erreur lors de l\'enregistrement de l\'utilisateur'}));
});

router.get('/signin', (req, res) => res.render('signin'));

router.post('/signin', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email:email})
                        .then((user)=>{
                            if(user){
                               if(bcrypt.compareSync(password, user.password))
                               {
                                console.log("email et mot de passe valides");
                                
                                req.session.idUser = user._id;
                                console.log(user._id);
                                req.session.nom = user.nom;
                                req.session.prenom = user.prenom;

                                res.redirect('/index')
                               }else{
                                    console.log("mauvais mot de passe")
                               }
                                 
                            }else{
                                console.log("mauvais mail")
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })

});

router.get('/index', (req, res) => res.render('index', {session: req.session}));
router.get('/chat', (req,res) => res.render('chat', {session: req.session}));


module.exports = router;






