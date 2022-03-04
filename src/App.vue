<template>
    <div class="page">
         <div class="img__books">
             <div class="img__books__background"></div>
             <img class="img__books__img" src="img/hero-layer-books 1.png" alt="нет картинки книги">
         </div>
         <div v-if="completed" class="completed__text">
             Успешно
         </div>
         <form v-else class="reg__form" @submit.prevent="sendForm()">
             <div class="reg__form-email">
                 <div class="reg__form-email__title">Электронная почта</div>
                 <input-email
                    :inv="v$.email"
                    @create="createEmail"
                 />
                 <div 
                 v-if="v$.email.$invalid && v$.email.$dirty" 
                 class="reg__form-email__error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-firstname">
                 <div class="reg__form-firstname__title">Имя</div>
                 <input-first-name
                    :inv="v$.firstName"
                    @create="createFirstName"
                />
                <div 
                 v-if="v$.firstName.$invalid && v$.firstName.$dirty" 
                 class="reg__form-firstname__error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-lastname">
                 <div class="reg__form-lastname__title">Фамилия</div>
                 <input-last-name
                    :inv="v$.lastName"
                    @create="createLastName"
                />
                 <div 
                 v-if="v$.lastName.$invalid && v$.lastName.$dirty" 
                 class="reg__form-lastname__error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-tel">
                 <div class="reg__form-tel__title">Телефон</div>
                 <input-tel
                 @create="createTel"
                 :inv="v$.tel"
                 />
                 <div 
                 v-if="v$.tel.$invalid && v$.tel.$dirty" 
                 class="reg__form-tel__error">
                    Error message
                 </div>
             </div>
             <div class="reg__form-role">
                 <div class="reg__form-role__title">Выберите роль</div>
                 <div class="reg__form-role-select__box">
                    <select-role
                      :inv="v$.role"
                      @create="createRole"
                    />
                </div>
                 <div 
                 v-if="v$.role.$invalid && v$.role.$dirty" 
                 class="reg__form-role__error">
                    Error message
                 </div>
             </div>
              <div class="reg__form-agreement">
                 <input 
                 @input="checkAgreement" 
                 v-model="agreement" 
                 class="reg__form-agreement__checkbox" 
                 id="reg__form-agreement__checkbox" 
                 type="checkbox">
                 <label class="reg__form-agreement-label" for="reg__form-agreement__checkbox">
                      <div class="reg__form-agreement-label__background"></div>
                 </label>
                 <div class="reg__form-agreement-text">Даю согласие на обработку персональных данных</div>
             </div>
            <div class="reg__form-btn__box">
                <button
                    :disabled="!role || !firstName || !lastName || !email || !tel"
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
import InputEmail from './components/InputEmail'
import InputFirstName from "./components/InputFirstName"
import InputLastName from "./components/InputLastName"
import InputTel from "./components/InputTel"
import SelectRole from "./components/SelectRole"

