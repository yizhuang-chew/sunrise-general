<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <div v-if="isOnStock" class="quality-cart-wrap">
      <div class="quality-wrap">
        <input
          class="input-text qty"
          type="number"
          min="1"
          name="qty"
          maxlength="12"
          v-model="quantity"
          data-test="add-to-cart-amount"
          title="Qty"
        />
      </div>
      <div class="quality-wrap">
        <!-- <a
            href="#" 
            @click.prevent="submitForm"
            data-test="add-to-cart-button"
          >
            {{$t('addToCart')}}
          </a> -->
        <input
          data-test="add-to-cart-button"
          type="submit"
          :value="$t(addCaption)"
          @click="addLineItem"
        />
      </div>
    </div>
    <div v-if="isOnStock" class="pro-dec-wishlist-compare">
      <a href @click.prevent="openAddToShoppingList">
        <i class="dl-icon-heart2"></i>
      </a>
    </div>

    <div class="mt-2" style="color: red" v-if="showQuantityError">
      {{ $t("quantityError", { quantity: availableQuantity }) }}
    </div>

    <div v-if="!isOnStock">
      <div class="pro-cart-wrap">
        {{ $t("notInStock") }}
      </div>
    </div>
  </div>
</template>
