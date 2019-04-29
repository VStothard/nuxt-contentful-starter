<template>
  <div>
    <div v-if="content.fields.heroImage" class="w-full h-64 bg-cover bg-center my-4 rounded" :style="`background-image: url('${content.fields.heroImage.fields.file.url}')`"></div>
    <div class="border border grey-light rounded p-4 md:p-8">
      <h1 v-if="content.fields.title" class="mt-0">{{content.fields.title}}</h1>
      <p v-if="content.fields.publishDate" class="mt-2">{{content.fields.publishDate}}</p>
      <vue-markdown class="mt-4">{{content.fields.body}}</vue-markdown>
      <p class="mt-4">
        <span v-for="(tag, i) in content.fields.tags" :key="i">
          <template v-if="i < 2">#{{tag}} </template>
        </span>
      </p>
    </div>
    <div class="my-4">
      <nuxt-link to="/" class="text-grey text-sm text-center uppercase no-underline">back to latest posts</nuxt-link>
    </div>
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