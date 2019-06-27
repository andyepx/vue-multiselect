export default {
  data () {
    return {
      pointer: 0,
      pointerDirty: false,
      hover: null
    }
  },
  props: {
    /**
     * Enable/disable highlighting of the pointed value.
     * @type {Boolean}
     * @default true
     */
    showPointer: {
      type: Boolean,
      default: true
    },
    optionHeight: {
      type: Number,
      default: 40
    }
  },
  computed: {
    pointerPosition () {
      return this.pointer * this.optionHeight
    },
    visibleElements () {
      return this.optimizedHeight / this.optionHeight
    }
  },
  watch: {
    filteredOptions () {
      this.pointerAdjust()
    },
    isOpen () {
      this.pointerDirty = false
    }
  },
  methods: {
    optionHighlight (index, option) {
      return {
        'multiselect__option--highlight': index === this.hover || index === this.pointer,
        'multiselect__option--selected': this.isSelected(option)
      }
    },
    groupHighlight (index, selectedGroup) {
      if (!this.groupSelect) {
        return ['multiselect__option--disabled']
      }

      const group = this.options.find(option => {
        return option[this.groupLabel] === selectedGroup.$groupLabel
      })

      return [
        this.groupSelect ? 'multiselect__option--group' : 'multiselect__option--disabled',
        { 'multiselect__option--highlight': index === this.hover || index === this.pointer },
        { 'multiselect__option--group-selected': this.wholeGroupSelected(group) }
      ]
    },
    addPointerElement (event = {key: 'Enter'}) {
      if (!this.isOpen && event.key === 'Enter') {
        this.activate(true)
        return
      }

      /* istanbul ignore else */
      if (this.filteredOptions.length > 0) {
        this.select(this.filteredOptions[this.pointer], event.key)
      }

      /* istanbul ignore else */
      if (this.closeOnSelect) this.pointerReset()
    },
    pointerForward (target = null) {
      const wasOpened = this.isOpen
      if (!this.openOnFocus && !this.isOpen) this.activate(true)

      const newPointer = (
        target === 'first'
          ? 0
          : (
            target === 'last'
              ? this.filteredOptions.length - 1
              : this.pointer + 1
          )
      )

      /* istanbul ignore else */
      if (newPointer < this.filteredOptions.length) {
        if (wasOpened) this.pointer = newPointer
        /* istanbul ignore next */
        if (target === 'first') {
          this.$refs.list.scrollTop = 0
        } else if (this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
          this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
        }
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[this.pointer].$isLabel &&
          !this.groupSelect
        ) this.pointerForward()
      }
      this.pointerDirty = true
    },
    pointerBackward () {
      const wasOpened = this.isOpen
      if (!this.openOnFocus && !this.isOpen) this.activate(true)

      if (this.pointer > 0) {
        if (wasOpened) this.pointer--
        /* istanbul ignore else */
        if (this.$refs.list.scrollTop >= this.pointerPosition) {
          this.$refs.list.scrollTop = this.pointerPosition
        }
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[this.pointer].$isLabel &&
          !this.groupSelect
        ) this.pointerBackward()
      } else {
        /* istanbul ignore else */
        if (
          this.filteredOptions[this.pointer] &&
          this.filteredOptions[0].$isLabel &&
          !this.groupSelect
        ) this.pointerForward()
      }
      this.pointerDirty = true
    },
    pointerReset () {
      this.pointer = 0
      this.hover = null
      /* istanbul ignore else */
      if (this.$refs.list) {
        this.$refs.list.scrollTop = 0
      }
    },
    pointerAdjust () {
      /* istanbul ignore else */
      if (this.pointer >= this.filteredOptions.length - 1) {
        this.pointer = this.filteredOptions.length
          ? this.filteredOptions.length - 1
          : 0
      }

      /* istanbul ignore else */
      if (this.hover >= this.filteredOptions.length - 1) {
        this.hover = this.filteredOptions.length
          ? this.filteredOptions.length - 1
          : 0
      }

      if (this.filteredOptions.length > 0 &&
        this.filteredOptions[this.pointer].$isLabel &&
        !this.groupSelect
      ) {
        this.pointerForward()
      }
    },
    pointerSet (index) {
      this.hover = index

      /* istanbul ignore else */
      if (!this.showPointer) return

      this.pointer = index || 0
      this.pointerDirty = true
    }
  }
}
