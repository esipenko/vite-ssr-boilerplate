<template>
    <h1>
        {{ $t('ssgTitle') }}
    </h1>
    <p>
        Counter: {{ counter }}
    </p>
    <p>{{ $t('doubledCounter', { value: doubledCounter }) }}</p>
</template>

<script lang="ts" setup>
import useCounter from '../../composables/useCounter';

const {counter, doubledCounter} = useCounter();

</script>