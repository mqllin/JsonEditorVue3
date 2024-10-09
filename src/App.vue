<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="page">
    <header class="header">
      <nav>
        <RouterLink to="/">Editor</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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
  background: #f1f2f3;
  height: 26px;
  border-bottom: 1px solid #999;
}
.content{
  flex: 1;
}
</style>
