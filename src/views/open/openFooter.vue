<template>
  <div class="table-footer">
    <ul>
      <li class="table-prev">
        <a href="javascript:void(0);" @click="pushPrev">
          <i class="fa fa-chevron-circle-left"></i>
        </a>
      </li>
      <li class="table-page">
        <input type="number" :value="page" @change="pushPage"><span>/{{totalPage}}</span>
      </li>
      <li class="table-next">
        <a href="javascript:void(0);" @click="pushNext">
          <i class="fa fa-chevron-circle-right"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'OpenFooter',
    computed: {
      ...mapGetters({
        page: 'openList/page',
        totalPage: 'openList/totalPage'
      })
    },
    methods: {
      ...mapActions({
        changePage: 'openList/changePage',
        getList: 'openList/getList'
      }),
      pushPrev() {
        let self = this
        if(self.page > 1) {
          this.changePage(--self.page)
          this.getList()
        }
      },
      pushNext() {
        let self = this
        if(self.page < self.totalPage) {
          this.changePage(++self.page)
          this.getList()
        }
      },
      pushPage(e) {
        let self = this
        let value = e.target.value
        if(value >= 1 && value <= self.totalPage) {
          this.changePage(value)
          this.getList()
        }else {
          e.target.value = self.page
        }
      }
    }
  }
</script>

<style>

</style>
