<template>
  <div class="tall-component">
    <router-link to="/" class="routerlink">Go home</router-link>
    <div v-for="character in characters" :key="character.id">
      <div
        v-if="character.id.toString() == $route.params.id"
        class="big_card_inside"
      >
        <div class="big_card_image">
          <img :src="character.image" :alt="character.mainName"  class="imageChar"/>
        </div>
        <div class="big_card_details">
          <h1>{{ character.mainName }}</h1>
          <ul>
            <li><strong>gênero:</strong> {{ character.gender }}</li>
            <li><strong>Status:</strong> {{ character.status }}</li>
            <li><strong>Species:</strong> {{ character.species }}</li>
            <li><strong>Planet:</strong> {{ character.originName }}</li>
            <li><strong>Location:</strong> {{ character.locationName }}</li>
            <li>
              <strong>Episodes:</strong>
              <ul class="episodes-list">
                <li
                  v-for="episodeUrl in character.episode"
                  :key="episodeUrl.id"
                >
                  <template v-if="episodeMap[episodeUrl]">
                    <div>{{ episodeMap[episodeUrl].name }}</div>
                  </template>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div class="tall-component2"></div> -->
  </div>
</template>

<script lang="ts">
  import { Character } from "@/types/types";
  import { Episode } from "@/types/types";

  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Details",
    props: {
      id: String,
      characters: {
        type: Array as () => Character[],
        default: () => [],
      },
      episodes: {
        type: Array as () => Episode[],
        default: () => [],
      },
    },

    computed: {
      episodeMap(): Record<
        string,
        { id: number; number: string; name: string }
      > {
        return this.episodes.reduce((map, episode) => {
          map[episode.url] = {
            id: episode.id,
            number: episode.episode,
            name: episode.name,
          };
          return map;
        }, {} as Record<string, { id: number; number: string; name: string }>);
      },
    },
  });
</script>
