<template>
  <div>
    <b-crumbs :crumbs="[{name: 'CRM'}, {name: '客户公海池'}]"></b-crumbs>
    <div class="table">
      <open-header></open-header>
      <open-main></open-main>
      <open-footer></open-footer>
    </div>
  </div>
</template>

<script>
  import OpenHeader from './openHeader'
  import OpenMain from './openMain'
  import OpenFooter from './openFooter'

  export default {
    name: 'BTable',
    components: {
      OpenHeader,
      OpenMain,
      OpenFooter
    }
  }
</script>
