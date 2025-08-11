<template>
  <div>
    <label class="form-label fw-bold">Chọn đợt sửa chữa:</label>
    <select v-model.number="selectedRepairId" class="form-select mb-4">
      <option disabled :value="0">-- Chọn --</option>
      <option v-for="r in repairs" :key="r.id" :value="r.id">
        {{ r.repair_date }} - {{ formatCurrency(r.total_cost) }}
      </option>
    </select>

    <div
      v-for="r in repairs"
      :key="r.id"
      v-show="r.id === selectedRepairId"
      class="border rounded p-4 bg-light"
    >
      <p><strong>Ngày sửa:</strong> {{ r.repair_date }}</p>
      <p>
        <strong>Ghi chú kỹ thuật viên:</strong>
        {{ r.technician_note || "Không có" }}
      </p>
      <p><strong>Tổng chi phí:</strong> {{ formatCurrency(r.total_cost) }}</p>
      <p>
        <strong>Dịch vụ đã thực hiện:</strong>
        {{ r.services_performed || "Không có" }}
      </p>
      <p>
        <strong>Phụ tùng thay thế:</strong> {{ r.parts_replaced || "Không có" }}
      </p>
      <FeedbackSection
        :repair="r"
        :auth-user-id="authUserId"
        :ratings="ratings"
        @update-feedback="
          (repairId, payload) => $emit('update-feedback', repairId, payload)
        "
        @delete-feedback="$emit('delete-feedback', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatCurrency } from "../utils/formatters";
import FeedbackSection from "./FeedbackSection.vue";

const props = defineProps({
  repairs: Array,
  authUserId: Number,
  ratings: Object,
});

const selectedRepairId = ref(props.repairs[0]?.id || 0);
</script>
