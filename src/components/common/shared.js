import config from "../../../sunrise.config";

export function getValue(value, language) {
  if (typeof value === "object" && typeof value?.label === "string") {
    return value.label;
  }
  if (typeof value === "object" && typeof value?.[language] === "string") {
    return value?.[language];
  }
  if (
    typeof value === "object" &&
    typeof value?.label === "object" &&
    typeof value?.label?.[language] === "string"
  ) {
    return value?.label?.[language];
  }
  return value;
}
export function totalPrice(lineItem) {
  const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.value;
  const originalPrice = {
    ...unitPrice,
    centAmount: unitCentAmount * lineItem.quantity,
  };
  const price = { value: originalPrice };
  const discount = lineItem.totalPrice.centAmount;
  if (originalPrice.centAmount !== discount) {
    price.discounted = {
      value: { ...lineItem.totalPrice, centAmount: discount },
    };
  }
  return price;
}
export function subTotal(cartLike) {
  const { currencyCode, fractionDigits } = cartLike.totalPrice;
  const priceCentAmount = cartLike.lineItems.reduce(
    (acc, li) => acc + li.quantity * li.price.value.centAmount,
    0
  ) + cartLike.customLineItems.reduce(
    (acc, li) => acc + li.quantity * li.money.centAmount,
    0
  );
  const totalPriceCentAmount = cartLike.lineItems.reduce(
    (acc, li) => acc + li.totalPrice.centAmount,
    0
  )+ cartLike.customLineItems.reduce(
    (acc, li) => acc + li.totalPrice.centAmount,
    0
  );
  const discounted =
    priceCentAmount === totalPriceCentAmount
      ? {}
      : {
          discounted: {
            value: {
              centAmount: totalPriceCentAmount,
              currencyCode,
              fractionDigits,
            },
          },
        };
  return {
    value: {
      centAmount: priceCentAmount,
      currencyCode,
      fractionDigits,
    },
    ...discounted,
  };
}
export function variantAttributes(
  variant,
  language,
  variantNames = config.variantInProductName
) {
  const attributes = (
    variant?.attributesRaw || []
  ).map(({ attributeDefinition: { name, label, type }, value }) => [
    name,
    label,
    getValue(type.name, value, language),
  ]);

  return variantNames
    .map((attributeName) => attributes.find(([name]) => name === attributeName))
    .filter((x) => x)
    .map(([, name, value]) => ({ name, value }));
}
export const pageFromRoute = (route) => {
  const pageNum = Number(route.params.page);
  const page = Number.isNaN(pageNum) || pageNum <= 1 ? 1 : pageNum;
  return {
    page,
  };
};
export const pushPage = (page, component, name) => {
  const { params, query } = component.$route;
  component.$router.push({
    name,
    params: { ...params, page },
    query,
  });
};
export const changeRoute = (
  route,
  component,
  push = true,
  keepScrollPosition = true
) => {
  const pos = {
    top: window.scrollY,
    left: window.scrollX,
  };
  if (push) {
    component.$router.push(route);
  } else {
    component.$router.replace(route);
  }

  if (keepScrollPosition) {
    Promise.resolve().then(() => {
      window.scrollTo(pos);
    });
  }
};
export const locale = (component) => {
  //get case insensitive locale from sunrise config
  const loc = (component?.$route?.params?.locale || "").toUpperCase(); //locale from url to upper case
  const [, fromConfig] =
    Object.keys(config.languages)
      //all locale keys from config in [UPPERCASE,org]
      .map((key) => [key.toUpperCase(), key])
      .find(([key]) => key === loc) || []; //find the one from url
  return fromConfig; //return value from config (in correct case)
};
export const localeFromString = (loc) =>
  locale({
    $route: {
      params: { locale: loc },
    },
  });
