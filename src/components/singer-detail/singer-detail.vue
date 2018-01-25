<template>
  <transition name="slide">
      <div class="singer-detail">6666666666666666666666666</div>
  </transition>
</template>

<script type="text/ecmascript-6">
// import MusicList from 'components/music-list/music-list'
import { getSingerDetail } from 'api/singer';
import { ERR_OK } from 'api/config';
// import {createSong} from 'common/js/song'
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail();
    // console.log(this.singer);
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then(res => {
        console.log(res.code);
        if (res.code === ERR_OK) {
          console.log(res.data.list);
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer-detail {
  background: red;
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>