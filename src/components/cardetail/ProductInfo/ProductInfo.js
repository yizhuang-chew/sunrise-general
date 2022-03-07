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
        if(this.masterVariant.attributes[attribute].name=='AddOns'){
          addOns = addOns.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return addOns;
    },
    exteriorColour() {
      var exteriorColour = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='ExteriorColour'){
          exteriorColour = exteriorColour.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return exteriorColour;
    },
    wheels() {
      var wheels = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='Wheels'){
          wheels = wheels.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return wheels;
    },
    interior() {
      var wheels = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='Interior'){
          wheels = wheels.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return wheels;
    },
    audio() {
      var wheels = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='Audio'){
          wheels = wheels.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      return wheels;
    },
    appointmentDate(){
      var appointmentDate = false;
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='AppointmentDate' 
        || this.masterVariant.attributes[attribute].name=='appointmentDate'){
          appointmentDate = this.masterVariant.attributes[attribute].value;
        }
      }
      return appointmentDate;
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
