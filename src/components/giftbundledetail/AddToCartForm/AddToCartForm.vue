<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div class="product-dec-action-wrap pro-dec-action-2" v-if="jarOptions">
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Jar</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="jarOptions"
          @onselectimage="onSelectJar"
        ></vue-select-image>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="personalizedJar"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Input Message on Jar</span>
        <div>
          <input class="textInput" type="text" v-model="jarMessage" />
        </div>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="selectedJar && addOnOptions && addOnOptions.length"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Add Ons as Gifts</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="addOnOptions"
          :is-multiple="true"
          :selectedImages="selectedAddOns"
          @onselectmultipleimage="onSelectMultipleGifts"
        ></vue-select-image>
      </div>
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2" v-if="selectedJar">
      <div class="pro-details-size">
        <span style="margin-left: 3px">Add a Greeting Card</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="greetingCardOptions"
          @onselectimage="onSelectCard"
        ></vue-select-image>
      </div>
    </div>
     <div class="product-dec-action-wrap pro-dec-action-2" v-if="selectedCard">
    <div class="pro-details-size">
        <span style="margin-left: 3px">Customise Your Message</span>
        <span style="margin-left: 3px">To:</span>
        <div>
          <input class="textInput" type="text" v-model="to" />
        </div>
        <span style="margin-left: 3px">From:</span>
        <div>
          <input class="textInput" type="text" v-model="from" />
        </div>
        <span style="margin-left: 3px">Message:</span>
        <div>
          <textarea class="textInput" v-model="message" />
        </div>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="selectedJar && appointmentDate"
    >
      <div class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Date of Delivery</span
          >
          <input class="dateInput" type="date" v-model="appointmentDateInput" />
        </label>
      </div>
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
