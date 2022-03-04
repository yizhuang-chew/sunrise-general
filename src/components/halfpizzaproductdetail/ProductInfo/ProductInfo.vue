<style src="./ProductInfo.scss" lang="scss" scoped></style>
<i18n src="./ProductInfo.txt"></i18n>
<script src="./ProductInfo.js"></script>

<template>
  <div style="width:100%" class="row" v-if="product">
    <!--<div class="col-lg-5">
      <div class="product-details-tab">
        <ProductGallery :sku="sku" />
      </div>
    </div>-->
    <div style="width:100%" >
      <!--<div class="col-lg-7">-->
      <div style="width:100%" 
        class="product-details-content product-details-ptb"
        data-test="product-data"
      >
        <h2 style="width:100%;text-align:center"  data-test="product-name">
          {{ currentProduct.name }}
        </h2>
        <br/>
        <VariantSelector style="width:100%;text-align:center" :sku="sku" />
        <!--<h3>
          <BasePrice :price="currentProduct.price" />
        </h3>-->
        <!--<h4 data-test="product-name">
          {{ currentProduct.description }}
        </h4>-->
        <!--<div v-if="availableQ">
          {{ $t("available") }}: {{ availableQuantity }}
        </div>-->
        <AddToCartForm
          style="width:100%" 
          :sku="sku"
          :isOnStock="isOnStock"
          :availableQuantity="availableQuantity"
          :addOns="addOns"
          :appointmentDate="appointmentDate"
          :basePrice="currentProduct.price"
          :defaultToppings="defaultToppings"
          :pizzaSize="pizzaSize"
        />
        <!--<a href @click.prevent="openAddToShoppingList">
          <i class="dl-icon-heart"></i><span>Shopping list</span>
        </a>-->

        <!--<DetailsSection :sku="sku" />-->
      </div>
    </div>
  </div>
</template>
