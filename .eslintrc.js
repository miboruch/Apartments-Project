module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "extends": [
        "prettier",
        "eslint:recommended"
    ],
    "plugins": [
        "prettier",
        "eslint-plugin-prettier"
    ],
    "rules": {
        "prettier/prettier": "warn",
        "no-undef": "off"
    }
};