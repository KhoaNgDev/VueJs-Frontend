<template>
  <div class="our-faqs parallaxie">
    <div class="container">
      <div class="row section-row">
        <div class="col-lg-6">
          <div class="section-title">
            <h3 class="wow fadeInUp">Câu hỏi thường gặp</h3>
            <h2 class="text-anime-style-3" data-cursor="-opaque">
              Giải đáp các thắc mắc về hệ thống tra cứu sửa xe
            </h2>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="faq-accordion" id="accordion">
            <!-- Câu 1 -->
            <div class="accordion-item wow fadeInUp">
              <h2 class="accordion-header" id="heading1">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse1"
                  aria-expanded="true"
                  aria-controls="collapse1"
                >
                  1. Làm sao để tra cứu lịch sử sửa xe?
                </button>
              </h2>
              <div
                id="collapse1"
                class="accordion-collapse collapse show"
                aria-labelledby="heading1"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <p>
                    Bạn chỉ cần nhập số điện thoại hoặc biển số xe trên giao diện tra cứu. Hệ thống sẽ hiển thị thông tin xe và các lần sửa gần nhất.
                  </p>
                </div>
              </div>
            </div>

            <!-- Câu 2 -->
            <div class="accordion-item wow fadeInUp" data-wow-delay="0.2s">
              <h2 class="accordion-header" id="heading2">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2"
                  aria-expanded="false"
                  aria-controls="collapse2"
                >
                  2. Hệ thống có gợi ý lịch bảo trì định kỳ không?
                </button>
              </h2>
              <div
                id="collapse2"
                class="accordion-collapse collapse"
                aria-labelledby="heading2"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <p>
                    Có. Hệ thống tự động tính toán lịch bảo trì tiếp theo dựa trên lịch sử sửa chữa, và gửi nhắc lịch qua email hoặc SMS.
                  </p>
                </div>
              </div>
            </div>

            <!-- Câu 3 -->
            <div class="accordion-item wow fadeInUp" data-wow-delay="0.4s">
              <h2 class="accordion-header" id="heading3">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse3"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  3. Tôi có thể đánh giá chất lượng dịch vụ sau sửa không?
                </button>
              </h2>
              <div
                id="collapse3"
                class="accordion-collapse collapse"
                aria-labelledby="heading3"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <p>
                    Sau mỗi lần sửa chữa, bạn sẽ nhận được một liên kết đánh giá qua SMS/email. Bạn có thể chấm điểm và để lại nhận xét dễ dàng.
                  </p>
                </div>
              </div>
            </div>

            <!-- Câu 4 -->
            <div class="accordion-item wow fadeInUp" data-wow-delay="0.6s">
              <h2 class="accordion-header" id="heading4">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse4"
                  aria-expanded="false"
                  aria-controls="collapse4"
                >
                  4. Làm sao để bảo vệ thông tin cá nhân của tôi?
                </button>
              </h2>
              <div
                id="collapse4"
                class="accordion-collapse collapse"
                aria-labelledby="heading4"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <p>
                    Chúng tôi sử dụng xác thực OTP hoặc mật khẩu, phân quyền người dùng rõ ràng và bảo vệ API bằng token để đảm bảo an toàn thông tin cá nhân.
                  </p>
                </div>
              </div>
            </div>

            <!-- Câu 5 -->
            <div class="accordion-item wow fadeInUp" data-wow-delay="0.8s">
              <h2 class="accordion-header" id="heading5">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse5"
                  aria-expanded="false"
                  aria-controls="collapse5"
                >
                  5. Tôi cần tạo tài khoản để sử dụng không?
                </button>
              </h2>
              <div
                id="collapse5"
                class="accordion-collapse collapse"
                aria-labelledby="heading5"
                data-bs-parent="#accordion"
              >
                <div class="accordion-body">
                  <p>
                    Có. Bạn cần đăng ký số điện thoại để nhận mã OTP đăng nhập và theo dõi thông tin sửa chữa, đánh giá và nhận gợi ý bảo trì từ hệ thống.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
</style>
