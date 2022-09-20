<template>
    <section class="event--section">
        <div class="event--section__title">
            <h1 class="title--event">   
            Vos évènements du moment <span>à l'école des Tilleuls</span>
            <div class="title--imgage">
                    <img v-bind:src="treePicture" alt="icône de tilleul"/>
                </div>
            </h1>
        </div>

        <EventHomeListLayout
            v-bind:image="event.featured_media !== 0 ? event._embedded['wp:featuredmedia'][0].source_url : defaultPicture"
            v-bind:id="event.id" v-bind:title="event.title.rendered" v-bind:excerpt="event.excerpt.rendered"
            v-for="event in eventsList" v-bind:key="event.id" />

    </section>

</template>


<script>
//Layout
import EventHomeListLayout from '@/components/events/EventHomeListLayout.vue';
//Service
import EventService from '@/services/events/EventService';
//Images
import defaultPicture from '@/assets/images/events/flags.jpg';
import picture from "@/assets/images/tree.png";

export default {
    name: "EventsHomeLayout",

    components: {
        EventHomeListLayout
    },

    async mounted() {
        //list of events from our API
        //GET AN ARRAY OF ALL EVENTS
        let list = await EventService.findAll();
        // ORDER BY DATE ARRAY OF EVENTS
        list.sort(function (b, a) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        }),
            //SLICE (0.4) CUT THE ARRAY AND GET 4 FIRST EVENT ORDER BY DATE
            this.eventsList = list.slice(0, 4)

    },

    data() {
        return {
            eventsList: [],
            defaultPicture,
            treePicture: picture,
        }
    },
}
</script>


<style lang="scss" scoped>
.event--section {
    width: 100%;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .event--section__title {
        width:100%;

        .title--event {
        color: $red;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        font-family: 'Merienda', cursive;
        text-shadow: 0px 1px 1px $grey;
        display: flex;
        align-items: center;
        justify-content: center;
        
        }
            span { 
                margin-left: 0.5rem;
            }
    }

}

//<----------Media queries-------->

@media (max-width: 425px) {
    .event--section__title {
            display: none;
        
    }
}

@media (max-width: 576px) {
    .event--section {
        display:flex;
        flex-direction: column;
        align-items: center;
        align-content: center;

        .title--imgage {
            display: none;
        }
    }
    .event-card {
            width: 93%;
            padding-bottom: 2rem; 
            margin-bottom: 2rem;
    
   
        }

}

@media (max-width: 992px) {
  span {
    display: none;
  }
}
</style>