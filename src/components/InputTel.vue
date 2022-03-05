<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-maska="'+7 ### ### ## ##'"
            v-model.trim="tel"
            class="reg__form-tel__input"
            type="tel"  
            placeholder="Enter tel..."
        >
    </div>
</template>

<script>
    import { maska } from 'maska'

    export default {
        props:{
            inv: {
                type: Object,
                required: true,
            },
        },
        directives: { maska },
        updated(){
            this.$emit('create', this.tel);
        },
        data(){
            return{
                tel: '',
            }
        },
    }
</script>

<style scoped lang="scss">
    $tel-input-color : #212121;
    $tel-input-border-color : #CAD0E0;
    $tel-input-color-focus:#344887;
    $tel-input-border-color-invalid: #EF3E4A;
    $tel-input-background-invalid: rgba(243, 39, 53, 0.08);
    .reg__form-tel__input{
        max-width: 316px;
        width: 100%;
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: $tel-input-color;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        background: #fff;
        border: 1px solid $tel-input-border-color;
        line-height: 18px;
    } 
    .reg__form-tel__input:focus{
        border-color: $tel-input-color-focus;
    }
    .page .reg__form-tel__input.invalid{
        background: $tel-input-background-invalid;
        border-color: $tel-input-border-color-invalid;
    }

    @media (max-width: 640px){
        .reg__form-tel__input{
            max-width: auto;
        }
    }
</style>