<template>
  <div>
    <div v-for="contents in content" :key="contents.id">
      <div v-for="zone in contents.pageZone" :key="zone.id">
        <!-- Display all richText here -->
        <div
          class="uk-text-normal uk-text-center@l"
          v-if="zone.__typename === 'ComponentPagesRichText'"
        >
          <p>{{ zone.richText }}</p>
        </div>

        <!-- Displays all Quotes here -->
        <div v-if="zone.__typename === 'ComponentPagesQuote'">
          <blockquote>
            <p class="uk-margin-small-bottom">
              {{ $i18n.locale === "en" ? zone.quote : zone.richText }}
            </p>
            <footer>{{ zone.quoter }}</footer>
          </blockquote>
        </div>

        <!-- Displays all Images -->
        <!-- <div
          class="uk-cover-container"
          v-if="zone.__typename === 'ComponentPagesImage'"
        >
          <canvas width="" height=""></canvas>
          <img
            :src="'http://localhost:1337' + zone.image.url"
            alt=""
            uk-cover
          />
          <p class="uk-text-normal">{{ zone.caption }}</p>
        </div> -->

        <div
          v-if="zone.__typename === 'ComponentPagesImage'"
          class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
          :data-src="'http://localhost:1337' + zone.image.url"
          uk-img
        >
          <div class="uk-margin-left">
            <h1 class="uk-text-uppercase" v-html="contents.Title" />
            <h2 class="uk-margin-small" v-html="contents.Description" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import translate from "~/utils/google-translate";
export default {
  // content is query data from parent page
  // title is the page title of parent page
  props: ["content", "title"],
  data() {
    return {
      text: "Hello",
    };
  },
};
</script>
