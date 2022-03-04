<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div style="margin-top:20px;max-width:100%;text-align:center">
    </div>
    <div class="parentimage">
      <img class="image1" :src="image1" />
      <img class="image2" :src="image2" />
    </div>
    <div
      v-if="pizzaOptions && pizzaOptions.length"
      class="product-dec-action-wrap pro-dec-action-2"
    >
      <div
        style="width: 50%"
        v-if="pizzaOptions && pizzaOptions.length"
        class="halfpizza pro-details-size"
      >
        <span style="text-align: center">Left</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="pizzaOptions"
          @onselectimage="onSelectLeft"
        ></vue-select-image>
      </div>
      <div
        style="width: 50%; border-left: dotted 2px lightgray"
        v-if="pizzaOptions && pizzaOptions.length"
        class="halfpizza pro-details-size"
      >
        <span style="text-align: center">Right</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="pizzaOptions"
          @onselectimage="onSelectRight"
        ></vue-select-image>
      </div>
    </div>
    <div style="width: 100%">
      <div style="width: 50%; text-align: center; float: left">
        <button @click="openCustomise">Customise</button>
      </div>
      <div style="width: 50%; text-align: center; float: left">
        <button @click="openCustomise">Customise</button>
      </div>
    </div>
    <div
      style="padding-top: 50px; width: 100%; text-align: center"
      class="product-dec-action-wrap pro-dec-action-2"
    >
      <form
        style="display: inline-block; margin: auto"
        v-if="isOnStock"
        ref="form"
        v-on:submit.prevent="addLineItem"
      >
        <div class="quality-cart-wrap">
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
