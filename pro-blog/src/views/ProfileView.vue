<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMsg" v-on:close-modal="closeModal"/>
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>
        <div class="admin-badge">
          <BIconPersonBoundingBox class="icon"/>
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="profileFirstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="profileLastName" />
        </div>
        <div class="input">
          <label for="userName">User Name:</label>
          <input type="text" id="userName" v-model="profileUserName" />
        </div>
        <div class="input">
          <label for="email">User Name:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="onSaveChangeHandle">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { mapState } from 'vuex'
import { BIconPersonBoundingBox } from 'bootstrap-vue'
import MessageConstants from '@/constants/MessageConstants'
export default {
  name: 'profile-view',
  components: {
    Modal,
    BIconPersonBoundingBox
  },
  data () {
    return {
      modalActive: null,
      modalMsg: ''
    }
  },
  methods: {
    closeModal () {
      this.modalActive = false
      this.modalMsg = MessageConstants.PROFILE_DEFAULT
    },

    onSaveChangeHandle () {
      this.$store.dispatch('user/updateUserProfile')
    }
  },
  computed: {
    ...mapState({
      profileInitials: state => state.user.profileInitials,
      email: state => state.user.profileEmail
    }),

    profileFirstName: {
      get () { return this.$store.state.user.profileFirstName },
      set (payload) { this.$store.commit('user/UPDATE_PROFILE_FIRST_NAME', payload) }
    },

    profileLastName: {
      get () { return this.$store.state.user.profileLastName },
      set (payload) { this.$store.commit('user/UPDATE_PROFILE_LAST_NAME', payload) }
    },

    profileUserName: {
      get () { return this.$store.state.user.profileUserName },
      set (payload) { this.$store.commit('user/UPDATE_PROFILE_USER_NAME', payload) }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../public/assets/scss/common.scss";
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .profile-info {
      border-radius: 8px;
      box-shadow: $box-shadow;
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;

        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }

        input {
          width: 100%;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          border: 0.2px solid #363535;

          &:focus {
            outline: invert;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>
