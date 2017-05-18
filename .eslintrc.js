// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    experimentalObjectRestSpread: true,
    jsx: true
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {

    // 要求要有 2 个空格的缩进
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],

    // 使用 Unix 格式的换行符
    'linebreak-style': [
      'error',
      'unix'
    ],

    // 换行符放在操作符后面
    'operator-linebreak': [
      'error',
      'after'
    ],

    // 使用单引号
    'quotes': [
      'error',
      'single'
    ],

    // 要求总是用分号
    'semi': [
      'error',
      'never'
    ],

    // switch-case 要求总是要有 default
    'default-case': [
      'error'
    ],

    // 使用 3 个等号
    'eqeqeq': [
      'error'
    ],

    // 禁止在代码中使用 eval
    'no-eval': [
      'error'
    ],

    // 禁用隐式 eval，如，setTimeout('console.log()', 100)
    'no-implied-eval': [
      'error'
    ],

    // 禁止拓展原生对象
    'no-extend-native': [
      'error'
    ],

    // 禁止使用较短的符号实现类型转换
    'no-implicit-coercion': [
      'error'
    ],

    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': [
      'error'
    ],

    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': [
      'error'
    ],

    // 禁止使用 __proto__ 属性
    'no-proto': [
    'error'
    ],

    // 禁用 with 语句
    'no-with': [
      'error'
    ],

    // parseInt 中要有基数 parseInt('012', 10)
    'radix': [
      'error'
    ],

    // 不允许使用 undefined 变量
    'no-undefined': [
      'error'
    ],

    // 强制使用驼峰命名法
    'camelcase': [
      'error'
    ],

    // 大括号风格 http://eslint.cn/docs/rules/brace-style
    'brace-style': [
      'error',
      '1tbs'
    ],

    // 要求或禁止命名的 function 表达式
    'func-names': [
      'error',
      'never'
    ],

    // 注释之前有空行
    'lines-around-comment': [
      'error'
    ],

    // 要求使用 js doc 注释
    'require-jsdoc': [
      'warn'
    ],

    // // 可以使用 console，但是会警告
    // 'no-console': [
    //   'warn'
    // ]
  }
}
