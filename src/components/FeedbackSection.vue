<template>
  <div class="mt-4">
    <label class="form-label fw-bold">Đánh giá:</label>

    <div
      v-for="fb in repair.repair_feedbacks"
      :key="fb.id"
      class="p-3 border rounded mb-2"
      :class="fb._new ? 'bg-success-subtle' : 'bg-white'"
    >
      <div class="text-muted small mb-1">
        Ngày: {{ formatDateTime(fb.created_at) }} -
        <span class="text-warning">{{ "⭐".repeat(fb.rating) }}</span>
      </div>

      <div class="border rounded p-2 bg-light mb-2">
        <div class="text-muted small mb-1">Khách hàng:</div>
        {{ fb.feedback }}
      </div>

      <div
        v-if="fb.admin_replies?.length"
        class="mt-2 pl-3 border-l-2 border-blue-500"
      >
        <p class="font-semibold">Phản hồi từ admin:</p>
        <div
          v-for="reply in fb.admin_replies"
          :key="reply.id"
          class="text-sm text-blue-600"
        >
          - {{ reply.reply }}
        </div>
      </div>

      <div
        v-if="repair.user_id === authUserId"
        class="d-flex justify-content-end gap-2 mt-2"
      >
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          @click="toggleForm"
        >
          Sửa
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          @click="$emit('delete-feedback', fb.id)"
        >
          Xoá
        </button>
      </div>
    </div>

    <div
      v-if="
        repair.repair_feedbacks.length === 0 && repair.user_id === authUserId
      "
    >
      <button
        type="button"
        class="btn btn-primary btn-sm mt-2"
        @click="toggleForm"
      >
        Đánh giá mới
      </button>
    </div>

    <FeedbackForm
      v-show="showForm"
      :rating="ratings[repair.id]?.rating || 0"
      :feedback="ratings[repair.id]?.feedback || ''"
      :onSubmit="handleSubmit"
      @cancel="showForm = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatDateTime } from "../utils/formatters";
import FeedbackForm from "./FeedbackForm.vue";

const props = defineProps({
  repair: Object,
  authUserId: Number,
  ratings: Object,
});

const emit = defineEmits(["update-feedback", "delete-feedback"]);
const showForm = ref(false);

const toggleForm = () => (showForm.value = !showForm.value);

const handleSubmit = async (payload) => {
  await emit("update-feedback", props.repair.id, payload);
};
</script>
