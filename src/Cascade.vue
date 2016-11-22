<template>
  <div>
    <div class="vue-cascade-select">
      <cascade-select v-on:selected_option="onSelectedOption"
        :disabled="loadingData"
        v-for="select in selects"
        v-bind:select="select">
      </cascade-select>
    </div>
    <div>
      <p><strong>Seleccion actual: </strong>{{currentSelection.name}}</p>
    </div>
  </div>
</template>

<script>
import CascadeSelect from './CascadeSelect.vue'

const createSelectData = (level, options, $this) => {
  let label = level === 0 ? $this.selectMainLabel : $this.selectChildLabel
  return {
    level: level,
    options: options,
    selected: null,
    label: label
  }
}

const createPathOfSelects = (selects) => {
  let path = ""
   for (let i in selects) {
     if (selects[i].selected ) {
       path = path + "/" + selects[i].selected
     }
   }
   console.log(path)
}

const loadData = (idSelected, $this) => {
  let url = $this.selectUrl.replace($this.selectWildcard, idSelected)
  $this.setLoadingData(true)
  $this.$http.get(url).then((response) => {
    let options = $this.selectDataProcessor(response)
    if (options) {
      options.unshift({id: null, nombre: $this.textholder})
    }
    $this.selects.push(
      createSelectData($this.selects.length, options, $this)
    )
    $this.setLoadingData(false)
  })
}

export default {
  name: 'Cascade',
  components: {
    CascadeSelect
  },
  methods: {
    onSelectedOption: function (level, idSelected, optionText) {
      this.currentSelection.id = idSelected;
      this.currentSelection.name = optionText;
      createPathOfSelects(this.selects)
      if (level < this.selects.length - 1) {
        this.selects.splice(level + 1, this.selects.length)
      }
      if (idSelected === '' || !idSelected) {
        return
      }
      loadData(idSelected, this)
    },
    setLoadingData: function (state) {
      this.loadingData = state;
    }
  },
  data () {
    return {
      selects: [],
      loadingData: false,
      currentSelection: {id: null, name: null}
    }
  },
  props: {
    textholder: {
      type: String,
      required: true
    },
    selectUrl: {
      type: String,
      required: true
    },
    selectWildcard: {
      type: String,
      required: true
    },
    selectMainLabel: {
      type: String,
      default: 'Organismo:'
    },
    selectChildLabel: {
      type: String,
      default: 'Organismo nivel inferior:'
    },
    selectDataProcessor: {
      type: Function,
      required: true
    }
  },
  created: function () {
    loadData(1, this)
  }
}
</script>

