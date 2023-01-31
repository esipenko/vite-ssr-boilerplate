<template>
  <h1>This is apollo client only</h1>
  <CountryList :countries="countries" />
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import testApolloRequest from '../../../utils/testApolloRequest';
import CountryList from '../../../components/CountryList.vue';

const { result } = testApolloRequest();

const countries = computed(() => {
  if (!result.value) {
    return [];
  }

  return result.value.countries;
});
</script>