export default {
    components:{
        InputEmail, 
        InputFirstName, 
        InputLastName,
        InputTel,
        SelectRole
    },
    mounted(){
        let mock = new MockAdapter(axios);
        mock.onPost("/api/form").reply(200, {
            obj:[
                { "type": "email", "title": "email", "required": "true", "name": "email" },
                { "type": "string", "title": "firstName","required": "true","name": "firstName" },
                {"type": "string","title": "lastName", "required": "true","name": "lastName"  },
                { "type": "tel", "title": "tel", "required": "true", "name": "tel" },
                { "type": "string","title": "role", "required": "true",  "name": "role"  },
                {"type": "bool", "title": "agreement", "required": "false","name": "agreement" }
            ]
        });
        console.log('Выполнился метод POST из axios-mock-adapter');    
    },
    updated(){
        if(!this.v$.$invalid && this.flag){
            this.flag = false;
            
            axios.get("/api/form"), {
                email: this.email,
                firstName: this.firstName,
                lastName : this.lastName,
                tel: this.tel,
                role: this.role,
                agreement: this.agreement,
            };

            console.log('Выполнилась инициализация формы GET');
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
    validations() {
        return{
            firstName: { required  }, 
            lastName: { required  }, 
            tel: {  required, minLength: minLength(16) },
            role: { required  },
            agreement: {},
            email: {required, email}
        }
    },
    methods: {
        createEmail(email){
            this.email = email;
        },
        createFirstName(firstName){
            this.firstName = firstName;
        },
        createLastName(lastName){
            this.lastName = lastName;
        },
        createTel(tel){
            this.tel = tel;
        },
        createRole(role){
            this.role = role;
        },
        checkAgreement(){
            this.agreement = true;
        },
        sendForm() {
            if (this.v$.$invalid){
                this.v$.$touch();
            } else {
                this.completed = true;
                axios.post("/api/form", {
                    email: this.email,
                    firstName: this.firstName,
                    lastName : this.lastName,
                    tel: this.tel,
                    role: this.role,
                    agreement: this.agreement,
                });
                console.log('Выполнилась отправка формы POST');
            }
            return;
        },
    },
}
</script>

<style lang="scss">

    $font: 'Geometria'; 
    $mes-error-color : #EF3E4A;
    $color-select-triangle:#6B7182;
    $reg-form-border-color: #E6E9F0;
    $reg-form-agreement-text-color:#5D5D65;
    $reg__form-agreement-background:  rgba(84, 119, 242, 0.1);

    *{  
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        font-family: $font;
        .img__books{
            z-index: 0;
                .img__books__background{
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    left: 0;
                    width: 716px;
                    height: 900px;
                    background: #fff;
                }
        }
        .reg__form{
            padding: 32px;
            background: #FFFFFF;
            border: 1px solid $reg-form-border-color;
            border-radius: 8px;
            max-width: 404px;
            display: flex;
            flex-direction: column;
            
            .reg__form-email{
                margin-bottom: 15px;
                .reg__form-email__error{
                    font-size: 12px;  
                    margin-top: 10px;
                    line-height: 12px;
                    letter-spacing: 0.004em;
                    color: $mes-error-color;
                }
                .reg__form-email__title{
                    color: rgba(133, 134, 140, 1);
                    margin-bottom: 8px;
                }
            }

            .reg__form-firstname{
                margin-bottom: 15px;
                .reg__form-firstname__error{
                    font-size: 12px;  
                    margin-top: 10px;
                    line-height: 12px;
                    letter-spacing: 0.004em;
                    color: $mes-error-color;
                }
                .reg__form-firstname__title{
                    color: rgba(133, 134, 140, 1);
                    margin-bottom: 8px;
                }
            }

            .reg__form-lastname{
                margin-bottom: 15px;
                .reg__form-lastname__error{
                    font-size: 12px;  
                    margin-top: 10px;
                    line-height: 12px;
                    letter-spacing: 0.004em;
                    color: $mes-error-color;
                }
                .reg__form-lastname__title{
                    color: rgba(133, 134, 140, 1);
                    margin-bottom: 8px;
                }
            }

            .reg__form-tel{
                margin-bottom: 15px;
                .reg__form-tel__error{
                    font-size: 12px;  
                    margin-top: 10px;
                    line-height: 12px;
                    letter-spacing: 0.004em;
                    color: $mes-error-color;
                }
                .reg__form-tel__title{
                    color: rgba(133, 134, 140, 1);
                    margin-bottom: 8px;
                }
            }

            .reg__form-role{
                margin-bottom: 15px;
                .reg__form-role__error{
                    font-size: 12px;  
                    margin-top: 10px;
                    line-height: 12px;
                    letter-spacing: 0.004em;
                    color: $mes-error-color;
                }
                .reg__form-role__title{
                    color: rgba(133, 134, 140, 1);
                    margin-bottom: 8px;
                }
                .reg__form-role-select__box{
                    position: relative;
                }
                .reg__form-role-select__box:after {
                    content: "▼";
                    position: absolute;
                    right: 13%;
                    top: 24px;
                    font-size: 12px;
                    z-index: 1;
                    color: $color-select-triangle;
                    width: 10px;
                    pointer-events: none;
                    height: 37px;
                }
            }

            .reg__form-agreement{
                align-items: center;
                margin-top: 8px;
                display: flex;
                .reg__form-agreement__checkbox[type="checkbox"]{
                    display: none;
                }
                .reg__form-agreement__checkbox + .reg__form-agreement-label {
                    position: relative;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    cursor: pointer;
                }
                .reg__form-agreement-label::after {
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
                .reg__form-agreement__checkbox:checked + .reg__form-agreement-label::after {
                    content: "\f00c";
                    background: #344887;
                }
                .reg__form-agreement__checkbox:disabled + .reg__form-agreement-label::after {
                    background: #999999;
                }
                .reg__form-agreement-text{
                    color: $reg-form-agreement-text-color;
                }
                .reg__form-agreement__checkbox:hover .reg__form-agreement-label__background{
                    position: absolute;
                    border-radius: 80px;
                    transition: all .2s;
                    left: -8px;
                    top: -8px;
                    width: 45px;
                    height: 45px;
                    background: $reg__form-agreement-background;
                }
            }

            .reg__form-btn__box{
                margin-top: 60px;
                justify-content: center;
                display: flex;
                .reg__form-btn__box-btn{
                    outline: none;
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
                    .reg__form-btn__box-btn:hover{
                        cursor: pointer;
                        background: linear-gradient(0deg, rgba(196, 209, 255, 0.1), rgba(196, 209, 255, 0.1)), #344887;
                    }
                }
                .reg__form-btn__box-btn:active{
                    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #344887;
                }
                .reg__form-btn__box-btn:disabled{
                    color:#999;
                    cursor: default;
                    background: rgba(119, 119, 119, 0.1);
                }
            }
            
           
            
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

        .page{
            padding: 69px 160px 69px 45px;
            justify-content: space-between;
            display: flex;
            align-items: center;
            height: 900px;
            color: rgba(242, 244, 245, 1);
            width: 100%;
            background: #F2F4F5;

            @media (min-width: 1440px){
                justify-content: center;
                .img__books{
                    margin-right: 200px;
                    position: relative;
                }
                .img__books__background{
                    top: -235px;
                }
            }

            @media (max-width: 1300px){
                padding: 20px;
                height: auto;
                flex-wrap: wrap;
                justify-content: center;
                .img__books__background{
                    display: none;
                }
                .img__books__img{
                    width: 100%;
                    height: auto;
                    min-width: 45px;
                }
            }

            @media (max-width: 480px){
                padding: 15px;
            }

            @media (max-width: 420px){
                .reg__form{
                    padding: 25px;
                    .reg__form-role-select__box:after {
                        right: 8%;
                    }
                }
            }
            
            @media (max-width: 320px){
                padding: 15px;
                .reg__form{
                    padding: 15px;
                }
            }
        }
    }

</style>