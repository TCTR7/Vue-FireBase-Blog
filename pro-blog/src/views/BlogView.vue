<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="user" class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index" />
    </div>
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'blog-view',
  components: {
    BlogCard
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      sampleBlogCards: state => state.blog.sampleBlogCards
    }),
    editPost: {
      get () {
        return this.$store.state.blog.editPost
      },
      set (payload) {
        this.$store.dispatch('blog/toggleEditPost', payload)
      }
    }
  },
  beforeDestroy () {
    this.$store.dispatch('blog/toggleEditPost', false)
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/assets/scss/common.scss";
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: $box-shadow;
    }

    input[type="checkbox"]::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: $box-shadow;
    }

    input:checked[type="checkbox"]::before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
