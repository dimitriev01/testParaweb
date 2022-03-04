<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model.trim="firstName"
            class="reg__form-firstname__input"
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
            this.$emit('create', this.firstName);
        },
        data(){
            return{
                firstName: '',
            }
        },
    }
</script>

<style scoped lang="scss">
    $firstname-input-color : #212121;
    $firstname-input-border-color : #CAD0E0;
    $firstname-input-color-focus:#344887;
    $firstname-input-border-color-invalid: #EF3E4A;
    $firstname-input-background-invalid: rgba(243, 39, 53, 0.08);
    .reg__form-firstname__input{
        max-width: 316px;
        width: 100%;
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: $firstname-input-color;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        background: #fff;
        border: 1px solid $firstname-input-border-color;
        line-height: 18px;
    } 
    .reg__form-firstname__input:focus{
        border-color: $firstname-input-color-focus;
    }
    .page .reg__form-firstname__input.invalid{
        background: $firstname-input-background-invalid;
        border-color: $firstname-input-border-color-invalid;
    }

    @media (max-width: 640px){
        .reg__form-firstname__input{
            max-width: auto;
        }
    }
</style>