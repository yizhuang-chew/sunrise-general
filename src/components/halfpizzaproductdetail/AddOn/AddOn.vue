<script src="./AddOn.js"></script>
<style lang="scss" src="./AddOn.scss"></style>

<template>
  <div class="addOnDiv">
    <div>
      <label class="addOnLabel">{{ name }}</label>
      <div class="halfDiv">
        <img width="70px" height="40px" :src="itemImage" />
      </div>
      <div class="halfDiv">
        <vue-numeric-input
          :disabled="disabled"
          v-model="count"
          :min="0"
          :max="10"
          :class="quantity==count ? '' :' orangeBackground'"
          width="80px"
          :step="1"
          controls-type="updown"
          align="center"
        >
        </vue-numeric-input>
        <label class="addOnLabel">{{ price }}</label>
      </div>
    </div>
  </div>
</template>