<template>
    <div
        class="zh-carousel"
        :style="{height:height}"
        :class="{arrowHover : arrow == 'hover'}"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @touchstart="touchstart"
        @touchend="touchend"
    >
        <div class="viewport">
            <slot></slot>
        </div>
        <div class="dots" v-if="indicatorPosition != 'none'" :class="{indicator: indicatorPosition == 'outside'}">
            <span
                v-for="item in len"
                :key="item"
                :class="{active:currentSelcted == item-1}"
                @click="select(item-1)"
            >{{item}}</span>
        </div>
        <div v-if="arrow != 'never'">
            <button
                class="zh-carousel__arrow zh-carousel__arrow--left"
                @click="select(currentSelcted - 1)"
            >
                <svg class="zh-icon" aria-hidden="true">
                  <use xlink:href="#icon-left" />
                </svg>
            </button>
            <button
                class="zh-carousel__arrow zh-carousel__arrow--right"
                @click="select(currentSelcted + 1)"
            >
                <svg class="zh-icon" aria-hidden="true">
                  <use xlink:href="#icon-right" />
                </svg>
            </button>
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

            let distance = Math.sqrt(
                Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
            );

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
                this.$emit("change", newIndex);
            });
            this.reverse = this.prev > newIndex ? true : false;
            // loop 设置
            if (this.timer && this.loop) {
                if (this.prev == 0 && newIndex == this.len - 1)
                    this.reverse = true;
                if (this.prev == this.len - 1 && newIndex == 0)
                    this.reverse = false;
            }
        }
    },
    watch: {
        currentSelcted: "showChild"
    },
    mounted() {
        // 1.默认显示第几个孩子
        this.run();
        console.log(this.$children);
        this.len = this.$children.length;
        this.prev = this.currentSelcted;
    },
    data() {
        // 默认显示第0个
        return {
            currentSelcted: this.initialIndex,
            len: 0,
            reverse: true,
            arrowHover: false
        };
    },
    props: {
        height: {
            type: String,
            default: "200px"
        },
        delay: {
            type: Number,
            default: 3000
        },
        indicatorPosition: {
          type: String,
          default: ''
        },
        arrow: {
            type: String,
            default: "hover",
            validator(value) {
                if (!["always", "hover", "never"].includes(value)) {
                    throw new Error(
                        "arrow值必须是" +
                            ["always", "hover", "never"].join("、")
                    );
                }
                return true;
            }
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
    bottom: 0;
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
.zh-carousel__arrow {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.11);
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;
}
.zh-carousel__arrow--left {
    left: 16px;
}
.zh-carousel__arrow--right {
    right: 16px;
}
.arrowHover {
    .zh-carousel__arrow {
        opacity: 0;
    }
    .zh-carousel__arrow--left {
        left: 0;
    }
    .zh-carousel__arrow--right {
        right: 0;
    }
    transition: all 0.3s;
    &:hover {
        .zh-carousel__arrow {
            opacity: 1;
        }
        .zh-carousel__arrow--left {
            left: 16px;
        }
        .zh-carousel__arrow--right {
            right: 16px;
        }
    }
}
.indicator{
    
      bottom: -30px;
   
}
</style>