import { createStore } from 'vuex'

export default createStore({

  // Contains the values in our store
  state: {
    token: null,
    username: null,
    userID: null,
    role: null
  },

  // Retrieving state elements via a getters
  getters: {
    getToken: (state) => {
      if (state.token === null) {
        state.token = sessionStorage.getItem('token');
      }
      return state.token;
    },

     getUsername: (state) => {
      if (state.username === null) {
        state.username = sessionStorage.getItem('username');
      }
      return state.username;
    },
     
      getRole: (state) => {
      // If the token does not exist in the store
      if(state.role === null) {
        // retrieve it from the sessionStorage
        state.role = sessionStorage.getItem('role');
      }
      return state.role;
    },
     
    getUserID: (state) => {
      if (state.userID === null) {
        state.userID = sessionStorage.getItem('userID');
      }
      return state.userID;
    },
  },
  // 
  mutations: {
    // We will retrieve the connection token stored in sessionStorage and make the connection with the vueX store
    deleteToken: (state) => {
      state.token = null;
      sessionStorage.removeItem('token');
    },
  
    setToken: (state, newToken) => {
      sessionStorage.setItem('token', newToken);
      state.token = sessionStorage.getItem('token');
      
    },
 
    deleteUsername: (state) => {
      state.username = null;
      sessionStorage.removeItem('username');
    },
   
    setUsername: (state, newUsername) => {
      sessionStorage.setItem('username', newUsername);
      state.username = sessionStorage.getItem('username');
    },

    deleteUserID: (state) => {
      state.userID = null;
      sessionStorage.removeItem('userID');
    },
   
    setUserID: (state, newUserID) => {
      sessionStorage.setItem('userID', newUserID);
      state.userID = sessionStorage.getItem('userID');
    },

    deleteRole: (state) => {
      state.role = null;
      sessionStorage.removeItem('role');
    },

    setRole: (state, newRole) => {
      sessionStorage.setItem('role', newRole);
      state.role = sessionStorage.getItem('role');
    }
  },
  actions: {
  },
  modules: {
  }
})