export const isToughDevice = () => "ontouchstart" in window;
export const modifyQuery = (key, value, query, add = true) => {
  const values = [value].concat(query[key]).filter((v) => add || v !== value);
  let newValue = [...new Set(values)].filter((v) => v !== undefined);
  newValue = newValue.length > 1 ? newValue : newValue[0];
  return newValue !== undefined
    ? {
        ...query,
        [key]: newValue,
      }
    : Object.entries(query).reduce(
        // eslint-disable-next-line no-shadow
        (result, [k, value]) => {
          if (k !== key) {
            // eslint-disable-next-line no-param-reassign
            result[k] = value;
          }
          return result;
        },
        {}
      );
};
export function debounce(fn, time = 500) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), time);
  };
}
const arrayToString = (value, locale) => {
  return Array.isArray(value)
    ? value
        .map(function(elem) {
          return elem[locale] ? elem[locale] : elem;
        })
        .join(", ")
    : value;
};

export function productAttributes(attributes, locale) {
  return config.detailAttributes
    .map(({ name: n, label }) => {
      const value = attributes.find(([name]) => name === n)?.[1];
      return value ? [label[locale], value] : false;
    })
    .filter((x) => x)
    .map(([name, value]) => ({ name, value: arrayToString(value, locale) }));
}
export const addLine = async (component) => {
  var cartActions = [];

  let itemCustomType = component.appointmentDateInput
    ? {
        custom: {
          typeKey: "AppointmentItem",
          fields: [
            {
              name: "AppointmentDate",
              value: `"${component.appointmentDateInput}"`,
            },
          ],
        },
      }
    : {};

  if (Object.keys(itemCustomType).length === 0) {
    itemCustomType = component.subscriptionInput
      ? {
          custom: {
            typeKey: "SubscriptionItem",
            fields: [
              {
                name: "SubscriptionDuration",
                value: `"${component.subscriptionInput}"`,
              },
            ],
          },
        }
      : {};
  }

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  cartActions.push({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      ...itemCustomType,
    },
  });

  if (component.selectedAddOns && component.selectedAddOns != "") {
    for (var addOn in component.selectedAddOns) {
      cartActions.push({
        addLineItem: {
          sku: component.selectedAddOns[addOn],
          quantity: Number(component.quantity),
          ...distributionChannel,
          ...supplyChannel,
          custom: {
            typeKey: "AddOns",
            fields: [
              {
                name: "ReferenceItem",
                value: `"${component.sku}"`,
              },
            ],
          },
        },
      });
    }
  }
  return component.updateMyCart(cartActions);
};
export const addCustomLine = async (component) => {
  var cartActions = [];

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  cartActions.push({
    addCustomLineItem: {
      slug: component.sku,
      name: { locale: "en", value: component.sku },
      quantity: Number(component.quantity),
      taxCategory: { key: "Standard" },
      money: {
        centPrecision: {
          centAmount: component.money.centAmount,
          currencyCode: component.money.currency,
        },
      },
    },
  });

  return component.updateCart(cartActions);
};
export const addGiftBundleLine = async (component) => {
  var cartActions = [];

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }

  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  var customType = {
    custom: {
      typeKey: "GiftBundle",
      fields: [],
    },
  };

  cartActions.push({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      ...customType,
    },
  });

  if (component.appointmentDateInput && component.appointmentDateInput != "") {
    customType.custom.fields.push({
      name: "DeliveryDate",
      value: `"${component.appointmentDateInput}"`,
    });
  }
  if (component.selectedJar && component.selectedJar != "") {
    customType.custom.fields.push({
      name: "SelectedJar",
      value: `"${component.selectedJar}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedJar,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
    if (component.jarMessage && component.jarMessage != "") {
      customType.custom.fields.push({
        name: "JarMessage",
        value: `"${component.jarMessage}"`,
      });
    }
  }

  if (component.selectedCard && component.selectedCard != "") {
    customType.custom.fields.push({
      name: "SelectedCard",
      value: `"${component.selectedCard}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedCard,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
    if (component.to && component.to != "") {
      customType.custom.fields.push({
        name: "To",
        value: `"${component.to}"`,
      });
    }
    if (component.message && component.message != "") {
      customType.custom.fields.push({
        name: "Message",
        value: `"${component.message}"`,
      });
    }
    if (component.from && component.from != "") {
      customType.custom.fields.push({
        name: "From",
        value: `"${component.from}"`,
      });
    }
  }

  if (component.selectedAddOns && component.selectedAddOns != "") {
    customType.custom.fields.push({
      name: "SelectedAddOns",
      value: `["${component.selectedAddOns}"]`,
    });
    for (var addOn in component.selectedAddOns) {
      cartActions.push({
        addLineItem: {
          sku: component.selectedAddOns[addOn],
          quantity: Number(component.quantity),
          ...distributionChannel,
          ...supplyChannel,
          custom: {
            typeKey: "AddOns",
            fields: [
              {
                name: "ReferenceItem",
                value: `"${component.sku}"`,
              },
            ],
          },
        },
      });
    }
  }
  return component.updateMyCart(cartActions);
};
export const addRental = async (component) => {
  let customType = {};

  if (component.selectedChannelName && component.selectedChannelName != "") {
    customType = {
      custom: {
        typeKey: "RentalPlan",
        fields: [],
      },
    };
    customType.custom.fields.push({
      name: "PlanType",
      value: `"${component.selectedChannelName}"`,
    });
  }

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.selectedChannel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.selectedChannel,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  return component.updateMyCart({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      ...customType,
    },
  });
};
export const addLineGiftCard = async (component) => {
  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  return component.updateCart({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      externalTotalPrice: {
        price: {
          centPrecision: {
            currencyCode: component.$store.state.currency,
            centAmount: Number(component.giftCardAmount) * 100,
          },
        },
        totalPrice: {
          currencyCode: component.$store.state.currency,
          centAmount: Number(component.giftCardAmount) * 100,
        },
      },
      custom: {
        typeKey: "GiftCard",
        fields: [
          {
            name: "DeliveryDate",
            value: `"${component.deliveryDate}"`,
          },
          {
            name: "To",
            value: `"${component.to}"`,
          },
          {
            name: "RecipientEmail",
            value: `"${component.recipientEmail}"`,
          },
          {
            name: "From",
            value: `"${component.from}"`,
          },
          {
            name: "FromEmail",
            value: `"${component.fromEmail}"`,
          },
          {
            name: "Message",
            value: `"${component.message}"`,
          },
        ],
      },
    },
  });
};
export const addLineGiftCardFixed = async (component) => {
  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  return component.updateMyCart({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      custom: {
        typeKey: "GiftCard",
        fields: [
          {
            name: "DeliveryDate",
            value: `"${component.deliveryDate}"`,
          },
          {
            name: "To",
            value: `"${component.to}"`,
          },
          {
            name: "RecipientEmail",
            value: `"${component.recipientEmail}"`,
          },
          {
            name: "From",
            value: `"${component.from}"`,
          },
          {
            name: "FromEmail",
            value: `"${component.fromEmail}"`,
          },
          {
            name: "Message",
            value: `"${component.message}"`,
          },
        ],
      },
    },
  });
};
export const addPizza = async (component) => {
  var cartActions = [];

  let finalToppings = "";
  for (const [key, value] of Object.entries(component.selectedToppings)) {
    if (finalToppings != "") {
      finalToppings += ",";
    }
    finalToppings += '"' + key + " x " + value + '"';
  }

  let itemCustomType = {
    custom: {
      typeKey: "CustomPizza",
      fields: [
        {
          name: "Toppings",
          value: `[${finalToppings}]`,
        },
      ],
    },
  };

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  cartActions.push({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      ...itemCustomType,
    },
  });

  if (
    component.adhocCart &&
    component.adhocCart.lineItems &&
    component.adhocCart.lineItems.length > 1
  ) {
    for (var index in component.adhocCart.lineItems) {
      if (index != 0) {
        // 0 is base pizza
        cartActions.push({
          addLineItem: {
            sku: component.adhocCart.lineItems[index].variant.sku,
            quantity: component.adhocCart.lineItems[index].quantity,
            ...distributionChannel,
            ...supplyChannel,
            custom: {
              typeKey: "Topping",
              fields: [
                {
                  name: "ReferencePizza",
                  value: `"${component.sku}"`,
                },
              ],
            },
          },
        });
      }
    }
  }

  if (component.selectedAddOns && component.selectedAddOns != "") {
    for (var addOn in component.selectedAddOns) {
      cartActions.push({
        addLineItem: {
          sku: component.selectedAddOns[addOn],
          quantity: Number(component.quantity),
          ...distributionChannel,
          ...supplyChannel,
          custom: {
            typeKey: "AddOns",
            fields: [
              {
                name: "ReferenceItem",
                value: `"${component.sku}"`,
              },
            ],
          },
        },
      });
    }
  }

  return component.updateMyCart(cartActions);
};
export const addHalfPizza = async (component) => {
  var cartActions = [];

  let itemCustomType = {
    custom: {
      typeKey: "HalfPizza",
      fields: [
        {
          name: "LeftPizza",
          value: `"${component.sku1}"`,
        },
        {
          name: "RightPizza",
          value: `"${component.sku2}"`,
        },
      ],
    },
  };

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }
  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};
  cartActions.push({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      externalTotalPrice: {
        price: {
          centPrecision: {
            currencyCode: component.$store.state.currency,
            centAmount: component.price1 + component.price2,
          },
        },
        totalPrice: {
          currencyCode: component.$store.state.currency,
          centAmount: component.price1 + component.price2,
        },
      },
      ...distributionChannel,
      ...supplyChannel,
      ...itemCustomType,
    },
  });

  return component.updateCart(cartActions);
};

