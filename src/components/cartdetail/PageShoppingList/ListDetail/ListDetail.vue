<i18n src="./ListDetail.txt"></i18n>
<script src="./ListDetail.js"></script>

<template>
  <div>
    <div
      class="single-slider bg-img slider-height-2 align-items-center custom-d-flex shopping-list-banner"
      style="background-image:url(assets/img/cartbanner.jpg);"
    >
      <div class="container">
        <div class="row height-100-percent align-items-center">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="slider-content-8 slider-animated-1 text-center">
              <h3 class="animated">{{ shoppingListName }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShoppingList :shoppingListName="shoppingListName" />
  </div>
</template>
