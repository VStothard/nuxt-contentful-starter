<template>
  <div>
    <div v-for="(post, i) in blogPosts" :key="i">
      <nuxt-link :to="{ name: `blog-slug`, params: { slug: post.fields.slug }}">
        <div v-if="post.fields.heroImage" class="w-full h-64 bg-cover bg-center" :style="`background-image: url('https:${post.fields.heroImage.fields.file.url}')`"></div>
        <p v-if="post.fields.publishDate">{{post.fields.publishDate}}</p>
        <h2 v-if="post.fields.title">{{post.fields.title}}</h2>
        <p v-if="post.fields.description">{{post.fields.description}}</p>
        <p class="text-grey-400 mt-4 text-sm">
          <span v-for="(tag, i) in post.fields.tags" :key="i">
            <template v-if="i < 2">#{{tag}} </template>
          </span>
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import contentful from "~/plugins/contentful.js";

export default {
    async asyncData(context) {
        let blogPosts = await contentful.getEntries({ content_type: "blogPost" });

        return {
           blogPosts: blogPosts.items
        }
    }
};
</script>
