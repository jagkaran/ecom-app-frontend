<template>
  <div>
    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)">
      <span uk-icon="arrow-left"></span> go back
    </a>

    <client-only>
      <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
        <div v-for="dish in restaurant.dishes" :key="dish.id">
          <div class="uk-inline-clip uk-transition-toggle">
            <div class="uk-card uk-card-hover uk-card-body">
              <div class="uk-card-media-top">
                <div class="uk-cover-container uk-height-large">
                  <img
                    :src="'http://localhost:1337' + dish.image.url"
                    alt
                    uk-cover
                  />
                </div>
              </div>
            </div>
            <div
              class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-default"
            >
              <div class="uk-card-body">
                <h3 class="uk-card-title">
                  {{ dish.d_name }}
                  <span class="uk-badge">₹{{ dish.price }}</span>
                </h3>
                <p>{{ dish.description }}</p>
              </div>
              <div class="uk-card-footer">
                <button
                  class="uk-button uk-button-primary"
                  @click="addToCart(dish)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import restaurantQuery from "~/apollo/queries/restaurant/restaurant";
import Cart from "~/components/Cart.vue";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      restaurant: Object,
    };
  },
  head() {
    return {
      title: this.restaurant.r_name + " | Landing page",
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
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables() {
        return { id: this.$route.params.id };
      },
    },
  },
  components: {
    Cart,
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
  },
};
</script>