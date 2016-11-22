<template>
  <div>
    <div v-if="select.options">
      <label for="">{{select.label}}</label>
      <select v-on:change="onChange" v-model="selected">
        <option v-for="option in select.options" v-bind:value="option.id">
        {{option.nombre}}
        </option>
      </select>
    </div>
    <div v-else>
      <p><span>{{select.label}}</span> No hay mas hijos</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cascade-select',
  props: ['select'],
  data () {
    return {selected: null}
  },
  methods: {
    onChange: function (event) {
      //TODO improve get text from selected option
      let optionText = event.target.selectedOptions[0].innerText.trim();
      this.select.selected = this.selected
      this.$emit('selected_option', this.select.level, this.selected, optionText)
    }
  }
}
</script>

