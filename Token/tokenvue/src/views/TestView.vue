<template>
  <div>
    <h1>Token Vue.js</h1>
   <button @click="envoi()">Test</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TestView',
  data: function(){
    return{
      name: "",
      email: "",
      password: "",
    }
  },
  methods:{
    envoi: function() {
        // var tokenFromLocalStorage = localStorage.getItem('token')
        console.log(this.$store.state.token)
        var tokenFrom = this.$store.state.token
        var config = {}
        config.headers = {"Authorization": tokenFrom }
     
        console.log(config)
        axios.get("http://localhost:8082/api/orders", config )
                .then( response => {
                    console.log(response.data)
                   
                })
    }
  }
}
</script>
