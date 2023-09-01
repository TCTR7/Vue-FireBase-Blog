<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
        <p class="content-preview" v-else>{{ post.blogHTML }}</p>
        <router-link class="link link-light" v-if="post.welcomeScreen" to="#">
          Login/Register
          <BIconArrowRight class="arrow arrow-light" />
        </router-link>
        <router-link class="link" v-else to="#">
          View The Post
          <BIconArrowRight class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt />
      <img v-else :src="require(`../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt />
    </div>
  </div>
</template>

<script>
import { BIconArrowRight } from 'bootstrap-vue'
import { mapState } from 'vuex'
export default {
  name: 'blog-post',
  props: ['post'],
  components: {
    BIconArrowRight
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/assets/scss/common.scss";

.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow;

  @media (min-width: $blog-post-media-min-width) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;

    @media (min-width: $blog-post-media-min-width) {
      order: 1;
    }
    @media (min-width: $blog-post-media-min-width) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: $blog-post-media-min-width) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: $blog-post-media-min-width) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #fff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: $box-shadow;

    @media (min-width: $blog-post-media-min-width) {
      order: 2;
    }
    @media (min-width: $blog-post-media-min-width) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:nth-child(even) {
    .blog-content {
        order: 2;
    }
    .blog-photo {
        order: 1;
    }
  }
}
.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: #fff;
    }
}
</style>
