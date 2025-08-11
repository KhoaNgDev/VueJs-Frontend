<!-- Hero Section -->
<template>
  <div class="hero parallaxie">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-12">
          <div class="hero-content">
            <!-- Tiêu đề -->
            <div class="section-title dark-section">
              <h3 class="wow fadeInUp">
                Chào mừng đến với hệ thống tra cứu sửa xe
              </h3>
              <h1 class="text-anime-style-3" data-cursor="-opaque">
                Kiểm tra lịch sử – Chủ động bảo dưỡng
              </h1>
            </div>

            <!-- Nút hành động -->
            <div
              class="hero-btn wow fadeInUp d-flex gap-3"
              data-wow-delay="0.2s"
            >
              <button
                class="btn-default d-flex align-items-center gap-2"
                @click="handleSearchClick"
              >
                Tra cứu ngay <i class="fas fa-arrow-right"></i>
              </button>

              <RouterLink
                to="/contact"
                class="btn-default btn-outline d-flex align-items-center gap-2"
              >
                Liên hệ
              </RouterLink>
            </div>

            <!-- Danh sách tính năng -->
            <div class="hero-list wow fadeInUp mt-4" data-wow-delay="0.4s">
              <ul>
                <li>
                  <i class="fas fa-check-circle text-primary me-2"></i>Tra cứu
                  lịch sử sửa chữa theo SĐT hoặc biển số xe.
                </li>
                <li>
                  <i class="fas fa-check-circle text-primary me-2"></i>Gợi ý
                  thời gian bảo dưỡng định kỳ chính xác.
                </li>
                <li>
                  <i class="fas fa-check-circle text-primary me-2"></i>Đánh giá
                  dịch vụ, xác thực OTP an toàn.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAuthStore } from "../../stores/authStore";

const router = useRouter();
const auth = useAuthStore();

const handleSearchClick = async () => {
  if (!auth.isAuthenticated) {
    const result = await Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Bạn cần đăng nhập để tra cứu lịch sử sửa xe. Bạn có muốn đăng nhập ngay không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng nhập",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      router.push("/login");
    }
  } else {
    router.push("/search");
  }
};
</script>
<style scoped>
.btn-default {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.btn-default:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}
.btn-outline:hover {
  background-color: #fff;
  color: #000;
}
</style>
