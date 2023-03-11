<template>
  <div class="parentcontainer">
    <div class="logocontainer flex fullW">
      <img src="./assets/textrickandmorty.png" class="logo" alt="..." />
    </div>
    <router-view :characters="characters" :episodes="episodes"></router-view>
  </div>
</template>

<script lang="ts">
  import Home from "./components/Home.vue";
  import axios from "axios";
  import { Character } from "./types/types";
  import { Episode } from "./types/types";
  import { BaseCharacter } from "./types/types";
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "App",
    components: {
      Home,
    },
    data(): { characters: Character[]; episodes: Episode[] } {
      return {
        characters: [],
        episodes: [],
      };
    },
    async mounted() {
      this.getAllCharacters();
      this.getAllEpisodes();
    },
    methods: {
      async getAllCharacters() {
        console.log('hey')
        try {
          const res = await axios.get(
            "https://rickandmortyapi.com/api/character/"
          );
          const totalPages = res.data.info.pages;
          let nextPageUrl = res.data.info.next;
          let initialcharacters = res.data.results;

          for (let i = 2; i <= totalPages; i++) {
            const nextPageRes = await axios.get(nextPageUrl);
            nextPageUrl = nextPageRes.data.info.next;
            initialcharacters.push(...nextPageRes.data.results);
          }
          const characters: Character[] = initialcharacters.map(
            ({
              id,
              name: mainName,
              image,
              status,
              gender,
              species,
              episode,
              location: { name: locationName },
              origin: { name: originName },
            }: BaseCharacter) => ({
              id,
              mainName,
              image,
              gender,
              status,
              species,
              episode,
              originName,
              locationName,
            })
          );
          console.log(characters);
          this.characters = characters;
        } catch (e) {
          console.log(e);
        }
      },
      async getAllEpisodes() {
        try {
          const res = await axios.get(
            "https://rickandmortyapi.com/api/episode"
          );
          const totalPages = res.data.info.pages;
          // console.log(totalPages)
          let nextPageUrl = res.data.info.next;
          let initialepisodes = res.data.results;

          for (let i = 2; i <= 3; i++) {
            const nextPageRes = await axios.get(nextPageUrl);
            nextPageUrl = nextPageRes.data.info.next;
            initialepisodes.push(...nextPageRes.data.results);
          }
          const episodes = initialepisodes.map(
            ({ id, name, url, episode }: Episode) => ({
              id,
              name,
              url,
              episode,
            })
          );
          console.log(episodes);
          // this.episodes = episodes;
        } catch (e) {
          console.log(e);
        }
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
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  .red {
    color: red;
  }
  body {
    font-family: "Poppins", sans-serif;
    background-image: url("./assets/openyoureyesmorty.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    background-color: #02032d;
    height: 100vh;
  }
  .parentcontainer {
    overflow: auto;
    padding-top: 30px;
  }
  .tall-component {
    height: 1500px;
  }
  .tall-component2 {
    height: 1100px;
  }

  /* all the app components */
  .flex {
    display: flex;
  }
  .fullW {
    width: 100%;
  }
  .borderRound {
    border-radius: 5px;
  }
  .container {
    height: 800px;
    padding: 50px;
    flex-wrap: wrap;
    gap: 50px;
  }
  .card {
    margin: auto;
    padding: 4px;
    background-color: #208d45;
    flex-direction: column;
  }
  .card-body {
    background-color: #02ff97;
    padding-left: 10px;
    padding-right: 10px;
  }
  .search-container {
    justify-content: center;
    margin-top: 20px;
  }
  .logocontainer {
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
  .routerlink {
    color: 02032d;
    margin: auto;
    display: flex;
    border: 2px solid #208d45;
    width: 150px;
    height: 40px;
    background-color: #02ff97;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    color: #e762d7;
    margin-bottom: 50px;
    margin-top: 20px;

    text-decoration: none;
  }
  .routerlink text :visited {
    color: green;
  }
  .routerlink text :hover {
    color: green;
  }
  .big_card_inside {
    display: flex;
    width: 810px;
    flex-wrap: wrap;
    background-color: #208d45;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-left: auto;
    margin-right: auto;

    padding: 20px;
    border-radius: 8px;
  }
  .big_card_image {
    margin-right: 20px;
  }
  .big_card_image img {
    width: 200px;
    border: 2px solid #02ff97;
    border-radius: 5px;
  }
  .big_card_details {
    background-color: #02ff97;
    border-radius: 5px;
    width: 70%;
    padding-left: 5px;
    padding-right: 5px;
  }
  .big_card_details h1 {
    font-size: 32px;
    margin-bottom: 20px;
  }
  .big_card_details ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .big_card_details ul li {
    margin-bottom: 10px;
  }
  .episodes-list {
    max-height: 200px;
    overflow-y: auto;
  }
</style>
