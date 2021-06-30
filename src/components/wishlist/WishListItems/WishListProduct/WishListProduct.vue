<script src="./WishListProduct.js"></script>

<template>
  <tr v-if="product">
    <td class="wishlist-remove">
      <a href="javascript:;" @click="removeItem"
        ><i class="fa fa-trash-o"></i
      ></a>
    </td>
    <td class="wishlist-img">
      <img :src="displayedImageUrl(product)" :alt="product.name" />
    </td>
    <td class="wishlist-name">
      <router-link
        :to="productRoute(product.slug, product.sku)"
        data-test="shopping-list-item-link"
      >
        {{ product.name }}
      </router-link>
    </td>
    <td class="wishlist-qty">
      <div class="quickview-quality quality-height-dec2">
        <div class="cart-plus-minus">
          <div @click="decrement" class="dec qtybutton">-</div>
          <input
            class="cart-plus-minus-box"
            type="number"
            name="qtybutton"
            v-model.number="quantity"
            data-test="cart-line-item-quantity"
          />
          <div @click="increment" class="inc qtybutton">+</div>
        </div>
      </div>
    </td>
    <td class="wishlist-price">
      <span class="amount">
        <BasePrice :price="product.price" />
      </span>
    </td>
    <td class="wishlist-cart">
      <a
        href="javascript:;"
        @click="() => addItemToCart({ productId: id, quantity, variantId })"
        >Add to cart</a
      >
    </td>
  </tr>
</template>
