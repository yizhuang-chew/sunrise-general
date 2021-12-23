import cartMixin from '../../../mixins/cartMixin';
import { addRental } from '../../common/shared';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
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
    BasePrice,
  },
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
      type: Function|Boolean,
      required:false
    },
    addCaption: {
      type:String,
      default:"addToCart"
    },
    prices:{
      type:Array,
      required: false,
    },
  },
  mixins: [cartMixin],
  data: () => ({
    quantity: 1,
    showQuantityError: false,
    selectedPrice: null,
    selectedPlanType: null,
    selectedChannelName: null,
    selectedChannel: null,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    hasStockInfo() {
      return typeof this.availableQuantity !== 'undefined';
    },
    channelsSelectable(){
      var finalPrice = {};
      let sortedPrice = {};
      for(var price in this.prices){
        if(!this.prices[price].channel){
          finalPrice['Standard'] = {};
          finalPrice['Standard']['Standard'] = this.prices[price]
        }
        else{
          var planType = this.prices[price].custom.fields['planType'];
          var planKey = this.prices[price].custom.fields['plan'];
          if(!finalPrice[planType]){
            finalPrice[planType] = {};
          }
          finalPrice[planType][planKey]=this.prices[price];
        }
      }
      for (const [key, value] of Object.entries(finalPrice)) {
        var keys = Object.keys(finalPrice[key]); // or loop over the object to get the array
        keys.sort(); // maybe use custom sort, to change direction use .reverse()

        for (var i=0; i<keys.length; i++) { // now lets iterate in sort order
          var itemKey = keys[i];
          var itemValue = value[itemKey];
          if(!sortedPrice[key]){
            sortedPrice[key] = {};
          }
          sortedPrice[key][itemKey]=itemValue;
        } 
      }
      this.selectedPlanType = 'Standard';
      this.selectedPrice = finalPrice['Standard']['Standard'].id;
      return sortedPrice
    },
  },
  methods: {
    selectPlanType(item){
      this.selectedPlanType=item;
      const firstSelection = Object.keys(this.channelsSelectable[item])[0];
      const selectedItem = this.channelsSelectable[item][firstSelection]
      this.selectedPrice=selectedItem.id;
      this.selectedChannel=selectedItem.channel? selectedItem.channel.id : null;
      this.selectedChannelName=selectedItem.channel? selectedItem.channel.obj.key : null;
    },
    selectPlan(item){
      this.selectedPrice=item.id;
      this.selectedChannel=item.channel? item.channel.id : null;
      this.selectedChannelName=item.channel? item.channel.obj.key : null;
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
        return addRental(this)
          .then(() => this.$emit('product-added'))
          .then(() => this.$store.dispatch('openMiniCart'));
      } else {
        this.showQuantityError = true;
      }
    },
  },
};
