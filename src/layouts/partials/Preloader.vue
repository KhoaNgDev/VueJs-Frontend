<template>
  <div class="preloader" v-if="visible">
    <div class="loading-container">
      <div class="loading"></div>
      <div id="loading-icon">
        <img :src="loaderImage" alt="Loading..." />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visible = ref(true);

const loaderImage = "fe/images/loader.svg";

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
  }, 800);
});
</script>

<style scoped>

</style>
