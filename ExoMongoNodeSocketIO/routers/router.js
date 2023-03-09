const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/', (req, res) => res.render('../views/signup'));

router.post('/signup', (req, res) => {
    const { nom, prenom, email, password, verifpassword } = req.body;

    if (!nom || !prenom || !email || !password || !verifpassword) {
        res.status(400).send('Tous les champs doivent être remplis');
        return;
    }

    if (password !== verifpassword) {
        res.status(400).send('Les mots de passe ne correspondent pas');
        return;
    }

    const newUser = new User({ 
        nom : nom, 
        prenom : prenom,
        email: email,
        password : password 
    });

    newUser.save()
        .then(() => console.log('Création utilisateur réussie !'))
        .catch(error => res.status(201).send('Utilisateur enregistré avec succès'));
});
    module.exports = router;






