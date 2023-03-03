<template>
  <div>
    <h1>Token Vue.js</h1>

    <input type="email" name="email" placeholder="Email" v-model="email">
    <br>
    <input type="password" name="password" placeholder="Password" v-model="password">
    <br>
    <!-- <input type="submit" value="Se connecter" @click="envoi()"> -->
    <button @click="envoi()">Connect</button>
  
   
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
    envoi: function() {
      
      axios.post("http://localhost:8082/user/login", {email: this.email, password: this.password})
      .then( response => {
                    console.log(response.data)
                    this.$store.state.token = response.data 
                    // const payload = response.data.split('.')[1]
                    // const infos = JSON.parse(window.atob(payload))
                    // console.log("infos:",infos)
                })
    }
  }
}
</script>
