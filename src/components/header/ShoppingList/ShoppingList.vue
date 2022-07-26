<i18n src="./ShoppingList.txt"></i18n>
<script src="./ShoppingList.js"></script>
<style src="./ShoppingList.scss" lang="scss"></style>

<template>
  <span>
    <div>
      <div class="sidebar-cart-all">
          <div class="cart-content">
            <a
              @click="() => addShoppingListToCart(shoppingList.id)"
              class="btn-grey shopping-list-add-all"
            >
              {{ $t("addToCart") }}
            </a>
            <span v-if="listNotEmpty">
              <div class="shopping-list-container">
                <div
                  v-for="lineItem in lineItems"
                  :key="lineItem.id"
                  data-test="shopping-list-line-item"
                  class="single-product-cart single-product-shopping-list"
                >
                  <ShoppingListProduct
                    :id="lineItem.productId"
                    :variantId="lineItem.variantId"
                    :quantity="lineItem.quantity"
                    :lineItemId="lineItem.id"
                    @amountChange="amountChange"
                  />
                  <div class="cart-delete">
                    <div class="shopping-list-delete-div">
                      <a
                        href="javascript:;"
                        @click="() => removeItem(lineItem.id)"
                        class="edit-delete-section"
                      >
                        <i class="fa fa-trash-o"></i>
                      </a>
                    </div>
                    <div class="shopping-list-add-div">
                      <a
                        href="javascript:;"
                        @click="() => addItemToCart(lineItem)"
                        class="shopping-list-add-link"
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <span v-if="!listNotEmpty" >
              <h5 style="padding:30px;">{{ $t("emptyList") }}</h5>
            </span>
        </div>
      </div>
    </div>
  </span>
</template>
