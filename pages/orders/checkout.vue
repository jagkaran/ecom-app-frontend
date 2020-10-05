<template>
  <div>
    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)">
      <span uk-icon="arrow-left"></span> go back
    </a>

    <client-only placeholder="Chargement...">
      <div uk-grid>
        <div class="uk-width-1-3@m">
          <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">
            <form @submit.stop.prevent="handleSubmit">
              <fieldset class="uk-fieldset">
                <legend class="uk-legend">Checkout</legend>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text"
                    >Address</label
                  >
                  <input
                    class="uk-input"
                    v-model="address"
                    type="text"
                    placeholder="Am Europakanal 36"
                  />
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text"
                    >City</label
                  >
                  <input
                    class="uk-input"
                    v-model="city"
                    type="text"
                    placeholder="Erlangen"
                  />
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text"
                    >Postal code</label
                  >
                  <input
                    class="uk-input"
                    v-model="postalCode"
                    type="text"
                    placeholder="91056"
                  />
                </div>

                <div class="uk-margin">
                  <label for="card">Card</label>
                  <card
                    ref="card-stripe"
                    stripe="pk_test_51HUV7oAuvJIPCGvzc3LbOoh1yOsOKjJdZgMHGHxcqd8VA47X3nK02MIsirTAybVDHtMdAwcRe55gtK73SSYqEtyF00mH7Euig7"
                    @change="complete = $event.complete"
                  />
                </div>

                <div class="uk-margin">
                  <button
                    class="uk-button uk-button-primary"
                    name="button"
                    type="submit"
                  >
                    Order Now (₹{{ price }})
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div class="uk-width-expand@m">
          <div v-if="price > 0 && numberOfItems >= 1">
            <h3 class=".uk-text-center@l uk-heading-divider .uk-text-uppercase">
              Order Summary : {{ numberOfItems }} items
            </h3>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Cart from "~/components/Cart.vue";
import { Card, createToken } from "vue-stripe-elements-plus";
import strapi from "~/utils/strapi";
import { mapMutations } from "vuex";

export default {
  components: {
    Card,
    Cart,
  },
  data() {
    return {
      address: "",
      postalCode: "",
      city: "",
      complete: false,
      loading: false,
    };
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
  methods: {
    ...mapMutations({
      emptyCart: "cart/emptyList",
    }),
    async handleSubmit() {
      this.loading = true;
      let token;
      try {
        const response = await createToken();
        token = response.token.id;
      } catch (err) {
        alert("An error occurred.");
        this.loading = false;
        return;
      }
      try {
        await strapi.createEntry("orders", {
          amount: this.$store.getters["cart/price"],
          dishes: this.$store.getters["cart/items"],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token,
        });
        alert("Your order have been successfully submitted.");
        this.emptyCart();
        this.$router.push("/");
      } catch (err) {
        this.loading = false;
        alert("An error occurred.");
      }
    },
  },
};
</script>