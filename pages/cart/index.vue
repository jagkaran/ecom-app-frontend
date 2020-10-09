<template>
  <div class="uk-width-expand@l">
    <h2 class=".uk-text-center@l uk-heading-divider .uk-text-uppercase">
      Your Bag : {{ numberOfItems }} items
    </h2>
    <div>
      <Cart />
    </div>
  </div>
</template>

<script>
import Cart from "~/components/Cart.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    Cart,
  },
  head() {
    return {
      title: `Cart with ${this.numberOfItems} Items | Hunger Stop`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Order food online :)",
        },
      ],
    };
  },
  computed: {
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    },
  },
};
</script>
