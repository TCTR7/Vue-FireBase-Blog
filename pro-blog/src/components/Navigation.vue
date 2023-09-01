<!-- eslint-disable indent -->
<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: RouterConstants.HOME_VIEW_NAME }">ProBlog</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{name: RouterConstants.HOME_VIEW_NAME }">Home</router-link>
          <router-link class="link" :to="{name: RouterConstants.BLOG_VIEW_NAME}">Blogs</router-link>
          <router-link class="link" to="#">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{name: RouterConstants.LOGIN_VIEW_NAME}">Login/Register</router-link>
        </ul>
        <div v-if="user" class="profile" ref="profile" @click="toggleProfileMenu">
          <span>{{ profileInitials }}</span>
          <div class="profile-menu" v-if="profileMenu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>
              <div class="right">
                <p>{{ profileFullName }}</p>
                <p>{{ profileUserName }}</p>
                <p>{{ profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option" @click="closeProfileMenu">
                <router-link class="option" :to="{ name: RouterConstants.PROFILE_VIEW_NAME }">
                  <BIconPerson class="icon"/>
                  <p>Profile</p>
                </router-link>
              </div>
              <div class="option" @click="closeProfileMenu">
                <router-link class="option" :to="{ name: RouterConstants.ADMIN_VIEW_NAME }">
                  <BIconPersonBoundingBox class="icon"/>
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="signOutHandle">
                <BIconBoxArrowRight class="icon"/>
                <p>Sign out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <BIconList @click="this.toggleMobileNav" v-show="mobile" class="menu-icon" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{name: RouterConstants.HOME_VIEW_NAME }">Home</router-link>
        <router-link class="link" :to="{name: RouterConstants.BLOG_VIEW_NAME }">Blogs</router-link>
        <router-link class="link" to="#">Create Post</router-link>
        <router-link class="link" :to="{name: RouterConstants.LOGIN_VIEW_NAME}">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { BIconList, BIconPerson, BIconBoxArrowRight, BIconPersonBoundingBox } from 'bootstrap-vue'
import RouterConstants from '../constants/RouterConstants'
import { mapState } from 'vuex'
import { userSignOut } from '../firebase/firebaseUtil'
export default {
  name: 'navigation-view',
  components: {
    BIconList,
    BIconPerson,
    BIconBoxArrowRight,
    BIconPersonBoundingBox
  },
  data () {
    return {
      mobile: null,
      mobileNav: null,
      windownWidth: null,
      RouterConstants: RouterConstants,
      profileMenu: null
    }
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  computed: {
    ...mapState({
      profileInitials: state => state.user.profileInitials,
      profileEmail: state => state.user.profileEmail,
      profileFullName: state => `${state.user.profileFirstName} ${state.user.profileLastName}`,
      profileUserName: state => state.user.profileUserName,
      user: state => state.user.user
    })
  },
  methods: {
    checkScreen () {
      this.windownWidth = window.innerWidth
      if (this.windownWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
    },

    toggleMobileNav () {
      this.mobileNav = !this.mobileNav
    },

    toggleProfileMenu (e) {
      console.log('e.target: ', e.target)
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu
      }
    },

    closeProfileMenu () {
      this.profileMenu = false
    },

    signOutHandle () {
      userSignOut()
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../public/assets/scss/common.scss';
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: $box-shadow;
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: $box-shadow;

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: poiter;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: $mobile-nav-max-width;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active, .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-$mobile-nav-max-width);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-$mobile-nav-max-width);
  }
}
</style>
