<template>
  <button type="button" @click="incrementCounter">Counter {{ counter }}</button>
  <p>{{ $t('doubledCounter', { value: doubledCounter }) }}</p>
</template>

<script lang="ts" setup>
import useCounter from '../composables/useCounter';

const { counter, doubledCounter, incrementCounter } = useCounter();
</script>
