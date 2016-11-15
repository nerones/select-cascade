<template>
  <div>
    <div v-if="select.options">
      <label for="">{{select.level}}</label>
      <select v-on:change="onChange" v-model="selected">
        <option v-for="option in select.options" v-bind:value="option.id">
        {{option.nombre}}
        </option>
      </select>
    </div>
    <div v-if="!select.options">
      <p><span>{{select.level}}</span> No hay mas hijos</p>
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
      this.$emit('selected_option', this.select.level, this.selected)
    }
  }
}
</script>

