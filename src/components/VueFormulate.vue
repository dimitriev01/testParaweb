<template>
  <div>
    <h2>Vue Formulate</h2>
      <FormulateForm v-model="formValues" @submit.prevent="handleSubmit">
      <FormulateInput type="email" name="email" label="Электронная почта" validation="required|email" />
      <FormulateInput name="firstname" label="Имя" validation="required" />
      <FormulateInput name="lastname" label="Фамилия" validation="required" />
      <FormulateInput type="tel" name="tel" label="Телефон" validation="required" />
      <FormulateInput
        type="select"
        name="role"
        label="Выберите роль"
        :options="{Администратор: 'Администратор', Менеджер: 'Менеджер', Гость: 'Гость'}"
      />
      <FormulateInput
        type="checkbox"
        name="agreement"
        label="Даю согласие на обработку персональных данных"
      />
      <FormulateInput type="submit" label="Зарегистрироваться" />
    </FormulateForm>
  </div>
</template>

<script>

export default {
  data: () => ({
    formValues: {}
   }),
   methods: {
     handleSubmit() {
        console.log(this.formValues)
     }
   }
};
</script>