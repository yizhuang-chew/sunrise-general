import Breadcrumb from '../../common/Breadcrumb/Breadcrumb.vue';
import ProductInfo from '../ProductInfo/ProductInfo.vue';
import AddToShoppingList from '../../productoverview/AddToShoppingList/AddToShoppingList.vue';

export default {
  props: {
    productSlug: {
      type: String,
      default: "Custom",
    },
    sku: {
      type: String,
      default: "Custom",
    },
  },
  data: () => ({
    showAddToShoppingList:false,
    productSku: null,
  }),
  methods:{
    openAddToShoppingList() {
      this.showAddToShoppingList = true;
    },
    closeAddToShoppingList() {
      this.showAddToShoppingList = false;
    },
  },
  components: {
    Breadcrumb,
    ProductInfo,
    AddToShoppingList
  },
};
