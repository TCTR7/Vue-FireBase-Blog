import { getCurrentUser } from '../../firebase/firebaseUtil'

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
  updateUser ({ commit }, user) {
    commit('UPDATE_USER', user)
  }
}
const mutations = {
  UPDATE_PROFILE_INFO (state, userProfile) {
    console.log('UPDATE_PROFILE_INFO')
    state.profileId = userProfile.id
    state.profileEmail = userProfile.email
    state.profileFirstName = userProfile.firstName
    state.profileLastName = userProfile.lastName
    state.profileUserName = userProfile.userName
  },
  UPDATE_PROFILE_INITIALS (state) {
    state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join('') +
                            state.profileLastName.match(/(\b\S)?/g).join('')
  },
  UPDATE_USER (state, user) {
    state.user = user
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
