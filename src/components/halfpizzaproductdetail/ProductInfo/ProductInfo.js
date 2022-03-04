import ProductGallery from '../ProductGallery/ProductGallery.vue';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import VariantSelector from '../VariantSelector/VariantSelector.vue';
import useProductQuery from '../../../composition/useProductQuery';
import { ref, watch } from 'vue-demi';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  setup(props,ctx){
    const sku = ref(props.sku);
    watch(props,newProps=>sku.value=newProps.sku)
    return useProductQuery(props,ctx,sku);
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
    defaultToppings() {
      var toppings = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='defaultToppings'){
          toppings = toppings.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return toppings;
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
    pizzaSize(){
      var pizzaSize = '';
      for(var attribute in this.currentProduct.attributes){
        if(this.currentProduct.attributes[attribute].name=='PizzaSize'){
          pizzaSize = this.currentProduct.attributes[attribute].value;
        }
      }
      return pizzaSize;
    },
  },
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
  },
};
