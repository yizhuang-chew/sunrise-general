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
    hi: "Hindi",
  },
  countries: {
    AU: "Australia",
    DE: "Deutschland",
    US: "United States",
    SG: "Singapore",
    PH: "Phillippines",
    IN: "India",
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
      PH: {
        currency: {
          style: "currency",
          currency: "PHP",
          currencyDisplay: "symbol",
        },
      },
      IN: {
        currency: {
          style: "currency",
          currency: "IDR",
          currencyDisplay: "symbol",
        },
      }
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
    // Fashion Start
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
      name: "Size",
      type: "text",
      label: {
        it: "Size",
        zh: "Size",
        en: "Size",
      },
    },
    {
      name: "Colour",
      type: "text",
      label: {
        de: "Colour",
        zh: "Colour",
        en: "Colour",
      },
    },
    // Fashion End
    // Beauty Start
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
    // Automotive Start
    {
      name: "FuelConsumption",
      type: "text",
      label: {
        de: "Fuel Consumption",
        it: "Fuel Consumption",
        en: "Fuel Consumption",
      },
    },
    {
      name: "TopSpeed",
      type: "text",
      label: {
        it: "Top Speed",
        de: "Top Speed",
        en: "Top Speed",
      },
    },
    // Automotive End
    // Grocery Start
    {
      name: "Varietal",
      type: "text",
      label: {
        de: "Varietal",
        it: "Varietal",
        en: "Varietal",
      },
    },
    {
      name: "CountryOfOrigin",
      type: "text",
      label: {
        it: "Country Of Origin",
        de: "Country Of Origin",
        en: "Country Of Origin",
      },
    },
    {
      name: "RegionOfOrigin",
      type: "text",
      label: {
        it: "Region Of Origin",
        de: "Region Of Origin",
        en: "Region Of Origin",
      },
    },
    // Grocery End
    // Electronics Start
    {
      name: "BrandName",
      label: {
        it: "Brand",
        de: "Brand",
        en: "Brand",
      },
    },
    {
      name: "OperatingSystem",
      type: "text",
      label: {
        it: "Operating System",
        de: "Operating System",
        en: "Operating System",
      },
    },
    // Electronics End
    // Food Start
    {
      name: "containsGluten",
      type: "boolean",
      label: {
        it: "Contains Gluten",
        de: "Contains Gluten",
        en: "Contains Gluten",
      },
    },
    {
      name: "ContainsMilk",
      type: "boolean",
      label: {
        it: "Contains Milk",
        de: "Contains Milk",
        en: "Contains Milk",
      },
    },
    {
      name: "containsEggs",
      type: "boolean",
      label: {
        it: "Contains Eggs",
        de: "Contains Eggs",
        en: "Contains Eggs",
      },
    },
    {
      name: "containsWheat",
      type: "boolean",
      label: {
        it: "Contains Wheat",
        de: "Contains Wheat",
        en: "Contains Wheat",
      },
    },
    // Food End
  ],
  detailAttributes: [
    //Fashion Start
    {
      name:"Brand",
        label: {
          it: "Brand",
          zh: "品牌",
          en: "Brand",
        },
    },
    {
      name:"ItemColourCode",
        label: {
          it: "Item Colour Code",
          zh: "Item Colour Code",
          en: "Item Colour Code",
        },
    },
    {
      name:"Style",
        label: {
          it: "Style",
          zh: "Style",
          en: "Style",
        },
    },
    {
      name:"Material",
        label: {
          it: "Material",
          zh: "Material",
          en: "Material",
        },
    },
    {
      name:"Manufacturer",
        label: {
          it: "Manufacturer",
          zh: "Manufacturer",
          en: "Manufacturer",
        },
    },
    {
      name:"ItemCode",
        label: {
          it: "Item Code",
          zh: "Item Code",
          en: "Item Code",
        },
    },
    // Fashion End
    //Beauty Start 
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
    // Automotive Start
    {
      name:"Type",
        label: {
          it: "Type",
          de: "Type",
          en: "Type",
        },
    },
    {
      name:"FuelConsumption",
        label: {
          it: "Fuel Consumption",
          de: "Fuel Consumption",
          en: "Fuel Consumption",
        },
    },
    {
      name:"CO2Emission",
      label: {
        it: "CO2 Emission",
        de: "CO2  Emission",
        en: "CO2 Emission",
      },
    },
    {
      name:"VESBranding",
      label: {
        it: "VES Branding",
        de: "VES Branding",
        en: "VES Branding",
      },
    },
    
    {
      name:"EngineType",
      label: {
        it: "Engine Type",
        de: "Engine Type",
        en: "Engine Type",
      },
    },
    {
      name:"DriveType",
      label: {
        it: "Drive Type",
        de: "Drive Type",
        en: "Drive Type",
      },
    },
    {
      name:"FuelType",
      label: {
        it: "Fuel Type",
        de: "Fuel Type",
        en: "Fuel Type",
      },
    },
    {
      name:"Dimensions",
      label: {
        it: "Dimensions",
        de: "Dimensions",
        en: "Dimensions",
      },
    },
    {
      name:"TractionControl",
      label: {
        it: "Traction Control",
        de: "Traction Control",
        en: "Traction Control",
      },
    },
    {
      name:"Multi-FunctionSteeringWheel",
      label: {
        it: "Multi-Function steering wheel",
        de: "Multi-Function steering wheel",
        en: "Multi-Function steering wheel",
      },
    },
    {
      name:"KeylessEngineStart",
      label: {
        it: "Keyless Engine Start",
        de: "Keyless Engine Start",
        en: "Keyless Engine Start",
      },
    },
    {
      name:"AutoHeadlights",
      label: {
        it: "Auto Headlights",
        de: "Auto Headlights",
        en: "Auto Headlights",
      },
    },
    {
      name:"RainSensingWipers",
      label: {
        it: "Rain sensing wipers",
        de: "Rain sensing wipers",
        en: "Rain sensing wipers",
      },
    },
    {
      name:"NavigationSystem",
      label: {
        it: "Navigation System",
        de: "Navigation System",
        en: "Navigation System",
      },
    },
    {
      name:"ElectricTailgate",
      label: {
        it: "Electric Tailgate",
        de: "Electric Tailgate",
        en: "Electric Tailgate",
      },
    },
    {
      name:"ElectricSeat",
      label: {
        it: "Electric Seat",
        de: "Electric Seat",
        en: "Electric Seat",
      },
    },
    {
      name:"MemorySeat",
      label: {
        it: "Memory Seat",
        de: "Memory Seat",
        en: "Memory Seat",
      },
    },

    {
      name:"Features",
      label: {
        it: "Additional Features",
        de: "Additional Features",
        en: "Additional Features",
      },
    },
    {
      name:"Includes",
      label: {
        it: "Includes",
        de: "Includes",
        en: "Includes",
      },
    },
    // Automotive End
    // Grocery Start
    {
      name:"Packaging",
        label: {
          it: "Packaging",
          de: "Packaging",
          en: "Packaging",
        },
    },
    {
      name:"Varietal",
        label: {
          it: "Varietal",
          de: "Varietal",
          en: "Varietal",
        },
    },
    {
      name:"LiquorStyle",
      label: {
        it: "Liquor Style",
        de: "Liquor Style",
        en: "Liquor Style",
      },
    },
    {
      name:"RegionOfOrigin",
      label: {
        it: "Region Of Origin",
        de: "Region Of Origin",
        en: "Region Of Origin",
      },
    },
    {
      name:"CountryOfOrigin",
      label: {
        it: "Country Of Origin",
        de: "Country Of Origin",
        en: "Country Of Origin",
      },
    },
    {
      name:"Vintage",
      label: {
        it: "Vintage",
        de: "Vintage",
        en: "Vintage",
      },
    },
    {
      name:"Alcohol",
      label: {
        it: "Alcohol %",
        de: "Alcohol %",
        en: "Alcohol %",
      },
    },
    {
      name:"Ingredients",
        label: {
          it: "Ingredients",
          de: "Ingredients",
          en: "Ingredients",
        },
    },
    {
      name:"Directions",
        label: {
          it: "Directions",
          de: "Directions",
          en: "Directions",
        },
    },
    {
      name:"ProductWarnings",
        label: {
          it: "Product Warnings",
          de: "Product Warnings",
          en: "Product Warnings",
        },
    },
    // Grocery End
    // Electronics Start
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
    // Electronics End
    // Food Start
    {
      name: "containsGluten",
      label: {
        it: "Contains Gluten",
        de: "Contains Gluten",
        en: "Contains Gluten",
      },
    },
    {
      name: "ContainsMilk",
      label: {
        it: "Contains Milk",
        de: "Contains Milk",
        en: "Contains Milk",
      },
    },
    {
      name: "containsEggs",
      label: {
        it: "Contains Eggs",
        de: "Contains Eggs",
        en: "Contains Eggs",
      },
    },
    {
      name: "containsWheat",
      label: {
        it: "Contains Wheat",
        de: "Contains Wheat",
        en: "Contains Wheat",
      },
    },
    {
      name: "serveSize",
      label: {
        it: "Serve Size",
        de: "Serve Size",
        en: "Serve Size",
      },
    },
    {
      name: "calories",
      label: {
        it: "Calories (kcal)",
        de: "Calories (kcal)",
        en: "Calories (kcal)",
      },
    },
    {
      name: "energy",
      label: {
        it: "Energy (kj)",
        de: "Energy (kj)",
        en: "Energy (kj)",
      },
    },
    {
      name: "nutritionalInfo",
      label: {
        it: "Nutritional Info",
        de: "Nutritional Info",
        en: "Nutritional Info",
      },
    },
    {
      name: "protein",
      label: {
        it: "Protein",
        de: "Protein",
        en: "Protein",
      },
    },
    {
      name: "fatTotal",
      label: {
        it: "Fat Total (g)",
        de: "Fat Total (g)",
        en: "Fat Total (g)",
      },
    },
    {
      name: "fatSaturated",
      label: {
        it: "Fat Saturated (g)",
        de: "Fat Saturated (g)",
        en: "Fat Saturated (g)",
      },
    },
    {
      name: "carbohydrate",
      label: {
        it: "Carbohydrate (g)",
        de: "Carbohydrate (g)",
        en: "Carbohydrate (g)",
      },
    },
    {
      name: "sugars",
      label: {
        it: "Sugars (g)",
        de: "Sugars (g)",
        en: "Sugars (g)",
      },
    },
    {
      name: "sodium",
      label: {
        it: "Sodium",
        de: "Sodium",
        en: "Sodium",
      },
    },
    {
      name: "defaultToppings",
      label: {
        it: "Default Toppings",
        de: "Default Toppings",
        en: "Default Toppings",
      },
    },
    // Food End
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
    // Books
    {
      name: "Author",
      label: {
        it: "Author",
        de: "Author",
        en: "Author",
      },
    },
    {
      name: "PUBLISHER",
      label: {
        it: "Publisher",
        de: "Publisher",
        en: "Publisher",
      },
    },
    {
      name: "Weight",
      label: {
        it: "Weight",
        de: "Weight",
        en: "Weight",
      },
    },
    {
      name: "Height",
      label: {
        it: "Height",
        de: "Height",
        en: "Height",
      },
    },
    {
      name: "Thickness",
      label: {
        it: "Thickness",
        de: "Thickness",
        en: "Thickness",
      },
    },
    {
      name: "Width",
      label: {
        it: "Width",
        de: "Width",
        en: "Width",
      },
    },
    {
      name: "SUPPLIER",
      label: {
        it: "Supplier",
        de: "Supplier",
        en: "Supplier",
      },
    },
  ],
  variantSelector: [
    "GiftBox",
    "Colour",
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
    // Automotive
    "Type", 
    "Size", 
    "CarModel",
    // Grocery
    "Packaging",
    // Electronics
    "Selection",
    "Capacity",
    // Food
    "Size",
    "PizzaSize",
  ],
  variantInProductName: ["size"],
  ...localConfig,
};
