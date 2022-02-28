<template>
    <div class="page">
         <div class="img__books">
             <div class="img__books-background"></div>
             <img class="img__books-img" src="img/hero-layer-books 1.png" alt="нет картинки книги">
         </div>
         <div v-if="completed" class="completed__text">
             Успешно
         </div>
         <form v-else class="reg__form" @submit.prevent="sendForm()">
             <div class="reg__form-email">
                 <div class="reg__form-email-title">Электронная почта</div>
                 <input
                 :class="{invalid: v$.email.$invalid }"
                 v-model.trim="email"
                 class="reg__form-email-input"
                 type="email"  
                 placeholder="Text">
                 <div 
                 v-if="v$.email.$invalid" 
                 class="reg__form-email-error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-firstname">
                 <div class="reg__form-firstname-title">Имя</div>
                 <input
                    :class="{invalid: v$.firstName.$invalid }"
                    v-model.trim="firstName"
                    class="reg__form-firstname-input" 
                    type="text" 
                    placeholder="Text">
                <div 
                 v-if="v$.firstName.$invalid" 
                 class="reg__form-firstname-error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-lastname">
                 <div class="reg__form-lastname-title">Фамилия</div>
                 <input
                 :class="{invalid: v$.lastName.$invalid }"
                 v-model.trim="lastName"
                 class="reg__form-lastname-input" 
                 type="text" 
                 placeholder="Text">
                 <div 
                 v-if="v$.lastName.$invalid" 
                 class="reg__form-lastname-error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-tel">
                 <div class="reg__form-tel-title">Телефон</div>
                 <input
                 :class="{invalid: v$.tel.$invalid }"
                 v-maska="'+7 ### ### ## ##'"
                 v-model="tel"
                 class="reg__form-tel-input"
                 type="tel" 
                 placeholder="Text">
                 <div 
                 v-if="v$.tel.$invalid" 
                 class="reg__form-tel-error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-role">
                 <div class="reg__form-role-title">Выберите роль</div>
                 <div class="reg__form-role-select__box">
                    <select 
                      :class="{invalid: v$.role.$invalid }"
                      v-model="role" 
                      class="reg__form-role-select__box-select">
                        <option class="reg__form-role-select__box-select-admin">Администратор</option>
                        <option class="reg__form-role-select__box-select-manager">Менеджер</option>
                        <option class="reg__form-role-select__box-select-guest">Гость</option>
                    </select>
                </div>
                 <div 
                 v-if="v$.role.$invalid" 
                 class="reg__form-role-error">
                    Error message
                 </div>
             </div>
              <div class="reg__form-agreement">
                 <input 
                 @input="checkAgreement" 
                 v-model="agreement" 
                 class="reg__form-agreement-checkbox" 
                 id="reg__form-agreement-checkbox" 
                 type="checkbox">
                 <label for="reg__form-agreement-checkbox">
                      <div class="reg__form-agreement-background"></div>
                 </label>
                 <div class="reg__form-agreement-text">Даю согласие на обработку персональных данных</div>
             </div>
            <div class="reg__form-btn__box">
                <button
                    :disabled="v$.$invalid"
                    type="submit"
                    class="reg__form-btn__box-btn">
                    Зарегистрироваться
                </button>
            </div>
         </form>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import MockAdapter from 'axios-mock-adapter'
import { maska } from 'maska'

