<template>
  <div class="client-slider bg-radius-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-12">
          <div class="client-slider-boxes">
            <!-- Slider 1 -->
            <div class="client-slider-box">
              <div class="swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(logo, index) in logos1" :key="'slide1-' + index">
                    <div class="client-logo">
                      <img :src="logo" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scroll Down Circle -->
            <div class="scroll-down-circle-box">
              <div class="scroll-circle-text">
                <figure>
                  <img src="/fe/images/scroll-circle-text.svg" alt="" />
                </figure>
                <div class="scroll-down-arrow">
                  <a href="#about-us">
                    <i class="fa-solid fa-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Slider 2 -->
            <div class="client-slider-box">
              <div class="swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(logo, index) in logos2" :key="'slide2-' + index">
                    <div class="client-logo">
                      <img :src="logo" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const logos1 = [
  '/fe/images/client-logo-1.svg',
  '/fe/images/client-logo-2.svg',
  '/fe/images/client-logo-1.svg'
]

const logos2 = [
  '/fe/images/client-logo-1.svg',
  '/fe/images/client-logo-2.svg',
  '/fe/images/client-logo-1.svg'
]
</script>

<style scoped>
</style>
