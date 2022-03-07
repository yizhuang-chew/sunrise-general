<style src="./AddToCartForm.scss" lang="scss"></style>
<i18n src="./AddToCartForm.txt"></i18n>
<script src="./AddToCartForm.js"></script>

<template>
  <div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="exteriorColourOptions && exteriorColourOptions.length > 0"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Exterior Colours</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="exteriorColourOptions"
          :selectedImages="selectedExteriorArray"
          @onselectimage="onSelectExterior"
        ></vue-select-image>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="wheelOptions && wheelOptions.length > 0"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Wheels</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="wheelOptions"
          :selectedImages="selectedWheelArray"
          @onselectimage="onSelectWheel"
        ></vue-select-image>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="interiorOptions && interiorOptions.length > 0"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Interior</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="interiorOptions"
          :selectedImages="selectedInteriorArray"
          @onselectimage="onSelectInterior"
        ></vue-select-image>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="audioOptions && audioOptions.length > 0"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Audio</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="audioOptions"
          :selectedImages="selectedAudioArray"
          @onselectimage="onSelectAudio"
        ></vue-select-image>
      </div>
    </div>
    <div
      class="product-dec-action-wrap pro-dec-action-2"
      v-if="addOnOptions && addOnOptions.length"
    >
      <div class="pro-details-size">
        <span style="margin-left: 3px">Select Add Ons</span>
        <vue-select-image
          :useLabel="true"
          :dataImages="addOnOptions"
          :selectedImages="selectedAddOnsArray"
          @onselectmultipleimage="onSelectAddOns"
          :is-multiple="true"
        ></vue-select-image>
      </div>
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <div class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Collection</span
          >
          <input class="dateInput" type="date" v-model="appointmentDateInput" />
        </label>
      </div>
    </div>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <div class="pro-details-size">
        <label class="field-label">
          <span class="field-label-text" data-test="form-label-text"
            >Special Requests</span
          >
          <div>
            <textarea class="textInput" v-model="requestInput" />
          </div>
        </label>
      </div>
    </div>
    <h3>
      Total:
      <BasePrice v-if="!adhocCartId" :price="basePrice" />
      <BasePrice v-else :price="adhocCartPrice" />
    </h3>
    <div class="product-dec-action-wrap pro-dec-action-2">
      <form v-if="isOnStock" ref="form" v-on:submit.prevent="addLineItem">
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
  </div>
</template>
