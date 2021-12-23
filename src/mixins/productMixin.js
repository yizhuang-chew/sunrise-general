export default {
  computed: {
    currentProduct() {
      return this.product.masterData.current || {};
    },

    hasPrice() {
      return this.matchingVariant.price;
    },
  },

  methods: {
    displayedImageUrl(variant) {
      if (Array.isArray(variant.images) && variant.images.length) {
        return variant.images[0].url;
      }
      return "/assets/img/missing.svg";
    },

    productRoute(productSlug, sku, productType) {
      if(productType=="RentalDevice"){
        return {
          name: 'rentalproduct',
          params: { productSlug, sku },
        };
      }
      return {
        name: 'product',
        params: { productSlug, sku },
      };
    },
  },
};
