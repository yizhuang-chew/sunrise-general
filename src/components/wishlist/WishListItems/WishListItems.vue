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
                  @amount-change="amountChange"
                  @remove-product="removeItem"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
