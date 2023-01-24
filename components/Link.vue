<template>
  <a :class="{ active: isActive }">
    <slot />
  </a>
</template>
<style scoped>
a {
  padding: 3px 10px;
}
a.active {
  background-color: #eee;
}
</style>
<script lang="ts" setup>
import { useAttrs, computed } from 'vue'
import { usePageContext } from '../composables/usePageContext';

const pageContext = usePageContext()
const { href } = useAttrs();

const isActive = computed(() => {
  const { urlPathname } = pageContext
  return href === '/' ? urlPathname === href : urlPathname.startsWith(href as string)
})
</script>
