<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged/>
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col  w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-graydark">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de API
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex w-full py-3 pl-5 pr-5 mt-2 lg:w-1/2 rounded items-center justify-between bg-brand-gray "
      >
      <span v-if="state.hasError">Erro ao carregar a apikey</span>
      <span id="apikey" v-else>{{ store.User.currentUser.apiKey }}</span>
      <div class="flex ml-20" v-if="!state.hasError">
        <Icon
          @click="handleCopy"
          name="copy"
          :color="brandColors.graydark"
          size="24"
          class="cursor-pointer"
        />

        <Icon
          id="generate-apikey"
          @click="handleGenerateApiKey"
          name="loading"
          :color="brandColors.graydark"
          size="24"
          class="cursor-pointer ml-3"
        />
      </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div v-else class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else >&lt;script src="https://robertopnts-feedbacker-widget.netlify.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import useStore from '@/hooks/useStore'
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import palette from '../../../palette'
import Icon from '../../components/Icon'
import services from '@/services'
import { setApiKey } from '@/store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { HeaderLogged, Icon, ContentLoader },
  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      isLoading: false,
      hasError: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function handleCopy () {
      toast.clear()

      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado!')
      } catch (error) {
        handleError(error)
      }
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleCopy,
      handleGenerateApiKey
    }
  }
}
</script>