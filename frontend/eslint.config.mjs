import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
       ////////// Possible Errors //////////
      'no-console': ['warn', { 'allow': ['error'] }],
      'one-var': ['warn', 'never'],
      'no-undef': 'warn',
      'prefer-const': 'warn',
      'no-extra-parens': 'warn',
      'block-scoped-var': 'warn',
      'curly': ['warn', 'multi-line'],
      'no-await-in-loop': 'warn',
      'no-cond-assign': ['error', 'always'],
      'no-debugger': 'warn',
      'default-case': 'warn',
      'dot-location': ['warn', 'object'],
      'eqeqeq': 'warn',
      'no-alert': 'warn',
      'no-eq-null': 'warn',
      'no-eval': 'warn',
      'no-implicit-coercion': 'warn',
      'no-lone-blocks': 'error',
      'no-loop-func': 'warn',
      'no-multi-str': 'warn',
      'no-self-compare': 'warn',
      'strict': ['warn', 'global'],
      'no-lonely-if': 'warn',
      ////////// Style for Graded Submissions //////////
      'array-bracket-spacing': ['error', 'never'],
      'array-bracket-newline': ['error', 'consistent'],
      'indent': ['error', 2],
      'camelcase': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'comma-style': ['error', 'last'],
      'brace-style': ['error'],
      'max-len': ['error', 100],
      'no-inline-comments': 'error',
      'no-tabs': 'error',
      'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
      'jsx-quotes': ['error', 'prefer-double'],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'semi': 'error',
      'semi-spacing': 'error'

    },
  },
])
