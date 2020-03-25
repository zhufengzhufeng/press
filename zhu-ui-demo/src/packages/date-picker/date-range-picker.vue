<template>
  <div class="zh-date-picker" v-click-outside="handleBlur">
    <zh-input
      suffix-icon="rili"
      :value="formateStartTime"
      @focus="handleFocus"
      @change="(e)=>handleChange('startTime',e)"
    ></zh-input>
    <zh-input
      suffix-icon="rili"
      :value="formateEndTime"
      @focus="handleFocus"
      @change="(e)=>handleChange('endTime',e)"
    ></zh-input>
    <div class="wrapper">
      <div class="zh-date-content" v-if="isVisible">
        <template v-if="type == 'dates'">
          <div class="zh-date-picker-header">
            <zh-icon icon="left" @click="changeMonth(-1)"></zh-icon>
            <zh-icon icon="prev" @click="changeYear(-1)"></zh-icon>
            <span>
              <b @click="type='years'">{{computed1.year}}</b>年
              <b @click="type='months'">{{computed1.month + 1}}</b>月
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
                  isToday:isToday(getCurrentDate1(i,j)),
                  isSelect:isSelect(getCurrentDate1(i,j)),
                  isNotCurrentMonth:!isCurrentMonth1(getCurrentDate1(i,j))
              }"
                @click="selectDate(getCurrentDate1(i,j))"
                v-for="j in 7"
                :key="`col_${j}`"
              >{{getCurrentDate1(i,j).getDate()}}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="zh-date-content" v-if="isVisible">
        <template v-if="type == 'dates'">
          <div class="zh-date-picker-header">
            <zh-icon icon="left" @click="changeMonth(-1)"></zh-icon>
            <zh-icon icon="prev" @click="changeYear(-1)"></zh-icon>
            <span>
              <b @click="type='years'">{{computed2.year}}</b>年
              <b @click="type='months'">{{computed2.month + 1}}</b>月
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
                  isToday:isToday(getCurrentDate2(i,j)),
                  isSelect:isSelect(getCurrentDate2(i,j)),
                  isNotCurrentMonth:!isCurrentMonth2(getCurrentDate2(i,j))
              }"
                @click="selectDate(getCurrentDate2(i,j))"
                v-for="j in 7"
                :key="`col_${j}`"
              >{{getCurrentDate2(i,j).getDate()}}</span>
            </div>
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
  name: "zh-date-range-picker",
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  directives: {
    clickOutside: clickOutside.directive
  },
  computed: {
    computed1() {
      // 面板1
      return {
        year: this.tempTime.year,
        month: this.tempTime.month
      };
    },
    computed2() {
      // 面板2
      let com1 = this.computed1;
      const oldDate = new Date(com1.year, com1.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() + 1);
      let [year, month] = getYearMonthDay(new Date(newDate));
      return {
        year,
        month: month
      };
    },
    visibleDate1() {
      // 面板1
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
    visibleDate2() {
      // 面板2
      let firstDay = new Date(this.tempTime.year, this.tempTime.month + 1, 1);
      let weekDay = firstDay.getDay();
      weekDay = weekDay == 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000;
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    formateStartTime() {
      // 开始
      if (this.startTime) {
        let [year, month, day] = getYearMonthDay(this.startTime);
        return `${year}-${month + 1}-${day}`;
      }
    },
    formateEndTime() {
      // 结束
      if (this.endTime) {
        let [year, month, day] = getYearMonthDay(this.endTime);
        return `${year}-${month + 1}-${day}`;
      }
    },
    startYear() {
      return this.tempTime.year - (this.tempTime.year % 10);
    }
  },
  data() {
    let [start, end] = this.value;
    let [year, month, day] = getYearMonthDay(start || new Date());
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
      isVisible: false,
      startTime: start, // 新增
      endTime: end,
      choose: false
    };
  },
  methods: {
    selectDate(date) {
      // 选择日期的时候 需要做处理
      if (!this.choose) {
        this.startTime = date;
      } else {
        this.endTime = date;
        if (this.startTime > this.endTime) {
          let temp = this.endTime;
          this.endTime = this.startTime;
          this.startTime = temp;
        }
        this.$emit("input", [this.startTime, this.endTime]);
        this.handleBlur();
      }
      this.choose = !this.choose;
    },
    handleBlur() {
      this.isVisible = false;
      this.type = "dates";
    },
    handleFocus() {
      this.isVisible = true;
    },
    handleChange(key, e) {
      // 新增
      // 失去焦点时 再去更改时间
      let newValue = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      if (newValue.match(regExp)) {
        this[key] = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
        this.$emit("input", [this.startTime, this.endTime]);
      } else {
        e.target.value = this[key];
      }
    },
    getCurrentDate1(i, j) {
      // 多一份
      return this.visibleDate1[(i - 1) * 7 + (j - 1)];
    },
    getCurrentDate2(i, j) {
      return this.visibleDate2[(i - 1) * 7 + (j - 1)];
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
    isCurrentMonth1(date) {
      // 当前 两份
      let { year, month } = this.computed1;
      let [y, m] = getYearMonthDay(date);
      return year == y && m === month;
    },
    isCurrentMonth2(date) {
      let { year, month } = this.computed2;
      let [y, m] = getYearMonthDay(date);
      return year == y && m === month;
    },
    selectYear(year) {
      this.tempTime.year = year;
      this.type = "months";
    },
    selectMonth(month) {
      this.tempTime.month = month;
      this.type = "dates";
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
  width: 280px;
  display: inline-block;
  background: #fff;
  user-select: none;
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
.wrapper {
  position: absolute;
  width: 560px;
}
</style>