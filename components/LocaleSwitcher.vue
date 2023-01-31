<template>
  <select v-model="locale">
    <option v-for="(l, idx) in localeOptions" :key="idx" :value="l">
      {{ $t(l) }}
    </option>
  </select>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' });

const localeOptions = ['ru', 'en'];
</script>
