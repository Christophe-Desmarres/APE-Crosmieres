<template>
    <section class="sale--section__list">
        <h1>Liste des ventes de l'école</h1>
        <div class="sale--section__search">
            <img class="sale--card__img" v-bind:src="salePicture">
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <button class="search-icon"> <i class="fa fa-search"></i></button>
            <input type="text" placeholder="Rechercher..." v-model="searchString">
        </div>
        <div class="sale--list">
            <SaleListLayout 
            v-bind:image="sale.featured_media !== 0 ? sale._embedded['wp:featuredmedia'][0].source_url : defaultPicture" 
            v-bind:id="sale.id"
            v-bind:title="sale.title.rendered" 
            v-bind:content="sale.content.rendered" v-for="sale in salesNewList"
            v-bind:key="sale.id" />
        </div>
    </section>
</template>


<script>
import SaleListLayout from '@/components/sales/SaleListLayout.vue';
import SaleService from '@/services/sales/SaleService';
import picture from '@/assets/images/purchases.png';
import defaultPicture from "@/assets/images/sales/colorful.jpg";

export default {
    name: 'SalesListLayout',

    components: {
        SaleListLayout
    },

    async mounted() {
        //list of s from our API
        this.salesList = await SaleService.findAll();
        console.log(this.salesList);
        // if not sales in database
        if (this.salesList.length == 0) {
            this.salesList = [{
                id: -1,
                title: {
                    rendered: 'Pas de ventes en cours'
                },
                content: {
                    rendered: 'Rendez-vous prochainement'
                },
                featured_media: 0
            }]
        }

    },

    computed: {
        salesNewList() {
            //Return an array that contains the rows where the callback returned true
            return this.salesList.filter((sale) => {
                // We take the title of the current sale and we check if the searched term is contained in this title.
                // If yes, return true   
                if (sale.title.rendered.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(this.searchString.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    },

    data() {
        return {
            salesList: [],
            salePicture: picture,
            searchString: "",
            defaultPicture,
        }
    },
}
</script>


<style scopped lang="scss">
.sale--section__list {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: $orange;
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 0px 1px 1px $grey;
        font-family: 'Merienda', cursive;
        margin-top: 0.5rem;
    }


    .sale--section__search {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    // .sale--list {
    //     display: flex;
    //     justify-content: center;
    //     flex-direction: column;
    //     align-items: center;

    //     .sale--card {
    //         width: 60%;
    //     }
    // }

    input {
        padding: 11px;
        font-size: 15px;
        border-style: none;
        width: 25%;
        background: $white;
        border: 1px solid $blue-bg-header;
        border-radius: 0.5em;
    }

    .search-icon {
        border-style: none;
        background-color: $orange;
        color: $white;
        height: 40px;
        width: 40px;
        border-radius: 25%;
        margin-right: 5px;
        margin-left: 2rem;

    }

    .sale--card__img {
        width: 8rem;
    }
}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 576px) {
    .sale--section__list {
        .search-icon {
            margin-left: 1rem;
        }

        .sale--list {
            .sale--card {
                width: 90%;
            }
        }
    }
}
</style>

 
