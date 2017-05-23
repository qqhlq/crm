<<template>
  <div class="table">
    <b-table-header></b-table-header>
    <b-table-main></b-table-main>
    <b-table-footer></b-table-footer>
  </div>
</template>

<script>
  import BTableHeader from './tableHeader'
  import BTableMain from './tableMain'
  import BTableFooter from './tableFooter'

  export default {
    name: 'BTable',
    components: {
      BTableHeader,
      BTableMain,
      BTableFooter
    }
  }
</script>

<style>

</style>

