<template>
  <div>
    <form class="uk-search uk-search-large uk-align-center uk-margin">
      <span uk-search-icon></span>
      <input
        class="uk-search-input"
        v-model="query"
        type="search"
        placeholder="Search..."
      />
    </form>
    <div
      class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@m uk-margin"
      v-for="restaurant in filteredList"
      v-bind:key="restaurant.id"
      uk-grid
    >
      <div class="uk-card-media-left uk-cover-container">
        <img
          :src="'http://localhost:1337' + restaurant.image.url"
          alt
          uk-cover
        />
        <canvas width="600" height="400"></canvas>
      </div>
      <div>
        <div class="uk-card-body">
          <h3 class="uk-card-title">{{ restaurant.r_name }}</h3>
          <p>{{ restaurant.description }}</p>
          <!-- <router-link
            :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
            tag="a"
            class="uk-button uk-button-primary"
            >See dishes</router-link
          > -->
          <nuxt-link
            class="uk-button uk-button-primary"
            :to="
              localePath({
                name: 'restaurants-id',
                params: { id: restaurant.id },
              })
            "
          >
            See dishes
          </nuxt-link>
        </div>
      </div>
    </div>
    <div
      class="uk-container uk-container-center uk-text-center"
      v-if="filteredList.length == 0"
    >
      <img src="~/static/404-error-not-found.png" height="800" width="800" />
      <p>No restaurants found</p>
    </div>
  </div>
</template>

<script>
// Import the restaurants query
import restaurantsQuery from "~/apollo/queries/restaurant/restaurants";

export default {
  data() {
    return {
      // Initialize an empty restaurants variabkle
      title: "All Restaurants",
      restaurants: [],
      query: "",
      fallbackImage:
        "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png",
    };
  },
  head() {
    return {
      title: this.title + " | Landing page",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Order food online :)",
        },
      ],
    };
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery,
    },
  },
  computed: {
    // Search system
    filteredList() {
      return this.restaurants.filter((restaurant) => {
        return restaurant.r_name
          .toLowerCase()
          .includes(this.query.toLowerCase());
      });
    },
    /* buildImageUrl() {
      // Check if the image prop exists at all and if it has at any urls inside of it
      if (!this.restaurants.image || !this.restaurants.image.length)
        return this.fallbackImage;

      // return the image, we already checked for every case before
      return "'http://localhost:1337/' + this.restaurants.image.url";
    }, */
  },
};
</script>