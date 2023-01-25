<template>
    <select v-model="locale">
        <option v-for="(l, idx) in localeOptions" :key="idx" :value="l">
            {{ $t(l) }}
        </option>
    </select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({ useScope: 'global' })


const localeOptions = ['ru', 'en'];

const selectedValue = ref(locale.value);

</script>