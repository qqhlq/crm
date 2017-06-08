<template>
  <div class="table-private">
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '私人池'}]"></b-crumbs>
    <div class="table">
      <private-header></private-header>
      <private-main></private-main>
      <private-footer></private-footer>
    </div>
    <b-page-bottom></b-page-bottom>
  </div>
</template>

<script>
  import PrivateHeader from './privateHeader'
  import PrivateMain from './privateMain'
  import PrivateFooter from './privateFooter'

  export default {
    name: 'BTable',
    components: {
      PrivateHeader,
      PrivateMain,
      PrivateFooter
    }
  }
</script>
