<template>
<div class="dropdown-select3">
  <input class="dropdown-select3-input" style="outline: none; width: 460px;">
  <div class="dropdown-select3-open">
    <span class="dropdown-select3-loadding fa fa-spin fa-spinner"></span>
    <span class="dropdown-select3-noOption" style="display:none;">查无相关选项</span>
    <a href="javascript:void(0)" class="fa fa-close closeSearch"></a>
    <div class="open-top">
      <input type="text" class="dropdown-select3-value" value="">
    </div>
    <div class="open-treeContent">
      <ul class="open-wrap">
        <li class="open-ul">
          <a href="javascript:void(0);" class="open-plus-minus">
            <i class="fa fa-plus"></i>
            <i class="fa fa-minus"></i>
          </a>
          <span class="check-name">产品研发部</span>
          <ul>
            <li class="check-on child-node active">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
            <li class="check-on child-node">
              <span class="open-checkbox">
                <input type="checkbox">
                <span class="open-box-wrap"><i class="fa fa-check"></i></span>
              </span>
              <span class="check-name">黄联祈</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="open-bottom">
      <div class="all-check">
        <span class="open-checkbox">
          <input type="checkbox">
          <span class="open-box-wrap"><i class="fa fa-check"></i></span>
        </span>
        <span class="check-name">全选</span>
      </div>
      <a href="javascript:void(0);" class="makeSureCheck" data-isSearching="0">确认</a>
    </div>
  </div>
  <div class="dropdown-select3-checked">
    <div class="items">
    </div>
    <a href="javascript:void(0);" class="dropdown-select3-more" style="width: 45px; right: 16px;">更多</a>
    <a href="javascript:void(0);" class="dropdown-select3-putAway" style="width: 45px; right: 16px;">收起</a>
  </div>
</div>
</template>
<script>
export default {
  name: 'BComplexDrop'
}
</script>
<style>

</style>


