<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model.trim="firstName"
            class="reg__form-firstname-input"
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

<style scoped>
    .reg__form-firstname-input{
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
    .reg__form-firstname-input:focus{
        border-color: #344887;
    }
    .reg__form-firstname-input:active{
         background: #fff;
        border: 1px solid #344887;
    }
    .page .reg__form-firstname-input.invalid{
        background: rgba(243, 39, 53, 0.08);
        border-color: #EF3E4A;
    }

    @media (max-width: 640px){
        .reg__form-firstname-input{
            max-width: auto;
        }
    }
</style>