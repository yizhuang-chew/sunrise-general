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

        <h4 data-test="product-name">
          {{ productDescription }}
        </h4>

        <div class="pro-details-size">
          <form @submit.prevent="getQuote">
            <span class="field-label-text" data-test="form-label-text"
              >Car model</span
            >
            <select v-model="carModel" class="select">
              <option value="a">Model 1</option>
              <option value="Model 2">Model 2</option>
              <option value="Model 3">Model 3</option>
              <option value="Model 4">Model 4</option>
              <option value="Model 5">Model 6</option>
            </select>
            <span>Address</span>
            <input v-model="carLocation" type="text" placeholder="Address" />
            <span class="field-label-text" data-test="form-label-text"
              >Where is the car Kept?</span
            >
            <select v-model="carStorage" class="select">
              <option value="Garage">Garage</option>
              <option value="Street">Street</option>
            </select>
            <input class="submit" type="submit" value="Submit" />
          </form>
          <div
            v-if="gotQuote"
            class="product-details-content product-details-ptb"
            data-test="product-data"
          >
            <br />
            <h2 data-test="product-name">
              {{ productName }}
            </h2>
            <BasePrice :price="productPrice" />
          </div>
        </div>
        <AddToCartForm
          :sku="sku"
          :isOnStock="true"
          :availableQuantity="availableQuantity"
          :money="productPrice.value"
        />
      </div>
    </div>
  </div>
</template>
