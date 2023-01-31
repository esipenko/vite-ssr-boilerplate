<template>
  <h1>This is apollo ssr</h1>
  <CountryList :countries="countries" />
</template>
<script lang="ts" setup>
import CountryList from '@/components/CountryList.vue';

defineProps(['countries']);
</script>
