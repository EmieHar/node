<template>
    <div>
        <h2>Enregistrer un nouveau client:</h2>

        <label for="lastaname">Nom:</label>
        <input type="text" name="lastname" v-model='lastname' /><br><br>

        <label for="firstname">Prénom:</label>
        <input type="text" name="firstname" v-model="firstname" /><br><br>

        <h2>Adresse:</h2>

        <label for="rue">Rue:</label>
        <input type="text" name="rue" v-model="rue"><br><br>

        <label for="cp">Code postal:</label>
        <input type="text" name="cp" v-model="cp"><br><br>

        <label for="ville">Ville:</label>
        <input type="text" name="ville" v-model="ville"><br><br>

        <button @click="envoi()">Enregistrer</button>
    </div>
</template>
  
<script>


import axios from 'axios';

export default {
    name: 'FormView',
    data: function () {
        return {
            lastname: "",
            firstname: "",
            adresse: {
                rue: "",
                cp: "",
                ville: "",
            }
        }
            
    },
    methods: {
        envoi: function () {
            axios.post("http://localhost:8082/addclient", 
            {   lastname: this.lastname, 
                firstname: this.firstname, 
                adresse:{ rue: this.rue, cp: this.cp, ville: this.ville}
            })
                .then(response => console.log(response.data))
        }
    },
    // beforeUnmount: function () {
    //     axios.get("http://localhost:8082/close")
    //     console.log("coucou")
    // }

}
</script>