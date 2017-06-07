<template>
  <div>
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '私人池'}]"></b-crumbs>
    <div class="table">
      <private-header></private-header>
      <private-main></private-main>
      <private-footer></private-footer>
    </div>
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
