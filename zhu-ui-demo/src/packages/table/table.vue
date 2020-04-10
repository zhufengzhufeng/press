<template>
  <div class="zh-table" ref="wrapper">
    <div class="table-wrapper" :style="{height}" ref="tableWrapper">
      <table ref="table">
        <thead>
          <tr>
            <th v-for="col in cloneColumns" :key="col.key" :style="{width:col.width+'px'}">
              <div v-if="col.type === 'selection'">
                <input type="checkbox" :checked="checkAllStatus" ref="checkAll" @change="selectAll" />
              </div>
              <div v-else class="zh-table-cell">
                <span>{{col.title}}</span>
                <span class="sortable" v-if="col.sortable">
                  <zh-icon
                    icon="up"
                    :class="{active:isAsc(col)}"
                    @click="sort(col,isAsc(col)?'normal':'asc')"
                  ></zh-icon>
                  <zh-icon
                    icon="down"
                    :class="{active:isDesc(col)}"
                    @click="sort(col,isDesc(col)?'normal':'desc')"
                  ></zh-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in cloneData" :key="item._id" :class="{stripe: stripe && index%2 == 0}">
            <td v-for="col in cloneColumns" :key="col.key" :style="{width:col.width+'px'}">
              <div v-if="col.type === 'selection'">
                <input type="checkbox" @change="selectOne($event,item)" :checked="isChecked(item)" />
              </div>
              <div v-else>
                <span>{{item[col.key]}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "zh-table",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    height: {
      type: String
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let cloneData = cloneDeep(this.data);
    let cloneColumns = cloneDeep(this.columns);
    return {
      cloneData,
      cloneColumns,
      selectedItems: []
    };
  },
  created() {
    this.cloneData = this.cloneData.map(row => {
      row._id = Math.random();
      return row;
    });
    this.cloneColumns.forEach(col => {
      col.sortType = col.sortType ? col.sortType : "normal";
      this.sort(col, col.sortType);
    });
  },
  mounted() {
    if (this.height) {
      let wrapper = this.$refs.wrapper;
      let tableWrapper = this.$refs.tableWrapper;
      let table = this.$refs.table;
      let copyTable = table.cloneNode();
      let thead = table.children[0];

      tableWrapper.style.paddingTop =
        thead.getBoundingClientRect().height + "px";

      copyTable.appendChild(thead);
      wrapper.appendChild(copyTable);

      copyTable.classList.add("fiex-header");
      
      copyTable.style.width = table.offsetWidth +'px';
      let tds = table.querySelector("tbody tr").children;
      let ths = copyTable.querySelector("thead tr").children;
      tds.forEach((item, index) => {
        ths[index].style.width = item.getBoundingClientRect().width + "px";
      });
    }
  },
  methods: {
    sort(col, type) {
      let data = cloneDeep(this.data);
      if (col.sortable != "custom") {
        // 需要排序 不是noraml 就是正序和反序
        if (type != "normal") {
          // 默认排序规则
          let key = col.key;
          this.cloneData = data.sort((a, b) => {
            if (col.sortMethod) {
              // 用户提供排序方法
              return col.sortMethod(a, b, type);
            }
            if (type == "asc") {
              return a[key] - b[key];
            } else {
              return b[key] - a[key];
            }
          });
        } else {
          this.cloneData = cloneDeep(data);
        }
      } else {
        this.$emit("on-sort-change", {
          column: cloneDeep(col), // 直接按照你的方式排
          type
        });
      }
      col.sortType = type;
    },
    selectOne(e, row) {
      if (e.target.checked) {
        this.selectedItems.push(row);
      } else {
        this.selectedItems = this.selectedItems.filter(r => r._id !== row._id);
      }
      this.$emit("on-select", this.selectedItems, row);
    },
    selectAll(e) {
      this.selectedItems = e.target.checked ? this.cloneData : [];
      this.$emit("on-select-all", this.selectedItems);
    },
    isChecked(row) {
      return this.selectedItems.some(r => r._id == row._id);
    },
    isAsc(col) {
      return col.sortType == "asc";
    },
    isDesc(col) {
      return col.sortType == "desc";
    }
  },
  watch: {
    selectedItems() {
      if (this.cloneData.length !== this.selectedItems.length) {
        if (this.selectedItems.length > 0) {
          return (this.$refs.checkAll[0].indeterminate = true);
        }
      }
      this.$refs.checkAll[0].indeterminate = false;
    }
  },
  computed: {
    checkAllStatus() {
      return this.cloneData.length === this.selectedItems.length;
    }
  }
};
</script>
<style lang="scss">
.zh-table {
  position: relative;
  .table-wrapper {
    overflow-y: scroll;
  }
  .fiex-header {
    position: absolute;
    top: 0;
    left: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    thead {
      background: #f8f8f9;
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    tbody{
      tr.stripe{
        background: #FAFAFA
      }
    }
  }
  .zh-table-cell {
    display: flex;
    align-items: center;
    .sortable {
      display: flex;
      flex-direction: column;
      width: 20px;
      height: 20px;
      align-items: center;
    }
    .active {
      fill: red;
    }
  }
}
</style>