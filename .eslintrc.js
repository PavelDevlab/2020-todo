module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "eslint:recommended",
    "plugin:jest/recommended",
    "jest-enzyme",
    "prettier",
    //"plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/rule-name": "error",
    "no-debugger": "error",
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "semi": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",

    // "linebreak-style": "off", // Неправильно работает в Windows.

    // "arrow-parens": "off", // Несовместимо с prettier`
    // "object-curly-newline": "off", // Несовместимо с prettier
    // "no-mixed-operators": "off", // Несовместимо с prettier
    // "arrow-body-style": "off", // Это - не наш стиль?
    // "function-paren-newline": "off", // Несовместимо с prettier
    "no-plusplus": "off",
    // "space-before-function-paren": 0, // Несовместимо с prettier

    "max-len": ["error", 200, 2, { "ignoreUrls": true }], // airbnb позволяет некоторые пограничные случаи
    "no-console": "error", // airbnb использует предупреждение
    "no-alert": "error", // airbnb использует предупреждение

    "no-param-reassign": "off", // Это - не наш стиль?
    "radix": "off", // parseInt, parseFloat и radix выключены. Мне это не нравится.

    "react/require-default-props": "off", // airbnb использует уведомление об ошибке
    "react/forbid-prop-types": "off", // airbnb использует уведомление об ошибке
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx", ".jsx"] }], // airbnb использует .jsx

    "prefer-destructuring": "off",

    "react/no-find-dom-node": "off", // Я этого не знаю
    "react/no-did-mount-set-state": "off",
    "react/no-unused-prop-types": "off", // Это всё ещё работает нестабильно
    "react/jsx-one-expression-per-line": "off",
    /*
    "jsx-a11y/anchor-is-valid": ["error", { "components": ["Link"], "specialLink": ["to"] }],
    "jsx-a11y/label-has-for": [2, {
      "required": {
        "every": ["id"]
      }
    }]// , // для ошибки вложенных свойств htmlFor элементов label
    */
    // "prettier/prettier": ["error"]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./internals/webpack/client/webpack.prod.babel.js"
      }
    },
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn"t set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      {"property": "freeze", "object": "Object"},
      {"property": "myFavoriteWrapper"}
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  },
  "env": {
    "node": true,
    "browser": true,
    "jest": true,
    "es6": true
  },
  "plugins": [
    "react",
    // "prettier",
    "@typescript-eslint"
  ]
};