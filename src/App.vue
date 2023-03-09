<template>
  <div class="parentcontainer">
    <div class="logocontainer">
      <img src="./assets/textrickandmorty.png" class="logo" alt="..." />
    </div>

    <div class="search-container">
      <input v-model="searchTerm" type="text" placeholder="Say my name, ex: Heisemberg" />
    </div>
    <div class="container">
      <!-- <div class="content" style="overflow-y: scroll"> -->
        <CardCharacter :characters="filteredCharacters" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import CardCharacter from "./components/CardCharacter.vue";

  export default defineComponent({
    name: "App",
    components: {
      CardCharacter,
    },
    data() {
      return {
        characters: [],
        locations: [],
        episodes: [],
        searchTerm: "",
      };
    },
    created() {
      // Fetch the characters
      fetch("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.characters = data.results;

          //Fetch remaining characters
          const promises = [];
          for (let i = 2; i <= 42; i++) {
            promises.push(
              fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
            );
          }

          Promise.all(promises)
            .then((responses) =>
              Promise.all(responses.map((response) => response.json()))
            )
            .then((data) => {
              data.forEach((page) => {
                this.characters = this.characters.concat(page.results);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });

      // Fetch the locations
      fetch("https://rickandmortyapi.com/api/location")
        .then((response) => response.json())
        .then((data) => {
          this.locations = data.results;
        })
        .catch((error) => {
          console.error(error);
        });

      // Fetch the episodes
      fetch("https://rickandmortyapi.com/api/episode")
        .then((response) => response.json())
        .then((data) => {
          this.episodes = data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    computed: {
      filteredCharacters() {
        if (!this.searchTerm) {
          return this.characters;
        }
        return this.characters.filter((character) =>
          character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
  });
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: "Poppins", sans-serif;
    overflow: hidden;
  }
  .parentcontainer {
    background-image: url("./assets/openyoureyesmorty.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #02032d;
    height:100vh;
    overflow: auto;
    padding-top: 30px;
  }
  .container {
    /* overflow: auto;     */
    height: 800px;
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
  }
  .card {
    margin: auto;
    border-radius: 5px;
    padding:4px;
    background-color: #208d45;
    display: "flex";
    flex-direction: column;
    cursor: pointer;
  }
  .card-body {
    background-color: #02ff97;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;

  }
  .search-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .logocontainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 400px;

  }
  .search-container input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }  
</style>
