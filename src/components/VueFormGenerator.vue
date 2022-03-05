<template>
  <div>
    <h2>Vue Form Generator</h2>
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>

export default {
  data: () => ({
    model: {
          flag : true,
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          role: '',
          agreement: false,
          completed: false,
    },
    schema: {
      fields: [
        {
          type: "input",
          inputType: "email",
          label: "Электронная почта",
          model: "email",
          required: true,
          placeholder: "Введите email",
          validator: "email"
        },
        {
          type: "input",
          inputType: "text",
          label: "Имя",
          model: "firstName",
          required: true,
          validator: "string"
        },
        {
          type: "input",
          inputType: "text",
          label: "Фамилия",
          model: "lastName",
          required: true,
          validator: "string"
        },
        {
          type: "input",
          inputType: "tel",
          label: "Телефон",
          model: "tel",
          required: true,
          min: 16,
          hint: "Min of 16 characters",
          validator: "tel"
        },
        {
          type: "select",
          label: "Выберите роль",
          model: "role",
          values: ["Администратор", "Менеджер", "Гость"]
        },
        {
          type: "checkbox",
          default: false,
          label: "Даю согласие на обработку персональных данных",
          model: "agreement",
        },
        {
          type: "submit",
          onSubmit(model) {
            console.log(model);
          },
          label: "",
          buttonText: "Зарегистрироваться"
        }
      ]
    },
    formOptions: {
      validateAfterLoad: false,
      validateAfterChange: true,
      validateAsync: true
    }
  })
};
</script>