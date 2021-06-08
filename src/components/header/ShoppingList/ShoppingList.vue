<i18n src="./ShoppingList.txt"></i18n>
<script src="./ShoppingList.js"></script>

<template>
  <span>
    <div>
      <div class="sidebar-cart-all">
        <div class="cart-content">
          <h3>{{ $t('shoppingList') }} </h3>
          <div v-if="listNotEmpty">
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
                  :edit="edit"
                />
                <div class="cart-delete" v-if="edit">
                  <a
                    href="javascript:;"
                    @click="()=>removeItem(lineItem.id)"
                    class="edit-delete-section"
                  >
                    <i class="fa fa-trash-o"></i>
                  </a>
                </div>
                <a
                  href="javascript:;"
                  @click="()=>addItemToCart(lineItem)"
                >
                  Add item to cart
                </a>
              </li>
            </ul>
            <div>
              <a
                @click="()=>addShoppingListToCart(shoppingList.id)"
                class="btn-grey"
              >
                {{ $t('addToCart') }}
              </a>
            </div>
            <div v-if="edit">
              <input 
                type="email" 
                placeholder="Email of the user to share"
                :value="shareEmail"
                @keyup="changeShareEmail"
              />
              <a
                @click="()=>share()"
                class="btn-grey"
              >
                {{ $t('share') }}
              </a>
            </div>
          </div>
          <span v-if="!listNotEmpty">
            <h5>{{ $t('emptyList') }}</h5>
          </span>
        </div>
      </div>
    </div>
  </span>
</template>
