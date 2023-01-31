<template>
  <button @click="showModal = true">Show form modal</button>
  <Teleport to="body" v-if="isMounted">
    <BaseModal :show="showModal" @close="showModal = false">
      <template #body>
        <TestForm />
      </template>
    </BaseModal>
  </Teleport>
</template>

<script lang="ts" setup>
import BaseModal from './BaseModal.vue';
import TestForm from './TestForm.vue';

import { onMounted, ref } from 'vue';

const showModal = ref(false);
// Если по умолчанию отрисовывать телепорт, будут ошибки гидрации
// https://vuejs.org/guide/scaling-up/ssr.html#teleports
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>
