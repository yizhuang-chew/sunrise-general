<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div class="product-dec-action-wrap pro-dec-action-2"></div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <form v-if="isOnStock" ref="form" v-on:submit.prevent="addCustomLineItem">
        <div class="quality-cart-wrap">
          <div class="quality-wrap">
            <input
              data-test="add-to-cart-button"
              type="submit"
              value="Add to Cart"
            />
          </div>
        </div>
        <div class="mt-2" style="color: red" v-if="showQuantityError">
          {{ $t("quantityError", { quantity: availableQuantity }) }}
        </div>
      </form>

      <div v-else>
        <div class="pro-cart-wrap">
          {{ $t("notInStock") }}
        </div>
      </div>
    </div>
  </div>
</template>
