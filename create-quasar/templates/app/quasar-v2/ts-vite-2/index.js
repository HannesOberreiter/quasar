export async function script ({ scope, utils }) {
  await utils.prompts(scope, [
    {
      type: 'multiselect',
      name: 'preset',
      message: 'Check the features needed for your project:',
      choices: [
        { title: 'Linting (vite-plugin-checker + ESLint + vue-tsc)', value: 'eslint', description: 'recommended', selected: true },
        { title: 'State Management (Pinia)', value: 'pinia', description: 'https://pinia.vuejs.org' },
        { title: 'axios', value: 'axios' },
        { title: 'vue-i18n', value: 'i18n' }
      ],
      format: utils.convertArrayToObject
    },
    {
      type: (_, { preset }) => (preset.eslint ? 'confirm' : null),
      name: 'prettier',
      initial: false,
      message: 'Add Prettier for code formatting?'
    }
  ])

  utils.createTargetDir(scope)
  utils.renderTemplate('BASE', scope)
  utils.renderTemplate(scope.css, scope)

  if (scope.preset.axios) utils.renderTemplate('axios', scope)
  if (scope.preset.i18n) utils.renderTemplate('i18n', scope)
  if (scope.preset.eslint) utils.renderTemplate('eslint', scope)
  if (scope.prettier) utils.renderTemplate('prettier', scope)
  if (scope.preset.pinia) utils.renderTemplate('pinia', scope)
}
