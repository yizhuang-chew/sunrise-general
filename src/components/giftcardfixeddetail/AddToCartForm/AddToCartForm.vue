<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <div v-if="appointmentDate" class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text">Appointment Date</span>
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
      <div class="pro-details-size">
        <span class="field-label-text marginSpace" data-test="form-label-text">Delivery Date</span>
        <input class="textInput marginSpace" type="date" v-model="deliveryDate" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">To</span>
        <input class="textInput marginSpace" type="text" v-model="to" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Receipient Email</span>
        <input class="textInput marginSpace" type="text" v-model="recipientEmail" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">From</span>
        <input class="textInput marginSpace" type="text" v-model="from" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Your Email</span>
        <input class="textInput marginSpace" type="text" v-model="fromEmail" />
        <br/>
        <span class="field-label-text marginSpace" data-test="form-label-text">Personal Message</span>
        <textarea class="textInput marginSpace" v-model="message" />
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
