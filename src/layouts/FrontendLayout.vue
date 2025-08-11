<template>
  <div>
    <Preloader />
    <Header />
    <FlashMessages :flash="flash" />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import Preloader from "./partials/Preloader.vue";
import Header from "./partials/Header.vue";
import Footer from "./partials/Footer.vue";
import FlashMessages from "../components/common/FlashMessages.vue";
const flash = {
  success: window.flash?.success || "",
  error: window.flash?.error || "",
  validation: window.flash?.validation || [],
};

if (flash.success) {
  Swal.fire({
    icon: "success",
    title: flash.success,
  });
}
</script>
