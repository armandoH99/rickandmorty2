<template>
  <div class="tall-component">
    <router-link to="/" class="routerlink">Go home</router-link>
    <div v-for="character in characters" :key="character.id">
      <div
        v-if="character.id.toString() == $route.params.id"
        class="big_card_inside"
      >
        <div class="big_card_image">
          <img :src="character.image" :alt="character.mainName" />
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
                <div
                  v-for="episodeUrl in character.episode"
                  :key="episodeUrl.url"
                >
                  <li v-if="episodeMap[episodeUrl.url]">
                    Episode: {{ episodeMap[episodeUrl.url].number }}, Name:
                    {{ episodeMap[episodeUrl.url].name }}
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tall-component2"></div>
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
      episodeMap(): Record<string, { number: string; name: string }> {
        return this.episodes.reduce((map, episode) => {
          map[episode.url] = {
            number: episode.episode,
            name: episode.name,
          };
          return map;
        }, {} as Record<string, { number: string; name: string }>);
      },
    },
  });
</script>
