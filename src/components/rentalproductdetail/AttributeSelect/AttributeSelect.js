import { inject } from 'vue-demi';
import HooverDropdown from '../../common/HoverDropdown/HoverDropdown.vue';
import config from "../../../../sunrise.config";

export default {
  components: {
    HooverDropdown,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    variantCombinations: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const onVariantSelect = inject('onVariantSelect',false);
    return {onVariantSelect};
  },
  computed: {
    selectedValue: {
      get() {
        return this.selected[this.id];
      },
      set(value) {
        let sku;
        Object.keys(this.variantCombinations).forEach((key) => {
          if (this.variantCombinations[key][this.id] === value) {
            let match = true;
            Object.keys(config.variantSelector).forEach((attribute) => {
              if (
                match
                && this.variantCombinations[key][config.variantSelector[attribute]]
                && config.variantSelector[attribute] !== this.id
                && this.selected[config.variantSelector[attribute]]
                !== this.variantCombinations[key][config.variantSelector[attribute]]) {
                match = false;
              }
            });
            if (match) {
              sku = this.variantCombinations[key].sku;
            }
          }
        });
        this.$router.push({ path: sku });
      }
    },
  },
};
