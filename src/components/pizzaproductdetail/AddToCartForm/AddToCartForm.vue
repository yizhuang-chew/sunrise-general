<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div
      v-if="appointmentDate || (addOnOptions && addOnOptions.length)"
      class="product-dec-action-wrap pro-dec-action-2"
    >
      <div v-if="appointmentDate" class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Appointment Date</span
          >
          <input class="dateInput" type="date" v-model="appointmentDateInput" />
        </label>
      </div>
      <div v-if="addOnOptions && addOnOptions.length" class="pro-details-size">
        <span style="margin-left: 3px">Add Ons</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="addOnOptions"
          :is-multiple="true"
          :selectedImages="selectedAddOns"
          @onselectmultipleimage="onSelectMultipleGifts"
        ></vue-select-image>
      </div>
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <button @click="openCustomise">Customise</button>
      <CustomisePizza
        :showModal="showCustomise"
        :sku="sku"
        :basePrice="basePrice"
        @close-modal="closeCustomise"
        :defaultToppings="defaultToppings"
      />
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <form v-if="isOnStock" ref="form" v-on:submit.prevent="addLineItem">
        <div class="quality-cart-wrap">
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
