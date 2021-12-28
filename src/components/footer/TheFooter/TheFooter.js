import BaseFooter from '../BaseFooter/BaseFooter.vue';
import FooterLinks from '../FooterLinks/FooterLinks.vue';
import FooterMarketing from '../FooterMarketing/FooterMarketing.vue';
import config from "../../../../sunrise.config";

export default {
  components: {
    BaseFooter,
    FooterLinks,
    FooterMarketing,
  },
  data: () => ({
    logo: config.logo,
  }),
};
