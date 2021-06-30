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
        <div class="wishlist-title">
          <h3>{{ item.name.en }}</h3>
          <a
            class="mb-10 ml-3"
            href="javascript:;"
            @click="() => deleteList(item)"
            ><i class="fa fa-trash-o"></i
          ></a>
        </div>

        <div class="row">
          <WishListItems :shoppingListName="item.name.en" />
        </div>
      </div>
    </div>
    <div
      v-if="!shoppingListNotEmpty"
      class="empty-area mt-50 border-top-2 pt-120 pb-120"
    >
      <div class="container">
        <div class="empty-content text-center" data-test="empty-cart">
          <h2>{{ $t("wishList") }}</h2>
          <p>{{ $t("empty") }}</p>
          <router-link to="/">{{ $t("continueShopping") }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
