<template>
  <div
    class="zhu-input"
    :class="[
    {'zhu-input-suffix-icon':clearable || showPassword ||suffixIcon },{'zhu-input-prefix-icon':prefixIcon}
    ]"
  >
    <span v-if="prefixIcon">
      <zh-icon :icon="prefixIcon" @mousedown.native.prevent></zh-icon>
    </span>
    <span v-if="suffixIcon">
      <template v-if="!clearable || !showPassword">
        <zh-icon :icon="suffixIcon"></zh-icon>
      </template>
    </span>
    <input
      :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      @input="$emit('input',$event.target.value)"
      @blur="$emit('blur',$event)"
      @change="$emit('change',$event)"
      @focus="$emit('focus',$event)"
      ref="input"
    />

    <zh-icon
      icon="qingkong"
      v-if="clearable && value"
      @click="$emit('input','')"
      @mousedown.native.prevent
    ></zh-icon>
    <zh-icon icon="eye" v-if="showPassword && value" @click="changeStatus"></zh-icon>
  </div>
</template>

<script>
export default {
  name: "zh-input",
  data() {
    return { passwordVisible: false };
  },
  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Boolean, Number],
      default: ""
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    suffixIcon: String,
    prefixIcon: String
  },
  methods: {
    changeStatus() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  computed: {
    computedtype() {
      if (this.showPassword) {
        return this.status ? "password" : "text";
      }
      return this.type;
    }
  },
  mounted() {
    if (this.showPassword) {
      console.assert(this.type === "password", "必须是密码框");
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zhu-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
  .zh-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
  }
}

.zhu-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .zh-icon {
    right: 8px;
    top: 13px;
  }
}
.zhu-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .zh-icon {
    left: 8px;
    top: 13px;
  }
}
</style>