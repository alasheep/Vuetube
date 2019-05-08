import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/firestore";
import VueFire from "vuefire"

Vue.config.productionTip = false;
Vue.use(VueFire);

var config = {
  apiKey: "AIzaSyAWY70yfvQ2yoedDyt3RlWHc1RlCu1GzgI",
  authDomain: "vuetube-dc826.firebaseapp.com",
  databaseURL: "https://vuetube-dc826.firebaseio.com",
  projectId: "vuetube-dc826",
  storageBucket: "vuetube-dc826.appspot.com",
  messagingSenderId: "68350078182"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const categoryCollection = db.collection('categories');

// categoryCollection
//   .onSnapshot((ballsRef) => {
//     const balls = [];
//     ballsRef.forEach((doc) => {
//       const ball = doc.data();
//       ball.id = doc.id;
//       balls.push(ball);
//     });
//     console.log('Received Balls feed:', balls);

//     dbInfo.value = balls;
//   });

// let dbInfo = db.collection('categories')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
