<template>
  <progress-bar />
  <div class="layout">
    <div class="navigation">
      <a href="/" class="logo">
        <img src="../assets/logo.svg" height="64" width="64" alt="logo" />
      </a>
      <Link href="/">{{ $t('links.home') }}</Link>
      <Link href="/about">{{ $t('links.about') }}</Link>
      <Link href="/only-client">{{ $t('links.clientOnly') }}</Link>
      <Link href="/ssg-page">{{ $t('links.ssg') }}</Link>

      <LocaleSwitcher />
    </div>
    <div class="content">
        <slot />
    </div>

  </div>
</template>

<script lang="ts" setup>
import Link from '../components/Link.vue'
import LocaleSwitcher from '../components/LocaleSwitcher.vue';
import ProgressBar from '../components/ProgressBar';
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>

<style scoped>
.layout {
  display: flex;
  max-width: 900px;
  margin: auto;
}

.content {
  padding: 20px;
  border-left: 2px solid #eee;
  padding-bottom: 50px;
  min-height: 100vh;
}

.navigation {
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.8em;
}

.logo {
  margin-top: 20px;
  margin-bottom: 10px;
}
.content {
  transition: opacity 0.15s ease-in;
}
.content.page-transition {
  opacity: 0;
}
</style>
