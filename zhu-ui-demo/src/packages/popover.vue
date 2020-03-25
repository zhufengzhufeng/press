<template>
  <div class="zh-popover" ref="popper">
    <!-- 点击它不隐藏 -->
    <div
      class="zh-popover-content"
      ref="content"
      :class="[`content-${placement}`]"
      @click.stop
      :style="{width:width+'px'}"
      v-if="visible"
    >
      <h3 v-if="title">{{title}}</h3>
      <slot>
        <p>{{content}}</p>
      </slot>
      <div class="arrow" ref="arrow"></div>
    </div>
    <!-- 点击按钮隐藏 -->
    <slot name="reference"></slot>
  </div>
</template>
<script>
const on = (element, event, handler) => {
  element.addEventListener(event, handler, false);
};
const off = (element, event, handler) => {
  element.removeEventListener(event, handler, false);
};
export default {
  name: "zh-popover",
  props: {
    placement: {},
    width: {},
    title: String,
    content: String,
    trigger: String
  },
  data() {
    return { visible: false };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          let {
            width,
            height,
            top,
            left
          } = this.reference.getBoundingClientRect();

          let content = this.$refs.content;
          document.body.appendChild(content);
          let {
            height: contentHeight,
            width: contentWidth
          } = content.getBoundingClientRect();
          let arrow = this.$refs.arrow;
          const arrowWith = parseInt(
            getComputedStyle(arrow, ":after")["border-width"]
          );
          let positions = {
            top: {
              top: top - contentHeight - arrowWith + "px",
              left: left - contentWidth / 2 + width / 2 + "px",
              arrowLeft: contentWidth / 2 - arrowWith + "px",
              arrowTop: contentHeight + "px"
            },
            bottom: {
              top: top + height + arrowWith + "px",
              left: left - contentWidth / 2 + width / 2 + "px",
              arrowLeft: contentWidth / 2 - arrowWith + "px",
              arrowTop: 0 - arrowWith * 2 + "px"
            },
            left: {
              top: top - contentHeight + width / 2 + "px",
              left: left - contentWidth - arrowWith + "px",
              arrowLeft: contentWidth + "px",
              arrowTop: contentHeight / 2 - arrowWith + "px"
            },
            right: {
              top: top - contentHeight + width / 2 + "px",
              left: left + arrowWith + width + "px",
              arrowLeft: -arrowWith * 2 + "px",
              arrowTop: contentHeight / 2 - arrowWith + "px"
            }
          };
          let pos = positions[this.placement];
          content.style.left = pos.left;
          content.style.top = pos.top;
          arrow.style.left = pos.arrowLeft;
          arrow.style.top = pos.arrowTop;
        });
      }
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    handleDocumentClick(e) {
      // 如果点击盒子的内部，则不关闭
      if (this.$el.contains(e.target)) {
        return false;
      }
      this.visible = false;
    }
  },
  mounted() {
    // 1.获取插槽元素
    let reference = this.$slots.reference;
    // 获取盒子
    this.popper = this.$refs.popper;
    if (reference) {
      this.reference = reference[0].elm;
    }
    // 绑定点击事件
    on(this.reference, "click", this.toggle);
    on(document, "click", this.handleDocumentClick);
  },
  beforeDestroy() {
    // 接触绑定
    off(this.reference, "click", this.toggle);
    off(document, "click", this.handleDocumentClick);
  }
};
</script> 


<style lang="scss">
@import "@/styles/_var.scss";
.zh-popover {
  display: inline-block;
}
.zh-popover-content {
  position: absolute;
  padding: 10px;
  border-radius: $border-radius;
  background: #fff;
  z-index: 10;
  box-shadow: -1px -1px 3px #ccc, 1px 1px 3px #ccc;
  .arrow {
    position: absolute;
  }
  .arrow::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;

    border: 6px solid #ccc;
    border-left-color: transparent;
    border-right-color: transparent;

    transform-origin: center center;
    border-top-color: transparent;
  }
  .arrow::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border: 6px solid #fff;
    border-left-color: transparent;
    border-right-color: transparent;
    transform-origin: center center;
    border-top-color: transparent;
    transform: translateY(1px);
    filter: drop-shadow(0 -2px 1px #ccc);
  }
}

.content-top .arrow {
  &::after,
  &::before {
    transform: rotate(180deg);
  }
}
.content-left .arrow {
  &::after,
  &::before {
    transform: rotate(90deg);
  }
}

.content-right .arrow {
  &::after,
  &::before {
    transform: rotate(-90deg);
  }
}
</style>