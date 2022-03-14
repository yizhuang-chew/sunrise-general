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
      if(productType=="Rental_RentalDevice"){
        return {
          name: 'rentalproduct',
          params: { productSlug, sku },
        };
      }
      if(productType=="Gift_GiftCard"){
        return {
          name: 'giftcard',
          params: { productSlug, sku },
        };
      }
      if(productType=="Gift_GiftCardFixedValue"){
        return {
          name: 'giftcardfixed',
          params: { productSlug, sku },
        };
      }
      if(productType=="Gift_Bundle"){
        return {
          name: 'giftbundle',
          params: { productSlug, sku },
        };
      }
      if(productType=="Food_Pizza"){
        return {
          name: 'pizza',
          params: { productSlug, sku },
        };
      }
      if(productType=="Food_HalfPizza"){
        return {
          name: 'halfpizza',
          params: { productSlug, sku },
        };
      }
      if(productType=="Automotive_BaseCar"){
        return {
          name: 'car',
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
