<template>
  <h1>Welcome</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>
  <ul>
    <li v-for="(d, key) in disneyCharacters" :key="key">
      <a :href="d.url">{{ d.name }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import Counter from '@/components/Counter.vue';
import { DisneyCharacterDto } from '@/types/dto/disneyCharacter';
defineProps<{ disneyCharacters: DisneyCharacterDto[] }>();
</script>
