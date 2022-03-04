import cartMixin from "../../../mixins/cartMixin";
import AddOn from "../AddOn/AddOn.vue";
import gql from "graphql-tag";
import BasePrice from "../../common/BasePrice/BasePrice.vue";
import { addPizza } from "../../common/shared";

export const createCartVariables = (component) => ({
  currency: component.$store.state.currency,
  country: component.$store.state.country,
  shippingAddress: { country: component.$store.state.country },
});

export default {
  data: () => ({
    quantity: 1,
    modalName: "CustomisePizza",
    sauceTopping: null,
    cheeseTopping: null,
    meatTopping: null,
    seafoodTopping: null,
    vegetableTopping: null,
    selectableSauce: null,
    selectableCheese: null,
    selectableMeat: null,
    selectableSeafood: null,
    selectableVegetable: null,
    selectedToppings: {},

    adhocCartId: null,
    adhocCart: null,
    adhocCartPrice: null,

    disabled: false,
  }),
  mixins: [cartMixin],
  components: {
    AddOn,
    BasePrice,
  },
  props: {
    showModal: Boolean,
    basePrice: {
      type: Object,
      required: false,
    },
    defaultToppings: {
      type: Array,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    async updateToppings(sku, newVal, oldVal, quantity) {
      this.disabled = true;
      if (oldVal < newVal) { 
        // Add Items
        if (newVal != quantity) {
          //If it is same as initial, no items to add
          this.manageAdhocCart("add", sku, newVal);
        }
        else{
          this.disabled = false;
        }
      } else {
        // Remove Items
        if (newVal >= quantity) {
          let quantityToUpdate = newVal;
          if(quantity!=0){
            quantityToUpdate=quantityToUpdate-1
          }
          //If it is lesser, no items to remove
          this.manageAdhocCart("remove", sku, quantityToUpdate);
        }
        else {
          this.disabled = false;
        }
      }
      // final tracking
      this.selectedToppings[sku] = newVal;
    },
    async manageAdhocCart(action, sku, quantity) {
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
      if (action == "add") {
        actions.push({
          addLineItem: {
            sku: sku,
            quantity: 1,
          },
        });
      }
      if (action == "remove") {
        let oldLineItemId = this.adhocCart.lineItems.find((item) => {
          return item.variant.sku == sku;
        });
        actions.push({
          changeLineItemQuantity: {
            lineItemId: oldLineItemId.id,
            quantity: quantity,
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
      this.disabled = false;
    },
    async addToCart() {
      if (!this.cartExists) {
        await this.createMyCart(createCartVariables(this));
      }
      //only if hasStockInfo is true, that means stock info is available
      //  if stock info is not available then ignore stock errors
      return addPizza(this)
        .then(() => this.$emit("close-modal"))
        .then(() => this.$emit("product-added"))
        .then(() => this.$store.dispatch("openMiniCart"));
    },
  },
  watch: {
    showModal() {
      if (this.showModal === true) {
        this.$modal.show(this.modalName);
      } else {
        this.$modal.hide(this.modalName);
        this.$emit("close-modal");
      }
    },
    sauceTopping() {
      this.selectableSauce = [];
      var product = this.sauceTopping;
      for (var variant in product.masterData.current.allVariants) {
        var variantItem = product.masterData.current.allVariants[variant];

        var price = variantItem.price.value.centAmount;
        let toppingExists = this.defaultToppings.indexOf(variantItem.sku);
        let quantity = 0;
        if (toppingExists > -1) {
          quantity = 1;
        }
        if (price == 0) {
          price = "Free";
        } else {
          price =
            this.$store.state.currency +
            " " +
            (Math.round(price) / 100).toFixed(2);
        }
        this.selectableSauce.push({
          id: variantItem.sku,
          itemImage: variantItem.images[0].url,
          price: price,
          quantity: quantity,
        });
      }
    },
    cheeseTopping() {
      this.selectableCheese = [];
      var product = this.cheeseTopping;
      for (var variant in product.masterData.current.allVariants) {
        var variantItem = product.masterData.current.allVariants[variant];

        var price = variantItem.price.value.centAmount;
        let toppingExists = this.defaultToppings.indexOf(variantItem.sku);
        let quantity = 0;
        if (toppingExists > -1) {
          quantity = 1;
        }
        if (price == 0) {
          price = "Free";
        } else {
          price =
            this.$store.state.currency +
            " " +
            (Math.round(price) / 100).toFixed(2);
        }
        this.selectableCheese.push({
          id: variantItem.sku,
          itemImage: variantItem.images[0].url,
          price: price,
          quantity: quantity,
        });
      }
    },
    meatTopping() {
      this.selectableMeat = [];
      var product = this.meatTopping;
      for (var variant in product.masterData.current.allVariants) {
        var variantItem = product.masterData.current.allVariants[variant];

        var price = variantItem.price.value.centAmount;
        let toppingExists = this.defaultToppings.indexOf(variantItem.sku);
        let quantity = 0;
        if (toppingExists > -1) {
          quantity = 1;
        }
        if (price == 0) {
          price = "Free";
        } else {
          price =
            this.$store.state.currency +
            " " +
            (Math.round(price) / 100).toFixed(2);
        }
        this.selectableMeat.push({
          id: variantItem.sku,
          itemImage: variantItem.images[0].url,
          price: price,
          quantity: quantity,
        });
      }
    },
    seafoodTopping() {
      this.selectableSeafood = [];
      var product = this.seafoodTopping;
      for (var variant in product.masterData.current.allVariants) {
        var variantItem = product.masterData.current.allVariants[variant];

        var price = variantItem.price.value.centAmount;
        let toppingExists = this.defaultToppings.indexOf(variantItem.sku);
        let quantity = 0;
        if (toppingExists > -1) {
          quantity = 1;
        }
        if (price == 0) {
          price = "Free";
        } else {
          price =
            this.$store.state.currency +
            " " +
            (Math.round(price) / 100).toFixed(2);
        }
        this.selectableSeafood.push({
          id: variantItem.sku,
          itemImage: variantItem.images[0].url,
          price: price,
          quantity: quantity,
        });
      }
    },
    vegetableTopping() {
      this.selectableVegetable = [];
      var product = this.vegetableTopping;
      for (var variant in product.masterData.current.allVariants) {
        var variantItem = product.masterData.current.allVariants[variant];

        var price = variantItem.price.value.centAmount;
        let toppingExists = this.defaultToppings.indexOf(variantItem.sku);
        let quantity = 0;
        if (toppingExists > -1) {
          quantity = 1;
        }
        if (price == 0) {
          price = "Free";
        } else {
          price =
            this.$store.state.currency +
            " " +
            (Math.round(price) / 100).toFixed(2);
        }
        this.selectableVegetable.push({
          id: variantItem.sku,
          itemImage: variantItem.images[0].url,
          price: price,
          quantity: quantity,
        });
      }
    },
  },
  apollo: {
    sauceTopping: {
      query: gql`
        query sauceTopping(
          $key: String!
          $currency: Currency!
          $country: Country!
        ) {
          sauceTopping: product(key: $key) {
            id
            masterData {
              current {
                skus
                allVariants {
                  sku
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
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: "Sauce Topping",
        };
      },
    },
    cheeseTopping: {
      query: gql`
        query cheeseTopping(
          $key: String!
          $currency: Currency!
          $country: Country!
        ) {
          cheeseTopping: product(key: $key) {
            id
            masterData {
              current {
                skus
                allVariants {
                  sku
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
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: "Cheese Topping",
        };
      },
    },
    meatTopping: {
      query: gql`
        query meatTopping(
          $key: String!
          $currency: Currency!
          $country: Country!
        ) {
          meatTopping: product(key: $key) {
            id
            masterData {
              current {
                skus
                allVariants {
                  sku
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
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: "Meat Topping",
        };
      },
    },
    seafoodTopping: {
      query: gql`
        query seafoodTopping(
          $key: String!
          $currency: Currency!
          $country: Country!
        ) {
          seafoodTopping: product(key: $key) {
            id
            masterData {
              current {
                skus
                allVariants {
                  sku
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
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: "Seafood Topping",
        };
      },
    },
    vegetableTopping: {
      query: gql`
        query vegetableTopping(
          $key: String!
          $currency: Currency!
          $country: Country!
        ) {
          vegetableTopping: product(key: $key) {
            id
            masterData {
              current {
                skus
                allVariants {
                  sku
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
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          key: "Vegetable Topping",
        };
      },
    },
  },
};
