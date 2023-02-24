<template>
    <div>
      <h1>Liste des clients </h1>
  
      <h2>{{message}}:</h2>
  
        <div v-for="(item, index) in clients" v-bind:key="index" >
            
            <h2> nom: {{item.nom}}</h2>
            <h2> prenom: {{ item.prenom }}</h2>
            <h2>adresse:</h2>
            <h2>rue : {{item.adresse.rue}}</h2>
            <h2>code postal : {{item.adresse.cp}}</h2>
            <h2>ville : {{item.adresse.ville}}</h2>
<hr>
          
       </div>
          
    
  
    </div>
  </template>
  
  
  <script>
  
  import axios from 'axios';
  
  export default {
    name: 'ListeClients',
    data() {
      return {
        message: "voici la liste des clients",
        clients: []
      }
    },
    mounted: function() {
      axios.get('http://localhost:8082/clients')
        .then((response) => {
          this.clients = response.data.ok
          console.log(response.data.ok)
        })
    }
  
  }
  
  </script>