<template>
<div>
  <div class="zh-date-picker" v-click-outside="handleBlur">
    <zh-input suffix-icon="rili" :value="formateDate" @focus="handleFocus" @change="handleChange"></zh-input>
    <div class="zh-date-content" v-if="isVisible">
      <template v-if="mode == 'dates'">
        <div class="zh-date-picker-header">
          <zh-icon icon="left" @click="changeMonth(-1)"></zh-icon>
          <zh-icon icon="prev" @click="changeYear(-1)"></zh-icon>
          <span>
            <b @click="mode='years'">{{tempTime.year}}</b>年
            <b @click="mode='months'">{{tempTime.month+1}}</b>月
          </span>
          <zh-icon icon="next" @click="changeYear(1)"></zh-icon>
          <zh-icon icon="right" @click="changeMonth(1)"></zh-icon>
        </div>
        <div class="zh-date-picker-panel">
          <span class="cell" v-for="i in 7" :key="`week_${i}`">{{weeks[i-1]}}</span>
          <div v-for="i in 6" :key="`row_${i}`">
            <span
              class="cell cell-date"
              :class="{
                  isToday:isToday(getCurrentDate(i,j)),
                  isSelect:isSelect(getCurrentDate(i,j)),
                  isNotCurrentMonth:!isCurrentMonth(getCurrentDate(i,j))
              }"
              @click="selectDate(getCurrentDate(i,j))"
              v-for="j in 7"
              :key="`col_${j}`"
            >{{getCurrentDate(i,j).getDate()}}</span>
          </div>
        </div>
      </template>
      <template v-if="mode === 'months'">
        <div class="zh-date-picker-header">
          <zh-icon icon="prev" @click="changeYear(-1)"></zh-icon>
          {{tempTime.year}} 年
          <zh-icon icon="next" @click="changeYear(1)"></zh-icon>
        </div>
        <div class="zh-date-picker-panel">
          <span
            class="cell-month"
            :class="{active: (i-1 == time.month && (tempTime.year == time.year))}"
            v-for="i in 12"
            :key="i"
            @click="selectMonth(i-1)"
          >{{months[i-1]}}</span>
        </div>
      </template>
      <template v-if="mode === 'years'">
        <div class="zh-date-picker-header">
          <zh-icon icon="left" @click="changeYear(-10)"></zh-icon>
          {{startYear}}年 - {{startYear+9}}年
          <zh-icon icon="right" @click="changeYear(10)"></zh-icon>
        </div>
        <div class="zh-date-picker-panel">
          <span
            class="cell-year"
            :class="{active:startYear+ (i-1) == time.year}"
            v-for="i in 10"
            :key="i"
            @click="selectYear(startYear + (i-1))"
          >{{startYear + (i-1)}}</span>
        </div>
      </template>
    </div>
  </div>
</div>
</template>


<script>
import clickOutside from "v-click-outside";
function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return [year, month, day];
}
export default {
 
  name: "zh-date-picker",
  props: {
    value: {
      mode: Date,
      default: () => new Date()
    }
  },
  directives: {
    clickOutside: clickOutside.directive
  },
  computed: {
    visibleDate() {
      let firstDay = new Date(this.tempTime.year, this.tempTime.month, 1);
      let weekDay = firstDay.getDay();
      weekDay = weekDay == 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    formateDate: {
      get() {
        if(this.value){
           let { year, month, day } = this.time;
           return `${year}-${month + 1}-${day}`;
        }
      }
    },
    startYear() {
      return this.tempTime.year - (this.tempTime.year % 10);
    }
  },
  watch: {
    value(newDate) {
      let [year, month, day] = getYearMonthDay(newDate);
      console.log("xxx");
      this.time = {
        year,
        month,
        day
      };
      this.tempTime = { ...this.time };
    }
  },
  data() {
    let [year, month, day] = getYearMonthDay(this.value || new Date());
    return {
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      time: {
        year,
        month,
        day
      },
      tempTime: {
        year,
        month,
        day
      },
      mode: "dates",
      isVisible: false
    };
  },
  methods: {
    handleBlur() {
      this.isVisible = false;
      this.mode = "dates";
    },
    handleFocus() {
      this.isVisible = true;
    },
    handleChange(e) {
      // 失去焦点时 再去更改时间
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.target.value = this.formateDate;
      }
      this.handleBlur();
    },
    getCurrentDate(i, j) {
      return this.visibleDate[(i - 1) * 7 + (j - 1)];
    },
    isToday(date) {
      let [y, m, d] = getYearMonthDay(date);
      let { year, month, day } = getYearMonthDay(new Date());
      return year == y && month == m && day == d;
    },
    isSelect(date) {
      let [y, m, d] = getYearMonthDay(date);
      let { year, month, day } = this.time;
      return year == y && month == m && day == d;
    },
    isCurrentMonth(date) {
      let { year, month } = this.tempTime;
      let [y, m] = getYearMonthDay(date);
      return year == y && m === month;
    },
    selectDate(date) {
      this.$emit("input", date);
      this.handleBlur();
    },
    selectYear(year) {
      this.tempTime.year = year;
      this.mode = "months";
    },
    selectMonth(month) {
      this.tempTime.month = month;
      this.mode = "dates";
    },
    changeYear(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month); // 老的年
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count); // 获取最新值
      let [year] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
    },
    changeMonth(count) {
      const oldDate = new Date(this.tempTime.year, this.tempTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + count);
      let [year, month] = getYearMonthDay(new Date(newDate));
      this.tempTime.year = year;
      this.tempTime.month = month;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_var.scss";
.zh-date-content {
  position: absolute;
  z-index:10;
  user-select: none;
  width: 280px;
  background:#fff;
  box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
  .cell {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  .cell-year,
  .cell-month {
    width: 25%;
    height: 40px;
    line-height: 40px;
    margin: 20px 0;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }
  .cell-date:hover:not(.isNotCurrentMonth):not(.isSelect) {
    color: $primary;
    font-weight: bold;
  }
}
.zh-date-picker-header {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.isToday,
.active {
  color: $primary;
  font-weight: bold;
}
.isSelect {
  background: $primary;
  border-radius: $border-radius;
  color: #fff;
}
.isNotCurrentMonth {
  color: #c0c4cc;
}
</style>