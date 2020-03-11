module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "react-app",
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
        "react",
        "prettier",
    ],
    "rules": {
        "jsx-a11y/anchor-is-valid": 0,
        "quotes": ["warn", "single", "avoid-escape"],
        "semi": ["warn", "always"], 
        "block-spacing": ["warn", "always"],
        "object-curly-spacing": ["warn", "always"],
        "array-bracket-spacing": ["warn", "never"],
        "no-var": ["warn"],
        "no-trailing-spaces": ["warn", {
            "skipBlankLines": true,
            "ignoreComments": true
        }],
        "no-whitespace-before-property": ["warn"],
        "semi-spacing": "warn",
        "semi-style": "warn",
        "space-in-parens": ["warn", "never"],
        "space-before-blocks": ["warn", "always"],
        "space-before-function-paren": ["warn", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always"
        }],
        "space-unary-ops": ["warn"],
        "spaced-comment": ["warn", "always"],
        "comma-spacing": ["warn"],
        "comma-style": ["warn", "last"],
        "brace-style": ["warn", "1tbs", {
            "allowSingleLine": true
        }],
        "key-spacing": ["warn"],
        "eqeqeq": ["warn", "smart"],
    },
};
