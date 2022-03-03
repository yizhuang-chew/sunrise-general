<script src="./Stripe.js"></script>
<i18n src="./Stripe.txt"></i18n>
<style src="./Stripe.scss" lang="scss" scoped></style>

<template>
  <div class="stripeDiv">
    <div
      style="margin: 15px;padding: 15px"
      v-show="showComponent"
      v-if="this.elementsOptions.clientSecret"
      ref="Stripe"
    >
      <stripe-element-payment
        ref="paymentRef"
        :pk="pk"
        :elements-options="elementsOptions"
        :confirm-params="confirmParams"
        redirect="if_required"
      />
      <br />
      <button style="margin-bottom: 25px" @click.prevent="pay">Pay Now</button>
    </div>
    <div style="margin: 15px; padding: 15px" v-show="showLoading">
      <span class="bold-text"> Loading </span>
    </div>
    <div style="margin: 15px; padding: 15px" v-show="showPaid">
      <span class="bold-text">
        {{ $t("paid") }}
      </span>
    </div>
    <div v-show="showError">
      <div class="error-message" style="color: red">
        {{ $t("unknownError") }}
      </div>
      <button @click="retry">{{ $t("retry") }}</button>
    </div>
  </div>
</template>
