import useProductQuery from '../../../../composition/useProductQuery';
import BasePrice from '../../../common/BasePrice/BasePrice.vue';
import { inject } from '@vue/composition-api';
import { SHOPPING_LIST } from '../../../../composition/useShoppingList';

export default {
  components: {
    BasePrice,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    lineItemId: {
      type: String,
      required: true,
    },
    variantId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const { product } = useProductQuery(
      props,
      ctx,
      undefined,
      props.id,
      props.variantId
    );
    const { addLineItemToCart: addLineToCart } = inject(SHOPPING_LIST);
    const addItemToCart = (lineItem) => {
      addLineToCart(lineItem.productId, lineItem.quantity, lineItem.variantId);
    };
    return {
      product,
      addItemToCart,
    };
  },
  methods: {
    displayedImageUrl(variant) {
      if (Array.isArray(variant.images) && variant.images.length) {
        return variant.images[0].url;
      }
      return null;
    },
    increment() {
      this.$emit(
        'amount-change',
        this.quantity + 1,
        this.product.sku,
        this.lineItemId
      );
    },

    decrement() {
      if (this.quantity > 0) {
        this.$emit(
          'amount-change',
          this.quantity - 1,
          this.product.sku,
          this.lineItemId
        );
      } else this.removeItem();
    },
    removeItem() {
      this.$emit('remove-product', this.lineItemId);
    },
    productRoute(productSlug, sku) {
      return {
        name: 'product',
        params: { productSlug, sku },
      };
    },
  },
};