export const addCarLine = async (component) => {
  var cartActions = [];

  if (!component.cartExists) {
    await component.createMyCart({
      currency: component.$store.state.currency,
      country: component.$store.state.country,
      shippingAddress: { country: component.$store.state.country },
    });
  }

  const distributionChannel = component.$store.state.channel
    ? {
        distributionChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  const supplyChannel = component.$store.state.channel
    ? {
        supplyChannel: {
          typeId: "channel",
          id: component.$store.state.channel.id,
        },
      }
    : {};

  var customType = {
    custom: {
      typeKey: "Car",
      fields: [],
    },
  };

  cartActions.push({
    addLineItem: {
      sku: component.sku,
      quantity: Number(component.quantity),
      ...distributionChannel,
      ...supplyChannel,
      ...customType,
    },
  });

  if (component.appointmentDateInput && component.appointmentDateInput != "") {
    customType.custom.fields.push({
      name: "CollectionDate",
      value: `"${component.appointmentDateInput}"`,
    });
  }
  if (component.requestInput && component.requestInput != "") {
    customType.custom.fields.push({
      name: "Request",
      value: `"${component.requestInput}"`,
    });
  }
  if (component.selectedExterior && component.selectedExterior != "") {
    customType.custom.fields.push({
      name: "SelectedExterior",
      value: `"${component.selectedExterior}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedExterior,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
  }
  if (component.selectedWheel && component.selectedWheel != "") {
    customType.custom.fields.push({
      name: "SelectedWheel",
      value: `"${component.selectedWheel}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedWheel,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
  }
  if (component.selectedInterior && component.selectedInterior != "") {
    customType.custom.fields.push({
      name: "SelectedInterior",
      value: `"${component.selectedInterior}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedInterior,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
  }
  if (component.selectedAudio && component.selectedAudio != "") {
    customType.custom.fields.push({
      name: "SelectedAudio",
      value: `"${component.selectedAudio}"`,
    });
    cartActions.push({
      addLineItem: {
        sku: component.selectedAudio,
        quantity: Number(component.quantity),
        ...distributionChannel,
        ...supplyChannel,
        custom: {
          typeKey: "AddOns",
          fields: [
            {
              name: "ReferenceItem",
              value: `"${component.sku}"`,
            },
          ],
        },
      },
    });
  }
  if (component.selectedAddOns && component.selectedAddOns != "") {
    customType.custom.fields.push({
      name: "SelectedAddOns",
      value: `["${component.selectedAddOns}"]`,
    });
    for (var addOn in component.selectedAddOns) {
      cartActions.push({
        addLineItem: {
          sku: component.selectedAddOns[addOn],
          quantity: Number(component.quantity),
          ...distributionChannel,
          ...supplyChannel,
          custom: {
            typeKey: "AddOns",
            fields: [
              {
                name: "ReferenceItem",
                value: `"${component.sku}"`,
              },
            ],
          },
        },
      });
    }
  }
  return component.updateMyCart(cartActions);
};
export const productSlug = (component, lineItem) =>
  lineItem.productSlug?.[locale(component)] || lineItem.productSlug;
