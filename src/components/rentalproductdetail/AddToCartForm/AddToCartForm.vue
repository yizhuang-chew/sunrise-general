<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div class="product-dec-action-wrap pro-dec-action-2">
    <form v-if="isOnStock" ref="form" v-on:submit.prevent="addLineItem">
      <div class="pro-details-size">
        <span class="attribute-name">Select:</span>
        <div class="grid-container">
          <div
            :class="
              name == selectedPlanType ? 'grid-item selected-grid' : 'grid-item'
            "
            v-for="(value, name) in channelsSelectable"
            v-bind:key="name"
            v-on:click="selectPlanType(name)"
          >
            {{ name }}
          </div>
          <!--<BasePrice :price="value" />-->
        </div>
        <div class="grid-container">
          <div
            :class="
              value.id == selectedPrice
                ? 'grid-item selected-grid'
                : 'grid-item'
            "
            v-for="(value, name) in channelsSelectable[selectedPlanType]"
            v-bind:key="name"
            v-on:click="selectPlan(value)"
          >
            {{ name }}
            <BasePrice :price="value" />
          </div>
        </div>
        <br />
      </div>
      <div class="quality-cart-wrap">
        <div class="quality-wrap">
          <input
            class="input-text qty"
            type="number"
            min="1"
            name="qty"
            maxlength="12"
            v-model="quantity"
            data-test="add-to-cart-amount"
            title="Qty"
          />
        </div>
        <div class="quality-wrap">
          <!-- <a
            href="#" 
            @click.prevent="submitForm"
            data-test="add-to-cart-button"
          >
            {{$t('addToCart')}}
          </a> -->
          <input
            data-test="add-to-cart-button"
            type="submit"
            :value="$t(addCaption)"
          />
        </div>
      </div>
      <div class="mt-2" style="color: red" v-if="showQuantityError">
        {{ $t("quantityError", { quantity: availableQuantity }) }}
      </div>
    </form>

    <div v-else>
      <div class="pro-cart-wrap">
        {{ $t("notInStock") }}
      </div>
    </div>
  </div>
</template>
