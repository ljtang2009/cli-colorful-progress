module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  parser: '@babel/eslint-parser',

  env: {
    browser: true,
    node: true,
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
  ],

  plugins: [
    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],

  globals: {},

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',

    /* #region default rules defined by https://code.visualstudio.com/api/get-started/your-first-extension */
    'no-const-assign': ['warn'],
    'no-this-before-super': ['warn'],
    'no-undef': ['warn'],
    'no-unreachable': ['warn'],
    'no-unused-vars': ['warn'],
    'constructor-super': ['warn'],
    'valid-typeof': ['warn'],
    /* #endregion */

    /* #region Possible Problems */
    'array-callback-return': ['warn'],
    'no-await-in-loop': ['warn'],
    'no-constructor-return': ['warn'],
    'no-duplicate-imports': ['error'],
    'no-promise-executor-return': ['error'],
    'no-self-compare': ['error'],
    'no-unmodified-loop-condition': ['warn'],
    'no-unreachable-loop': ['warn'],
    'no-unused-private-class-members': ['warn'],
    'no-use-before-define': ['warn'],
    'require-atomic-updates': ['warn'],
    'use-isnan': ['error'],
    /* #endregion */

    /* #region Suggestions */
    'arrow-body-style': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'as-needed',
    ],
    'block-scoped-var': ['error'],
    'camelcase': ['error', { properties: 'never' }],
    'default-case-last': ['warn'],
    'default-case': ['warn'],
    'default-param-last': ['warn'],
    'dot-notation': ['warn'],
    'eqeqeq': ['error', 'smart'],
    'guard-for-in': ['warn'],
    'no-alert': [process.env.NODE_ENV === 'production' ? 'error' : 'off'],
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off'],
    'no-debugger': [process.env.NODE_ENV === 'production' ? 'error' : 'off'],
    'no-continue': ['warn'],
    'no-empty-function': ['warn'],
    'no-eq-null': ['error'],
    'no-eval': ['warn'],
    'no-floating-decimal': ['warn'],
    'no-implicit-coercion': ['warn'],
    'no-invalid-this': ['warn'],
    'no-loop-func': ['error'],
    'no-mixed-operators': ['warn'],
    'no-param-reassign': ['warn'],
    'no-shadow': ['warn'],
    'no-shadow-restricted-names': ['error'],
    'no-undefined': ['warn'],
    'no-unneeded-ternary': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['warn'],
    'no-warning-comments': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    ],
    'prefer-const': ['warn'],
    'prefer-template': ['warn'],
    'quote-props': ['error', 'consistent'],
    'require-await': ['warn'],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    /* #endregion */

    /* #region Layout & Formatting */
    'arrow-spacing': ['error'],
    'block-spacing': ['error'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // 'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    // 'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'dot-location': ['error', 'property'],
    'func-call-spacing': ['error', 'never'],
    'function-call-argument-newline': ['error', 'consistent'],
    'indent': ['error', 2],
    'key-spacing': ['error'],
    'keyword-spacing': ['error'],
    'lines-between-class-members': ['warn', 'always'],
    'no-multi-spaces': ['warn'],
    'no-multiple-empty-lines': ['error'],
    'no-trailing-spaces': ['warn'],
    'no-whitespace-before-property': ['error'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'rest-spread-spacing': ['warn'],
    'semi': ['error', 'never'],
    'semi-spacing': ['error'],
    'space-before-blocks': ['error'],
    // 'space-before-function-paren': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    /* #endregion */
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: [],
}
