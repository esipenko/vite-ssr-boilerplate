<template>
  <button class="counter" type="button" @click="incrementCounter">
    Counter {{ counter }}
  </button>
  <p>{{ $t('doubledCounter', { value: doubledCounter }) }}</p>
</template>

<script lang="ts" setup>
import useCounter from '../composables/useCounter';

const { counter, doubledCounter, incrementCounter } = useCounter();
</script>

<style lang="scss">
.counter {
  background: $primary-color;
  color: $white;
}
</style>
