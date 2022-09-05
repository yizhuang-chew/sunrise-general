<style src="./BundleItem.scss" lang="scss"></style>
<i18n src="./BundleItem.txt"></i18n>
<script src="./BundleItem.js"></script>

<template>
  <div>
    <span>Select Item {{ index + 1 }}:</span>
    <!--<div v-if="selectedProduct"  style="margin-bottom:10px;">
      <select v-model="selectedSku" class="select" @change="onChange" >
        <option v-for="sku in variantsSkus" :value="sku" :key="sku">
          {{ sku }}
        </option>
      </select>
    </div>-->
    <div
      v-if="categoryProductOptions && categoryProductOptions.length"
      class="deal pro-details-size" style="margin-bottom:20px;"
    >
      <vue-select-image
        :useLabel="true"
        :dataImages="categoryProductOptions"
        @onselectimage="onSelectProduct"
      ></vue-select-image>
    </div>
  </div>
</template>
