<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <div v-if="subscription" class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Recurring Period</span
          >
          <select v-model="subscriptionInput" class="select">
            <option value="Every Week">Every Week</option>
            <option value="Every 2 Weeks">Every 2 Weeks</option>
            <option value="Every Month">Every Month</option>
            <option value="Every 2 Months">Every 2 Months</option>
            <option value="Every 6 Months">Every 6 Months</option>
          </select>
        </label>
      </div>
      <div v-if="appointmentDate" class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Appointment Date</span
          >
          <input class="dateInput" type="date" v-model="appointmentDateInput" />
        </label>
      </div>
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <form v-if="isOnStock" ref="form" v-on:submit.prevent="addCustomLineItem">
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
              value="Add Custom Line Item"
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
