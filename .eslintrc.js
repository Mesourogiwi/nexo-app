module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: false,
        endOfLine: 'auto',
        arrowParens: 'avoid',
        trailingComma: 'none'
      },
      {
        usePrettierrc: true
      }
    ],
    'no-console': 'error',
    'no-unused-vars': 'error',
    'no-shadow': 'error',
    'prefer-const': 'error',
    'no-unsafe-optional-chaining': 'error'
  }
}
