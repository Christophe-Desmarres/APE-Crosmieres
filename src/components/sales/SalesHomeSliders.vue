<template>

    <section class="sale--sliders__all">

        <div class="sale--sliders__titre">
            <h2>Ventes</h2>
        </div>

        <div class="sale--sliders">
                <div v-bind:class="'sale--sliders__texte'">                
                <h2 class="sale--sliders__h2" >{{this.title}}</h2>
                <p v-html="this.content"></p>

            </div>
        </div>

        <section class="background--design__all">
            <div class="background--design"> </div>
            <div class="background--design"></div>
            <div class="background--design"></div>
            <div class="background--design"></div>
            <div class="background--design background__5"></div>
        </section>

    </section>
</template>

<script>
//Service
import SaleService from "@/services/sales/SaleService";
export default {


    name: 'SalesHomeSliders',
    data() {
        return {
            allSales: null,
            //Define the slide show in first
            slide: 0,
            //Define number of slide
            maxSlide: null,
            saleSlide: null,
            scroll: null,
            slideActive: false,
            nameRoute: null,
            title: null,
            content: null
        }
    },
    methods: {
        SlideAuto() {
                
                if (this.slide != this.maxSlide){
                    this.slide++
                    this.title=this.saleSlide[this.slide].title.rendered 
                    this.content=this.saleSlide[this.slide].excerpt.rendered 
                }
                else{
                    this.slide=0
                    this.title=this.saleSlide[this.slide].title.rendered 
                    this.content=this.saleSlide[this.slide].excerpt.rendered
                }
            }
            
        },   
    async mounted() {   
        this.nameRoute=this.$route.name;
        setInterval(this.SlideAuto, 10000);
        this.saleSlide = await SaleService.findAll();
        this.maxSlide = this.saleSlide.length - 1;
        this.title=this.saleSlide[this.slide].title.rendered 
        this.content=this.saleSlide[this.slide].excerpt.rendered 
    }
}
</script>


<style scoped  lang="scss">
.sale--sliders__all {

    display: none;
}

@media (max-width: 425px) {
    .sale--sliders__all {

        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        border-radius: 1rem;
        color: black;
        width: 100%;
        margin: 0px auto 1rem auto;
        height: 18rem;
        align-items: center;
        justify-content: center;

        .sale--sliders__titre {
            background-color: $blue-light-bg;
            position: absolute;
            top: -0.3rem;
            width: 50%;
            display: flex;
            justify-content: center;
            font-weight: bold;
            padding: 1%;
            box-shadow: 0px 6px 1px white;
            color: $orange;
        }

        .background--design__all {
            height: 616vh;
            width: 1320VH;
            background-color: transparent;
            position: absolute;
            z-index: -7;
            display: flex;
            flex-wrap: wrap;
            display: initial;

            .background--design:nth-child(5) {
                background-color: $blue-light-bg;
                position: absolute;
                top: 40%;
                height: 1px;
                width: 26%;
                right: 47%;
            }

            .background--design {
                background-color: $blue-bg-header;
                margin: auto;
                border: 2px solid black;
                box-shadow: 1px 1px 1px black;
                border-radius: 50%;
                width: 8%;
                height: 26%;
                z-index: 0;
                position: relative;
                border-radius: 66%;
                box-shadow: -14px 0px 1px white;
            }
        }

        div {
            display: flex;
            align-items: center;
            text-align: center;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
        }

        .sale--sliders {
            border-radius: 1rem;
            padding: margin;
            height: 18REM;
            display: flex;
            flex-direction: column;
            opacity: 1;
            color: #313846;
            width: 100%;
            height: 65%;
            justify-content: flex-start;
            

            h2 {
                text-shadow: 1px 1px 1px black;
                font-weight: bold;
                width: 100%;
                color: $white;
                font-size: larger;
                font-family: Merianda;
                margin-bottom: 0.3rem;
                margin-top: -4%;
            }

            p {
                margin-right: 300px;
                padding: 1% 2% 6% 2%;
                    font-size: 15px;

            }

            .animsliders+h2,
            p {
                transition: all ease-in;
                animation: animSliders;
                animation-iteration-count: 1;
                animation-duration: 120s;
            }

            @keyframes animSliders {
                0.5% {
                    margin-right: 0;
                }

                90% {
                    margin-right: 0;
                }
            }

            .hidden {
                display: none;
            }

            .active {
                display: contents;
                transition: display 0.2S ease-in;
            }

            .sale--sliders__text {
                height: 12rem;
                width: inherit;
                border: 1px solid $white;
                border-radius: 1rem;
                transition: all;
            }

        }
    }
}
</style>