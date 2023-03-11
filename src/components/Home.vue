<template>
  <div class="home-container">
    <div class="search-container flex fullW">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Say his name!, example: Heisenberg"
      />
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage = 1">First</button>
      <button :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <button :disabled="currentPage === pageCount" @click="currentPage++">Next</button>
      <button :disabled="currentPage === pageCount" @click="currentPage = pageCount">Last</button>
    </div>
    <div class="container flex">
      <CardsComponent :characters="charactersToShow" />
    </div>
   
  </div>
</template>

<script lang="ts" >
  import CardsComponent from "./CardsComponent.vue";
  import { Character } from "@/types/types";
  import { defineComponent } from "vue";


  export default defineComponent({
    name: "Home",
    components: {
      CardsComponent,
    },
    props: {
      characters: {
      type: Array as () => Character[],
      default: () => []
    }     
    },
    data() {
      return {
        searchTerm: "",
        itemsPerPage: 10,
        currentPage: 1,
      };
    },
    computed: {
      filteredCharacters() {
        if (!this.searchTerm) {
          return this.characters;
        }

        const searchTermLowerCase = this.searchTerm.toLowerCase();
        return this.characters.filter((character:Character) =>
          character.mainName.toLowerCase().includes(searchTermLowerCase)
        );
      },
      pageCount() {
        const filteredCount = this.filteredCharacters.length;
        return Math.ceil(filteredCount / this.itemsPerPage);
      },
      charactersToShow() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredCharacters.slice(startIndex, endIndex);
      },
    },
  });
</script>

<style>
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;

  }

  .pagination button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
  }

  .pagination button:hover {
    background-color: #eee;
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
