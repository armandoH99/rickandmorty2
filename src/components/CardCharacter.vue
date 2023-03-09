<template>
  <div class="card" v-for="character in characters" :key="character.id">
    <div class="imagecontainer">

        <img :src="character.image" class="card-img-top" alt="..." />
       
    </div>
    <div class="card-body">
      <h4 class="card-title">{{ character.name }}</h4>
      <p class="card-text"><strong>Gender:</strong> {{ character.gender }}</p>
      <p class="card-text"><strong>Species:</strong> {{ character.species }}</p>
      <p class="card-text"><strong>Status:</strong> {{ character.status }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "CardCharacter",
    props: {
      characters: Object,
    },
  };
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .imagecontainer {
    /* height: 250px;    */
  }
  .card-img-top{
    border-radius: 5px;
  }
</style>
