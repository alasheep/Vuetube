<template>
    <!-- <div>
        <h1>Log In</h1>

        <form @submit.prevent="signUp">
            <input type="email" placeholder="Email" v-model="email"><br>
            <input type="password" placeholder="Password" v-model="password"><br>
            
            <button>Submit</button>
        </form>

        Is authenticated: {{ isAuthenticated }}

        <hr>
        <button @click="logOut">Log out</button>
    </div> -->

    <div class="columns">
        <div class="column is-4 is-offset-4">
            <h1 class="title">Log in</h1>

            <form @submit.prevent="logIn">
                <div class="field">
                    <input type="email" placeholder="Email" v-model="email" class="input"><br>
                </div>

                <div class="field">
                    <input type="password" placeholder="Password" v-model="password" class="input"><br>
                </div>    
            
                <div class="field">
                    <div class="control">
                        <button class="button is-success">Submit</button>
                    </div>
                </div>

                <article class="message is-danger" v-if="error">
                    <div class="message-body">
                        {{ error }}
                    </div>
                </article>
                
            </form>

            Is authenticated: {{ isAuthenticated }}

            <hr>
            <button @click="logOut">Log out</button>

        </div>    
    </div>

</template>

<script>

import firebase from "firebase";

export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: '',
            isAuthenticated: false,
            error: null
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
        logIn() {
            console.log('Log In')

            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .catch(error => /*alert(error.message)*/ this.error = error.message)
        },
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