<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  flash: Object
})

onMounted(() => {
  showFlash()
})

watch(() => props.flash, () => {
  showFlash()
})

function showFlash() {
  if (props.flash.success) {
    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: props.flash.success,
      position: 'center',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true
    })
  }

  if (props.flash.error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: props.flash.error
    })
  }

  if (props.flash.validation?.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      html: props.flash.validation.join('<br>')
    })
  }
}
</script>
<template>
  <div style="display: none;"></div>
</template>