<template>


    <div class="sale--card">

        <div v-if="backOffice == false && id !== -1" >
            <router-link v-bind:to="{ name: 'sale', params: { id: id } }">
                <div class="sale--card__media--image" v-bind:style="'background-image:url(' + image + ')'"></div>
                <h2 class="sale--card__title">
                    <div v-html="title"></div>
                </h2>
                <div class="sale--card__content">
                    <div v-html="content"></div>
                </div>
            </router-link>
        </div>
            
            <div v-else > 
            <div class="sale--card__media--image" v-bind:style="'background-image:url(' + image + ')'"></div>
            <h2 class="sale--card__title">
                <div v-html="title"></div>
            </h2>
            <div class="sale--card__content">
                <div v-html="content"></div>
            </div>
        </div>

        <!-- VERSION BACK-OFFICE -->
        <div v-if="backOffice == true">
            <div class="sale--card__media--image" v-bind:style="'background-image:url(' + image + ')'">

                <div class="sale--backoffice__img">
                    <img v-on:click="opacity = 1; zindex = 20; selectSale = id" v-bind:src="trashPic">
                    <router-link class="sale--card__editPic" v-bind:to="{ name: 'saleUpdate', params: { id: id } }">
                        <img v-bind:src="editPic">
                    </router-link>
                </div>
            </div>
            <h2 class="sale--card__title">
                <div v-html="title" class="sale--card__titlewrite"></div>
            </h2>
            <div class="sale--card__content">
                <div v-html="content"></div>
            </div>
            <PopUpLayout v-bind:id="id" v-bind:opacity="this.opacity" v-bind:zindex="this.zindex" v-on:yes="del"
                v-on:no="this.opacity = 0, this.zindex = -20" />
        </div>
    </div>
</template>


<script>
import SaleService from '@/services/sales/SaleService';
import edit from '@/assets/images/icons8-edit-100.png';
import trash from '@/assets/images/icons8-trash-can-100.png';
import PopUpLayout from '../back-office/PopUpLayout.vue';

export default {
    name: "SaleListLayout",
    emits: ["reloadSal"],
    props: {
        image: String,
        title: String,
        content: String,
        id: Number,
        backOffice: Boolean
    },
    data() {
        return {
            trashPic: trash,
            editPic: edit,
            zindex: -20,
            opacity: 0,
            selectSale: null,
        };
    },
    methods: {
        async del() {
            this.opacity = 0
            this.zindex = -20
            await SaleService.delete({
                "id": this.selectSale
            });
            this.$emit("reloadSal");
        },
    },
    components: { PopUpLayout }
}
</script>


<style scoped lang="scss">

.sale--card {
    position: relative;
    border: 1px solid $white;
    border-radius: 2rem 2rem;
    background-color: $white;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-bottom: 1rem;
    width: 65%;

    .sale--card__title {
        color: $grey;
        font-weight: bold;
        padding-right: 2rem;
        padding-left: 2rem;
        font-size: 1.2rem;
        padding-top: 1rem;
    }

    .sale--card__media--image {
        min-height: 30vh;
        background-position: center;
        background-size: cover;
        border-radius: 2rem 2rem 0 0;

        .sale--backoffice__img {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            align-content: center;
            cursor: pointer;

            img,
            a {
                height: 4rem;

                cursor: pointer;
            }

            img:hover {
                filter: brightness(1.1);
                transform: scale(1.2);
            }
        }
    }

    .sale--card__content {
        color: $grey;
        margin: 1rem 3rem 1rem 3rem;
        text-align: left;
    }

    .sale--card__term {
        display: inline-block;
        color: $grey;
        font-size: 0.8rem;
        font-weight: bold;
        border: 1px solid $blue;
        background-color: rgba(255, 255, 255, 0.747);
        padding: 0.5rem;
        margin-right: 1rem;
        border-radius: 5px;
        position: absolute;
        top: 1rem;
        right: 0.7rem;
    }
}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 425px) {
    .sale--card {
        width: 100%;
    }
}
</style>

