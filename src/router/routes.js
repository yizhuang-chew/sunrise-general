import config from "../../sunrise.config";
import TheHeader from "../components/header/TheHeader/TheHeader.vue";
import TheFooter from "../components/footer/TheFooter/TheFooter.vue";
import PageHome from "../components/home/PageHome/PageHome.vue";
import PageProductOverview from "../components/productoverview/PageProductOverview/PageProductOverview.vue";
import PageLogin from "../components/login/PageLogin/PageLogin.vue";
import ForgotPassword from "../components/login/ForgotPassword/ForgotPassword.vue";
import ResetPassword from "../components/login/ResetPassword/ResetPassword.vue";
import PageUserAccount from "../components/useraccount/PageUserAccount/PageUserAccount.vue";
import PageNotFound from "../components/common/PageNotFound/PageNotFound.vue";
import PageProductDetail from "../components/productdetail/PageProductDetail/PageProductDetail.vue";
import CarProductDetail from "../components/cardetail/PageProductDetail/PageProductDetail.vue";
import PageRentalProductDetail from "../components/rentalproductdetail/PageProductDetail/PageProductDetail.vue";
import PageGiftProductDetail from "../components/giftproductdetail/PageProductDetail/PageProductDetail.vue";
import PageGiftBundleDetail from "../components/giftbundledetail/PageProductDetail/PageProductDetail.vue";
import PagePizzaDetail from "../components/pizzaproductdetail/PageProductDetail/PageProductDetail.vue";
import CustomDetail from "../components/customdetail/PageProductDetail/PageProductDetail.vue";
import PageGiftCardFixedDetail from "../components/giftcardfixeddetail/PageProductDetail/PageProductDetail.vue";
import HalfPizzaDetail from "../components/halfpizzaproductdetail/PageProductDetail/PageProductDetail.vue";
import PageShoppingList from "../components/cartdetail/PageShoppingList/PageShoppingList.vue";
import BundleDealDetail from "../components/bundledealdetail/PageProductDetail/PageProductDetail.vue";
import ListDetail from "../components/cartdetail/PageShoppingList/ListDetail/ListDetail.vue";
import PageCartDetail from "../components/cartdetail/PageCartDetail/PageCartDetail.vue";
import PageStoreLocator from "../components/stores/PageStoreLocator/PageStoreLocator.vue";
import TabAccountDetails from "../components/useraccount/TabAccountDetails/TabAccountDetails.vue";
import TabOrderList from "../components/useraccount/TabOrderList/TabOrderList.vue";
import TabOrderDetail from "../components/useraccount/TabOrderDetail/TabOrderDetail.vue";
import TabReturn from "../components/useraccount/TabReturn/TabReturn.vue";
import TabChangePassword from "../components/useraccount/TabChangePassword/TabChangePassword.vue";
import TabDashboard from "../components/useraccount/TabDashboard/TabDashboard.vue";
import PageCheckout from "../components/checkout/PageCheckout/PageCheckout.vue";
import PageInsuranceProductDetail from "../components/insuranceproductdetail/PageProductDetail/PageProductDetail.vue";
import { pageFromRoute } from "../components/common/shared";
import Root from "../components/root/root.vue";

const requiresAuth = true;
const requiresCart = true;

export default [
  {
    path: `/:country(${Object.keys(config.countries).join(
      "|"
    )})?/:locale(${Object.keys(config.languages).join("|")})?`,
    props: true,
    component: Root,
    children: [
      {
        path: "",
        name: "home",
        components: {
          default: PageHome,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "stores",
        name: "stores",
        components: {
          default: PageStoreLocator,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "login",
        name: "login",
        components: {
          default: PageLogin,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        components: {
          default: ForgotPassword,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "reset-password/:token",
        name: "reset-password",
        components: {
          default: ResetPassword,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "products/:categorySlug/:page?",
        name: "products",
        components: {
          default: PageProductOverview,
          header: TheHeader,
          footer: null,
        },
        props: {
          default: (route) => ({
            ...pageFromRoute(route),
            categorySlug: route.params.categorySlug,
          }),
          header: false,
          footer: false,
        },
      },
      {
        path: "user",
        meta: { requiresAuth },
        components: {
          default: PageUserAccount,
          header: TheHeader,
          footer: TheFooter,
        },
        children: [
          {
            path: "dashboard",
            alias: "",
            name: "user",
            component: TabDashboard,
          },
          {
            path: "order/:id",
            name: "order",
            component: TabOrderDetail,
          },
          {
            path: "return/:id",
            name: "return",
            component: TabReturn,
          },
          {
            path: "orders/:page?",
            name: "orders",
            component: TabOrderList,
          },
          {
            path: "account",
            name: "account",
            component: TabAccountDetails,
          },
          {
            path: "changepassword",
            name: "changepassword",
            component: TabChangePassword,
          },
        ],
      },
      {
        path: "product/:productSlug/:sku",
        name: "product",
        components: {
          default: PageProductDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "insurance/",
        name: "insurance",
        components: {
          default: PageInsuranceProductDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "car/:productSlug/:sku",
        name: "car",
        components: {
          default: CarProductDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "rentalproduct/:productSlug/:sku",
        name: "rentalproduct",
        components: {
          default: PageRentalProductDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "giftcard/:productSlug/:sku",
        name: "giftcard",
        components: {
          default: PageGiftProductDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "giftcardfixed/:productSlug/:sku",
        name: "giftcardfixed",
        components: {
          default: PageGiftCardFixedDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "giftbundle/:productSlug/:sku",
        name: "giftbundle",
        components: {
          default: PageGiftBundleDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "pizza/:productSlug/:sku",
        name: "pizza",
        components: {
          default: PagePizzaDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "halfpizza/:productSlug/:sku",
        name: "halfpizza",
        components: {
          default: HalfPizzaDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "bundle/:productSlug/:sku",
        name: "bundle",
        components: {
          default: BundleDealDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "custom",
        name: "custom",
        components: {
          default: CustomDetail,
          header: TheHeader,
          footer: TheFooter,
        },
        props: {
          default: true,
          header: false,
          footer: false,
        },
      },
      {
        path: "cart",
        name: "cart",
        components: {
          default: PageCartDetail,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "checkout",
        name: "checkout",
        meta: { requiresCart },
        components: {
          default: PageCheckout,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "shopping-list/:listName",
        name: "single list",
        components: {
          default: ListDetail,
          header: TheHeader,
          footer: TheFooter,
        },
      },
      {
        path: "shopping-list",
        name: "shopping list",
        components: {
          default: PageShoppingList,
          header: TheHeader,
          footer: TheFooter,
        },
      },
    ],
  },
  {
    path: "*",
    components: {
      default: PageNotFound,
      header: TheHeader,
      footer: TheFooter,
    },
  },
];
