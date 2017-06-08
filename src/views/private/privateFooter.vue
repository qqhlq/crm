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
    name: 'PrivateFooter',
    computed: {
      ...mapGetters({
        page: 'privateList/page',
        totalPage: 'privateList/totalPage'
      })
    },
    methods: {
      ...mapActions({
        changePage: 'privateList/changePage'
      }),
      pushPrev() {
        let self = this
        if(self.page > 1) {
          self.changePage(--self.page)
        }
      },
      pushNext() {
        let self = this
        if(self.page < self.totalPage) {
          self.changePage(++self.page)
        }
      },
      pushPage(e) {
        let self = this
        let value = e.target.value
        if(value >= 1 && value <= self.totalPage) {
          self.changePage(value)
        }else {
          e.target.value = self.page
        }
      }
    }
  }
</script>

<style>

</style>
