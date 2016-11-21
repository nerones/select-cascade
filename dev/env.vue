<template>
  <comp>
    <Cascade
      select-url="http://172.16.0.25:86/api/organismos/%ID%/hijos_directos"
      select-wildcard="%ID%"
      :select-data-processor="process"
      textholder="Seleccione...">
    </Cascade>
  </comp>
</template>

<script>
import VueResource from 'vue-resource'
import { default as comp } from '../src/index.vue'
Vue.use(VueResource)

export default {
  components: {
    comp
  },
  methods: {
    process: function(data) {
      return data.body.hijos
    }
  }
}
</script>

<style lang="css">
</style>
