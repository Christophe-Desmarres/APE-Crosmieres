<template>

    <div class="event--card">
        <router-link v-bind:to="{ name: 'event', params: { id: id } }">
            <div class="event--card__media--image" v-bind:style="'background-image:url(' + image + ')'">
            </div>
            <h2 class="event--card__title">
                <div v-html="title"></div>
            </h2>
            <div class="event--card__excerpt">
                <div v-html="excerpt"></div>
            </div>
        </router-link>
    </div>

</template>


<script>

export default {
    name: "EventHomeListLayout",

    props: {
        image: String,
        title: String,
        excerpt: String,
        id: Number
    },

    data() {
        return {

        }
    },
}

</script>


<style scoped lang="scss">
.event--card {
    border: 1px solid $white;
    border-radius: 2rem 2rem;
    width: 45%;
    background-color: $white;
    margin: 1%;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    box-sizing: border-box;
    padding-bottom: 3rem;


    .event--card__title {
        color: $grey;
        font-weight: bold;
        padding-right: 2rem;
        padding-left: 2rem;
        font-size: 1.2rem;
        padding-top: 1rem;
    }

    .event--card__media--image {
        Width: 100%;
        height: 150px;
        background-position: center;
        background-size: cover;
        border-radius: 2rem 2rem 0 0;
    }

    .event--card__excerpt {
        color: $grey;
        margin: 1rem 3rem 1rem 3rem;
        text-align: left;
    } 

}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 425px) {
    .event--card {
        width: 90%;
    }
}

@media (max-width: 576px) {
    .event--card {
        width: 93%;
        padding-bottom: 2rem; 
        margin-bottom: 2rem;
    }
}

@media (max-width: 768px) {
    .event--card {
        margin-bottom: 2rem;
        padding-bottom: 2rem;

        .event--card__excerpt {
            margin: 1rem 1rem 1rem 1rem;     
        }
    }

}      

</style>




