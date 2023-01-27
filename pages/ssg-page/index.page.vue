<template>
    <h1>
        {{ $t('ssgTitle') }}
    </h1>
    <p>
        Counter: {{ counter }}
    </p>
    <p>{{ $t('doubledCounter', { value: doubledCounter }) }}</p>
    <ul>
    <li v-for="(d, key) in disneyCharacters" :key="key">
      <a :href="d.url">{{ d.name }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import useCounter from '../../composables/useCounter';
import { DisneyCharacterDto } from '../../types/dto/disneyCharacter';

const {counter, doubledCounter} = useCounter();
defineProps<{disneyCharacters: DisneyCharacterDto[]}>()
</script>