<template lang="pug">
div
  label.typo__label Select and then clear!
  multiselect(
    v-model="value",
    :options="options",
    :searchable="false",
    :close-on-select="true",
    :show-labels="false"
    placeholder="Pick a value"
    :show-clear-button="true"
    clear-button-label="Clear selection"
  )
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
        value: '',
        options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
      }
    }
  }
</script>
