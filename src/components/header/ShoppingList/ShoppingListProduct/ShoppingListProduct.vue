<script src="./ShoppingListProduct.js"></script>
<style src="./ShoppingListProduct.scss" lang="scss"></style>

<template>
  <div v-if="product" class="shopping-list-item-div">
    <div class="cart-img shopping-list-image-div">
      <router-link :to="productRoute(product.slug, product.sku)">
        <img
          :src="displayedImageUrl(product)"
          :alt="product.name"
          class="shopping-list-image"
        />
      </router-link>
    </div>
    <div class="cart-title  shopping-list-product-div">
      <h4 class="shopping-list-product-title">
        <router-link
          :to="productRoute(product.slug, product.sku)"
          data-test="shopping-list-item-link"
        >
          {{ product.name }}
        </router-link>
      </h4>
      <div class="shopping-list-product-description">
        {{ product.description }}
      </div>
      <div
        v-if="product.prices && product.prices[0]"
        class="shopping-list-product-price"
      >
        {{
          product.prices[0].value.currencyCode +
            " " +
            (product.prices[0].value.centAmount / 100).toFixed(2)
        }}
      </div>
    </div>
      <div class="shopping-list-product-quantity-div">
        Quantity: <input type="number" :value="quantity" @keyup="amountChange" class="shopping-list-quantity-input"/>
      </div>
  </div>
</template>
