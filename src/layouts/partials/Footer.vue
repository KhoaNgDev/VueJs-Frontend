<template>
  <footer class="main-footer bg-radius-section">
    <div class="container">
      <div class="row">
        <!-- Logo & Contact -->
        <div class="col-lg-12">
          <div class="footer-header">
            <div style="color: aliceblue" class="footer-logo">
              Hệ thống sửa chữa ô tô
            </div>
            <div class="footer-contact-box">
              <div class="footer-contact-item">
                <div class="icon-box">
                  <img src="/fe/images/icon-phone.svg" alt="Phone" />
                </div>
                <div class="footer-contact-content">
                  <h3>Liên hệ</h3>
                  <p>+84 935 769 312</p>
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="icon-box">
                  <img src="/fe/images/icon-mail.svg" alt="Email" />
                </div>
                <div class="footer-contact-content">
                  <h3>Email</h3>
                  <p>support@repair-system.vn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- About -->
        <div class="col-lg-6">
          <div class="about-footer footer-links">
            <h3>Giới thiệu hệ thống</h3>
            <p>
              Đây là nền tảng hỗ trợ khách hàng tra cứu lịch sử sửa chữa xe thông qua số điện thoại hoặc biển số xe. Hệ
              thống còn cung cấp các chức năng như gợi ý bảo trì định kỳ, đánh giá chất lượng sau sửa và đảm bảo an toàn
              dữ liệu người dùng thông qua xác thực và phân quyền.
            </p>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-4">
          <div class="footer-links">
            <h3>Chức năng chính</h3>
            <ul>
              <li><RouterLink to="/">Trang chủ</RouterLink></li>
              <li><RouterLink to="/">Tra cứu sửa chữa</RouterLink></li>
              <li><RouterLink to="/">Đánh giá dịch vụ</RouterLink></li>
              <li><RouterLink to="/">Gợi ý bảo trì</RouterLink></li>
            </ul>
          </div>
        </div>

        <!-- Support -->
        <div class="col-lg-2 col-md-4">
          <div class="footer-links">
            <h3>Hỗ trợ</h3>
            <ul>
              <li><RouterLink to="/">Câu hỏi thường gặp</RouterLink></li>
              <li><RouterLink to="/">Điều khoản sử dụng</RouterLink></li>
              <li><RouterLink to="/">Chính sách bảo mật</RouterLink></li>
              <li><RouterLink to="/">Liên hệ hỗ trợ</RouterLink></li>
            </ul>
          </div>
        </div>

        <!-- Security -->
        <div class="col-lg-2 col-md-4">
          <div class="footer-links">
            <h3>Bảo mật</h3>
            <ul>
              <li>Xác thực OTP</li>
              <li>Phân quyền người dùng</li>
              <li>Bảo vệ API bằng token</li>
              <li>Ghi log & hạn chế truy vấn</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="text-center mt-4 text-light small">
        © {{ currentYear }} Hệ thống sửa chữa ô tô. Bảo lưu mọi quyền.
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
