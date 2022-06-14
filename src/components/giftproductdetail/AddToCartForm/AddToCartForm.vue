<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <form v-if="isOnStock" ref="form" v-on:submit.prevent="addLineItem">
      <span class="field-label-text marginSpace" data-test="form-label-text">Enter Amount:</span>
        <br/>
        {{currency}} <input class="textInput marginSpace" type="number" v-model="giftCardAmount" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Delivery Date</span>
        <br/>
        <input class="textInput marginSpace" type="date" v-model="deliveryDate" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">To</span>
        <br/>
        <input class="textInput marginSpace" type="text" v-model="to" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Receipient Email</span>
        <br/>
        <input class="textInput marginSpace" type="text" v-model="recipientEmail" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">From</span>
        <br/>
        <input class="textInput marginSpace" type="text" v-model="from" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Your Email</span>
        <br/>
        <input class="textInput marginSpace" type="text" v-model="fromEmail" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Personal Message</span>
        <br/>
        <textarea class="textInput marginSpace" v-model="message" />
      <div class="quality-cart-wrap" style="width:58%">
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
