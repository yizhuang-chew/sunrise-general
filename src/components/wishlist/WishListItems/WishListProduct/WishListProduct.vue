<script src="./WishListProduct.js"></script>

<template>
  <tr v-if="product">
    <td class="wishlist-remove">
      <a href="javascript:;" @click="() => removeItem(lineItem.id)"
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
          <div @click="amountChange" class="dec qtybutton">-</div>
          <input
            class="cart-plus-minus-box"
            type="number"
            name="qtybutton"
            v-model.number="quantity"
            data-test="cart-line-item-quantity"
          />
          <div @click="amountChange" class="inc qtybutton">+</div>
        </div>
      </div>
    </td>
    <td class="wishlist-price">
      <span class="amount">$26.00</span>
    </td>
    <td class="wishlist-cart">
      <a href="#">Add to cart</a>
    </td>
    <!-- <div class="cart-img">
      <router-link :to="productRoute(product.slug, product.sku)">
        <img :src="displayedImageUrl(product)" :alt="product.name" />
      </router-link>
    </div>
    <div class="cart-title">
      <h4>
        <router-link
          :to="productRoute(product.slug, product.sku)"
          data-test="shopping-list-item-link"
        >
          {{ product.name }}
        </router-link>
      </h4>
      <input type="number" :value="quantity" @keyup="amountChange" />
    </div> -->
  </tr>
</template>
