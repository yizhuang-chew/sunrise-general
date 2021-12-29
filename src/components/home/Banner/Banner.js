import carousel from 'vue-owl-carousel';

export default {
  components: {
    carousel,
  },
  props:{
    slidingBanners: {
      type: Array,
    },
  }
};
