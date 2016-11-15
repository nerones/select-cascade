<template>
  <div>
    <cascade-select v-on:selected_option="onSelectedOption"
      v-for="select in selects"
      v-bind:select="select">
    </cascade-select>
  </div>
</template>

<script>
import CascadeSelect from './CascadeSelect.vue'

const createSelectData = (level, options) => {
  return {
    level: level,
    options: options
  }
}

const loadData = (idSelected, $this) => {
  let url = $this.selectUrl.replace($this.selectWildcard, idSelected)
  $this.$http.get(url).then((response) => {
    let options = response.body.hijos
    if (options) {
      options.unshift({id: null, nombre: $this.textholder})
    }
    $this.selects.push(
      createSelectData($this.selects.length, options)
    )
  })
}

export default {
  name: 'Cascade',
  components: {
    CascadeSelect
  },
  methods: {
    onSelectedOption: function (level, idSelected) {
      if (level < this.selects.length - 1) {
        this.selects.splice(level + 1, this.selects.length)
      }
      if (idSelected === '' || !idSelected) {
        return
      }
      loadData(idSelected, this)
    }
  },
  data () {
    return {
      selects: []
    }
  },
  props: [
    'textholder',
    'selectUrl',
    'selectWildcard'
  ],
  created: function () {
    loadData(1, this)
  }
}
</script>

