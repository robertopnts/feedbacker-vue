<template>
  <content-loader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <content-loader 
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animation-duration="2.6s"
    />

    <content-loader 
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animation-duration="2.4s"
    />

    <content-loader 
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animation-duration="2.1s"
    />

    <content-loader 
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animation-duration="1.8s"
    />
  </content-loader>  
</template>

<script>
import ContentLoader from '../../components/ContentLoader'


export default {
  components: { ContentLoader }
}
</script>