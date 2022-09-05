import ProductGallery from '../ProductGallery/ProductGallery.vue';
// import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
// import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
// import VariantSelector from '../VariantSelector/VariantSelector.vue';

export default {
  props: {
    sku: {
      type: String,
      default: "Custom",
    },
    productName: {
      type: String,
      default: "Custom Product",
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
      default: "Custom Product Description",
    },
    availableQuantity: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    openAddToShoppingList() {
      this.$emit('open-add-shopping-list', { slug: this.currentProduct.slug, sku: this.currentProduct.sku });
    }
  },
  computed: {
    addOns() {
      var addOns = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='addOns'){
          addOns = addOns.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return addOns;
    },
    appointmentDate(){
      var appointmentDate = false;
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='AppointmentDate'){
          appointmentDate = this.masterVariant.attributes[attribute].value;
        }
      }
      return appointmentDate;
    },
    subscription(){
      var subscription = false;
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='Subscription'){
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
