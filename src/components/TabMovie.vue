<template>
    <div class="columns is-multiline">
        <div class="card column is-4" v-for="movie in movies" :key="movie.id">
            <div class="card-image">
                <iframe :src="embedable(movie.url)" width="100%" height="200"></iframe>
            </div>
            <!-- <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">John Smith</p>
                        <p class="subtitle is-6">@johnsmith</p>
                    </div>
                </div> -->

                <div class="content">
                    {{ movie.title }}
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import { db } from '../main'

export default {
    name : 'TabMovie',
    props : {
        category: String
    },
    data () {
        return {
            movies : []
        }
    },
    created () {
        db.collection('categories').doc(this.$props.category).collection('movies')
            .onSnapshot((ballsRef) => {
                const balls = [];
                ballsRef.forEach((doc) => {
                const ball = doc.data();
                ball.id = doc.id;
                balls.push(ball);
                });
                console.log('Received Balls feed:', balls);

                this.movies = balls;
            });
    },
    firestore () {
        return {
            movies : db.collection('categories').doc(this.$pros.category).collection('movies')
        }
    },
    methods : {
        embedable (url) {
            return 'https://youtube.com/embed/' + url.split('=')[1]
        }
    }
}
</script>

<style>

</style>
