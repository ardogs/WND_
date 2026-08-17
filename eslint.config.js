import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'electron/dist'] },
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
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'antd',
              message: "Ant Design has been completely removed. Use shadcn/ui and Tailwind CSS components.",
            },
            {
              name: '@ant-design/icons',
              message: "Ant Design Icons have been removed. Use lucide-react or react-icons.",
            },
          ],
          patterns: [
            {
              group: ['antd/*', '@ant-design/*'],
              message: "Ant Design has been completely removed. Use shadcn/ui and Tailwind CSS components.",
            },
          ],
        },
      ],
    },
  }
)
