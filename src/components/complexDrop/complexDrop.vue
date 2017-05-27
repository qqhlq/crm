<template>
  <div class="complexdrop">
    <input class="complexdrop-input">
    <div class="comlexdropWrap">
      <div class="complexdrop-content">
        <ul>
          <li class="open-clild parent-node">
            <a class="switch-clild">
              <i class="fa fa-plus"></i>
              <i class="fa fa-minus"></i>
            </a>
            <span class="node-name">产品研发部</span>
            <ul>
              <li class="child-node">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
              <li class="child-node checked">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
              <li class="child-node checked">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
              <li class="child-node checked">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
              <li class="child-node">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
              <li class="child-node">
                <span class="check-node">
                  <input type="checkbox">
                  <i class="fa fa-check"></i>
                </span>
                <span class="node-name">黄联祈</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="complexdrop-btn">
        <button>确认</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BComplexDrop',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

    // 数据预处理
    dataPrep (data) {
      let _data = data




      return _data
    }
    //
  },

}
</script>
<style>

</style>
