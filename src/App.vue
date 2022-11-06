<script setup></script>

<template>
  <div class="yellow-border"></div>
  <div class="container">
    <router-link v-if="$route.name !== 'home'" to="/"
      >Back to Issues List</router-link
    >
    <span v-else>&nbsp;</span>
    <h1>Issue Tracker</h1>
    <RouterView />
  </div>
</template>
