import VueNumericInput from "vue-numeric-input";

export default {
  props: {
    disabled: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    itemImage: {
      type: String,
      required: true,
      //`https:d16jhsvmsopai9.cloudfront.net/img/misc/topping-sprite-2.2.jpg`
    },
  },
  data: function() {
    return {
      count: this.quantity,
    };
  },
  components: {
    VueNumericInput,
  },
  watch: {
    count(newVal, oldVal) {
      this.$emit("updateToppings", this.name, newVal, oldVal, this.quantity);
    },
  },
};
