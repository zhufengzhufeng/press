<template>
  <div class="zh-col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "zh-col",
  props: {
    span: {
      type:Number,
      default:24
    },
    offset: Number,
    xs: [Number,Object],
    sm: [Number,Object],
    md: [Number,Object],
    lg: [Number,Object],
    xl: [Number,Object]
  },
  data() {
    return { gutter: 0 };
  },
  computed: {
    colClass() {
      let classes = [];
      classes.push(`zh-col-${this.span}`);
      if (this.offset) {
        classes.push(`zh-col-offset-${this.offset}`);
      }
      ["xs", "sm", "md", "lg", "xl"].forEach(type => {
        if(typeof this[type] == 'object'){
          let {span,offset} = this[type];
          span && classes.push(`zh-col-res-${type}-${span}`);
          offset && classes.push(`zh-col-res-${type}-offset-${offset}`);
        }else{
          this[type] && classes.push(`zh-col-res-${type}-${this[type]}`);
        }
      });
      return classes;
    },
    colStyle() {
      let styl = {};
      if (this.gutter) {
        styl = {
          ...styl,
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        };
      }
      return styl;
    }
  }
};
</script>
<style scoped lang="scss">
@for $i from 1 through 24 {
  .zh-col-#{$i} {
    width: ($i/24) * 100%;
  }
  .zh-col-offset-#{$i} {
    margin-left: ($i/24) * 100%;
  }
}
$--sm: 768px !default;
$--md: 992px !default;
$--lg: 1200px !default;
$--xl: 1920px !default;
$map: (
  "xs": (
    max-width: $--sm - 1
  ),
  "sm": (
    min-width: $--sm
  ),
  "md": (
    min-width: $--md
  ),
  "lg": (
    min-width: $--lg
  ),
  "xl": (
    min-width: $--xl
  )
);
@mixin res($key) {
  // 循环断点Map，如果存在则返回
  @media only screen and #{inspect(map-get($map, $key))} {
    @content;
  }
}
@include res(xs) {
  @for $i from 0 through 24 {
    .zh-col-res-xs-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    .zh-col-res-xs-offset-#{$i} {
       margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(sm) {
  @for $i from 0 through 24 {
    .zh-col-res-sm-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    .zh-col-res-sm-offset-#{$i} {
       margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(md) {
  @for $i from 0 through 24 {
    .zh-col-res-md-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    .zh-col-res-md-offset-#{$i} {
       margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(lg) {
  @for $i from 0 through 24 {
    .zh-col-res-lg-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    .zh-col-res-lg-offset-#{$i} {
       margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
@include res(xl) {
  @for $i from 0 through 24 {
    .zh-col-res-xl-#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    .zh-col-res-xl-offset-#{$i} {
       margin-left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>