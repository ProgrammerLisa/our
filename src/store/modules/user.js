const user = {
  state: {
    userInfo: {
      name: '',
      id: '',
      avatar: ''
    }
  },
  mutations: {
    setUser (state, val) {
      state.userInfo = val
    },
    clearUser (state) {
      state.userInfo = { name: '', id: '', avatar: '' }
    }
  },
  actions: {
  },
  getters: {
    user: state => state.userInfo
  }
}

export default user
