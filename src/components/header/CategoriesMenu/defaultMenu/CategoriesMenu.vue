<i18n src="./CategoriesMenu.txt"></i18n>
<script src="./CategoriesMenu.js"></script>

<template>
<nav>
  <ul v-if="sortedCategories && sortedCategories.length">
    <li
      class="position-static"
      v-for="category1stLevel in sortedCategories"
      :key="category1stLevel.id"
      @mouseenter="hoverOnCategory(category1stLevel)"
      @mouseleave="hoverOffCategory()"
      data-test="category-1st-level"
    >
      <router-link
        :to="{ name: 'products', params: { categorySlug: category1stLevel.slug } }"
        @click="clickOnCategory"
        :class="isActive(category1stLevel.name) ? 'active' : ''"
        data-test="category-1st-level-link"
      >
        {{ category1stLevel.name.toUpperCase() }}
      </router-link>

      <ul
        v-if="category1stLevel.children && category1stLevel.children.length"
        class="mega-menu"
        :class="category1stLevel.children.length === 2 ? 'menu-2-col mega-menu-width3' : 'mega-menu-width3'"
      >
        <li>
          <ul class="mega-menu-width4">
            <li
              v-for="category2ndLevel in category1stLevel.children"
              :key="category2ndLevel.id"
            >
              <router-link
                class="menu-title"
                :to="{ name: 'products', params: { categorySlug: category2ndLevel.slug } }"
                @click="clickOnCategory"
                data-test="category-2nd-level-link"
              >
                <span>{{ category2ndLevel.name }}</span>
              </router-link>
              <ul>
                <li
                  v-for="category3rdLevel in category2ndLevel.children"
                  :key="category3rdLevel.id"
                >
                  <router-link
                    :to="{ name: 'products', params: { categorySlug: category3rdLevel.slug } }"
                    @click="clickOnCategory"
                    data-test="category-3rd-level-link"
                  >
                    <span>{{ category3rdLevel.name }}</span>
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</nav>

</template>
