<template>

    <section class="sale--card">

        <div class="picture--container">
            <img class="picture" alt="Illustration" v-bind:src="picture" />
        </div>
        <h2 class="sale--card__title">{{ title }}</h2>

        <div class="sale--card__date">{{ date }}</div>

        <img class="media-image" v-bind:src="image">

        <div class="sale--card__content" v-html="content"></div>

        <a class="sale--card__link" target="_blank" v-bind:href="link">Lien vers le site marchand
            <img class="snake" alt="Arrow" v-bind:src="bigSnake" />
        </a>

    </section>
</template>

<script>
import SaleService from "@/services/sales/SaleService";
import illustration from '@/assets/images/purchases.png';
import bigArrow from '@/assets/images/squiggly-32.png';
import defaultSalePicture from '@/assets/images/sales/colorful.jpg';

export default {
    name: "SaleDetailLayout",
    data() {
        return {
            picture: illustration,
            bigSnake: bigArrow,
            title: null,
            date: null,
            content: null,
            image: null,
            link: null,
        }
    },
    async mounted() {
        let id = this.$route.params.id;
        if (id) {
            let arrayMeta = await SaleService.getMeta(id)
            this.date = arrayMeta.date;
            this.link = arrayMeta.lien;

            // Allow to retrieve the id dynamic parameter by using the $route object
            const response = await SaleService.find(id);
            if (response.code) {
                // If error
                console.log('error');
                //this.$router.push({ name: '404' });
            } else {
                this.title = response.title.rendered;
                this.content = response.content.rendered;
                this.image = response._embedded['wp:featuredmedia'] ? response._embedded['wp:featuredmedia'][0].source_url : defaultSalePicture;
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.sale--card {
    width: 90%;
    margin: 1rem auto;
    height: auto;
    padding: 1rem;
    border-radius: 1rem;
    font-size: 1rem;
    color: $grey;
    background-color: $white;
    box-shadow: 0px 17px 34px -20px $blue-bg-header;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img {
        width: 50%;

    }

    .sale--card__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
    }

    .picture--container {
        display: flex;
        justify-content: center;
        max-width: 100%;
        margin-bottom: 1rem;
        margin: auto;

        .picture {
            max-width: 70%;
            margin-top: -3rem;
        }
    }

    h2 {
        font-size: 1.4rem;
        font-weight: bold;
        padding-bottom: 1rem;
        margin-top: -2rem;
    }

    .sale--card__date {
        margin-bottom: 1rem;
    }

    .sale--card__date,
    .sale--card__img,
    .sale--card__content {
        padding: 1rem;
    }

    .media-image {
        width: 100%;
        min-height: 18rem;
        background-position: center;
        background-size: cover;
        border-radius: 1rem;
        margin: 1rem auto;
    }

    .sale--card__link {
        color: $orange;
        text-shadow: 1px 1px 1px $black;
        transition: 1s;
        padding-bottom: 2rem;
    }

    .sale--card__link:hover {
        transform: scale(1.25);
        font-size: 0.9rem;
    }

    .snake {
        margin-bottom: -0.5rem;
    }
}

// Media query

@media (min-width: 480px) {

    .sale--card {
        .sale--card__content {
            width: none;
        }
    }

    .picture--container {
        max-width: 70%;
    }

    h2 {
        font-size: 1.6rem;
    }
}

@media (min-width: 768px) {
    .sale--card {
        width: 80%;

        .picture--container {
            max-width: 50%;
        }

        h2 {
            font-size: 1.6rem;
        }

        .media-image {
            width: 90%;
            min-height: 25rem;
        }

        .event--card__content {
            width: 90%;
        }
    }
}

@media (min-width: 1024px) {
    .sale--card {
        width: 70%;

        .picture--container {
            max-width: 30%;
        }

        h2 {
            font-size: 1.8rem;
        }

        .media-image {
            width: 80%;
            min-height: 35rem;
        }

        .sale--card__content {
            width: 80%;
        }
    }
}
</style>