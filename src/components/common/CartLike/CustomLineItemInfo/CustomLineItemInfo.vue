<style src="./CustomLineItemInfo.scss" lang="scss"></style>
<script src="./CustomLineItemInfo.js"></script>
<i18n src="./CustomLineItemInfo.txt"></i18n>

<template>
  <tbody>
    <tr>
      <td v-if="editable" class="product-remove">
        <LineItemDeleteForm :line-item-id="lineItem.id" />
      </td>
      <td v-if="selectable">
        <input
          v-model="selected"
          class="check"
          :value="lineItem.slug"
          type="checkbox"
          data-test="line-item-checkbox"
        />
      </td>
      <td class="product-img">
        <router-link
          to="custom"
          class="img"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            :alt="lineItem.name.en"
          />
        </router-link>
      </td>
      <td class="product-name">
        <router-link
          to="custom"
          data-test="cart-line-item-link"
        >
          {{ lineItem.name.en }}
        </router-link>
      </td>
      <td v-if="!selectable" class="product-price">
        <span class="amount" data-test="item-price">
          <BasePrice :price="{value: lineItem.taxedPrice.totalGross}" />
        </span>
      </td>
      <td class="cart-quality">
        <LineItemQuantityForm
          v-if="editable"
          :line-item-id="lineItem.id"
          :quantity="lineItem.quantity"
        />
        <div v-if="selectable">
          <div class="cart-plus-minus">
            <input
              v-model.number="item.quantity"
              class="cart-plus-minus-box"
              type="number"
            />
          </div>
        </div>
        <div class="quantity" v-if="!editable && !selectable">
          <span>{{ lineItem.quantity }}</span>
        </div>
      </td>
      <td v-if="!selectable" class="product-total" data-test="line-total">
        <span>
          <BasePrice :price="{value: lineItem.totalPrice}" />
        </span>
      </td>
    </tr>
  </tbody>
</template>
