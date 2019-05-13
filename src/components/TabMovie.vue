<template>
    <div class="columns is-multiline">
        <div class="card column is-4" v-for="movie in movies" :key="movie.id">
            <div class="card-image">
                <iframe :src="embedable(movie.url)" width="100%" height="200"></iframe>
            </div>

            <div class="content">
                {{ movie.title }}
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../main'

export default {
    name : 'TabMovie',
    props : {
        category: String,
        categories: Array
    },
    data () {
        return {
            movies : []
        }
    },
    mounted () {
        console.log("here1 (this.$props.category) :"+this.$props.category);
        if (this.$props.category === 'Newest') {
            console.log("here2 (this.$props.categories.length) : "+this.$props.categories.length)
            for (var i = 0 ; i < this.$props.categories.length ; i++) {
                console.log("here3")
                db.collection('categories').doc(this.$props.categories[i].id).collection('movies')
                .onSnapshot((ballsRef) => {
                    // const balls = [];
                    ballsRef.forEach((collection) => {

                        console.log("here4")

                        this.movies.push({
                            title: collection.data().title,
                            url: collection.data().url
                        })
                    });
                    // console.log('Received Balls feed:', balls);

                    // this.movies = balls;

                   
                });
            }
        }
    },
    created () {
        if (this.$props.category !== 'Newest') {
            console.log("here0")
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
        }
    },
    firestore () {
        if (this.$props.category !== 'Newest') {
            return {
                movies : db.collection('categories').doc(this.$pros.category).collection('movies')
            }
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
