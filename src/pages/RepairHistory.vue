<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-7 mb-4">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h3 class="mb-3">Tra cứu lịch sử sửa chữa</h3>
            <p class="text-muted mb-4">Nhập số điện thoại hoặc biển số xe.</p>

            <form @submit.prevent="handleSearch">
              <div class="mb-3">
                <label class="form-label">Số điện thoại</label>
                <input
                  type="text"
                  v-model="phone"
                  @input="formatPhone"
                  :class="['form-control', phoneError ? 'is-invalid' : '']"
                  placeholder="Ví dụ: 0935769312"
                  :disabled="showOtpForm || isPhoneDisabled"
                />
                <div v-if="phoneError" class="invalid-feedback">
                  {{ phoneError }}
                </div>
                <small v-if="isPhoneDisabled" class="text-warning">
                  Không thể nhập số điện thoại khi đang nhập biển số xe.
                </small>
              </div>

              <div class="mb-3">
                <label class="form-label">Biển số xe</label>
                <input
                  type="text"
                  v-model="plate"
                  @input="formatPlate"
                  :class="['form-control', plateError ? 'is-invalid' : '']"
                  placeholder="Ví dụ: 51K86195"
                  :disabled="showOtpForm || isPlateDisabled"
                />
                <div v-if="plateError" class="invalid-feedback">
                  {{ plateError }}
                </div>
                <small v-if="isPlateDisabled" class="text-warning">
                  Không thể nhập biển số khi đang nhập số điện thoại.
                </small>
              </div>
              <button
                v-if="!showOtpForm"
                type="submit"
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                <span v-if="loading">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Đang tra cứu...
                </span>
                <span v-else> Tra cứu </span>
              </button>
            </form>
            <button
              v-if="phone || plate || showOtpForm"
              @click="resetSearch"
              class="btn btn-outline-danger w-100 mt-2"
            >
              Nhập lại thông tin
            </button>

            <div v-if="showOtpForm" class="mt-4">
              <label class="form-label">Nhập mã OTP đã gửi</label>
              <input
                type="text"
                v-model="otp"
                @input="formatOtp"
                maxlength="6"
                class="form-control mb-3"
                placeholder="Nhập 6 số"
              />

              <button
                @click="handleVerifyOtp"
                class="btn btn-success w-100"
                :disabled="loading"
              >
                <span v-if="loading">
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Đang xác thực...
                </span>
                <span v-else> Xác thực OTP </span>
              </button>
            </div>

            <router-link to="/" class="btn btn-outline-secondary w-100 mt-3">
              Quay về
            </router-link>
          </div>
        </div>

        <div
          v-if="searched && history.length === 0"
          class="alert alert-info mt-4"
        >
          Không tìm thấy lịch sử sửa chữa.
        </div>

        <VehicleCard
          v-for="vehicle in history"
          :key="vehicle.id"
          :vehicle="vehicle"
          :auth-user-id="authUserId"
          :ratings="ratings"
          :can-export="canExport"
          @update-feedback="updateFeedback"
          @delete-feedback="deleteFeedback"
        />
      </div>

      <div class="col-lg-4">
        <ContactSidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRepairHistory } from "../composables/useRepairHistory";
import VehicleCard from "../components/VehicleCard.vue";
import ContactSidebar from "../components/ContactSidebar.vue";
const phone = ref("");
const plate = ref("");
const phoneError = ref("");
const plateError = ref("");
const showOtpForm = ref(false);
const otp = ref("");
const isPhoneDisabled = ref(false);
const isPlateDisabled = ref(false);
const resetSearch = () => {
  phone.value = "";
  plate.value = "";
  otp.value = "";
  phoneError.value = "";
  plateError.value = "";
  showOtpForm.value = false;
  isPhoneDisabled.value = false;
  isPlateDisabled.value = false;
  history.value = [];
};
const {
  history,
  searched,
  loading,
  authUserId,
  ratings,
  handleSearch,
  updateFeedback,
  deleteFeedback,
  handleVerifyOtp,
  canExport,
} = useRepairHistory(phone, plate, phoneError, plateError, showOtpForm, otp);
const formatPhone = () => {
  phone.value = phone.value.replace(/[^\d]/g, "").slice(0, 10);
  phoneError.value = "";
};
const formatPlate = () => {
  plate.value = plate.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
  plateError.value = "";
};
const formatOtp = () => {
  otp.value = otp.value.replace(/[^\d]/g, "").slice(0, 6);
};

watch(phone, (value) => {
  isPlateDisabled.value = !!value.trim();
  if (!value.trim()) plateError.value = "";
});
watch(plate, (value) => {
  isPhoneDisabled.value = !!value.trim();
  if (!value.trim()) phoneError.value = "";
});
</script>
