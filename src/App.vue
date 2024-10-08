<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="page">
    <header class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/editor">Editor</RouterLink>
      </nav>
    </header>
    <RouterView class="content"/>
  </div>
</template>

<style scoped>
.page{
  display: flex;
  flex-direction: column;
}
.header{
  display: flex;
  align-items: center;
  border: 1px solid red;
  background: #f1f2f3;
  height: 26px;
}
.content{
  flex: 1;
}
</style>
