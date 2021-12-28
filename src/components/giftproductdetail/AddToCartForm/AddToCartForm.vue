<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <form v-if="isOnStock" ref="form" v-on:submit.prevent="addLineItem">
      <span class="field-label-text" data-test="form-label-text">Enter Amount:</span>
        <input class="textInput" type="number" v-model="giftCardAmount" />
        <span class="field-label-text" data-test="form-label-text">Delivery Date</span>
        <input class="textInput" type="date" v-model="deliveryDate" />
        <span class="field-label-text" data-test="form-label-text">To</span>
        <input class="textInput" type="text" v-model="to" />
        <span class="field-label-text" data-test="form-label-text">ReceipientEmail</span>
        <input class="textInput" type="text" v-model="recipientEmail" />
        <span class="field-label-text" data-test="form-label-text">From</span>
        <input class="textInput" type="text" v-model="from" />
        <span class="field-label-text" data-test="form-label-text">Your Email</span>
        <input class="textInput" type="text" v-model="fromEmail" />
        <span class="field-label-text" data-test="form-label-text">Personal Message</span>
        <textarea class="textInput" v-model="message" />
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
</template>
