<template>
  <div>
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '客户公海池'}]"></b-crumbs>
    <div class="table">
      <common-header></common-header>
      <common-main></common-main>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
  import CommonHeader from './commonHeader'
  import CommonMain from './commonMain'
  import CommonFooter from './commonFooter'

  export default {
    name: 'BTable',
    components: {
      CommonHeader,
      CommonMain,
      CommonFooter
    }
  }
</script>
