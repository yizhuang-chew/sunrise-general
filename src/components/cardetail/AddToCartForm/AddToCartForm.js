import cartMixin from "../../../mixins/cartMixin";
import { addCarLine } from "../../common/shared";
import VueSelectImage from "vue-select-image";
import BasePrice from "../../common/BasePrice/BasePrice.vue";
import gql from "graphql-tag";
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
  components: { VueSelectImage, BasePrice },
  props: {
    sku: {
      type: String,
      required: true,
    },
    isOnStock: {
      type: Boolean,
      required: true,
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
    exteriorColour: {
      type: Array,
      required: false,
    },
    wheels: {
      type: Array,
      required: false,
    },
    interior: {
      type: Array,
      required: false,
    },
    audio: {
      type: Array,
      required: false,
    },
    basePrice: {
      type: Object,
      required: false,
    },
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
    showQuantityError: false,
    
    appointmentDateInput: null,

    addOnOptions: null,
    exteriorColourOptions: null,
    wheelOptions: null,
    interiorOptions: null,
    audioOptions: null,

    selectedAddOnsArray: null,
    selectedAudioArray: null,
    selectedExteriorArray: null,
    selectedWheelArray: null,
    selectedInteriorArray: null,

    selectedAddOns: null,
    selectedAudio: null,
    selectedExterior: null,
    selectedWheel: null,
    selectedInterior: null,

    adhocCartId: null,
    adhocCart: null,
    adhocCartPrice: null,

    requestInput: null,
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
    async init() {
      if (
        !this.selectedExterior ||
        !this.selectedWheel ||
        !this.selectedInterior
      ) return;
      await this.manageAdhocCart(this.selectedExterior);
      await this.manageAdhocCart(this.selectedWheel);
      await this.manageAdhocCart(this.selectedInterior);
    },
    async onSelectExterior(data) {
      if(this.selectedExterior!=data.id){
        const oldSku = this.selectedExterior;
        this.selectedExterior = data.id;
        let newSku = this.selectedExterior;
        await this.manageAdhocCart(newSku, oldSku);
      }
    },
    async onSelectWheel(data) {
      if(this.selectedWheel!=data.id){
        const oldSku = this.selectedWheel;
        this.selectedWheel = data.id;
        let newSku = this.selectedWheel;
        await this.manageAdhocCart(newSku, oldSku);
      }
    },
    async onSelectInterior(data) {
      if(this.selectedInterior!=data.id){
        const oldSku = this.selectedInterior;
        this.selectedInterior = data.id;
        let newSku = this.selectedInterior;
        await this.manageAdhocCart(newSku, oldSku);
      }
    },
    async onSelectAudio(data) {
      if(this.selectedAudio!=data.id){
        const oldSku = this.selectedAudio;
        this.selectedAudio = data.id;
        let newSku = this.selectedAudio;
        await this.manageAdhocCart(newSku, oldSku);
      }
    },
    async onSelectAddOns(data) {
      let selectedAddOns = [];
      for(var index in this.addOnOptions){
        // check through selected list
        // if already in selected (no change)
        const isSelected = data.findIndex(element => {
          if (element.id === this.addOnOptions[index].id) {
            return true;
          }
        });
        if(isSelected<0 && this.selectedAddOns){
          const isPreviouslySelected = this.selectedAddOns.findIndex(element => {
            if (element === this.addOnOptions[index].id) {
              return true;
            }
          });
          if(isPreviouslySelected>=0){
            await this.manageAdhocCart(null, this.addOnOptions[index].id);
          }
        }
        if(isSelected>=0){
          selectedAddOns.push(this.addOnOptions[index].id);
            let newItem = true;
            if(this.selectedAddOns){
              const isPreviouslySelected = this.selectedAddOns.findIndex(element => {
                if (element === this.addOnOptions[index].id) {
                  return true;
                }
            })
            if(isPreviouslySelected>=0){
              newItem = false;
            }
          }
          if(newItem){
            await this.manageAdhocCart(this.addOnOptions[index].id);
          }
        }
      }
      this.selectedAddOns = selectedAddOns;
    },
    async addLineItem() {
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
        return addCarLine(this)
          .then(() => this.$emit("product-added"))
          .then(() => this.$store.dispatch("openMiniCart"));
      } else {
        this.showQuantityError = true;
      }
    },
    async manageAdhocCart(newSku, oldSku) {
      let actions = [];
      if (!this.adhocCartId) {
        const cartData = await this.createAdhocCart(createCartVariables(this));
        this.adhocCart = cartData.data.createCart;
        this.adhocCartId = cartData.data.createCart.id;
        actions.push({
          addLineItem: {
            sku: this.sku,
            quantity: 1,
          },
        });
      }
      if (newSku) {
        actions.push({
          addLineItem: {
            sku: newSku,
            quantity: 1,
          },
        });
      }
      if (oldSku) {
        let oldLineItemId = this.adhocCart.lineItems.find((item) => {
          return item.variant.sku == oldSku;
        });
        actions.push({
          removeLineItem: {
            lineItemId: oldLineItemId.id,
          },
        });
      }
      const cartData = await this.updateAdhocCart(
        this.adhocCartId,
        this.adhocCart,
        actions
      );
      this.adhocCartPrice = { value: cartData.data.updateCart.totalPrice };
      this.adhocCart = cartData.data.updateCart;
    },
  },
  watch: {
    addOnProducts() {
      this.addOnOptions = [];
      for (var productIndex in this.addOnProducts.results) {
        var product = this.addOnProducts.results[productIndex];
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant];
          if (this.addOns.includes(variantItem.sku)) {
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = "Free";
            } else {
              price = this.$store.state.currency + " " + price / 100;
            }
            this.addOnOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src:
                product.masterData.current.allVariants[variant].images[0].url,
              alt:
                product.masterData.current.allVariants[variant].key +
                "\n " +
                price,
            });
          }
        }
      }
      /* if(this.addOnOptions.length>0)
        this.selectedAddOnsArray = [this.addOnOptions[0]]; */
    },
    exteriorColourProducts() {
      this.exteriorColourOptions = [];
      for (var productIndex in this.exteriorColourProducts.results) {
        var product = this.exteriorColourProducts.results[productIndex];
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant];
          if (this.exteriorColour.includes(variantItem.sku)) {
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = "Free";
            } else {
              price = this.$store.state.currency + " " + price / 100;
            }
            this.exteriorColourOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src:
                product.masterData.current.allVariants[variant].images[0].url,
              alt:
                product.masterData.current.allVariants[variant].key +
                "\n " +
                price,
            });
          }
        }
      }
      if (this.exteriorColourOptions.length > 0) {
        this.selectedExteriorArray = [this.exteriorColourOptions[0]];
        this.selectedExterior = this.exteriorColourOptions[0].id;
      }
      this.init();
    },
    wheelProducts() {
      this.wheelOptions = [];
      for (var productIndex in this.wheelProducts.results) {
        var product = this.wheelProducts.results[productIndex];
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant];
          if (this.wheels.includes(variantItem.sku)) {
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = "Free";
            } else {
              price = this.$store.state.currency + " " + price / 100;
            }
            this.wheelOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src:
                product.masterData.current.allVariants[variant].images[0].url,
              alt:
                product.masterData.current.allVariants[variant].key +
                "\n " +
                price,
            });
          }
        }
      }
      if (this.wheelOptions.length > 0) {
        this.selectedWheelArray = [this.wheelOptions[0]];
        this.selectedWheel = this.wheelOptions[0].id;
      }
      this.init();
    },
    interiorProducts() {
      this.interiorOptions = [];
      for (var productIndex in this.interiorProducts.results) {
        var product = this.interiorProducts.results[productIndex];
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant];
          if (this.interior.includes(variantItem.sku)) {
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = "Free";
            } else {
              price = this.$store.state.currency + " " + price / 100;
            }
            this.interiorOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src:
                product.masterData.current.allVariants[variant].images[0].url,
              alt:
                product.masterData.current.allVariants[variant].key +
                "\n " +
                price,
            });
          }
        }
      }
      if (this.interiorOptions.length > 0) {
        this.selectedInteriorArray = [this.interiorOptions[0]];
        this.selectedInterior = this.interiorOptions[0].id;
      }
      this.init();
    },
    audioProducts() {
      this.audioOptions = [];
      for (var productIndex in this.audioProducts.results) {
        var product = this.audioProducts.results[productIndex];
        for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant];
          if (this.audio.includes(variantItem.sku)) {
            var price = variantItem.price.value.centAmount;
            if (price == 0) {
              price = "Free";
            } else {
              price = this.$store.state.currency + " " + price / 100;
            }
            this.audioOptions.push({
              id: product.masterData.current.allVariants[variant].sku,
              src:
                product.masterData.current.allVariants[variant].images[0].url,
              alt:
                product.masterData.current.allVariants[variant].key +
                "\n " +
                price,
            });
          }
        }
      }
    },
  },
  apollo: {
    addOnProducts: {
      query: gql`
        query addOnProducts(
          $skus: [String!]
          $currency: Currency!
          $country: Country!
        ) {
          addOnProducts: products(skus: $skus) {
            results {
              id
              masterData {
                current {
                  skus
                  allVariants {
                    sku
                    key
                    images {
                      url
                    }
                    price(currency: $currency, country: $country) {
                      value {
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.addOns,
        };
      },
    },
    exteriorColourProducts: {
      query: gql`
        query exteriorColourProducts(
          $skus: [String!]
          $currency: Currency!
          $country: Country!
        ) {
          exteriorColourProducts: products(skus: $skus) {
            results {
              id
              masterData {
                current {
                  skus
                  allVariants {
                    sku
                    key
                    images {
                      url
                    }
                    price(currency: $currency, country: $country) {
                      value {
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.exteriorColour,
        };
      },
    },
    wheelProducts: {
      query: gql`
        query wheelProducts(
          $skus: [String!]
          $currency: Currency!
          $country: Country!
        ) {
          wheelProducts: products(skus: $skus) {
            results {
              id
              masterData {
                current {
                  skus
                  allVariants {
                    sku
                    key
                    images {
                      url
                    }
                    price(currency: $currency, country: $country) {
                      value {
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.wheels,
        };
      },
    },
    interiorProducts: {
      query: gql`
        query interiorProducts(
          $skus: [String!]
          $currency: Currency!
          $country: Country!
        ) {
          interiorProducts: products(skus: $skus) {
            results {
              id
              masterData {
                current {
                  skus
                  allVariants {
                    sku
                    key
                    images {
                      url
                    }
                    price(currency: $currency, country: $country) {
                      value {
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.interior,
        };
      },
    },
    audioProducts: {
      query: gql`
        query audioProducts(
          $skus: [String!]
          $currency: Currency!
          $country: Country!
        ) {
          audioProducts: products(skus: $skus) {
            results {
              id
              masterData {
                current {
                  skus
                  allVariants {
                    sku
                    key
                    images {
                      url
                    }
                    price(currency: $currency, country: $country) {
                      value {
                        centAmount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          skus: this.audio,
        };
      },
    },
  },
};
