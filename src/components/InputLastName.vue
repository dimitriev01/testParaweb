<template>
    <div>
        <input
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model.trim="lastName"
            class="reg__form-lastname-input"
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
            this.$emit('create', this.lastName);
        },
        data(){
            return{
                lastName: '',
            }
        },
    }
</script>

<style scoped lang="scss">
    $lastname-input-color : #212121;
    $lastname-input-border-color : #CAD0E0;
    $lastname-input-color-focus:#344887;
    $lastname-input-border-color-invalid: #EF3E4A;
    $lastname-input-background-invalid: rgba(243, 39, 53, 0.08);
    .reg__form-lastname-input{
        max-width: 316px;
        width: 100%;
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: $lastname-input-color;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        background: #fff;
        border: 1px solid $lastname-input-border-color;
        line-height: 18px;
    } 
    .reg__form-lastname-input:focus{
        border-color: $lastname-input-color-focus;
    }
    .page .reg__form-lastname-input.invalid{
        background: $lastname-input-background-invalid;
        border-color: $lastname-input-border-color-invalid;
    }

    @media (max-width: 640px){
        .reg__form-lastname-input{
            max-width: auto;
        }
    }
</style>