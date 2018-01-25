<template> 
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.picUrl + ')' }"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-blue"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  data() {
    return {};
  },
  props: {
    listImg: {
      type: Array,
      default: []
    },
    autoplay: {
      default() {
        return {
          delay: 10
        };
      }
    }
  },
  mounted() {
    let autoplay = this.autoplay;
    let swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay,
      paginationClickable: true,
      loop: true,
      speed: 600,
      onTouchEnd: function() {
        swiper.startAutoplay();
      }
    });
  },
  methods: {},
  destroyed() {}
};
</script>

<style scoped lang="css">
.swiper-container,
.swiper-wrapper {
  width: 100%;
  height: 150px;
}
.swiper-slide {
  background: center center;
  background-size: 100% 100%;
}
</style>
