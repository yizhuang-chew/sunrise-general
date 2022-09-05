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
    bundleItems() {
      var bundleItems = []
      for(var attribute in this.masterVariant.attributes){
        if(this.masterVariant.attributes[attribute].name=='SelectionItems'){
          bundleItems = bundleItems.concat(this.masterVariant.attributes[attribute].value);
        }
      }
      bundleItems.sort((a,b) => {
        let aNum;
        let bNum;
        for(var aField in a){
          if (a[aField].name=="ItemNumber"){
            aNum = a[aField].value
          }
        }
        for(var bField in b){
          if (b[bField].name=="ItemNumber"){
            bNum = b[bField].value
          }
        }
        return (aNum > bNum) ? 1 : ((bNum > aNum) ? -1 : 0)
      });
      return bundleItems;
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
