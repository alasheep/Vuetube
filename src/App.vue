<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/signup">SignUp</router-link>
      <router-link to="/login">LogIn</router-link>
    </div> -->

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          VueTube
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-tiem">
            <div class="field is-grouped" v-if="!isAuthenticated">
              <p class="control">
                <router-link to="/signup" class="button is-primary">SignUp</router-link>
              </p>
              <p class="control">
                <router-link to="/login" class="button is-info">Log in</router-link>
              </p>
            </div>

            <div class="field" v-else>
               <div class="field is-grouped">
                <p class="control">
                  <button @click="showCategoryForm =!showCategoryForm" class="buttion is-primary">Add category</button>
                </p>
                <p class="control">
                  <button @click="logOut" class="button is-danger">Log out</button>
                </p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </nav>          

    <!-- <div class="model" :class="{ 'is-active' : showCategoryForm }">
      <div class="modal-background"></div>
      <div class="modal-content">
      </div>
      <button class="modal-close is-large" aria-label="close" @click="showCategoryForm=!showCategoryForm"></button>

    </div> -->

    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data () {
    return {
      isAuthenticated : false,
      showCategoryForm : false
    }
  },
  created () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.isAuthenticated = true

                this.$router.push('/dashboard')
            }
        })
  },
  methods: {
    logOut() {
      console.log('Log out')

      firebase.auth().signOut()
          .then(() => {
              this.isAuthenticated = false // Reset the variable

              this.$router.push('/login')
      })
    }
  }
}

</script>

<style>
@import "../node_modules/bulma/css/bulma.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
