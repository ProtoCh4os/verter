module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    respondError: 'readonly',
    respondSuccess: 'readonly',
    respondFile: 'readonly',
    respondPage: 'readonly',
    sleep: 'readonly',
    sanitizeObject: 'readonly',
    toString: 'readonly',
    isThenable: 'readonly',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    'import/no-mutable-exports': 'off',
    'promise/param-names': 'off',
    'no-undef': 'off',
    'import/order': 'off',
    'require-await': 'off',
    'no-redeclare': 'off',
    'import/no-unresolved': 'off',
    'no-continue': 'off',
    'no-template-curly-in-string': 'off',
    'no-restricted-globals': 'off',
    'consistent-return': 'off',
    'no-dupe-class-members': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-minusminus': 'off',
    'no-await-in-loop': 'off',
    'no-case-declarations': 'off',
    'no-useless-constructor': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'security/detect-object-injection': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
