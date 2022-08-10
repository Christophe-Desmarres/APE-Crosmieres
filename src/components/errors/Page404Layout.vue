<template>
    <section>
        <p><span>Oups !!</span> Y'a plus rien à voir ici, j'ai tout mangé !!</p>
        <p>Pour retourner à l'accueil,
            <router-link v-bind:to="{ name: 'home' }" class="link">
                c'est par là !
            </router-link>
        </p>
        <div class="picture--container">
            <img class="picture" alt="Illustration" v-bind:src="picture" />
        </div>
        <p class="bottom">404</p>
    </section>
</template>

<script>
import illustration from '@/assets/images/jelly-cloud-character-devours-paper-files.png';

export default {
    name: "Page404Layout",

    data() {
        return {
            picture: illustration
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

p {
    color: $grey;
    font-weight: bold;
    font-size: 2rem;
    font-family: 'Special Elite', cursive;

    span {
        font-size: 4rem;
    }

    .link {
        color: $orange;
        text-shadow: 1px 1px 1px $black;
        transition: 1s;
    }

    .link:hover {
        transform: scale(1.25);
        font-size: 2.1rem;
    }
}
.picture--container{
    height: fit-content;
}

.bottom {
    margin-bottom: 1rem;
}
@media (max-width: 425px) {
    .picture--container{
        img{
                height: 250px;
        }
}
}
</style>