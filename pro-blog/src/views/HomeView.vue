<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
    <div class="updates">
      <div class="container">
        <h2>never mis a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register for ProBlogs <BIconArrowRight class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconArrowRight } from 'bootstrap-vue'
import BlogPost from '../components/BlogPost.vue'
import BlogCard from '../components/BlogCard.vue'
export default {
  name: 'home-view',
  components: {
    BlogPost,
    BlogCard,
    BIconArrowRight
  },
  data () {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost: 'Weekly blog articles with all things programming including HTML, CSS, Javascript and more. Register today to never miss a post',
        welcomeScreen: true,
        photo: 'coding'
      },
      sampleBlogPost: [
        {
          title: 'This is a Filler Title!',
          blogHTML: 'This is a filler blog post title!',
          blogCoverPhoto: 'beautiful-stories'
        },
        {
          title: 'This is a Filler Title2!',
          blogHTML: 'This is a filler blog post title!',
          blogCoverPhoto: 'designed-for-everyone'
        }
      ]
    }
  },
  computed: {
    sampleBlogCards () {
      return this.$store.state.sampleBlogCards
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/assets/scss/common.scss";
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: $footer-media-min-width) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: $footer-media-min-width) {
        margin-left: auto;
      }
    }

    h2 {
      font-size: 32px;
      font-weight: 300;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: $footer-media-min-width) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
