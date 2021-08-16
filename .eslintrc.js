module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  overrides: [{
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      // Conflict rules section
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'no-use-before-define': ['off'],
      'react/destructuring-assignment': ['off'],
      'react/prefer-stateless-function': ['off'],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'off',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': ['error'],
      'no-duplicate-imports': 'off',
      '@typescript-eslint/no-duplicate-imports': ['error'],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': ['error'],
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': ['error'],
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': ['off'],

      // Typescript - strict rules section
      '@typescript-eslint/array-type': ['error', {
        default: 'array',
        readonly: 'array',
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
      '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
      '@typescript-eslint/no-empty-interface': ['error'],
      '@typescript-eslint/prefer-as-const': ['error'],
      '@typescript-eslint/prefer-literal-enum-member': ['error'],
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'as',
      }],
      '@typescript-eslint/explicit-module-boundary-types': ['error'],
      '@typescript-eslint/naming-convention': ['error',
        {
          selector: 'default',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },

        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
        },

        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: false,
        allowHigherOrderFunctions: false,
        allowDirectConstAssertionInArrowFunctions: false,
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
      }],
      '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'explicit',
      }],
      '@typescript-eslint/member-ordering': ['error', {
        default: [
          // Index signature
          'signature',

          // Fields
          'public-static-field',
          'public-decorated-field',
          'public-instance-field',
          'public-abstract-field',
          'public-field',
          'static-field',
          'instance-field',
          'abstract-field',
          'decorated-field',
          'field',
          'protected-static-field',
          'protected-decorated-field',
          'protected-instance-field',
          'protected-abstract-field',
          'protected-field',
          'private-static-field',
          'private-decorated-field',
          'private-instance-field',
          'private-abstract-field',
          'private-field',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'constructor',

          // Public
          'public-static-method',
          'public-decorated-method',
          'public-instance-method',
          'public-abstract-method',
          'public-method',
          'static-method',
          'instance-method',
          'abstract-method',
          'decorated-method',
          'method',

          // Protected
          'protected-static-method',
          'protected-decorated-method',
          'protected-instance-method',
          'protected-abstract-method',
          'protected-method',

          // Private
          'private-static-method',
          'private-decorated-method',
          'private-instance-method',
          'private-abstract-method',
          'private-method',

        ],
      }],

      // niggle section
      'class-methods-use-this': 'off',
      'import/extensions': ['off'],
      'arrow-parens': ['error', 'as-needed'],
      'max-len': ['error', { code: 120, ignoreComments: true }],
      'react/sort-comp': ['off'],
    },
  }],
};
