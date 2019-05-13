<template>
    <div>
        <h1>Dashboard</h1>

        <div class="tabs">
            <ul>
                <li :class="{ 'is-active' : activeCategory === 'Newest' }">
                    <a @click="setCategory('Newest')">Newest</a>
                </li>
                <li v-for="category in categories" :class="{ 'is-active' : activeCategory === category.title }">
                    <a @click="setCategory(category.title)">{{ category.title }}</a>
                </li>
            </ul>
        </div>

        <tab-movie
            category="Newest"
            v-if="activeCategory === 'Newest'"
            :categories="categories">
        </tab-movie>

        <tab-movie
            v-for="category in categories"
            :key="category.id"
            :category="category.id"
            v-if="activeCategory === category.title">
        </tab-movie>
    </div>
</template>

<script>
import { db } from '../main'

import TabMovie from '../components/TabMovie'

export default {
    name:"dashboard",
    components : { TabMovie },
    data () {
        return {
            categories : [],
            activeCategory : 'Newest'
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
    firestore () {
        if (this.$props.category !== 'Newest') {
            return {
                categories: db.collection('categories')
            }
        }
    },
    methods: {
        setCategory (title) {
            this.activeCategory = title
        }
    }

}
</script>

<style>
</style>
