<template>
  <div class="zh-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zh-row",
  props: {
    gutter: Number,
    justify: {
      type: String,
      validator(type) {
        if (
          type &&
          !["start", "end", "center", "space-around", "space-between"]
        ) {
          console.error(
            "类型只能是:" +
              !["start", "end", "center", "space-around", "space-between"].join(
                "、"
              )
          );
        }
        return true;
      }
    }
  },
  mounted() {
    if (this.gutter) {
      this.$children.forEach(child => {
        child.gutter = this.gutter;
      });
    }
  },
  computed: {
    rowStyle() {
      let styl = {};
      if (this.gutter) {
        styl = {
          ...styl,
          marginLeft: -this.gutter / 2 + "px",
          marginRight: -this.gutter / 2 + "px"
        };
      }
      if (this.justify) {
        let key = ["start", "end"].includes(this.justify)
          ? "flex-" + this.justify
          : this.justify;

        styl = {
          ...styl,
          justifyContent:key
        };
      }
      return styl;
    }
  }
};
</script>

<style>
.zh-row {
  display: flex;
  flex-wrap: wrap;
}
</style>