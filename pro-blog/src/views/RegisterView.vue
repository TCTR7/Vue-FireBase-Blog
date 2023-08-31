<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: RouterConstants.LOGIN_VIEW_NAME }">Login</router-link>
            </p>
            <h2>Create Your ProBlogs Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName" />
                    <BIconPerson class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName" />
                    <BIconPerson class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="User Name" v-model="userName" />
                    <BIconPerson class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email" />
                    <BIconEnvelope class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="password" />
                    <BIconLockFill class="icon" />
                </div>
                <div class="error" v-show="error">{{ this.errorMessage }}</div>
            </div>
            <button @click.prevent="register">Submit</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import RouterConstants from '@/constants/RouterConstants'
import { BIconEnvelope, BIconLockFill, BIconPerson } from 'bootstrap-vue'
import MessageConstants from '../constants/MessageConstants'
import { registerUser } from '../firebase/firebaseUtil'
export default {
  name: 'register-view',
  components: {
    BIconEnvelope,
    BIconLockFill,
    BIconPerson
  },
  data () {
    return {
      RouterConstants: RouterConstants,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userName: '',
      error: null,
      errorMessage: null
    }
  },
  methods: {
    errorHandle () {
      this.error = true
      this.errorMessage = MessageConstants.MISSING_INPUT_VALIDATE
    },
    resetErrorInformation () {
      this.error = false
      this.errorMessage = null
    },
    async register () {
      if (
        this.email !== '' &&
        this.password !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.userName !== ''
      ) {
        this.resetErrorInformation()
        const userInfor = {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          password: this.password
        }
        await registerUser(userInfor)
        this.$router.push({ name: RouterConstants.HOME_VIEW_NAME })
        return
      }
      this.errorHandle()
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}
</style>
