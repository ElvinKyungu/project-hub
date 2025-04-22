// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import vue from 'eslint-plugin-vue'

export default withNuxt({
  plugins: {
    vue,
  },
  rules: {
    'vue/v-on-event-hyphenation': ['error', 'always', {
      ignore: ['update:modelValue', 'position:position'],
    }],
  },
})
