<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          formatter ? formatter($event.target.value) : $event.target.value
        )
      "
    />

    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: { type: String, default: "" },
  modelValue: String,
  error: String,
});

defineEmits(["update:modelValue"]);
</script>


