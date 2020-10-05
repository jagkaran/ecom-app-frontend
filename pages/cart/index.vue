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
  computed: {
    numberOfItems() {
      return this.$store.getters["cart/numberOfItems"];
    },
  },
};
</script>
