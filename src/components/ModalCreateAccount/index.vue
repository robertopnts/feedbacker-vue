<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800">
      Crie sua conta
    </h1>

    <button
    @click="close"
    class="text-4xl text-gray-600"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Name</span>
        <input 
          v-model="state.name.value"
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          type="text" 
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="John Doe"
        >
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-8">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input 
          v-model="state.email.value"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          type="email" 
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="john.doe@mail.com"
        >
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-8">
        <span class="text-lg font-medium text-gray-800">Password</span>
        <input 
          v-model="state.password.value"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          type="password" 
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="******"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button 
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading
        }"
        @click="handleSubmit"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150" 
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin"/>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import services from '../../services'
import Icon from '../Icon'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'

export default {
  components: { Icon },
  setup () {

    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: nameValue, 
      errorMessage: nameErrorMessage,
    } = useField('name', validateEmptyAndLength3)

    const {
      value: emailValue, 
      errorMessage: emailErrorMessage,
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue, 
      errorMessage: passwordErrorMessage,
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    })

    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })
      
      if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          modal.close()
          return
        }
      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({ 
            email: state.email.value, 
            password: state.password.value 
          })
          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao criar conta')
        }

        state.isLoading = false

      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao criar conta')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    }
  }
}
</script>