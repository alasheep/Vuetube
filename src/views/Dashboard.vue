<template>
    <div>
        <h1>Dashboard</h1>

        <div class="tabs">
            <ul>
                <li class="is-active"><a>Newest</a></li>
                <li v-for="category in categories"><a>{{ category.title }}</a></li>
                <!-- {{getInfo()}} -->

            </ul>
        </div>

        <!-- <div>
        <article v-for="category in categories">
            <h1>{{ category.title }}</h1>
        </article>
        </div> -->
    </div>
</template>

<script>
import { db } from '../main'
// var categories = []
export default {
    name:"dashboard",
    data () {
        return {
            categories : []
        }
    },
    created () {
        db.collection('categories')
            .onSnapshot((ballsRef) => {
                const balls = [];
                ballsRef.forEach((doc) => {
                const ball = doc.data();
                ball.id = doc.id;
                balls.push(ball);
                });
                console.log('Received Balls feed:', balls);

                this.categories = balls;
            });

    },
    // firestore () {
    //     return {
    //         categories: db.collection('categories')
    //         // booksRef
    //     }
    // },
    methods: {
        getInfo () {
            var data = db.collection('categories');
            console.log(data);
        }
    }

}
</script>

<style>
</style>
