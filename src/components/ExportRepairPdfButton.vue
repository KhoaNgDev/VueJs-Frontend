<script setup>
import { exportRepairs } from '../services/repairService'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const props = defineProps({
    vehicleId: {
        type: [String, Number],
        required: true
    }
})

const loading = ref(false)

function handleExport() {
    loading.value = true
    exportRepairs(props.vehicleId)
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'lich-su-sua-chua.pdf')
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
        .catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Xuất PDF thất bại, vui lòng thử lại.'
            })
        })
        .finally(() => {
            loading.value = false
        })
}
</script>

<template>
    <button @click="handleExport" :disabled="loading" class="btn btn-primary">
        <span v-if="loading">Đang xuất...</span>
        <span v-else>Xuất PDF</span>
    </button>
</template>
