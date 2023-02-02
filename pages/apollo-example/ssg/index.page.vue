<template>
  <h1>This is apollo ssg page</h1>
  <CountryList :countries="countries" />
</template>
<script lang="ts" setup>
import CountryList from '@/components/CountryList.vue';

defineProps<{ countries: { code: string; name: string }[] }>();
</script>
