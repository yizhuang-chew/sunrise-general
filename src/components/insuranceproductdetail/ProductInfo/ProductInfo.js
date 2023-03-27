import ProductGallery from "../ProductGallery/ProductGallery.vue";
// import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
// import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from "../AddToCartForm/AddToCartForm.vue";
import BasePrice from "../../common/BasePrice/BasePrice.vue";
// import VariantSelector from '../VariantSelector/VariantSelector.vue';

export default {
  props: {
    sku: {
      type: String,
      default: "car-insurance",
    },
    productName: {
      type: String,
      default: "Car Insurance",
    },
    productPrice: {
      type: Object,
      default() {
        return {
          value: {
            centAmount: 10000,
            fractionDigits: 2,
            currency: this.$store.state.currency,
          },
        };
      },
    },
    productDescription: {
      type: String,
      default: "Please fill the form to get a quote for your insurance",
    },
    availableQuantity: {
      type: Number,
      default: 100,
    },
  },
  data: () => ({
    carModel: null,
    carLocation: null,
    carStorage: null,
    insurancePrice: null,
    gotQuote: false,
  }),
  methods: {
    openAddToShoppingList() {
      this.$emit("open-add-shopping-list", {
        slug: this.currentProduct.slug,
        sku: this.currentProduct.sku,
      });
    },
    getQuote() {
      if (this.carModel === "a") {
        this.productPrice.value.centAmount = 2000;
      } else {
        this.productPrice.value.centAmount = 100;
      }
      this.gotQuote = true;
    },
  },
  computed: {
    addOns() {
      var addOns = [];
      for (var attribute in this.masterVariant.attributes) {
        if (this.masterVariant.attributes[attribute].name == "addOns") {
          addOns = addOns.concat(
            this.masterVariant.attributes[attribute].value
          );
        }
      }
      return addOns;
    },
    appointmentDate() {
      var appointmentDate = false;
      for (var attribute in this.masterVariant.attributes) {
        if (
          this.masterVariant.attributes[attribute].name == "AppointmentDate"
        ) {
          appointmentDate = this.masterVariant.attributes[attribute].value;
        }
      }
      return appointmentDate;
    },
    subscription() {
      var subscription = false;
      for (var attribute in this.masterVariant.attributes) {
        if (this.masterVariant.attributes[attribute].name == "Subscription") {
          subscription = this.masterVariant.attributes[attribute].value;
        }
      }
      return subscription;
    },
  },

  components: {
    // DetailsSection,
    ProductGallery,
    // SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    // VariantSelector,
  },
};
