<template>
  <div class="p-3 border rounded bg-light mt-3">
    <label class="form-label fw-bold">Số sao đánh giá:</label>
    <select v-model.number="localRating" class="form-select mb-2">
      <option disabled :value="0">Chọn số sao</option>
      <option v-for="n in 5" :key="n" :value="n">{{ n }} sao</option>
    </select>

    <textarea
      v-model="localFeedback"
      class="form-control mb-2"
      placeholder="Nhập phản hồi của bạn"
    ></textarea>

    <div class="d-flex gap-2">
      <button
        type="button"
        class="btn btn-success btn-sm w-50"
        @click="handleSubmit"
        :disabled="loading || localRating === 0"
      >
        <span v-if="loading">
          <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
          Đang lưu…
        </span>
        <span v-else>Lưu</span>
      </button>

      <button
        type="button"
        class="btn btn-secondary btn-sm w-50"
        @click="$emit('cancel')"
        :disabled="loading"
      >
        Huỷ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  rating: { type: Number, default: 0 },
  feedback: { type: String, default: "" },
  onSubmit: { type: Function, required: true },
});
const emit = defineEmits(["submit", "cancel"]);

const loading = ref(false);

const localRating = ref(props.rating);
const localFeedback = ref(props.feedback);


watch(() => props.rating, (val) => (localRating.value = val));
watch(() => props.feedback, (val) => (localFeedback.value = val));

const handleSubmit = async () => {
  loading.value = true;
  try {
    await props.onSubmit({
      rating: localRating.value,
      feedback: localFeedback.value,
    });

    emit("cancel");
  } catch (e) {
    console.error("Lỗi submit feedback:", e);
  } finally {
    loading.value = false;
  }
};
</script>
