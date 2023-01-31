<template>
  <div>
    <p>Name from store: {{ name }}</p>
    <p>Surname from store: {{ surname }}</p>
  </div>
  <form v-if="!isSubmitted" @submit="onSubmit">
    <input v-model="formData.name" />
    <input v-model="formData.surname" />
    <button type="submit">Отправить</button>
  </form>
  <div v-else>
    <p>
      {{ formData.name }}
    </p>
    <p>
      {{ formData.surname }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import useUser from '@/composables/useUser';
import { reactive, ref } from 'vue';

const isSubmitted = ref(false);
const formData = reactive({ name: '', surname: '' });
const { name, surname, setUser } = useUser();

const onSubmit = (e: Event) => {
  e.preventDefault();
  isSubmitted.value = true;
  setUser(formData);
};
</script>
