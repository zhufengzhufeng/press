<template>
  <div
    class="zh-carousel"
    :style="{height:height}"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        v-for="item in len"
        :key="item"
        :class="{active:currentSelcted == item-1}"
        @click="select(item-1)"
      >{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "zh-carousel",
  methods: {
    handleMouseEnter() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    handleMouseLeave() {
      this.run();
    },
    showChild() {
      this.prev = this.currentSelcted;
      this.$children.forEach((vm, index) => {
        vm.isSelected = this.currentSelcted; //  给儿子增加当前选中的是谁
        vm.currentIndex = index; // 当前第几个儿子
        vm.reverse = this.reverse;
      });
    },
    touchstart(e) {
      this.handleMouseEnter();
      if (e.touches.length > 1) {
        return;
      }
      this.startTouch = e.touches[0];
    },
    touchend(e) {
      let endTouch = e.changedTouches[0];
      let { clientX: x1, clientY: y1 } = this.startTouch;
      let { clientX: x2, clientY: y2 } = endTouch;

      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      let disY = Math.abs(y2 - y1);
      let x = (Math.sqrt(2) / 2) * distance;
      if (disY < x) {
        if (x2 > x1) {
          this.select(this.currentSelcted - 1);
        } else {
          this.select(this.currentSelcted + 1);
        }
      }
      this.run();
    },
    run() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          let index = this.currentSelcted; // 当前的索引
          let newIndex = index + 1;
          this.select(newIndex);
        }, this.delay);
      }
    },
    select(newIndex) {
      if (newIndex == this.$children.length) newIndex = 0;
      if (newIndex == -1) newIndex = this.$children.length - 1;
      this.$nextTick(() => {
        this.currentSelcted = newIndex;
        this.$emit('change',newIndex)
      });
      this.reverse = this.prev > newIndex ? true : false;
      // loop 设置
      if (this.timer && this.loop) {
        if (this.prev == 0 && newIndex == this.len - 1) this.reverse = true;
        if (this.prev == this.len - 1 && newIndex == 0) this.reverse = false;
      }
    }
  },
  watch: {
    currentSelcted: "showChild"
  },
  mounted() {
    // 1.默认显示第几个孩子
    this.run();
    this.len = this.$children.length;
    this.prev = this.currentSelcted;
  },
  data() {
    // 默认显示第0个
    return { currentSelcted: this.initialIndex, len: 0, reverse: true };
  },
  props: {
    height: {
      type: String,
      default: "200px"
    },
    delay:{
        type:Number,
        default:3000
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    initialIndex: {
      // 默认显示谁
      tppe: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.zh-carousel {
  position: relative;
}
.viewport {
  overflow: hidden;
  position: relative;
  height: 100%;
}
.dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.dots span {
  width: 30px;
  height: 10px;
  display: inline-block;
  background: #c0c4cc;
  opacity: 0.24;
  text-indent: -99999px;
  margin: 10px;
}
.dots .active {
  opacity: 1;
}
</style>