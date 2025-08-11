<template>
  <div class="our-services bg-radius-section">
    <div class="container">
      <!-- Section Title -->
      <div class="row section-row align-items-center">
        <div class="col-lg-6">
          <div class="section-title">
            <h3 class="wow fadeInUp">Dịch vụ</h3>
            <h2 class="text-anime-style-3" data-cursor="-opaque">
              Các dịch vụ sửa chữa xe máy
            </h2>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="section-title-content wow fadeInUp" data-wow-delay="0.2s">
            <p>
              Từ thay nhớt đến bảo dưỡng toàn diện, chúng tôi cung cấp đầy đủ
              dịch vụ để chiếc xe của bạn luôn vận hành an toàn và hiệu quả.
            </p>
          </div>
        </div>
      </div>

      <!-- Service List -->
      <div class="row">
        <!-- Dịch vụ 1 -->
        <div class="col-lg-3 col-md-6" v-for="(service, index) in services" :key="index">
          <div class="service-item wow fadeInUp" :data-wow-delay="`${index * 0.2}s`">
            <div class="service-item-header">
              <div class="icon-box">
                <img :src="service.icon" :alt="service.title" />
              </div>
              <div class="service-item-content">
                <h3><a href="#">{{ service.title }}</a></h3>
                <p>{{ service.description }}</p>
              </div>
            </div>
            <div class="service-image">
              <a href="#" data-cursor-text="Xem">
                <figure class="image-anime">
                  <img :src="service.image" :alt="service.title" />
                </figure>
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="col-lg-12">
          <div class="service-footer wow fadeInUp" data-wow-delay="0.8s">
            <p>
              Bạn sẽ hài lòng với dịch vụ của chúng tôi. Liên hệ ngay
              <a href="tel:935769312">(+84) 935769312</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: "Thay nhớt",
    description: "Thay dầu nhớt định kỳ giúp động cơ hoạt động bền bỉ hơn.",
    icon: "/fe/images/icon-service-1.svg",
    image: "/fe/images/4.jpg",
  },
  {
    title: "Thay bugi",
    description: "Giúp đánh lửa tốt hơn, tiết kiệm nhiên liệu và tăng hiệu suất máy.",
    icon: "/fe/images/icon-service-2.svg",
    image: "/fe/images/8.jpg",
  },
  {
    title: "Sửa phanh",
    description: "Đảm bảo hệ thống phanh hoạt động an toàn và ổn định.",
    icon: "/fe/images/icon-service-3.svg",
    image: "/fe/images/7.jpg",
  },
  {
    title: "Bảo dưỡng tổng quát",
    description: "Kiểm tra và bảo dưỡng toàn bộ xe máy định kỳ chuyên nghiệp.",
    icon: "/fe/images/icon-service-4.svg",
    image: "/fe/images/3.jpg",
  },
];
</script>

<style scoped>
</style>
