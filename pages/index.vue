<template>
  <div>
    <div class="text-center text-white bg-teal py-12 mt-4 rounded">
      <h1>JAMStack Blog ✌️</h1>
    </div>
    <div class="border border grey-light rounded p-4 md:p-8 my-4">
      <h2 class="text-grey text-sm text-center uppercase">Latest posts</h2>
      <div class="flex flex-wrap">
        <div v-for="(post, i) in blogPosts" :key="i" class="mt-4 p-4 w-100 sm:w-1/2">
          <nuxt-link :to="{ name: `blog-slug`, params: { slug: post.fields.slug }}" class="no-underline text-grey-darkest">
            <div v-if="post.fields.heroImage" class="w-full h-64 bg-cover bg-center rounded" :style="`background-image: url('https:${post.fields.heroImage.fields.file.url}')`"></div>
            <p v-if="post.fields.publishDate" class="mt-4">{{post.fields.publishDate}}</p>
            <h2 v-if="post.fields.title" class="mt-4">{{post.fields.title}}</h2>
            <p v-if="post.fields.description" class="mt-2">{{post.fields.description}}</p>
            <p class="text-grey-400 mt-4 text-sm">
              <span v-for="(tag, i) in post.fields.tags" :key="i">
                <template v-if="i < 2">#{{tag}} </template>
              </span>
            </p>
          </nuxt-link>
        </div>
      </div>
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
