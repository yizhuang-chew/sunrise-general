<script src="./None.js"></script>

<template>
  <span>
    <div class="checkout-shipping-content">
      <div class="shipping-content-left">
        <span class="bold-text">Payment Method</span>
      </div>
    </div>
    <div class="payment-method">
      <div class="pay-top sin-payment">
        <input
          id="payment_method_1"
          v-model="paymentMethod"
          class="input-radio"
          type="radio"
          value="card"
          name="payment_method"
        />
        <label for="payment_method_1"
          >{{ $t('creditCard') }}
          <img
            class="payment-method-img"
            src="../../../../assets/img/CREDIT CARDS.png"
        /></label>
      </div>
      <div class="pay-top sin-payment">
        <input
          id="payment-method-2"
          v-model="paymentMethod"
          class="input-radio"
          type="radio"
          value="paypal"
          name="payment_method"
        />
        <label for="payment-method-2"
          >PayPal
          <img class="payment-method-img" src="../../../../assets/img/PayPal.png"
        /></label>
      </div>
      <div class="pay-top sin-payment">
        <input
          id="payment_method_3"
          v-model="paymentMethod"
          class="input-radio"
          type="radio"
          value="Stripe"
          name="payment_method"
        />
        <label for="payment_method_3"
          >Stripe
          <img
            class="payment-method-img"
            src="../../../../assets/img/CREDIT CARDS.png"
        /></label>
        <Stripe v-if="paymentMethod=='Stripe'" :amount="amount"
          @card-paid="cardPaid"/>
      </div>
    </div>
  </span>
</template>
