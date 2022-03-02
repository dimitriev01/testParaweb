<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model.trim="email"
            class="reg__form-email-input"
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

<style scoped>
    .reg__form-email-input{
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
    .reg__form-email-input:focus{
        border-color: #344887;
    }
    .reg__form-email-input:active{
         background: #fff;
        border: 1px solid #344887;
    }
    .page .reg__form-email-input.invalid{
        background: rgba(243, 39, 53, 0.08);
        border-color: #EF3E4A;
    }
</style>