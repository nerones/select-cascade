<template>
<div class="component">
    <div>
      <Cascade
        select-url="http://172.16.0.25:86/api/organismos/%ID%/hijos_directos"
        select-wildcard="%ID%"
        textholder="Seleccione...">
      </Cascade>
    </div>
</div>
</template>

<script>
import VueResource from 'vue-resource'

Vue.use(VueResource)

import Cascade from './Cascade.vue'
Vue.component('cascade', Cascade)
export default {
  name: 'Test'
}
</script>

<style>
.component {
  margin: 0 auto;
}
</style>