export default {
    directives: { maska },
    mounted(){
        /*let mock = new MockAdapter(axios);
        mock.onGet("/api/form").reply(200, {
            obj:[
                { "type": "email", "title": "email", "required": "true", "name": "email" },
                { "type": "string", "title": "firstName","required": "true","name": "firstName" },
                {"type": "string","title": "lastName", "required": "true","name": "lastName"  },
                { "type": "tel", "title": "tel", "required": "true", "name": "tel" },
                { "type": "string","title": "role", "required": "true",  "name": "role"  },
                {"type": "bool", "title": "agreement", "required": "true","name": "agreement" }
            ]
        });

        axios.get("/api/form").then(function (response) {
            console.log(response.data);
        });*/

    },
    updated(){
        if(!this.v$.$invalid && this.flag){
            this.flag = false;
            axios.get("/api/form").catch(() => {
                console.log('404 (Not Found) GET')
            }), {
                email: this.email,
                firstName: this.firstName,
                lastName : this.lastName,
                tel: this.tel,
                role: this.role,
                agreement: this.agreement,
            };

            this.v$.$touch();
        }
    },
    setup () { 
        return { 
            v$: useVuelidate() ,
        } 
    },
    data(){
        return {
            flag : true,
            firstName: '',
            lastName: '',
            email: '',
            tel: '',
            role: '',
            agreement: false,
            completed: false,
        }
    },
    validations : {
        firstName: { required  }, 
        lastName: { required  }, 
        email: { email, required  } ,
        tel: {  required, minLength: minLength(16)  },
        role: { required  },
        agreement: {},
    },
    methods: {
        checkAgreement(){
            this.agreement = true;
        },
        sendForm() {
            axios.post("/api/form", {
                email: this.email,
                firstName: this.firstName,
                lastName : this.lastName,
                tel: this.tel,
                role: this.role,
                agreement: this.agreement,
            }).catch(() => {
                console.log('404 (Not Found) POST')
            });
            this.completed = true;
            return;
        },
    },
}
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        font-family: 'Geometria';
    }
    .page{
        padding: 69px 160px 69px 45px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        max-width: 1440px;
        height: 900px;
        color: rgba(242, 244, 245, 1);
        width: 100%;
        background: #F2F4F5;
    }
    .img__books{
      z-index: 0;
    }
    .img__books-background{
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 716px;
        height: 900px;
        background: #fff;
    }
    .reg__form{
        padding: 32px;
        background: #FFFFFF;
        border: 1px solid #E6E9F0;
        border-radius: 8px;
        max-width: 404px;
        display: flex;
        flex-direction: column;
    }
    .reg__form input, 
    .reg__form-role-select__box-select{
        max-width: 316px;
        width: 100%;
    }
    .reg__form-role-select__box-select > option{
        background: #fff;
    }
    
    .reg__form-role-select__box-select{
        appearance: none;
    }

    .reg__form-role-select__box{
        position: relative;
    }

    .reg__form-role-select__box:after {
        content: "▼";
        position: absolute;
        right: 34px;
        top: 24px;
        font-size: 12px;
        z-index: 1;
        color: #6B7182;
        width: 10px;
        pointer-events: none;
        height: 37px;
    }

    .reg__form-email-error, 
    .reg__form-firstname-error, 
    .reg__form-lastname-error, 
    .reg__form-tel-error, 
    .reg__form-role-error{
        font-size: 12px;  
        margin-top: 10px;
        line-height: 12px;
        letter-spacing: 0.004em;
        color: #EF3E4A;
    }

    .reg__form-email-title, 
    .reg__form-firstname-title, 
    .reg__form-lastname-title, 
    .reg__form-tel-title, 
    .reg__form-role-title{
        color: rgba(133, 134, 140, 1);
        margin-bottom: 8px;
    }
    .page .reg__form-email-input.invalid,
    .page .reg__form-firstname-input.invalid,
    .page .reg__form-lastname-input.invalid,
    .page .reg__form-tel-input.invalid,
    .page .reg__form-role-select__box-select.invalid{
        background: rgba(243, 39, 53, 0.08);
        border-color: #EF3E4A;
    }

    .reg__form-email, 
    .reg__form-firstname, 
    .reg__form-lastname, 
    .reg__form-tel, 
    .reg__form-role{
        margin-bottom: 15px;
    }

    .reg__form-email-input, 
    .reg__form-firstname-input, 
    .reg__form-lastname-input, 
    .reg__form-tel-input, 
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
        line-height: 18px;
    }
    .reg__form-email-input:focus, 
    .reg__form-firstname-input:focus, 
    .reg__form-lastname-input:focus, 
    .reg__form-tel-input:focus, 
    .reg__form-role-select__box-select:focus{
        border-color: #344887;
    }
    .reg__form-agreement{
        align-items: center;
        margin-top: 8px;
        display: flex;
    }
    .reg__form-agreement-checkbox[type="checkbox"]{
        display: none;
    }
    
    .reg__form-agreement > label::after {
        content: "";
        color: #fff;
        display: inline-block;
        font: 11px FontAwesome;
        margin-right: 10px;
        text-align: center;
        text-indent: 0px;
        padding: 3px;
        width: 11px;
        transition: all .2s;
        height: 11px;
        border-radius: 3px;
        background:  #fff;
        border: 3px solid #6B7182;
        vertical-align: middle;
    }
    
    .page .reg__form-agreement-checkbox:checked + label::after,
    .page .reg__form-agreement-checkbox:hover + label::after {
        content: "\f00c";
        background: #344887;
    }

    .page .reg__form-agreement-checkbox:disabled + label::after {
        background: #999999;
    }

    .reg__form-agreement-checkbox + label {
        position: relative;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        cursor: pointer;
    }

    .page .reg__form-agreement-checkbox:hover + label .reg__form-agreement-background{
        position: absolute;
        border-radius: 80px;
        transition: all .2s;
        left: -8px;
        top: -8px;
        width: 45px;
        height: 45px;
        background: rgba(84, 119, 242, 0.1);
    }
    
    .reg__form-agreement-text{
        color: #5D5D65;
    }
    .reg__form-email-input:active, 
    .reg__form-firstname-input:active, 
    .reg__form-lastname-input:active, 
    .reg__form-tel-input:active{
        background: #fff;
        border: 1px solid #344887;
    }
    .reg__form-btn__box{
        margin-top: 60px;
        justify-content: center;
        display: flex;
    }
    .reg__form-btn__box-btn{
        transition: .4s all;
        padding: 8px 16px;
        color: #fff;
        text-transform: uppercase;
        background: #344887;
        border-radius: 4px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        letter-spacing: 0.0125em;
        border: 0;
    }
    .reg__form-btn__box-btn:hover{
        cursor: pointer;
        background: linear-gradient(0deg, rgba(196, 209, 255, 0.1), rgba(196, 209, 255, 0.1)), #344887;
    }
    .reg__form-btn__box-btn:active{
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #344887;
    }
    .reg__form-btn__box-btn:disabled{
        color:#999;
        cursor: default;
        background: rgba(119, 119, 119, 0.1);
    }
    .completed__text{
        border: 1px solid #E6E9F0;
        border-radius: 8px;
        max-width: 404px;
        width: 100%;
        padding: 29px 167px;
        font-size: 16px;
        line-height: 18px;
        color: #212121;
    }
</style>