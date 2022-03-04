<script src="./CustomisePizza.js"></script>
<style lang="scss" src="./CustomisePizza.scss"></style>

<template>
  <div :showModal="showModal" @close-modal="closeModal">
    <modal
      styles="border-radius: 0"
      :name="modalName"
      width="1000"
      height="800"
      @closed="closeModal"
    >
      <div class="modal-body">
        <button
          type="button"
          class="close"
          @click="closeModal"
          aria-label="Close"
        >
          <span class="dl-icon-close"></span>
        </button>
        <button
          type="button"
          style="float:right;margin-right:15px;"
          @click="addToCart"
        >
          Add to Cart
        </button>
        <div class="no-gutters">
          <h2 style="font-weight: bold; width: 100%">Edit Toppings</h2>
          <h4 style="margin-top: 5px">
            Total:
            <BasePrice v-if="!adhocCartId" :price="basePrice" />
            <BasePrice v-else :price="adhocCartPrice" />
            (Base: 
            <BasePrice :price="basePrice" />)
          </h4>
          <div class="edit-toppings">
            <div>
              <div class="topping-title-cheese">
                <h4 class="deal-head">
                  <span class="color-link">SAUCE</span>
                </h4>
              </div>
              <AddOn
                v-for="item in selectableSauce"
                :key="item.id"
                :price="item.price"
                :itemImage="item.itemImage"
                :quantity="item.quantity"
                :name="item.id"
                @updateToppings="updateToppings"
                :disabled="disabled"
              />
            </div>
          </div>

          <div class="edit-toppings">
            <div>
              <div class="topping-title-cheese">
                <h4 class="deal-head">
                  <span class="color-link">CHEESE</span>
                </h4>
              </div>
              <AddOn
                v-for="item in selectableCheese"
                :key="item.id"
                :price="item.price"
                :itemImage="item.itemImage"
                :quantity="item.quantity"
                :name="item.id"
                @updateToppings="updateToppings"
                :disabled="disabled"                
              />
            </div>
          </div>

          <div class="edit-toppings">
            <div>
              <div class="topping-title-cheese">
                <h4 class="deal-head">
                  <span class="color-link">MEAT</span>
                </h4>
              </div>
              <AddOn
                v-for="item in selectableMeat"
                :key="item.id"
                :price="item.price"
                :itemImage="item.itemImage"
                :quantity="item.quantity"
                :name="item.id"
                @updateToppings="updateToppings"
                :disabled="disabled"                
              />
            </div>
          </div>

          <div class="edit-toppings">
            <div>
              <div class="topping-title-cheese">
                <h4 class="deal-head">
                  <span class="color-link">SEAFOOD</span>
                </h4>
              </div>
              <AddOn
                v-for="item in selectableSeafood"
                :key="item.id"
                :price="item.price"
                :itemImage="item.itemImage"
                :quantity="item.quantity"
                :name="item.id"
                @updateToppings="updateToppings"
                :disabled="disabled"                
              />
            </div>
          </div>

          <div class="edit-toppings">
            <div>
              <div class="topping-title-cheese">
                <h4 class="deal-head">
                  <span class="color-link">VEGETABLE</span>
                </h4>
              </div>
              <AddOn
                v-for="item in selectableVegetable"
                :key="item.id"
                :price="item.price"
                :itemImage="item.itemImage"
                :quantity="item.quantity"
                :name="item.id"
                @updateToppings="updateToppings"
                :disabled="disabled"                
              />
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
