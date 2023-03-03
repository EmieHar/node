<template>
  <div>
    <h1>Token Vue.js</h1>
    
    <input type="text" name="name" placeholder="pseudo" v-model="name">
    <br>
    <input type="email" name="email" placeholder="Email" v-model="email">
    <br>
    <input type="password" name="password" placeholder="Password" v-model="password">
    <br>
    <input type="submit" value="Créer Compte" @click="envoi()">
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupView',
  data: function(){
    return{
      name: "",
      email: "",
      password: "",
    }
  },
  methods:{
    envoi: function(){
      axios.post("http://localhost:8082/user/signup", {name: this.name, email: this.email, password: this.password})
      .then(response => console.log(response.data))
    }
  }
}
</script>
