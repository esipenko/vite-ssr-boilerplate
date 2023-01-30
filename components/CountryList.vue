<template>
    <ul>
        <li v-for="c in countries">
            Country: {{ c.name }}, code:  {{ c.code }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
defineProps<{countries: {code: string, name: string}[]}>();
</script>