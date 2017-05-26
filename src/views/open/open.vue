<<template>
  <div class="table">
    <open-header></open-header>
    <open-main></open-main>
    <open-footer></open-footer>
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

<style>

</style>

