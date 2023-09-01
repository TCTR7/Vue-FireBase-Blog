import {
  getCurrentUser,
  updateUserProfile
} from '../../firebase/firebaseUtil'

const state = {
  user: null,
  profileEmail: null,
  profileFirstName: null,
  profileLastName: null,
  profileUserName: null,
  profileId: null,
  profileInitials: null
}

const getters = {}

const actions = {
  async updateProfile ({ commit }) {
    const userProfile = await getCurrentUser()
    console.log('updateProfile data: ', userProfile)
    commit('UPDATE_PROFILE_INFO', userProfile)
    commit('UPDATE_PROFILE_INITIALS')
  },

  async updateUserProfile ({ commit, state }) {
    const userInfo = {
      id: state.profileId,
      email: state.profileEmail,
      firstName: state.profileFirstName,
      lastName: state.profileLastName,
      userName: state.profileUserName
    }
    await updateUserProfile(userInfo)
    commit('UPDATE_PROFILE_INITIALS')
  }
}
const mutations = {
  UPDATE_PROFILE_INFO (state, userProfile) {
    console.log('UPDATE_PROFILE_INFO')
    state.profileId = userProfile.userId
    state.profileEmail = userProfile.email
    state.profileFirstName = userProfile.firstName
    state.profileLastName = userProfile.lastName
    state.profileUserName = userProfile.userName
  },

  UPDATE_PROFILE_INITIALS (state) {
    state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') +
                            state.profileLastName.match(/(\b\S)?/g).join('')
    console.log('state.profileInitials: ', state.profileInitials)
  },

  UPDATE_USER (state, user) {
    state.user = user
  },

  UPDATE_PROFILE_FIRST_NAME (state, payload) {
    state.profileFirstName = payload
  },

  UPDATE_PROFILE_LAST_NAME (state, payload) {
    state.profileLastName = payload
  },

  UPDATE_PROFILE_USER_NAME (state, payload) {
    state.profileUserName = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
