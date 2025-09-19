/**
 * @description ESLint 配置文件 - 现代化配置
 * @author 优化版本
 */
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import vueParser from 'vue-eslint-parser';

export default [
  // 基础 JavaScript 配置
  js.configs.recommended,

  // 全局忽略配置
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.d.ts',
      'public/**',
      '.vscode/**',
      '.idea/**',
      'build/**',
      'mock/**',
      'packages/**',
      'libs/**',
      'gulp/**',
      'test/**',
      'tests/**',
      'scripts/**',
      'docs/**',
      'plop-tpls/**',
      '.eslintrc-auto-import.json',
      '*.config.{js,ts,mjs}',
      'commitlint.config.ts',
      '.cz-config.ts',
      '.stylelintrc.ts',
      '.versionrc.ts',
      'jest.config.ts',
      'vite.config.ts',
      'vitest.config.ts',
      'unocss.config.js',
      'plopfile.ts',
      'src/utils/validate/lib/**'
    ]
  },

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      },
      globals: {
        // Vue 3 全局 API
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // 自动导入的全局变量
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        nextTick: 'readonly',
        useRouter: 'readonly',
        useRoute: 'readonly',
        // 浏览器环境变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        sessionStorage: 'readonly',
        localStorage: 'readonly',
        // DOM 类型
        HTMLElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLDivElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        TouchEvent: 'readonly',
        MouseEvent: 'readonly',
        MessageEvent: 'readonly',
        // Web APIs
        WebSocket: 'readonly',
        XMLHttpRequest: 'readonly',
        FormData: 'readonly',
        Blob: 'readonly',
        AbortSignal: 'readonly',
        // Node.js
        NodeJS: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      vue,
      '@typescript-eslint': typescript,
      prettier
    },
    rules: {
      // Vue 3 推荐规则
      ...(vue.configs?.['vue3-recommended']?.rules || {}),

      // Vue 规则自定义
      'vue/multi-word-component-names': 'off', // 允许单词组件名
      'vue/no-v-html': 'off', // 允许 v-html
      'vue/require-default-prop': 'off', // 不强制默认属性
      'vue/require-explicit-emits': 'off', // 不强制显式 emits
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 },
        multiline: { max: 1 }
      }],
      'vue/html-indent': ['error', 2],

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn'
    }
  },

  // TypeScript 文件配置
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        // 浏览器环境变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        sessionStorage: 'readonly',
        localStorage: 'readonly',
        // DOM 类型
        HTMLElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        HTMLDivElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        TouchEvent: 'readonly',
        MouseEvent: 'readonly',
        MessageEvent: 'readonly',
        // Web APIs
        WebSocket: 'readonly',
        XMLHttpRequest: 'readonly',
        FormData: 'readonly',
        Blob: 'readonly',
        AbortSignal: 'readonly',
        // 类型定义
        Recordable: 'readonly',
        Fn: 'readonly',
        // Node.js
        NodeJS: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier
    },
    rules: {
      // TypeScript 推荐规则
      ...(typescript.configs?.recommended?.rules || {}),

      // TypeScript 规则自定义
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': ['error', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description'
      }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false
      }]
    }
  },

  // JavaScript 文件配置
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        NodeJS: 'readonly'
      }
    },
    plugins: {
      prettier
    },
    rules: {
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }]
    }
  },

  // 全局规则配置
  {
    files: ['**/*.{js,ts,jsx,tsx,vue}'],
    plugins: {
      prettier
    },
    rules: {
      // Prettier 集成
      'prettier/prettier': 'error',

      // 基础规则
      'no-console': 'off',
      'no-debugger': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-rename': 'error',
      'prefer-destructuring': ['error', {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false }
      }],

      // 代码质量规则
      'eqeqeq': ['error', 'always'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTernary: true
      }],
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-promise-reject-errors': 'error'
    }
  },

  // 配置文件特殊规则
  {
    files: [
      '*.config.{js,ts}',
      '**/.eslintrc.{js,ts}',
      '**/build/**/*.{js,ts}',
      '**/scripts/**/*.{js,ts}',
      'vite.config.*',
      'vitest.config.*',
      'jest.config.*',
      'postcss.config.*',
      'tailwind.config.*',
      'unocss.config.*'
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  },

  // 测试文件特殊规则
  {
    files: [
      '**/*.test.{js,ts,tsx}',
      '**/*.spec.{js,ts,tsx}',
      '**/tests/**/*.{js,ts,tsx}',
      '**/test/**/*.{js,ts,tsx}'
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off'
    }
  }
];
