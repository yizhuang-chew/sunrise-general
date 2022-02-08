import cartMixin from '../../../mixins/cartMixin';
import { addGiftBundleLine } from '../../common/shared';
import VueSelectImage from 'vue-select-image';
import gql from 'graphql-tag';
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
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
    showQuantityError: false,
    addOnOptions: null,
    jarOptions: null,
    selectedAddOns: null,
    appointmentDateInput: null,
    selectedJar: null,
    personalizedJar: null,
    jarMessage: null,
    selectedCard: null,
    greetingCardOptions:null,
    to: null,
    message: null,
    from: null,

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
    onSelectJar(data) {
      console.log(data.id)
      this.selectedJar = data.id
      if (this.selectedJar == 'Personalise the Jar') {
        this.personalizedJar = true;
      }
      else {
        this.personalizedJar = null;
      }
    },
    onSelectCard(data) {
      this.selectedCard = data.id
    },
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
        return addGiftBundleLine(this)
          .then(() => this.$emit('product-added'))
          .then(() => this.$store.dispatch('openMiniCart'));
      } else {
        this.showQuantityError = true;
      }
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
    personalizedProduct() {
      this.jarOptions = [];

      for (var variant in this.personalizedProduct.masterData.current.allVariants) {
        var price = this.personalizedProduct.masterData.current.allVariants[variant].price.value.centAmount;
        if (price == 0) {
          price = 'Free'
        }
        else {
          price =  'Personalise ' + this.$store.state.currency + ' ' + price / 100
        }
        this.jarOptions.push({
          id: this.personalizedProduct.masterData.current.allVariants[variant].sku,
          src: this.personalizedProduct.masterData.current.allVariants[variant].images[0].url,
          alt: price,
        })
      }
    },
    greetingCard() {
      this.greetingCardOptions = [];

      for (var variant in this.greetingCard.masterData.current.allVariants) {
        var price = this.greetingCard.masterData.current.allVariants[variant].price.value.centAmount;
        if (price == 0) {
          price = 'Free'
        }
        else {
          price = this.$store.state.currency + ' ' + price / 100
        }
        this.greetingCardOptions.push({
          id: this.greetingCard.masterData.current.allVariants[variant].sku,
          src: this.greetingCard.masterData.current.allVariants[variant].images[0].url,
          alt: price,
        })
      }
    },
  },
  apollo: {
    personalizedProduct: {
      query: gql`
        query personalizedProduct ($key: String, $currency: Currency!, $country: Country!){
          personalizedProduct: product(key: $key) {
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
        }`,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: 'Gift_Label'
        };
      },
    },
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
    greetingCard: {
      query: gql`
        query greetingCard ($key: String, $currency: Currency!, $country: Country!){
          greetingCard: product(key: $key) {
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
        }`,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: 'Greeting_Card'
        };
      },
    },
  }
};
