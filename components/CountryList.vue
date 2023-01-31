<template>
  <ul>
    <li v-for="(c, idx) in countries" :key="idx">
      Country: {{ c.name }}, code: {{ c.code }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ countries: { code: string; name: string }[] }>();
</script>
