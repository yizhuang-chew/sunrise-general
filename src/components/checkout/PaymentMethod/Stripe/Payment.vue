<template>
  <div>
    <form id="stripe-payment-element-form">
      <div id="stripe-payment-element-mount-point" />
      <slot name="stripe-payment-element-errors">
        <div id="stripe-payment-element-errors" role="alert" />
      </slot>
      <button ref="submitButtonRef" type="submit" class="hide" />
    </form>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js/dist/pure.esm.js";

export const VUE_STRIPE_VERSION = "4.4.1";

export const STRIPE_PARTNER_DETAILS = {
  name: "vue-stripe",
  version: "4.4.1",
  url: "https://vuestripe.com",
  partner_id: "pp_partner_IqtOXpBSuz0IE2",
};

export const INSECURE_HOST_ERROR_MESSAGE =
  "Vue Stripe will not work on an insecure host. Make sure that your site is using TCP/SSL.";

export const isSecureHost = (testMode) => {
  if (testMode) return true;
  return (
    window.location.hostname === "localhost" ||
    window.location.protocol === "https:"
  );
};
const ELEMENT_TYPE = "payment";
export default {
  props: {
    pk: {
      type: String,
      required: true,
    },
    testMode: {
      type: Boolean,
      default: false,
    },
    elementsOptions: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    confirmParams: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    redirect: {
      type: String,
      required: false,
    },
    createOptions: {
      type: Object,
      default: () => ({}),
    },
    stripeAccount: {
      type: String,
      default: undefined,
    },
    apiVersion: {
      type: String,
      default: undefined,
    },
    locale: {
      type: String,
      default: "auto",
    },
    disableAdvancedFraudDetection: {
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      stripe: null,
      elements: null,
      element: null,
    };
  },
  computed: {
    form() {
      return document.getElementById("stripe-payment-element-form");
    },
  },
  async mounted() {
    if (!isSecureHost(this.testMode)) {
      document.getElementById(
        "stripe-payment-element-mount-point"
      ).innerHTML = `<p style="color: red">${INSECURE_HOST_ERROR_MESSAGE}</p>`;
      return;
    }
    if (this.disableAdvancedFraudDetection) {
      loadStripe.setLoadParameters({ advancedFraudSignals: false });
    }
    const stripeOptions = {
      stripeAccount: this.stripeAccount,
      apiVersion: this.apiVersion,
      locale: this.locale,
    };
    this.stripe = await loadStripe(this.pk, stripeOptions);
    this.stripe.registerAppInfo(STRIPE_PARTNER_DETAILS);
    this.elements = this.stripe.elements(this.elementsOptions);
    this.element = this.elements.create(ELEMENT_TYPE, this.createOptions);
    this.element.mount("#stripe-payment-element-mount-point");
    this.element.on("change", (event) => {
      var displayError = document.getElementById(
        "stripe-payment-element-errors"
      );
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = "";
      }
      this.onChange(event);
    });
    this.element.on("blur", this.onBlur);
    this.element.on("click", this.onClick);
    this.element.on("escape", this.onEscape);
    this.element.on("focus", this.onFocus);
    this.element.on("ready", this.onReady);
    this.form.addEventListener("submit", async (event) => {
      try {
        this.$emit("loading", true);
        event.preventDefault();
        const { error } = await this.stripe.confirmPayment({
          elements: this.elements,
          confirmParams: this.confirmParams,
          redirect: this.redirect,
        });
        if (error) {
          const errorElement = document.getElementById(
            "stripe-payment-element-errors"
          );
          errorElement.textContent = error.message;
          this.$emit("error", error);
          return;
        }
      } catch (error) {
         // eslint-disable-next-line no-console
        console.error(error);
        this.$emit("error", error);
      } finally {
        this.$emit("loading", false);
      }
    });
  },
  methods: {
    /**
     * Triggers the submission of the form
     * @return {void}
     */
    submit() {
      this.$refs.submitButtonRef.click();
    },
    /**
     * Clears the element
     * @return {void}
     */
    clear() {
      this.element.clear();
    },
    /**
     * Destroys the element
     * @return {void}
     */
    destroy() {
      this.element.destroy();
    },
    /**
     * Focuses on the element
     * @return {void}
     */
    focus() {
       // eslint-disable-next-line no-console
      console.warn(
        "This method will currently not work on iOS 13+ due to a system limitation."
      );
      this.element.focus();
    },
    /**
     * Collapses the Payment Element into a row of payment method tabs
     * @return {void}
     */
    collapse() {
      this.element.collapse();
    },
    /**
     * Retrieves a previously created element
     */
    getElement() {
      this.element.getElement();
    },
    /**
     * Unmounts the element
     * @return {void}
     */
    unmount() {
      this.element.unmount();
    },
    update(opts) {
      this.element.update(opts);
    },
    // events
    onChange(e) {
      this.$emit("element-change", e);
    },
    onReady(e) {
      this.$emit("element-ready", e);
    },
    onFocus(e) {
      this.$emit("element-focus", e);
    },
    onBlur(e) {
      this.$emit("element-blur", e);
    },
    onEscape(e) {
      this.$emit("element-escape", e);
    },
    onClick(e) {
      this.$emit("element-click", e);
    },
  },
};
</script>

<style scoped>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.hide {
  display: none;
}
</style>