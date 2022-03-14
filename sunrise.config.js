// eslint-disable-next-line no-console
console.log("using host:", process.env.VUE_APP_CT_API_HOST);
let localConfig = {};
if (process.env.VUE_APP_LOCAL_SUNRISE_CONFIG) {
  localConfig = require(process.env.VUE_APP_LOCAL_SUNRISE_CONFIG).default;
}

export default {
  ct: {
    auth: {
      host:
        process.env.VUE_APP_CT_AUTH_HOST ||
        "https://auth.europe-west1.gcp.commercetools.com",
      projectKey: process.env.VUE_APP_CT_PROJECT_KEY || "sunrise-spa",
      credentials: {
        clientId:
          process.env.VUE_APP_CT_CLIENT_ID || "jFVHj0-tO-THQt9evnGTJ2fD",
        clientSecret:
          process.env.VUE_APP_CT_CLIENT_SECRET ||
          "eUQgmtanysDpYxlOePOhcFklrwa5X8Sj",
      },
      scopes: [
        process.env.VUE_APP_CT_SCOPE ||
          "manage_my_profile:sunrise-spa create_anonymous_token:sunrise-spa" +
            " manage_my_payments:sunrise-spa view_products:sunrise-spa manage_my_orders:sunrise-spa" +
            " manage_my_shopping_lists:sunrise-spa",
      ],
    },
    api:
      process.env.VUE_APP_CT_API_HOST ||
      "https://api.europe-west1.gcp.commercetools.com",
  },
  ctf: {
    auth: {
      spaceId: process.env.VUE_APP_CTF_SPACE_ID,
      token: process.env.VUE_APP_CTF_CDA_ACCESS_TOKEN,
    },
  },
  languages: {
    en: "English",
    de: "Deutsch",
  },
  countries: {
    AU: "Australia",
    DE: "Deutschland",
    US: "United States",
    SG: "Singapore",
  },
  logo:
    "https://images.ctfassets.net/l89vlt8ragrr/" +
    "5LatgaeAyzIKcpMbkzjX4w/fabe8eb87bea6c4e939e539c8a9c5f08/image.png?h=250",
  formats: {
    number: {
      AU: {
        currency: {
          style: "currency",
          currency: "AUD",
          currencyDisplay: "symbol",
        },
      },
      DE: {
        currency: {
          style: "currency",
          currency: "EUR",
          currencyDisplay: "symbol",
        },
      },
      US: {
        currency: {
          style: "currency",
          currency: "USD",
        },
      },
      SG: {
        currency: {
          style: "currency",
          currency: "SGD",
        },
      },
    },
    datetime: {
      US: {
        short: {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      },
      DE: {
        short: {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      },
    },
  },
  categories: {
    salesExternalId: "6",
  },
  facetSearches: [
    // Beauty Start
    {
      name: "Brand",
      type: "text",
      label: {
        it: "Brand",
        zh: "品牌",
        en: "Brand",
      },
    },
    {
      name: "SkinType",
      type: "ltext",
      label: {
        de: "Skin Type",
        zh: "适合肤质",
        en: "Skin Type",
      },
    },
    {
      name: "Benefits",
      type: "ltext",
      label: {
        it: "Benefits",
        zh: "产品功效",
        en: "Benefits",
      },
    },
    // Beauty End
    {
      name: "OperatingSystem",
      type: "text",
      label: {
        it: "Operating System",
        de: "Operating System",
        en: "Operating System",
      },
    },
  ],
  detailAttributes: [
    //Beauty Start 
    {
      name:"Brand",
        label: {
          it: "Brand",
          zh: "品牌",
          en: "Brand",
        },
    },
    {
      name:"Function",
        label: {
          it: "Function",
          zh: "功效",
          en: "Function",
        },
    },
    {
      name:"SkinType",
        label: {
          it: "Skin Type",
          zh: "适合肤质",
          en: "Skin Type",
        },
    },
    {
      name:"Finish",
      label: {
        it: "Finish",
        zh: "妆效",
        en: "Finish",
      },
    },
    {
      name:"Formulation",
      label: {
        it: "Formulation",
        zh: "质地",
        en: "Formulation",
      },
    },
    {
      name:"Coverage",
      label: {
        it: "Coverage",
        zh: "遮盖力",
        en: "Coverage",
      },
    },
    {
      name:"Benefits",
      label: {
        it: "Benefits",
        zh: "产品功效",
        en: "Benefits",
      },
    },
    {
      name:"IngredientClaims",
      label: {
        it: "Ingredient Claims",
        zh: "产品成分",
        en: "Ingredient Claims",
      },
    },
    {
      name:"Ingredients",
      label: {
        it: "Ingredients",
        zh: "成分",
        en: "Ingredients",
      },
    },
    {
      name:"Shade",
      label: {
        it: "Shade",
        zh: "颜色",
        en: "Shade",
      },
    },
    {
      name:"HowTo",
      label: {
        it: "How To",
        zh: "使用说明",
        en: "How To",
      },
    },
    {
      name:"Size",
      label: {
        it: "Size",
        zh: "规格",
        en: "Size",
      },
    },
    //Beauty End 
    {
      name:"Details",
      label: {
        it: "Details",
        de: "Details",
        en: "Details",
      },
    },
    // Electronics
    {
      name: "BrandName",
      label: {
        it: "Brand Name",
        de: "Brand Name",
        en: "Brand Name",
      },
    },
    {
      name: "LongDescription",
      label: {
        it: "Description",
        de: "Description",
        en: "Description",
      },
    },
    {
      name: "ModelNumber",
      label: {
        it: "Model Number",
        de: "Model Number",
        en: "Model Number",
      },
    },
    {
      name: "ManufacturersWarranty",
      label: {
        it: "Manufacturers Warranty",
        de: "Manufacturers Warranty",
        en: "Manufacturers Warranty",
      },
    },
    {
      name: "AdditionalFeatures",
      label: {
        it: "Additional Features",
        de: "Additional Features",
        en: "Additional Features",
      },
    },
    {
      name: "DisplayResolution",
      label: {
        it: "Display Resolution",
        de: "Display Resolution",
        en: "Display Resolution",
      },
    },
    {
      name: "WiFi",
      label: {
        it: "WiFi",
        de: "WiFi",
        en: "WiFi",
      },
    },
    {
      name: "VideoRecording",
      label: {
        it: "Video Recording",
        de: "Video Recording",
        en: "Video Recording",
      },
    },
    {
      name: "Camera",
      label: {
        it: "Camera",
        de: "Camera",
        en: "Camera",
      },
    },
    {
      name: "Chip",
      label: {
        it: "Chip",
        de: "Chip",
        en: "Chip",
      },
    },
    {
      name: "Network",
      label: {
        it: "Network",
        de: "Network",
        en: "Network",
      },
    },
    {
      name: "CellularorWiFiOnly",
      label: {
        it: "Cellular or WiFiOnly",
        de: "Cellular or WiFiOnly",
        en: "Cellular or WiFiOnly",
      },
    },
    {
      name: "Bluetooth",
      label: {
        it: "Bluetooth",
        de: "Bluetooth",
        en: "Bluetooth",
      },
    },
    {
      name: "Capacity",
      label: {
        it: "Capacity",
        de: "Capacity",
        en: "Capacity",
      },
    },
    {
      name: "Battery",
      label: {
        it: "Battery",
        de: "Battery",
        en: "Battery",
      },
    },
    {
      name: "OperatingSystem",
      label: {
        it: "Operating System",
        de: "Operating System",
        en: "Operating System",
      },
    },
    // Electronics end
    {
      name: "designer",
      label: {
        it: "Designer",
        de: "Designer",
        en: "Designer",
      },
    },
    {
      name: "colorFreeDefinition",
      label: {
        it: "Color",
        de: "Farbe",
        en: "Color",
      },
    },
    {
      name: "size",
      label: {
        it: "Size",
        de: "Grösse",
        en: "Size",
      },
    },
    {
      name: "style",
      label: {
        it: "Style",
        de: "Stil",
        en: "Style",
      },
    },
    {
      name: "gender",
      label: {
        it: "Gender",
        de: "Zielgruppe",
        en: "Gender",
      },
    },
    {
      name: "articleNumberManufacturer",
      label: {
        it: "Manufacturer AID",
        de: "Herstellernummer",
        en: "Manufacturer AID",
      },
    },
    //Start
    {
      name: "Brand",
      label: {
        it: "Brand",
        de: "Brand",
        en: "Brand",
      },
    },
    {
      name: "OperatingSystem",
      label: {
        it: "Operating System",
        de: "Operating System",
        en: "Operating System",
      },
    },
    {
      name: "Storage",
      label: {
        it: "Storage",
        de: "Storage",
        en: "Storage",
      },
    },
    {
      name: "Colour",
      label: {
        it: "Colour",
        de: "Colour",
        en: "Colour",
      },
    },
    {
      name: "Display",
      label: {
        it: "Display",
        de: "Display",
        en: "Display",
      },
    },
    {
      name: "Resolution",
      label: {
        it: "Resolution",
        de: "Resolution",
        en: "Resolution",
      },
    },
    {
      name: "Processor",
      label: {
        it: "Processor",
        de: "Processor",
        en: "Processor",
      },
    },
    {
      name: "CreditTier",
      label: {
        it: "Credit Tier",
        de: "Credit Tier",
        en: "Credit Tier",
      },
    },
  ],
  variantSelector: [
    "GiftBox",
    "Colour",
    "Capacity",
    "Selection",
    "SubscriptionPeriod",
    "Trainer",
    "SecondaryColour",
    "Size",
    "color",
    "size",
    "Storage", 
    "CreditTier", 
    // Beauty
    "Shade", 
    "Size", 
    "Type",
    // Gift Card Fixed Value
    "Amount",
  ],
  variantInProductName: ["size"],
  ...localConfig,
};
