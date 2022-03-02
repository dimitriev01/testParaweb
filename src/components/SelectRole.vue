<template>
    <div>
        <select 
            :class="{invalid: inv.$invalid && inv.$dirty }"
            v-model="role"
            class="reg__form-role-select__box-select">
            <option class="reg__form-role-select__box-select-admin">Администратор</option>
            <option class="reg__form-role-select__box-select-manager">Менеджер</option>
            <option class="reg__form-role-select__box-select-guest">Гость</option>
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

<style scoped>
    .page .reg__form-role-select__box-select.invalid{
        background: rgba(243, 39, 53, 0.08);
        border-color: #EF3E4A;
    }
        .reg__form-role-select__box-select{
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
        max-width: 316px;
        width: 100%;
        line-height: 18px;
    }

    .reg__form-role-select__box-select:focus{
        border-color: #344887;
    }

    .reg__form-role-select__box-select > option{
        background: #fff;
    }
    
    .reg__form-role-select__box-select{
        appearance: none;
    }

</style>