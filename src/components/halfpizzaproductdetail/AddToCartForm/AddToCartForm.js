import cartMixin from '../../../mixins/cartMixin';
import { addHalfPizza } from '../../common/shared';
import VueSelectImage from 'vue-select-image';
import gql from 'graphql-tag';
import CustomisePizza from '../CustomisePizza/CustomisePizza.vue';

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
  components: { 
    VueSelectImage,
    CustomisePizza, },
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
    },
    appointmentDate:{
      type: Boolean,
      required: false,
    },
    availableQuantity: {
      type: Number,
      required: false,
    },
    onAdd: {
      type: Function|Boolean,
      required:false
    },
    addCaption: {
      type:String,
      default:"addToCart"
    },
    addOns: {
      type:Array,
      required: false,
    },
    pizzaSize: {
      type:String,
    },
    basePrice: {
      type: Object,
      required: false,
    },
    defaultToppings: {
      type:Array,
      required: false,
    },
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
    showQuantityError: false,
    addOnOptions: null,
    selectedAddOns: null,
    appointmentDateInput: null,
    showCustomise:false,
    
    pizzaOptions: null,
    image1: "https://0d15c74a79262944949f-e3df37c100965bfa877251e183a4af07.ssl.cf5.rackcdn.com/Pepperoni-nk9SkkpU.png",
    image2: 
    "https://0d15c74a79262944949f-e3df37c100965bfa877251e183a4af07.ssl"
    +".cf5.rackcdn.com/Southern_Chicken_Bac-ZMlEl3rR.png",
    sku1: null,
    sku2: null,
    price1: null,
    price2: null,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    hasStockInfo() {
      return typeof this.availableQuantity !== 'undefined';
    },
  },
  methods: {
    onSelectMultipleGifts(data){
      this.selectedAddOns = [];
      for(var selected in data){
        this.selectedAddOns.push(data[selected].id)
      }
    },
    async addLineItem() {
      if(this.onAdd){
        this.onAdd(this.sku,this.quantity)
        return
      }
      if (!this.isOnStock) {
        return;
      }
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      //only if hasStockInfo is true, that means stock info is available
      //  if stock info is not available then ignore stock errors
      if (this.quantity <= this.availableQuantity || this.hasStockInfo === false) {
        this.showQuantityError = false;
        return addHalfPizza(this)
          .then(() => this.$emit('product-added'))
          .then(() => this.$store.dispatch('openMiniCart'));
      } else {
        this.showQuantityError = true;
      }
    },
    openCustomise() {
      this.showCustomise = true;
    },
    closeCustomise() {
      this.showCustomise = false;
    },
    onSelectLeft(data){
      this.image1=data.src;
      this.sku1=data.id;
      this.price1=data.price;
    },
    onSelectRight(data){
      this.image2=data.src;
      this.sku2=data.id;
      this.price2=data.price;
    },
  },
  watch: {
    addOnProducts(){
      this.addOnOptions = [];
      for (var productIndex in this.addOnProducts.results) {
        var product = this.addOnProducts.results[productIndex]
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant]
          if(this.addOns.includes(variantItem.sku)){
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = 'Free'
            }
            else {
              price = this.$store.state.currency + ' ' + price / 100
            }
            this.addOnOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src: product.masterData.current.allVariants[variant].images[0].url,
              alt: price,
            })
          }
        }
      }
    },
    pizzas(){
      this.pizzaOptions = [];
      for (var productIndex in this.pizzas.results) {
        var product = this.pizzas.results[productIndex]
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant]
          let pizzaSize = variantItem.attributesRaw.find((attribute)=>{
            return attribute.name=="Size";
          });
          if(pizzaSize.value==this.pizzaSize){  
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = 'Free'
            }
            else {
              price = this.$store.state.currency + ' ' + price / 100 /2
            }
            this.pizzaOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src: product.masterData.current.allVariants[variant].images[0].url,
              alt: product.masterData.current.allVariants[variant].sku + "\n " + price,
              price: variantItem.price.value.centAmount/2,
            })
          }
        }
      }
    },
  },
  apollo: {
    addOnProducts: {
      query: gql`
        query addOnProducts ($skus: [String!], $currency: Currency!, $country: Country!){
          addOnProducts: products(skus: $skus) {
            results{
              id
              masterData{
                current{
                  skus
                  allVariants{
                    sku
                    images{
                      url
                    }
                    price(currency: $currency, country:$country){
                      value{
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.addOns
        };
      }
    },
    pizzas: {
      query: gql`
        query pizzas ( $where: String!, $currency: Currency!, $country: Country!){
          pizzas: products(where: $where) {
            results{
              id
              masterData{
                current{
                  skus
                  allVariants{
                    sku
                    images{
                      url
                    }
                    price(currency: $currency, country:$country){
                      value{
                        centAmount
                      }
                    }
                    attributesRaw {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          where: `${
            "masterData(current(masterVariant(attributes(name="+'"Size" and value="'+this.pizzaSize+'")))) or ' +
            "masterData(current(variants(attributes(name="+'"Size" and value="'+this.pizzaSize+'"))))'}`
        };
      }
    },
  }
};
