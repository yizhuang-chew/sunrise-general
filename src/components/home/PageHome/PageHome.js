import Banner from "../Banner/Banner.vue";
import gql from "graphql-tag";

export default {
  data() {
    return {
      slidingBannersCollection: null,
      displayFromContent: false,
      bottomLeftBanner: "",
      bottomRightBanner: "",
      bottomMiddleTopBanner: "",
      bottomMiddleBottomBanner: "",
    };
  },
  components: {
    Banner,
  },
  apollo: {
    homePageCollection() {
      return {
        client: "contentfulApolloClient",
        query: gql`
          query homePageCollection {
            homePageCollection {
              items {
                site
                slidingBannersCollection {
                  items {
                    url
                    title
                  }
                }
                bottomLeftBanner {
                  title
                  url
                }
                bottomRightBanner {
                  title
                  url
                }
                bottomMiddleTopBanner {
                  title
                  url
                }
                bottomMiddleBottomBanner {
                  title
                  url
                }
              }
            }
          }
        `,
        /* variables() {
          return {
            sku: this.sku,
          };
        },*/
        result() {
          if (process.env.VUE_APP_CTF_SITE) {
            if (this.homePageCollection && this.homePageCollection.items) {
              let items = this.homePageCollection.items;
              for (let item in items) {
                if (items[item]["site"] == process.env.VUE_APP_CTF_SITE) {
                  this.displayFromContent=true;
                  this.slidingBannersCollection = items[item]["slidingBannersCollection"].items;
                  this.bottomLeftBanner = items[item]["bottomLeftBanner"];
                  this.bottomRightBanner = items[item]["bottomRightBanner"];
                  this.bottomMiddleTopBanner = items[item]["bottomMiddleTopBanner"];
                  this.bottomMiddleBottomBanner = items[item]["bottomMiddleBottomBanner"];
                }
              }
            }
          }
        },
      };
    },
  },
};
