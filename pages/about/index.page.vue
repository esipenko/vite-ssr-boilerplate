<template>
  <h1>{{ $t('aboutTitle') }}</h1>
  <p v-html="$t('aboutContent')"></p>
</template>

<style>
code {
  font-family: monospace;
  background-color: #eaeaea;
  padding: 3px 5px;
  border-radius: 4px;
}
</style>
