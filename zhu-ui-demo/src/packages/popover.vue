<template>
  <div class="zh-popover">
    <div
      class="zh-popover-content"
      v-if="visible"
      ref="content"
      @click.stop
      :class="[`content-${placement}`]"
    >
      <h3 v-if="title">{{title}}</h3>
      <slot>{{content}}</slot>
      <div class="arrow" ref="arrow"></div>
    </div>
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
    value: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        if (!["top", "bottom", "left", "right"].includes(value)) {
          throw new Error(
            "位置必须是" + ["top", "bottom", "left", "right"].join("、")
          );
        }
        return true;
      },
      default: "bottom"
    },
    width: {
      type: String,
      default: "150px"
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    trigger: {
      type: String,
      validator(value) {
        if (!["click", "hover"].includes(value)) {
          throw new Error("事件只能是" + ["click", "hover"].join("、"));
        }
        return true;
      },
      default: "click"
    }
  },
  watch: {
    visible(newValue, oldValue) {
      this.$emit("input", newValue);
    },
    value: {
      immediate: true,
      handler(val) {
        this.visible = val; // 传递的value 要赋予给visible
        if (val) {
          this.$nextTick(() => {
            let content = this.$refs.content;
            document.body.appendChild(content);
            if (this.trigger == "hover") {
              on(content, "mouseenter", this.handleMouseEnter);
              on(content, "mouseleave", this.handleMouseLeave);
            }
            // 按钮的位置
            let {
              width,
              height,
              top,
              left
            } = this.reference.getBoundingClientRect();
            // 面板大小
            let {
              height: contentHeight,
              width: contentWidth
            } = content.getBoundingClientRect();
            let distance = 6;
            let positions = {
              top: {
                top: top - contentHeight - distance + scrollY,
                left: left - contentWidth / 2 + width / 2 + scrollX
              },
              bottom: {
                top: top + height + distance + scrollY,
                left: left - contentWidth / 2 + width / 2 + scrollX
              },
              left: {
                top: top - contentHeight / 2 + height / 2 + scrollY,
                left: left - contentWidth - distance + scrollX
              },
              right: {
                top: top - contentHeight / 2 + height / 2 + scrollY,
                left: left + width + distance + scrollX
              }
            };
            let pos = positions[this.placement];
            content.style.left = pos.left + "px";
            content.style.top = pos.top + "px";
          });
        }
      }
    }
  },
  data() {
    return { visible: false };
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    handleDocumentClick(e) {
      if (this.$el.contains(e.target)) {
        return false;
      }
      this.visible = false;
    },
    handleMouseEnter() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = true;
      }, 200);
    },
    handleMouseLeave() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 200);
    }
  },
  mounted() {
    let reference = this.$slots.reference;
    if (reference) {
      this.reference = reference[0].elm;
    }
    if (this.trigger === "hover") {
      on(this.$el, "mouseenter", this.handleMouseEnter);
      on(this.$el, "mouseleave", this.handleMouseLeave);
    } else if (this.trigger === "click") {
      on(this.reference, "click", this.toggle);
      on(document, "click", this.handleDocumentClick);
    }
  },
  beforeDestroy() {
    off(this.reference, "click", this.toggle);
    off(document, "click", this.handleDocumentClick);
    off(this.$el, "mouseenter", this.handleMouseEnter);
    off(this.$el, "mouseleave", this.handleMouseLeave);
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
}

.arrow {
  position: absolute;
}
.arrow::before,
.arrow::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid #fff;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  position: absolute;
}
.arrow::before {
  border-bottom-color: #ccc;
}
.arrow::after {
  border-bottom-color: #fff;
  transform: translateY(1px);
  filter: drop-shadow(0 -2px 1px #ccc);
}
.content-top {
  .arrow {
    left: 50%;
    margin-left: -6px;
    bottom: 0px;
    &::after,
    &::before {
      transform: rotate(180deg);
    }
  }
}
.content-bottom {
  .arrow {
    left: 50%;
    margin-left: -6px;
    top: -12px;
  }
}
.content-right {
  .arrow {
    top: 50%;
    margin-top: -6px;
    left: -12px;
    &::after,
    &::before {
      transform: rotate(-90deg);
    }
  }
}
.content-left {
  .arrow {
    top: 50%;
    margin-top: -6px;
    right: 0px;
    &::after,
    &::before {
      transform: rotate(90deg);
    }
  }
}
</style>