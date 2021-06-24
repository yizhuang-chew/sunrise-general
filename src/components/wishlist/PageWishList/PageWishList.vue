<style src="./PageWishList.scss" lang="scss"></style>
<i18n src="./PageWishList.txt"></i18n>
<script src="./PageWishList.js"></script>

<template>
  <div>
    <div v-if="shoppingListNotEmpty" class="breadcrumb-area bg-gray">
      <div class="container-fluid">
        <div class="breadcrumb-content text-center">
          <div class="breadcrumb-title">
            <h2>{{ $t("wishList") }}</h2>
          </div>
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoadingSpinner v-if="isLoading" />
    <div
      class="wishlist-main-area pt-30 pb-100"
      v-else-if="shoppingListNotEmpty"
    >
      <div class="container" v-for="item in shoppingLists" :key="item.id">
        <h3 class="pt-20 pb-20">{{ item.name.en }}</h3>
        <div class="row">
          <WishListItems :shoppingListName="item.name.en" />
        </div>
      </div>
    </div>
    <!-- <div class="cart-main-area pt-50 pb-100" v-else-if="shoppingListNotEmpty">
      <div class="container-fluid pl-50 pr-50">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>{{ $t('name') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="item in shoppingLists"
                  :key="item.id"
                >
                  <td class="product-remove">
                    <a 
                      href="javascript:;"
                      class="edit-delete-section"
                      @click="()=>deleteList(item)"
                    ><i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                    <router-link
                      :to="{ name: 'single list', params: { listName: item.name.en } }"
                    >
                      {{item.name.en}}
                    </router-link>
                  <td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->
    <div
      v-if="!shoppingListNotEmpty"
      class="empty-area mt-50 border-top-2 pt-120 pb-120"
    >
      <div class="container">
        <div class="empty-content text-center" data-test="empty-cart">
          <h2>{{ $t("yourList") }}</h2>
          <p>{{ $t("empty") }}</p>
          <router-link to="/">{{ $t("continueShopping") }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
