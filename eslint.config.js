import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [{
            name: 'antd',
            message: "Direct import of 'antd' is prohibited. Please use the wrapper components defined in 'src/components/'."
          }],
          patterns: [{
            group: ['antd/*'],
            message: "Deep import of 'antd' is prohibited. Please use the wrapper components defined in 'src/components/'."
          }]
        }
      ]
    },
  },

  {
    files: ["src/components/**/*.{ts,tsx}", "src/providers/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      'no-restricted-imports': 'off',
    },
  }
)
