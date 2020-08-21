module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-var': 2,
    'no-const-assign': 'error',
    radix: 'error',
    'prefer-template': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    eqeqeq: ['error', 'always'],
    semi: [2, 'never'],
    'default-case': 2,
    'template-curly-spacing': 0, // Prettier.
    'newline-before-return': 'error',
    'no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-return-await': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'import/first': 0,
    'no-restricted-globals': 1,
    'no-useless-escape': 1,
    'no-unused-vars': 1,
    yoda: ['error', 'never', { exceptRange: true }],
    'import/prefer-default-export': 0,

    // no longer defined
    'jsx-a11y/href-no-hash': 'off',
    'no-console': 0, // we are enabling this in the scripts
    'no-debugger': 0, // we are enabling this in the scripts
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  settings: {
    polyfills: ['promises'],
    flowtype: {
      onlyFilesWithFlowAnnotation: false,
    },
  },
}
