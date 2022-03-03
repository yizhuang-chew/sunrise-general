import Stripe from '../Stripe/Stripe.vue';

export default {
  props: { amount: Object },
  components: {
    Stripe,
  },
  data: () => ({
    paymentMethod: "card",
  }),
  mounted() {
    // this.$emit("card-paid");
  },
  methods: {
    cardPaid(paymentId) {
    this.$emit("card-paid", paymentId);
    }
  },
};
