<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-maska="'+7 ### ### ## ##'"
            v-model.trim="tel"
            class="reg__form-tel-input"
            type="tel"  
            placeholder="Text"
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

<style scoped>
    .reg__form-tel-input{
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: #212121;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        background: #fff;
        border: 1px solid #CAD0E0;
        line-height: 18px;
    } 
    .reg__form-tel-input:focus{
        border-color: #344887;
    }
    .reg__form-tel-input:active{
         background: #fff;
        border: 1px solid #344887;
    }
    .page .reg__form-tel-input.invalid{
        background: rgba(243, 39, 53, 0.08);
        border-color: #EF3E4A;
    }
</style>