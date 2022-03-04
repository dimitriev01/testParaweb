<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model.trim="email"
            class="reg__form-email__input"
            type="text"
            placeholder="Text"
        >
    </div>
</template>

<script>
    export default {
        props:{
            inv: {
                type: Object,
                required: true,
            },
        },
        updated(){
            this.$emit('create', this.email);
        },
        data(){
            return {
                email: '',
            }
        },
    }
</script>

<style scoped lang="scss">
    $email-input-color : #212121;
    $email-input-border-color : #CAD0E0;
    $email-input-color-focus:#344887;
    $email-input-border-color-invalid: #EF3E4A;
    $email-input-background-invalid: rgba(243, 39, 53, 0.08);
    .reg__form-email__input{
        max-width: 316px;
        width: 100%;
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: $email-input-color;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        background: #fff;
        border: 1px solid $email-input-border-color;
        line-height: 18px;
    } 
    .reg__form-email__input:focus{
        border-color: $email-input-color-focus;
    }
    .page .reg__form-email__input.invalid{
        background: $email-input-background-invalid;
        border-color: $email-input-border-color-invalid;
    }

    @media (max-width: 640px){
        .reg__form-email__input{
            max-width: auto;
        }
    }
</style>