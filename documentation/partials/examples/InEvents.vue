<template lang="pug">
div
  p
    button(
      @click.stop.prevent="$root.$emit('multiselectSelectEvent', {id: `IN_EVENTS_TEST`, key: 'V'})"
    ) Select one item
  p
    button(
      @click.stop.prevent="$root.$emit('multiselectExpandEvent', {id: `IN_EVENTS_TEST`})"
    ) Expand

  label.typo__label Select
  multiselect(
    id="IN_EVENTS_TEST"
    v-model="value",
    track-by="name",
    label="name",
    placeholder="Select",
    :options="options",
    :searchable="false",
    :allow-empty="false",
    :enable-alphanumeric-selection="true"
  )
    template(slot="singleLabel", slot-scope="{ option }")
      | {{ option.name }}
  pre.language-json
    code.
      {{ value  }}
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: null,
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: '1. Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: '6. Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
        { name: '12. React', language: 'JavaScript' }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
