<template>
  <header class="main-header bg-dark text-white shadow-sm py-2">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <!-- Logo / Brand -->
        <RouterLink to="/" class="navbar-brand fs-4 fw-bold">
          Sửa chữa ô tô
        </RouterLink>

        <!-- Toggle Mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="mainNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" active-class="active"
                >Trang chủ</RouterLink
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="handleSearchClick">
                Tra cứu sửa chữa
              </a>
            </li>
          </ul>

          <!-- Tài khoản -->
          <ul class="navbar-nav ms-auto align-items-center">
            <template v-if="user">
              <li class="nav-item text-warning fw-semibold me-2">
                <i class="fas fa-user-circle me-1"></i> {{ user.name }}
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-light" @click="logout">
                  <i class="fas fa-sign-out-alt me-1"></i> Đăng xuất
                </button>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <RouterLink
                  to="/login"
                  class="btn btn-sm btn-warning fw-semibold"
                >
                  <i class="fas fa-sign-in-alt me-1"></i> Đăng nhập
                </RouterLink>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore"; 

const router = useRouter();
const authStore = useAuthStore();
const user = ref(null);

onMounted(() => {
  const userData = localStorage.getItem("auth_user");
  if (userData) {
    const parsedUser = JSON.parse(userData);
    user.value = JSON.parse(userData);
    authStore.setUser(parsedUser);
  }
});

function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = "/login";
}

async function handleSearchClick() {
  if (!authStore.isAuthenticated) {
    const result = await Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Bạn cần đăng nhập để tra cứu lịch sử sửa chữa. Bạn có muốn đăng nhập ngay không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng nhập",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      router.push("/login");
    }
  } else {
    router.push("/search");
  }
}
</script>
