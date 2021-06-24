<i18n src="./WishListItems.txt"></i18n>
<script src="./WishListItems.js"></script>
<style src="./WishListItems.scss" lang="scss"></style>

<template>
  <div class="col-lg-12 col-md-12 col-sm-12 col-12">
    <form>
      <div class="row">
        <div class="col-lg-12">
          <div class="table-content table-responsive wishlist-table-content">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th class="wishlist-cart-none">
                    <span>Add to cart</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <WishListProduct
                  v-for="lineItem in lineItems"
                  :key="lineItem.id"
                  :id="lineItem.productId"
                  :variantId="lineItem.variantId"
                  :quantity="lineItem.quantity"
                  :lineItemId="lineItem.id"
                  @amountChange="amountChange"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- <span>
    <div>
      <div class="sidebar-cart-all">
        <div class="cart-content">
          <h3>{{ $t("shoppingList") }}</h3>
          <span v-if="listNotEmpty">
            <ul>
              <li
                v-for="lineItem in lineItems"
                :key="lineItem.id"
                data-test="shopping-list-line-item"
                class="single-product-cart"
              >
                <ShoppingListProduct
                  :id="lineItem.productId"
                  :variantId="lineItem.variantId"
                  :quantity="lineItem.quantity"
                  :lineItemId="lineItem.id"
                  @amountChange="amountChange"
                />
                <div class="cart-delete">
                  <a
                    href="javascript:;"
                    @click="() => removeItem(lineItem.id)"
                    class="edit-delete-section"
                  >
                    <i class="fa fa-trash-o"></i>
                  </a>
                  <a href="javascript:;" @click="() => addItemToCart(lineItem)">
                    Add item to cart
                  </a>
                </div>
              </li>
            </ul>
            <a
              @click="() => addShoppingListToCart(shoppingList.id)"
              class="btn-grey"
            >
              {{ $t("addToCart") }}
            </a>
          </span>
          <span v-if="!listNotEmpty">
            <h5>{{ $t("emptyList") }}</h5>
          </span>
        </div>
      </div>
    </div>
  </span> -->
</template>
