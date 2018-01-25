<template>
    <div class="singer">
      <listview @select="selectSinger" :data="singer"></listview>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import Singer from 'common/js/singer';
import listview from 'base/listview/listview';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      singer: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singer = this._normalizeSinger(res.data.list);
          // this.singer = res.data.list;
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          items: [],
          title: '热门'
        }
      };

      for (var i = 0; i < list.length; i++) {
        if (i < 10) {
          map.hot.items.push(
            new Singer({
              id: list[i].Fsinger_mid,
              name: list[i].Fsinger_name
            })
          );
        }
        const key = list[i].Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: list[i].Fsinger_mid,
            name: list[i].Fsinger_name
          })
        );
      }
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === '热门') {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      // console.log(hot.concat(ret));
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    listview
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
