<template>
    <section class="wrapper--child">
        <div class="container--child">
            <div class="content--child">
                <label class="field__label">Prénom</label>
                <input v-model="child_firstname" type="text" class="inputbox" placeholder="Prénom de votre enfant"
                    name="firstname">
                <label class="field__label">Nom</label>
                <input v-model="child_lastname" type="text" class="inputbox" placeholder="Classe de votre enfant"
                    name="lastname">
                <div class="child--class">
                    <div class="child--class__checkbox">
                        <input type="radio" id="PS" value="petite-section" v-model="picked" />
                        <label for="PS">Petite section</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="MS" value="moyenne-section" v-model="picked" />
                        <label for="PS">Moyenne section</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="GS" value="grande-section" v-model="picked" />
                        <label for="GS">Grande section</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="CP" value="CP" v-model="picked" />
                        <label for="CP">CP</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="CE1" value="CE1" v-model="picked" />
                        <label for="CE1">CE1</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="CE2" value="CE2" v-model="picked" />
                        <label for="CE2">CE2</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="CM1" value="CM1" v-model="picked" />
                        <label for="CM1">CM1</label>
                    </div>
                    <div class="child--class__checkbox">
                        <input type="radio" id="CM2" value="CM2" v-model="picked" />
                        <label for="CM2">CM2</label>
                    </div>
                </div>
                <p class="succes" v-for="succesMsg in succes" v-bind:key="succesMsg">{{
                        succesMsg
                }}</p>
                <p class="error" v-for="error in errors" v-bind:key="error">{{ error }}</p>
                <button v-on:click="add_child" @keyup.enter="$emit('reloadChilds')" class="subscribe">Ajouter un enfant
                    ?</button>
            </div>
        </div>
    </section>
</template>

<script>
import ChildRegistrationService from '@/services/registration/ChildRegistrationService.js'


export default {

    name: "ChildRegistrationService",
    emits: ["reloadChilds"],

    data() {
        return {
            child_firstname: null,
            child_lastname: null,
            picked: null,
            errors: [],
            succes: [],
            user_id: this.$store.getters.getUserID
        };
    },

    methods: {
        async add_child() {
            this.errors = [];
            // Validation of the form data
            if (!this.child_firstname) {
                this.errors.push("Il manque le prénom");
            }
            if (!this.child_lastname) {
                this.errors.push("Il manque le nom de Famille");
            }

            if (!this.picked) {
                this.errors.push("Il manque la classe");
            }

            // Verification d'absence d'erreurs et transmision des données 
            if (this.errors.length === 0) {
                const response = await ChildRegistrationService.registerChild({
                    "child_firstname": this.child_firstname,
                    "child_lastname": this.child_lastname,
                    "child_class": this.picked,
                    "user_id": this.user_id
                });
                if (response === 200) {
                    this.succes.push('Ajout réussi');
                    this.$emit("reloadChilds");
                    setTimeout(() => { this.succes = []; }, 500);


                    // Reset the input in the form
                    this.child_firstname = null,
                        this.child_lastname = null,
                        this.picked = null
                }
            } else {
                this.errors.push("Oups une erreur, veuillez recommencer");
                setTimeout(() => { this.errors = []; }, 2000);
            }
        },
    }
}

</script>


<style lang="scss">
.wrapper--child {
    color: #313846;
    font-family: "Muli", sans-serif;
    font-size: 1rem;
    display: flex;
    place-items: end;
    border-radius: 1em;
    justify-content: flex-end;
    flex-direction: row;

    .container--child {
        width: 100%;
        overflow: hidden;
        padding: 0;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-radius: 1em;
        place-items: center;
    }

    .field__label {
        margin: 0.5rem;
    }

    .title {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 0.9em;
    }

    .content--child {
        place-items: center;
        padding: 0 2em;
        display: flex;
        flex-direction: column;

        .succes {
            color: $green;
            text-transform: uppercase;
            font-size: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .errors {
            color: $red;
            text-transform: uppercase;
            font-size: 1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .child--class {
            display: flex;
            flex-direction: column;

            .child--class__checkbox {
                display: flex;
                scroll-margin-right: 0.5rem;

                input {
                    margin-right: 1rem;
                }
            }
        }
    }

    .inputbox {
        padding: 0.5em 0 0.5em 1.5em;
        line-height: 3;
        width: 100%;
        border: 1px solid $blue;
        border-radius: 0.5em;
        margin: 0.3rem 0 1rem 0;
        padding: 0;
        text-align: center;
    }

    ::placeholder {
        color: $red;
    }

    .subscribe {
        color: $white;
        font-size: 1.3rem;
        font-weight: 700;
        background-color: $green;
        display: inline-block;
        border: none;
        border-radius: 10px;
        width: 100%;
        padding: 0.5rem;
        margin: 1rem;
        cursor: pointer;
    }

    @media (max-width: 425px) {
        .container {
            background-color: transparent;
            box-shadow: none;
            border-radius: none;

            .content {
                display: flex;
                flex-direction: column;
            }

            .inputbox {
                width: 70%;
            }

            .img--container {
                border-radius: none;
            }
        }
    }
}
</style>
