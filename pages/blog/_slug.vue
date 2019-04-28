<template>
  <div>
    <nuxt-link to="/">back to latest posts</nuxt-link>
    <div v-if="content.fields.heroImage" class="w-full h-64 bg-cover bg-center" :style="`background-image: url('${content.fields.heroImage.fields.file.url}')`"></div>
    <p v-if="content.fields.publishDate">{{content.fields.publishDate}}</p>
    <h2 v-if="content.fields.title">{{content.fields.title}}</h2>
    <vue-markdown>{{content.fields.body}}</vue-markdown>
    <p>
      <span v-for="(tag, i) in content.fields.tags" :key="i">
        <template v-if="i < 2">#{{tag}} </template>
      </span>
    </p>
  </div>
</template>
<script>
import contentful from "~/plugins/contentful.js";
// import VueMarkdown from 'vue-markdown';

export default {
  async asyncData({ env, params }) {
    return await contentful
      .getEntries({
        content_type: "blogPost",
        "fields.slug": params.slug
      })
      .then(entries => {
        return {
          content: entries.items[0]
        };
      })
      .catch(console.error);
  }
};
</script>