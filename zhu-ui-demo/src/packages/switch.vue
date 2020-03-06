<template>
  <div
    class="zh-switch"
    :class="{'is-checked':checked,'is-disabled':disabled}"
    @click="switchValue"
  >
    <input type="checkbox" 
        :true-value="activeValue"
        :false-value="inactiveValue"
        :disabled="disabled"
        @keydown.enter="switchValue"
        @change="switchValue"
        :checked="checked"
        ref="input"
    />
    <span class="zh-switch-core" :style="switchStyle"></span>
  </div>
</template>
<script>
export default {
  name: "zh-switch",
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    checked() {
      // 判断是否是开启状态
      return this.value === this.activeValue;
    },
    switchStyle() {
      let newColor = this.checked ? this.activeColor : this.inactiveColor;
      return { borderColor: newColor, backgroundColor: newColor };
    }
  },
  methods: {
    switchValue() {
      if (!this.disabled) {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit("input", val);
        this.$emit("change", val);
      }
    }
  }
};
</script>
<style lang="scss">
.zh-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
  &-core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    &:after {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
  &.is-checked &-core:after {
    left: 100%;
    margin-left: -17px;
  }

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  &.is-disabled {
    opacity: 0.6;
  }
}
</style>