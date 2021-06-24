import useProductQuery from '../../../../composition/useProductQuery';
import { inject, ref } from '@vue/composition-api';
import { SHOPPING_LIST } from '../../../../composition/useShoppingList';

export default {
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
    const shoppingList = ref(null);
    const { product } = useProductQuery(
      props,
      ctx,
      undefined,
      props.id,
      props.variantId
    );
    const {
      removeLineItem,
      // changeQuantity,
      addLineItemToCart: addLineToCart,
    } = inject(SHOPPING_LIST);
    const removeItem = (itemId) => {
      removeLineItem(
        itemId,
        shoppingList.value.id,
        shoppingList.value.version
      ).then((response) => (shoppingList.value = response));
    };
    const addItemToCart = (lineItem) => {
      addLineToCart(lineItem.productId, lineItem.quantity, lineItem.variantId);
    };
    return {
      product,
      removeLineItem,
      removeItem,
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
    amountChange(e) {
      const newAmount = Number(e.target.value);
      if (!isNaN(newAmount) && newAmount > 0) {
        this.$emit(
          'amountChange',
          newAmount,
          this.product.sku,
          this.lineItemId
        );
      }
    },
    productRoute(productSlug, sku) {
      return {
        name: 'product',
        params: { productSlug, sku },
      };
    },
  },
};
