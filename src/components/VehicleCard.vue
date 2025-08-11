<template>
  <div class="card shadow-sm mt-4 border-0">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0 text-primary fw-bold">Thông tin xe</h5>
        <button
          v-if="canExport"
          class="btn btn-outline-primary btn-sm"
          @click="handleExportPdf(vehicle.id)"
          :disabled="isExporting"
        >
          <span v-if="isExporting">
            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
            Đang xuất...
          </span>
          <span v-else>
            <i class="bi bi-file-earmark-arrow-down me-1"></i> Xuất PDF
          </span>
        </button>
      </div>

      <div class="row">
        <div class="col-md-6 mb-2">
          <strong>Biển số:</strong> {{ vehicle.plate_number }}
        </div>
        <div class="col-md-6 mb-2">
          <strong>Hãng:</strong> {{ vehicle.brand }}
        </div>
        <div class="col-md-6 mb-2">
          <strong>Model:</strong> {{ vehicle.model }}
        </div>
        <div class="col-md-6 mb-2">
          <strong>Màu sắc:</strong> {{ vehicle.color }}
        </div>
        <div class="col-md-6 mb-2">
          <strong>Năm sản xuất:</strong> {{ vehicle.year }}
        </div>
        <div class="col-md-6 mb-2">
          <strong>Chủ xe:</strong>
          {{ vehicle.user?.name }} <span class="text-muted">({{ vehicle.user?.email }})</span>
        </div>
      </div>

      <hr class="my-4" />

      <RepairDetail
        v-if="vehicle.repairs.length"
        :repairs="vehicle.repairs"
        :auth-user-id="authUserId"
        :ratings="ratings"
        @update-feedback="(repairId, payload) => $emit('update-feedback', repairId, payload)"
        @delete-feedback="$emit('delete-feedback', $event)"
      />

      <div v-else class="text-muted fst-italic text-center py-3">
        Chưa có lịch sử sửa chữa.
      </div>
    </div>
  </div>
</template>
<script setup>
import RepairDetail from "./RepairDetail.vue";
import { exportRepairs } from "../services/repairService";
import Swal from "sweetalert2";
import { ref } from "vue";

const props = defineProps({
  vehicle: Object,
  authUserId: Number,
  ratings: Object,
  canExport: Boolean,
});

const emit = defineEmits(["update-feedback", "delete-feedback"]);

const isExporting = ref(false);

async function handleExportPdf(vehicleId) {
  isExporting.value = true;

  try {
    const response = await exportRepairs(vehicleId);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "lich-su-sua-chua.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    Swal.fire("Lỗi", "Xuất PDF thất bại. Vui lòng thử lại.", "error");
  } finally {
    isExporting.value = false;
  }
}
</script>