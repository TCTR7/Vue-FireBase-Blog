<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'home'}">ProBlog</router-link>
          <ul>
            <li>
              <a href="#">
                <BIconYoutube class="svg-icon"></BIconYoutube>
              </a>
            </li>
            <li>
              <a href="#">
                <BIconTwitter class="svg-icon"></BIconTwitter>
              </a>
            </li>
            <li>
              <a href="#">
                <BIconInstagram class="svg-icon"></BIconInstagram>
              </a>
            </li>
            <li>
              <a href="#">
                <BIconLinkedin class="svg-icon"></BIconLinkedin>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'home'}">Home</router-link>
            <router-link class="link" :to="{ name: 'blogs'}">Blogs</router-link>
            <router-link v-if="user" class="link" :to="{ name: 'newpost'}">Create Post</router-link>
            <router-link v-if="!user" class="link" :to="{ name: 'login'}">Login / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import {
  BIconYoutube,
  BIconTwitter,
  BIconInstagram,
  BIconLinkedin
} from 'bootstrap-vue'
export default {
  name: 'footer-view',
  components: {
    BIconYoutube,
    BIconTwitter,
    BIconInstagram,
    BIconLinkedin
  },
  data () {
    return {
      user: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/assets/scss/common.scss";
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: $footer-media-min-width) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: $footer-media-min-width) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: $footer-media-min-width) {
          text-align: center;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: $footer-media-min-width) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: $footer-media-min-width) {
            text-align: initial;
          }
        }

        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: $footer-media-min-width) {
            flex-direction: column;
          }

          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: $footer-media-min-width) {
        gap: 0;
        align-items: flex-end;
      }
    }

    p {
      margin-top: auto;
      color: #fff;
    }
  }
}
</style>
