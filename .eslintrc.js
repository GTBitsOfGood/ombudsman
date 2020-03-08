module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
	    "react/jsx-props-no-spreading": ["error", {"custom": "ignore"}],
        "jsx-a11y/anchor-is-valid": 0,
        "react/jsx-one-expression-per-line": "off",
        "jsx-a11y/interactive-supports-focus": "warn",
        "no-unused-vars": "warn",
        "object-curly-newline": "off",
        "react/jsx-indent": "warn",
        "react/jsx-closing-tag-location": "warn",
        "react/jsx-max-props-per-line": "warn",
        "react/jsx-wrap-multilines": "warn",
        "indent": "warn",
    }
};
