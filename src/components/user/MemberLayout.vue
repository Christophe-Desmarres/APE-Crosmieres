<template>
  <section class="wrapper">
    <h1 class="wrapper--title">La Team au complet</h1>
    <div class="container">

      <div class="card">
        <p class="card--name">Emilie</p>
        <img
          class="card--logo--img"
          src="../../assets/images/jelly-security-guard-wearing-sunglasses.png"
          alt="personnage caricatural"/>
        <h1 class="card--title">Scrum Master</h1>
        <p class="card--content">
          Son surnom 'El Presidente', ce n'est pas pour rien. Respecter et
          craint à la fois, elle fait régner l'ordre autour d'elle.
        </p>
        <div class="card--social">
          <a target="_blank" href="https://github.com/EmiliePotier">
            <img
            class="card--social__icon"
            src="../../assets/images/icons8-github-100.png"
            alt="lien vers le GitHub d'Emilie"/>
          </a>
          <a target="_blank" href="http://linkedin.com/in/emilie-potier-developpeuse-web">
            <img
              class="card--social__icon"
              src="../../assets/images/icons8-linkedin-100.png"
              alt="lien vers le Linkedin d'Emilie" />
          </a>
        </div>
      </div>

      <div class="card">
        <p class="card--name">Natalène</p>
        <img
          class="card--logo--img"
          src="../../assets/images/jelly-character-removes-information-with-a-sponge-and-cleaning-products.png"
          alt="personnage caricatural"/>
        <h1 class="card--title">Git Master</h1>
        <p class="card--content">
          Comme son titre l'indique, elle est passée maître dans l'art du Git.
          Après des années d'entrainement et de commits, elle a réussi à
          intégrer la matrice de Git.
        </p>
        <div class="card--social">
          <a target="_blank" href="https://github.com/Natalene35">
            <img
            class="card--social__icon"
            src="../../assets/images/icons8-github-100.png"
            alt="lien vers le GitHub de Natalène"/>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/natalene-dubois/">
            <img
              class="card--social__icon"
              src="../../assets/images/icons8-linkedin-100.png"
              alt="lien vers le Linkedin de Natalène" />
          </a>
        </div>
      </div>

      <div class="card">
        <p class="card--name">Loïc</p>
        <img
          class="card--logo--img"
          src="../../assets/images/jelly-designer-working-on-graphic-tablet.png"
          alt="personnage caricatural"/>
        <h1 class="card--title">Lead Dev Front</h1>
        <p class="card--content">
          Les display flex, grid, inline n'ont plus de secret pour lui. Il crée
          des animations au p'tit dej, c'est no problemo. Guidé par son calme
          olympien, il aligne tout le monde et nous mets tous la border au
          carré.
        </p>
        <div class="card--social">
          <a target="_blank" href="https://github.com/LoicDebruille">
            <img
            class="card--social__icon"
            src="../../assets/images/icons8-github-100.png"
            alt="lien vers le GitHub de Loic"/>
          </a>
          <a target="_blank" href="https://linkedin.com/in/loïc-debruille">
            <img
              class="card--social__icon"
              src="../../assets/images/icons8-linkedin-100.png"
              alt="lien vers le Linkedin de Loic" />
          </a>
        </div>
      </div>

      <div class="card">
        <p class="card--name">Julien</p>
        <img
          class="card--logo--img"
          src="../../assets/images/jelly-red-jock-character-with-huge-muscles.png"
          alt="personnage caricatural"
        />
        <h1 class="card--title">Lead Dev Back</h1>
        <p class="card--content">
          Une ruelle sombre, l'heure du crime, il n'est jamais très loin.
          Invoqué par les esprits de la nuit, il code là où personne ne met les
          pieds. Parti dans les méandres du back, personne ne l'a jamais
          revu...
        </p>
        <div class="card--social">
          <a target="_blank" href="https://github.com/LeBrennJu">
            <img
            class="card--social__icon"
            src="../../assets/images/icons8-github-100.png"
            alt="lien vers le GitHub de Julien"
            />
          </a>
          <a target="_blank" href="http://www.linkedin.com/in/julien-le-brenn">
            <img
              class="card--social__icon"
              src="../../assets/images/icons8-linkedin-100.png"
              alt="lien vers le Linkedin de Julien" />
          </a>
        </div>
      </div>

      <div class="card">
        <p class="card--name">Christophe</p>
        <img
          class="card--logo--img"
          src="../../assets/images/jelly-character-coding.png"
          alt="personnage caricatural"/>
        <h1 class="card--title">Product Owner</h1>
        <p class="card--content">
          Celui que tout le monde évite. "le bouton est trop gros", "la couleur
          doit être plus jaune", "le padding doit être plus espacé". "relou un
          jour, relou toujours" tel est sa devise.
        </p>
        <div class="card--social">
          <a target="_blank" href="https://github.com/Christophe-Desmarres">
            <img
            class="card--social__icon"
            src="../../assets/images/icons8-github-100.png"
            alt="lien vers le GitHub de Christophe"
            />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/christophe-desmarres/">
            <img
              class="card--social__icon"
              src="../../assets/images/icons8-linkedin-100.png"
              alt="lien vers le Linkedin de Christophe" />
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "MemberLayout",

  data() {
    return {};
  },

  methods: {},
};
</script>


<style lang="scss" scoped>
.wrapper {
  color: $grey;
  font-family: "Muli", sans-serif;
  font-size: 1rem;
  place-items: center;
  border-radius: 1em;

  .wrapper--title {
    color: $grey;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0px 0px 0px $grey;
    font-family: 'Merienda', cursive;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  }

  .container {
    width: 100%;
    height: 80%;
    overflow: hidden;
    background-color: $white;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1em;
    display: -ms-grid;
    display: flex;
    place-items: center;
    box-shadow: 0px 17px 34px -20px $blue-bg-header;

    .card {
      border-radius: 1em;
      height: 100%;
      margin: 0.5rem;
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      box-shadow: 0px 17px 34px -20px $blue-bg-header;
      width: 100%;

      .card--name {
        width: 100%;
        text-align: center;
        font-weight: bold;
        margin: 0.5rem;
        font-size: 1.3rem;
      }

      .card--logo--img {
        margin: auto;
        width: 85%;
      }

      .card--title {
        width: 100%;
        font-size: 1.4rem;
        font-weight: 700;
        text-align: center;
        padding: 1rem;
        font-family: 'Merienda', cursive;

      }
      .card--content {
        overflow: auto;
      }
      .card--social {
        width: 100%;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .card--social__icon {
          width: 50%;
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .container {
      background-color: transparent;
      box-shadow: none;
      border-radius: none;
      flex-direction: column;
      height: 97%;

      .card {
        padding: 1rem;
        margin: 1rem;
        flex-wrap: nowrap;
        flex-direction: column;

        .card--logo--img {
          display: inline;
          width: 36%;
          margin-left: auto;
          margin-right: auto;
        }

        .card--content {
          padding: 1rem;
        }
        .card--social {
          .card--social__icon {
            width: 50%;
          }
        }
      }
    }
  }
}
</style>
