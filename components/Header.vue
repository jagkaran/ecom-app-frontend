<template>
  <div>
    <client-only>
      <div class="uk-section-secondary uk-preserve-color">
        <div
          uk-sticky="animation: uk-animation-slide-top; sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; cls-inactive: uk-navbar-transparent uk-light; top: 100"
        >
          <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">
              <ul class="uk-navbar-nav">
                <li class="uk-active">
                  <!-- <router-link tag="a" class="uk-text-bolder uk-logo" to="/" exact>{{
              $t("pages.home")
            }}</router-link> -->
                  <nuxt-link
                    class="uk-text-bolder uk-logo"
                    :to="localePath('/')"
                    >{{ $t("pages.home") }}</nuxt-link
                  >
                </li>
                <li>
                  <!-- <router-link tag="a" class="navbar-brand" to="/restaurants" exact>{{
              $t("pages.restaurant")
            }}</router-link> -->
                  <nuxt-link :to="localePath('restaurants')">{{
                    $t("pages.restaurant")
                  }}</nuxt-link>
                </li>
              </ul>
            </div>
            <div class="uk-navbar-right">
              <!-- If you are logged in -->
              <div class="navbar-brand">
                <LangSwitcher />
              </div>
              <ul class="uk-navbar-nav" v-if="username">
                <li>
                  <router-link tag="a" class="navbar-brand" to="#" exact
                    ><fa
                      class="uk-margin-small-right"
                      :icon="['fas', 'user']"
                    />
                    {{ username }}</router-link
                  >
                </li>
                <li>
                  <router-link tag="a" class="navbar-brand" to="/" exact
                    ><span @click="logout">Logout</span></router-link
                  >
                </li>
                <li>
                  <!-- <router-link
              tag="a"
              uk-icon="cart"
              class="navbar-brand"
              to="/cart"
              exact
              ><span v-if="hasItemsInCart" class="uk-badge">{{
                hasItemsInCart
              }}</span></router-link
            > -->

                  <nuxt-link class="navbar-brand" :to="localePath('cart')"
                    ><fa :icon="['fas', 'shopping-cart']" /><span
                      v-if="hasItemsInCart"
                      class="uk-badge uk-margin-bottom"
                      >{{ hasItemsInCart }}</span
                    ></nuxt-link
                  >
                </li>
              </ul>
              <!-- If you are not logged in -->
              <ul class="uk-navbar-nav" v-else>
                <li>
                  <!-- <a href="/users/register">Signup</a> -->
                  <nuxt-link :to="localePath('/users/register')"
                    >Register</nuxt-link
                  >
                </li>
                <li>
                  <!-- <a href="/users/signin">Signin</a> -->
                  <nuxt-link :to="localePath('/users/signin')">Login</nuxt-link>
                </li>
                <li>
                  <!-- <router-link
              tag="a"
              uk-icon="cart"
              class="navbar-brand"
              to="/cart"
              exact
              ><span v-if="hasItemsInCart" class="uk-badge">{{
                hasItemsInCart
              }}</span></router-link
            > -->

                  <nuxt-link class="navbar-brand" :to="localePath('cart')"
                    ><fa :icon="['fas', 'shopping-cart']" /><span
                      v-if="hasItemsInCart"
                      class="uk-badge uk-margin-bottom"
                      >{{ hasItemsInCart }}</span
                    ></nuxt-link
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import LangSwitcher from "~/components/LangSwitcher.vue";
export default {
  components: {
    LangSwitcher,
  },
  computed: {
    // Set your username thanks to your getter
    username() {
      return this.$store.getters["auth/username"];
    },
    hasItemsInCart() {
      return this.$store.getters["cart/numberOfItems"];
    },
  },
  methods: {
    // Define your needed mutations, here: auth/logout
    ...mapMutations({
      logout: "auth/logout",
    }),
  },
};
</script>

<style scoped>
.uk-badge {
  min-width: 18px;
  height: 18px;
  font-size: 0.6rem;
}
</style>
