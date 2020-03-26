<template>
    <div>
        <div class="infinite-list-wrapper" style="overflow:auto;height:300px;">
            <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
            <li v-for="i in count" class="list-item" :key="i">{{ i }}</li>
            </ul>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
        </div>
    </div>
</template>
    
<script>
export default {
    data () {
      return {
        count: 5,
        loading: false
      }
    },
    // computed: {
    //   noMore () {
    //     return this.count >= 20
    //   },
    //   disabled () {
    //     return this.loading || this.noMore
    //   }
    // },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 500)
      }
    }
}
</script>
<style scoped>
li{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
}
</style>