const { resolve } = require('node:path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: resolve(process.cwd(), 'tsconfig.json'),
    tsconfigRootDir: process.cwd(),
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['only-warn'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/node'),
    'eslint-config-turbo',
    './.base.envs.eslintrc.js',
    './.base.import.eslintrc.js',
  ],
  rules: {
    'prettier/prettier': ['error', require('@vercel/style-guide/prettier')],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/naming-convention': ['error', {
      selector: 'variable',
      types: ['boolean'],
      format: ['PascalCase'],
      prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
    }],
    // off rules
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['turbo/**', '*.config.ts', '*.stories.tsx', 'app/**/page.tsx', 'app/**/{page,layout,error,global-error,loading,not-found}.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.ts?(x)'],
      rules: {
        'no-console': ['error', { allow: ['error'] }]
      },
    },
    {
      files: ['*.test.ts?(x)'],
      rules: {
        '@typescript-eslint/no-empty-function': "off"
      },
    },
  ],
};
