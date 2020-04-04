<template>
  <transition>
    <div class="zh-carousel-item" v-show="isShow" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "zh-carousel-item",
  props: {
    name: String
  },
  data() {
    let currentIndex = this.$parent.$children.length - 1;
    let isSelected = this.$parent.currentSelcted;

    return { isSelected, currentIndex,reverse:false };
  },
  computed: {
    isShow() {
      return this.currentIndex == this.isSelected;
    }
  }
};
</script>

<style lang="scss">
.zh-carousel-item {
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}

.v-leave-to {
  transform: translateX(-100%);
}
.v-enter {
  transform: translateX(100%);
}

.v-leave-to.reverse {
  transform: translateX(100%);
}
.v-enter.reverse {
  transform: translateX(-100%);
}
.v-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
