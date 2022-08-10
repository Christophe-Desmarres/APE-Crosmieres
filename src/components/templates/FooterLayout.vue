<template>
    <footer>
        <ul class="footer--list">
            <li class="footer--list__link"><a target="_blank" href="https://www.facebook.com/groups/apecrosmieres/">Facebook</a></li>  
            <li class="footer--list__link"><a href="mailto: chrisdmar12@gmail.com">Nous contacter</a></li>

            <li class="footer--list__link">
                <router-link v-bind:to="{ name: 'legal-notices' }" class="link" id="#policy">
                    Politique de confidentialité
                </router-link>
            </li>
            <li class="footer--list__link">
                <router-link v-bind:to="{ name: 'legal-notices' }" class="link" id="#legal">
                    Mentions légales
                </router-link>
            </li>
            <li class="footer--list__link">
                <router-link v-bind:to="{ name: 'legal-notices' }" class="link" id="#condition">
                    Conditions générales
                </router-link>
            </li>

            <li class="footer--list__link"><a target="_blank" href="https://icones8.fr/">Merci à icones8</a></li>
        </ul>

    </footer>
</template>


<script>
export default {
    name: 'FooterLayout',
}
</script>


<style lang="scss">
footer {
    background-color: $blue-bg-header;
    height: 4.3rem;
    font-weight: bold;
    font-size: small;
    border-radius: 10px 10px;

    .footer--list {
        display: flex;
        list-style-type: none;
        padding-top: 0.7rem;

        li {
            width: 48%;
            height: 100%;
            margin: 1%;
            cursor: pointer;
            display: inline-block;
            position: relative;
        }

        a {
            color: $white;
        }

        //WE USE THE underlineAnim.scss for animate footer li  
        @import "@/assets/animations/underlineAnim.scss";
    }
}

//<----------Media queries-------->

@media (max-width: 425px) {
    footer {
        margin: 0;
        margin-top: 2%;


        li:after {
            display: none;

        }
    }
}

@media (max-width: 576px) {
    footer {
        height: 5.3rem;
    
        ul {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>