<template>
  <div>
    <!-- <Hero :title="title" :content="pages" /> -->
    <ContentGrid :title="title" :content="pages" />
  </div>
</template>
<script>
import Hero from "@/components/Hero.vue";
import ContentGrid from "@/components/ContentGrid";
import contentQuery from "~/apollo/queries/content";
export default {
  components: {
    ContentGrid,
    Hero,
  },
  data() {
    return {
      pages: [], //query result
      title: "Hunger Stop", //page title
    };
  },
  head() {
    return {
      title: this.title + " | Homepage",
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
    pages: {
      query: contentQuery,
      variables() {
        return {
          Page: this.title,
        };
      },
      prefetch: true,
    },
  },
};
</script>
