<template>
  <div style="margin:0 100px;">
    <zh-table
      :columns="columns1"
      :data="data1"
      @on-select="hanldeSelect"
      @on-select-all="handleSelectAll"
      @on-sort-change="handleSort"
      height="200px"
    ></zh-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age",
          sortable: "custom", // custom
          sortType: "asc",
          sortMethod(a, b, type) {
            return a.age - b.age;
          }
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    hanldeSelect(selection, row) {
      console.log(selection, row);
    },
    handleSelectAll(selection) {
      console.log(selection);
    },
    handleSort({ column, type }) {
      console.log(type);
    }
  }
};
</script>