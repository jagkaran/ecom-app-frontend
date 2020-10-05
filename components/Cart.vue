<template>
  <div
    class="uk-card uk-card-default uk-card-body uk-margin"
    uk-sticky="offset: 20; bottom: true"
  >
    <img
      src="https://i.pinimg.com/originals/66/22/ab/6622ab37c6db6ac166dfec760a2f2939.gif"
      class="uk-align-center"
      height="250"
      width="250"
      alt
    />

    <div class="uk-alert-warning" uk-alert v-if="numberOfItems === 0">
      <a class="uk-alert-close"></a>
      <p>Hungry??? Add some times to cart and checkout Now!</p>
    </div>

    <div v-if="price > 0 && numberOfItems >= 1">
      <table
        class="uk-table uk-table-striped uk-table-small uk-table-responsive"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (unit)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in selectedDishes" :key="dish.id">
            <td class="uk-width-1-2">{{ dish.d_name }}</td>
            <td class="uk-table-shrink">₹{{ dish.price }}</td>
            <td class="uk-table-shrink">{{ dish.quantity }}</td>
            <td>
              <a class="uk-margin-left">
                <span class="uk-badge" @click="addToCart(dish)">+</span>
              </a>
              <a>
                <span
                  class="uk-badge"
                  style="background: #f0506e"
                  @click="removeFromCart(dish)"
                  >-</span
                >
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        class="uk-button uk-button-primary"
        @click="goToCheckout"
        name="button"
      >
        Proceed to checkout (₹{{ price }})
      </button>

      <!-- <nuxt-link
        class="uk-button uk-button-primary"
        @click.native="goToCheckout"
        :to="localePath('/')"
        >Proceed to checkout (₹{{ price }})</nuxt-link
      > -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters["auth/username"];
      if (!isConnected) {
        this.$router.push(this.localePath("/users/signin"));
        //this.localePath("/users/signin");
        return;
      }
      this.$router.push(this.localePath("/orders/checkout"));
      //this.localePath("/orders/checkout");
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    selectedDishes() {
      return this.$store.getters["cart/items"];
    },
    price() {
      return this.$store.getters["cart/price"];
    },
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    },
  },
};
</script>