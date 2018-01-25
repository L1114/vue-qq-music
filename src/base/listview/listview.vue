<template>
 <scroll class="listview" 
 :data="data" ref="listview"
 :listenScroll="listenScroll" 
 @scroll="scroll">
   <ul>
     <li v-for="(group,index) in data" class="list-group" :key="index" ref="listGroup">
       <h2 class="list-group-title">{{group.title}}</h2>
       <ul>
         <li @click="selectItem(item)" v-for="(item,index) in group.items" class="list-group-item" :key="index">
           <img v-lazy="item.avatar" class="avatar">
           <span class="name">{{item.name}}</span>
         </li>
       </ul>
     </li>
   </ul>
   <div class="list-shortcut">
     <ul>
       <li v-for="(item,inde) in shortcutList" class="item" :key="inde" 
       @touchstart="ShortcutTouchStart(inde)" :class="{'current':index===inde}">
         {{item}}
       </li>
     </ul>
   </div>
   <!-- 固定的title字母标题 -->
   <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
   </div>
 </scroll>
</template> 

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll';
// import Loading from 'base/loading/loading'
// import {getData} from 'common/js/dom'

// const TITLE_HEIGHT = 30;
// const ANCHOR_HEIGHT = 18;

export default {
  created() {
    this.listenScroll = true;
    this.probeType = 3;
    // Code that will run only after the
    // entire view has been rendered
    // this.len = this.$refs.listGroup.length;
    // this.len = this.data.length;
    // console.log(this.data);
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      index: 0,
      scrollY: 0
      // len: 0
    };
  },
  mounted: function() {},
  computed: {
    len() {
      return this.data.length;
    },
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      // console.log(this.scrollY);
      if (this.scrollY >= 0) {
        return '';
      }
      return this.data[this.index] ? this.data[this.index].title : '';
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);
    },
    ShortcutTouchStart(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);
      // console.log(index);
    },
    scroll(pos) {
      // console.log(
      //   this.$refs.listGroup[0].getBoundingClientRect().top - 88,
      //   this.len
      // );
      this.scrollY = pos.y;
      console.log(this.scrollY);
      for (var i = 0; i < this.len; i++) {
        let initTop =
          this.$refs.listGroup[this.index].getBoundingClientRect().top - 88;
        let initHeight = this.$refs.listGroup[this.index].offsetHeight;

        if (initTop < 0 && initTop > -initHeight) {
          return;
        }
        // console.log(this.index);
        let top = this.$refs.listGroup[i].getBoundingClientRect().top - 88;
        let height = this.$refs.listGroup[i].offsetHeight;
        // console.log(this);
        if (top <= 10 && top >= -height + 10) {
          this.index = i;
          return;
        }
      }
    }
  },
  // watch: {
  //   index() {
  //     console.log('改变');
  //   }
  // },
  components: {
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
