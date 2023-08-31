<template>
  <div class="reset-password">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <Loading v-if="loading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: RouterConstants.LOGIN_VIEW_NAME }">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot you password? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <BIconEnvelope class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import { BIconEnvelope } from 'bootstrap-vue'
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
import RouterConstants from '../constants/RouterConstants'
import { resetUserPassword } from '../firebase/firebaseUtil'
import MessageConstants from '../constants/MessageConstants'
export default {
  name: 'forgot-pasword-view',
  components: {
    BIconEnvelope,
    Modal,
    Loading
  },
  data () {
    return {
      email: null,
      modalActive: false,
      modalMessage: '',
      loading: null,
      RouterConstants: RouterConstants
    }
  },
  methods: {
    closeModal () {
      this.modalActive = !this.modalActive
      this.email = null
    },
    resetPassword () {
      this.loading = true
      resetUserPassword(this.email)
        .then(() => {
          this.modalMessage = MessageConstants.EXISTS_ACCOUNT
          this.loading = false
          this.modalActive = true
        })
        .catch((err) => {
          this.modalActive = true
          this.modalMessage = err.message
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }

      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
