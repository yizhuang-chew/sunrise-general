import cartMixin from "../../../mixins/cartMixin";
import { addCustomLine } from "../../common/shared";
import VueSelectImage from "vue-select-image";
// import ServerError from '../../common/form/ServerError/index.vue';
// import LoadingButton from '../../common/form/LoadingButton/index.vue';
// import BaseSelect from '../../common/form/BaseSelect/index.vue';
// import BaseForm from '../../common/form/BaseForm/index.vue';
export const createCartVariables = (component) => ({
  currency: component.$store.state.currency,
  country: component.$store.state.country,
  shippingAddress: { country: component.$store.state.country },
});
export default {
  components: { VueSelectImage },
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    appointmentDate: {
      type: Boolean,
      required: false,
    },
    subscription: {
      type: Boolean,
      required: false,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
    onAdd: {
      type: Function | Boolean,
      required: false,
    },
    addCaption: {
      type: String,
      default: "addToCart",
    },
    addOns: {
      type: Array,
      required: false,
    },
    money: {
      type: Object,
      required: true,
    },
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
    showQuantityError: false,
    addOnOptions: null,
    selectedAddOns: null,
    appointmentDateInput: null,
    subscriptionInput: null,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    hasStockInfo() {
      return typeof this.availableQuantity !== "undefined";
    },
  },
  methods: {
    onSelectMultipleGifts(data) {
      this.selectedAddOns = [];
      for (var selected in data) {
        this.selectedAddOns.push(data[selected].id);
      }
    },

    async addCustomLineItem() {
      if (this.onAdd) {
        this.onAdd(this.sku, this.quantity);
        return;
      }
      if (!this.isOnStock) {
        return;
      }
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      //only if hasStockInfo is true, that means stock info is available
      //  if stock info is not available then ignore stock errors
      if (
        this.quantity <= this.availableQuantity ||
        this.hasStockInfo === false
      ) {
        this.showQuantityError = false;
        return addCustomLine(this)
          .then(() => this.$emit("product-added"))
          .then(() => this.$store.dispatch("openMiniCart"));
      } else {
        this.showQuantityError = true;
      }
    },
  },
};
