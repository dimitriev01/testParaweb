<template>
    <div>
        <select 
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model="role"
            class="reg__form-role-select__box-select">
            <option class="reg__form-role-select__box-select__admin">Администратор</option>
            <option class="reg__form-role-select__box-select__manager">Менеджер</option>
            <option class="reg__form-role-select__box-select__guest">Гость</option>
        </select>
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
            this.$emit('create', this.role);
        },
        data(){
            return{
                role: '',
            }
        },
    }
</script>

<style scoped lang="scss">
    $select-color : #212121;
    $select-border-color : #CAD0E0;
    $select-color-focus:#344887;
    $select-border-color-invalid: #EF3E4A;
    $select-background-invalid: rgba(243, 39, 53, 0.08);
    .reg__form-role-select__box-select{
        max-width: 316px;
        width: 100%;
        transition: .2s all;
        padding: 18px 12px;
        height: 56px;
        font-size: 16px;
        color: $select-color;
        font-weight: normal;
        border-radius: 4px;
        outline: 0;
        appearance: none;
        background: #fff;
        border: 1px solid $select-border-color;
        line-height: 18px;
    } 
    .reg__form-role-select__box-select:focus{
        border-color: $select-color-focus;
    }
    .page .reg__form-role-select__box-select.invalid{
        background: $select-border-color-invalid;
        border-color: $select-background-invalid;
    }

    @media (max-width: 640px){
        .reg__form-role-select__box-select{
            max-width: auto;
        }
    }
</style>