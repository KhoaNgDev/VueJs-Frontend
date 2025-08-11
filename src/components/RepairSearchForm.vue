<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Tra cứu lịch sử sửa chữa</h5>

      <form @submit.prevent="handleSearch">
        <div class="mb-3">
          <label for="phone" class="form-label">Số điện thoại</label>
          <input
            id="phone"
            v-model="phone"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': phoneError }"
            placeholder="Nhập số điện thoại"
          />
          <div class="invalid-feedback">{{ phoneError }}</div>
        </div>

        <div class="mb-3">
          <label for="plate" class="form-label">Biển số xe</label>
          <input
            id="plate"
            v-model="plate"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': plateError }"
            placeholder="VD: 51A-12345"
          />
          <div class="invalid-feedback">{{ plateError }}</div>
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading">
              <span class="spinner-border spinner-border-sm me-2" />
              Đang tra cứu...
            </span>
            <span v-else>Tra cứu</span>
          </button>
        </div>

        <div v-if="showOtpForm" class="mb-3">
          <label for="otp" class="form-label">Mã OTP</label>
          <input
            id="otp"
            v-model="otp"
            type="text"
            class="form-control"
            placeholder="Nhập mã OTP"
          />
          <button
            class="btn btn-success mt-2"
            type="button"
            @click="handleVerifyOtp"
          >
            Xác nhận OTP
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRepairHistory } from '../composables/useRepairHistory';

const phone = ref('');
const plate = ref('');
const otp = ref('');
const phoneError = ref('');
const plateError = ref('');
const showOtpForm = ref(false);

const {
  handleSearch,
  handleVerifyOtp,
  loading,
} = useRepairHistory(
  phone,
  plate,
  phoneError,
  plateError,
  showOtpForm,
  otp
);
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
</style>
