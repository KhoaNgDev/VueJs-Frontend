<template>
  <div
    class="d-flex justify-content-center align-items-center min-vh-100 bg-light"
  >
    <div class="card shadow-lg p-4" style="max-width: 420px; width: 100%">
      <div class="text-center mb-3">
        <img
          src="/assets/img/stisla-fill.svg"
          alt="logo"
          class="rounded-circle shadow-sm"
          width="80"
        />
        <h4 class="mt-3 fw-bold">Đăng nhập hệ thống</h4>
      </div>

      <form @submit.prevent="handleLogin">
        <div v-if="errors.length" class="alert alert-danger small">
          <ul class="mb-0 ps-3">
            <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
          </ul>
        </div>

        <div class="mb-3">
          <label class="form-label">Số điện thoại</label>
          <input
            v-model="phone"
            @input="formatPhone"
            type="text"
            class="form-control"
            placeholder="Nhập số điện thoại"
            
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Phương thức đăng nhập</label>
          <select v-model="mode" class="form-select">
            <option value="password">Mật khẩu</option>
            <option value="otp">OTP</option>
          </select>
        </div>

        <div v-if="mode === 'password'" class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            placeholder="Vui lòng nhập mật khẩu."
            class="form-control"
            
          />
        </div>

        <div v-else class="mb-3">
          <label class="form-label">Mã OTP</label>
          <div class="input-group">
            <input
              v-model="otp"
              type="text"
              class="form-control"
              placeholder="Nhập mã OTP"
              
            />
            <button
              type="button"
              class="btn btn-outline-primary"
              :disabled="sendingOtp || countdown > 0"
              @click="sendOtp"
            >
              {{ countdown > 0 ? `Gửi lại (${countdown})` : "Gửi OTP" }}
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading">
            <span
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            Đang đăng nhập...
          </span>
          <span v-else> Đăng nhập </span>
        </button>
      </form>
      <router-link to="/" class="btn btn-outline-secondary w-100 mt-2">
        Quay về trang chủ
      </router-link>

      <p class="text-center text-muted small mt-3 mb-0">
        &copy; KaneNguyen {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
const phone = ref("");
const loading = ref(false);

const password = ref("");
const otp = ref("");
const mode = ref("password");
const errors = ref([]);
const sendingOtp = ref(false);
const countdown = ref(0);
let timer = null;
const formatPhone = () => {
  phone.value = phone.value
    .replace(/[^\d]/g, "")
    .replace(/^0+/, "0")
    .slice(0, 10);
};

const sendOtp = async () => {
  if (!phone.value) {
    Swal.fire("Thiếu thông tin", "Vui lòng nhập số điện thoại.", "warning");
    return;
  }
  try {
    sendingOtp.value = true;
    await axios.post("/api/client/send-otp", { phone: phone.value });
    Swal.fire("Thành công", "OTP đã được gửi qua email.", "success");

    countdown.value = 60;
    timer = setInterval(() => {
      if (countdown.value > 0) countdown.value--;
      else clearInterval(timer);
    }, 1000);
  } catch (e) {
    Swal.fire(
      "Lỗi",
      e.response?.data?.message || "Không gửi được OTP.",
      "error"
    );
  } finally {
    sendingOtp.value = false;
  }
};

const handleLogin = async () => {
  errors.value = [];
  loading.value = true;

  try {
    const payload = {
      phone: phone.value,
      ...(mode.value === "password"
        ? { password: password.value }
        : { otp: otp.value }),
    };

    const { data } = await axios.post("/api/client/login", payload);
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(data.user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    Swal.fire("Thành công", "Đăng nhập thành công", "success").then(() => {
      window.location.href = "/search";
    });
  } catch (e) {
    if (e.response?.data?.errors) {
      errors.value = Object.values(e.response.data.errors).flat();
    } else {
      Swal.fire(
        "Lỗi",
        e.response?.data?.message || "Đăng nhập thất bại",
        "error"
      );
    }
  } finally {
    loading.value = false;
  }
};
</script>
