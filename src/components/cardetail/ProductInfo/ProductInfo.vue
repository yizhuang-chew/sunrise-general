<style src="./ProductInfo.scss" lang="scss" scoped></style>
<i18n src="./ProductInfo.txt"></i18n>
<script src="./ProductInfo.js"></script>

<template>
  <div class="row" v-if="product">
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
        <h3 data-test="product-name">
          {{ currentProduct.name }}
        </h3>
        <h2>
          Base Price:
          <BasePrice :price="currentProduct.price" />
        </h2>
        <br/>
        <h4 data-test="product-name">
          {{ currentProduct.description }}
        </h4>
        <VariantSelector :sku="sku" />
        <div v-if="availableQ">
          {{ $t("available") }}: {{ availableQuantity }}
        </div>
        <AddToCartForm
          :sku="sku"
          :isOnStock="isOnStock"
          :availableQuantity="availableQuantity"
          :exteriorColour="exteriorColour"
          :wheels="wheels"
          :interior="interior"
          :audio="audio"
          :addOns="addOns"
          :basePrice="currentProduct.price"
          :appointmentDate="appointmentDate"
        />
        <a href @click.prevent="openAddToShoppingList">
          <i class="dl-icon-heart"></i><span>Shopping list</span>
        </a>

        <!--<DetailsSection :sku="sku" />-->
      </div>
    </div>
  </div>
</template>
