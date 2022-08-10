<template>
    <div class="updatePassword--display active">
        <label class="field__label">Mettre à jour son mot de passe ?</label>
        <input v-model="password" class="inputbox" type="password" placeholder="Mot de passe" required>

        <label class="field__label">Confirmer le mot de passe</label>
        <input v-model="passwordconfirm" class="inputbox" type="password" placeholder="Mot de passe" required>
        <a class="confim--update__password">Confirmer la mise à jour de votre mot de
            passe ?</a>
    </div>
</template>

<script>
</script>

<style scoped lang="scss">
</style>