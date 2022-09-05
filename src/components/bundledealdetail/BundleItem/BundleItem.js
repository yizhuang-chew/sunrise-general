import VueSelectImage from "vue-select-image";
import gql from "graphql-tag";
import { locale } from "../../common/shared";

export default {
  components: { VueSelectImage },
  props: {
    bundleItem: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  /* mixins: [cartMixin], */
  data: () => ({
    categoryProductOptions: null,
    selectedProduct: null,
    variantsSkus: null,
    selectedSku: null,
    /* quantity: 1,
    showQuantityError: false,
    addOnOptions: null,
    selectedAddOns: null,
    appointmentDateInput: null, */
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    categoryId() {
      for (var index in this.bundleItem) {
        if (this.bundleItem[index].name == "Category") {
          return this.bundleItem[index].value.id;
        }
      }
    },
  },
  methods: {
    onSelectProduct(data) {
      this.selectedProduct = data.id;
      this.variantsSkus = data.variantsSku;
      this.selectedSku = data.variantsSku[0];
      this.$emit("bundle-item-updated", {
        selectedSku: this.selectedSku,
        index: this.index,
      });
    },
    onChange(){
      this.$emit("bundle-item-updated", {
        selectedSku: this.selectedSku,
        index: this.index,
      });
    },
  },
  watch: {
    categoryProducts() {
      this.categoryProductOptions = [];
      for (var productIndex in this.categoryProducts.results) {
        var product = this.categoryProducts.results[productIndex];
        var variantsSku = [];
        for (var variant in product.masterData.current.allVariants) {
          let variantSku = product.masterData.current.allVariants[variant].sku;
          variantsSku.push(variantSku);
        }
        this.categoryProductOptions.push({
          id: productIndex,
          src: product.masterData.current.allVariants[0].images[0].url,
          alt: product.masterData.current.name,
          variantsSku,
        });
        /* for (var variant in product.masterData.current.allVariants) {
          var variantItem = product.masterData.current.allVariants[variant]
          var price = variantItem.price.value.centAmount;
          if (price == 0) {
            price = 'Free'
          }
          else {
            price = this.$store.state.currency + ' ' + price / 100
          }
          this.categoryProductOptions.push({
            id: product.masterData.current.allVariants[variant].sku,
            src: product.masterData.current.allVariants[variant].images[0].url,
            alt: price,
          });
        }*/
      }
    },
  },
  apollo: {
    categoryProducts: {
      query: gql`
        query categoryProducts(
          $locale: Locale!
          $where: String!
          $currency: Currency!
          $country: Country!
        ) {
          categoryProducts: products(where: $where) {
            results {
              id
              masterData {
                current {
                  name(locale: $locale)
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
        }
      `,
      variables() {
        return {
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          where:
            'masterData(current(categories(id="' + this.categoryId + '")))',
          locale: locale(this),
        };
      },
    },
  },
};
