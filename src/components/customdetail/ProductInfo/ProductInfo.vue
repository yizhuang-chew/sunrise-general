<style src="./ProductInfo.scss" lang="scss" scoped></style>
<i18n src="./ProductInfo.txt"></i18n>
<script src="./ProductInfo.js"></script>

<template>
  <div class="row">
    <div class="col-lg-5">
      <div class="product-details-tab">
        <ProductGallery :sku="sku" />
      </div>
    </div>
    <div class="col-lg-7">
      <div
        class="product-details-content product-details-ptb"
        data-test="product-data"
      >
        <h2 data-test="product-name">
          {{ productName }}
        </h2>
        <h3>
          <BasePrice :price="productPrice" />
        </h3>
        <h4 data-test="product-name">
          {{productDescription}}
        </h4>
        <div v-if="availableQuantity">
          {{ $t("available") }}: {{ availableQuantity }}
        </div>
        <AddToCartForm
          :sku="sku"
          :isOnStock=true
          :availableQuantity="availableQuantity"
          :money="productPrice.value"
        />
      </div>
    </div>
  </div>
</template>
