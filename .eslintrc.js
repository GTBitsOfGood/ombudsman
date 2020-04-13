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

        'jsx-quotes': ['error', 'prefer-double'],

        /**
         * Modified from Airbnb style guideline at https://github.com/airbnb/javascript, which uses the MI[sic]T Licnese
         * Copyright (c) 2012 Airbnb
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
         */

        'class-methods-use-this': ['error', {
            exceptMethods: [
                'render',
                'getInitialState',
                'getDefaultProps',
                'getChildContext',
                'componentWillMount',
                'UNSAFE_componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'UNSAFE_componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'UNSAFE_componentWillUpdate',
                'componentDidUpdate',
                'componentWillUnmount',
                'componentDidCatch',
                'getSnapshotBeforeUpdate'
            ],
        }],

        // Prevent missing displayName in a React component definition
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
        'react/display-name': ['off', { ignoreTranspilerName: false }],

        // Forbid certain propTypes (any, array, object)
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/forbid-prop-types.md
        'react/forbid-prop-types': ['warn', {
            forbid: ['any', 'array', 'object'],
            checkContextTypes: true,
            checkChildContextTypes: true,
        }],

        // Forbid certain props on DOM Nodes
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/forbid-dom-props.md
        'react/forbid-dom-props': ['off', { forbid: [] }],

        // Enforce boolean attributes notation in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-boolean-value': ['warn', 'never', { always: [] }],

        // Validate closing bracket location in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],

        // Validate closing tag location in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
        'react/jsx-closing-tag-location': 'off',

        // Enforce or disallow spaces inside of curly braces in JSX attributes
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-curly-spacing': ['warn', 'never', { allowMultiline: true }],

        // Enforce event handler naming conventions in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': ['off', {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
        }],

        // Validate props indentation in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['warn', 2],

        // Validate JSX has key prop when in array or iterator
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-key': 'off',

        // Prevent usage of .bind() in JSX props
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-bind': ['warn', {
            ignoreRefs: true,
            allowArrowFunctions: true,
            allowFunctions: false,
            allowBind: false,
            ignoreDOMComponents: true,
        }],

        // Prevent duplicate props in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],

        // Prevent usage of unwrapped JSX strings
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
        'react/jsx-no-literals': ['off', { noStrings: true }],

        // Disallow undeclared variables in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        'react/jsx-no-undef': 'error',

        // Enforce PascalCase for user-defined JSX components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': ['warn', {
            allowAllCaps: true,
            ignore: [],
        }],

        // Enforce propTypes declarations alphabetical sorting
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
        'react/sort-prop-types': ['off', {
            ignoreCase: true,
            callbacksLast: false,
            requiredFirst: false,
            sortShapeProp: true,
        }],

        // Deprecated in favor of react/jsx-sort-props
        'react/jsx-sort-prop-types': 'off',

        // Enforce props alphabetical sorting
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/jsx-sort-props': ['off', {
            ignoreCase: true,
            callbacksLast: false,
            shorthandFirst: false,
            shorthandLast: false,
            noSortAlphabetically: false,
            reservedFirst: true,
        }],

        // Enforce defaultProps declarations alphabetical sorting
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-sort-default-props.md
        'react/jsx-sort-default-props': ['off', {
            ignoreCase: true,
        }],

        // Prevent React to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['warn'],

        // Prevent variables used in JSX to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-uses-vars': 'warn',

        // Prevent usage of dangerous JSX properties
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': 'warn',

        // Prevent usage of deprecated methods
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': ['warn'],

        // Prevent usage of setState in componentDidMount
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        // this is necessary for server-rendering
        'react/no-did-mount-set-state': 'off',

        // Prevent usage of setState in componentDidUpdate
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        'react/no-did-update-set-state': 'error',

        // Prevent usage of setState in componentWillUpdate
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        'react/no-will-update-set-state': 'error',

        // Prevent direct mutation of this.state
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': 'off',

        // Prevent usage of isMounted
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-is-mounted': 'error',

        // Prevent multiple component definition per file
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
        'react/no-multi-comp': 'off',

        // Prevent usage of setState
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
        'react/no-set-state': 'off',

        // Prevent using string references
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': 'warn',

        // Prevent usage of unknown DOM property
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': 'warn',

        // Require ES6 class declarations over React.createClass
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': ['warn', 'always'],

        // Require stateless functions when not using lifecycle methods, setState or ref
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],

        // Prevent missing props validation in a React component definition
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': ['warn', {
            ignore: [],
            customValidators: [],
            skipUndeclared: false
        }],

        // Prevent missing React when using JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': 'error',

        // Require render() methods to return something
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/require-render-return': 'error',

        // Prevent extra closing tags for components without children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/self-closing-comp': 'warn',

        // Enforce component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/sort-comp.md
        'react/sort-comp': ['warn', {
            order: [
                'static-variables',
                'static-methods',
                'instance-variables',
                'lifecycle',
                '/^on.+$/',
                'getters',
                'setters',
                '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                'instance-methods',
                'everything-else',
                'rendering',
            ],
            groups: {
                lifecycle: [
                    'displayName',
                    'propTypes',
                    'contextTypes',
                    'childContextTypes',
                    'mixins',
                    'statics',
                    'defaultProps',
                    'constructor',
                    'getDefaultProps',
                    'getInitialState',
                    'state',
                    'getChildContext',
                    'getDerivedStateFromProps',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'getSnapshotBeforeUpdate',
                    'componentDidUpdate',
                    'componentDidCatch',
                    'componentWillUnmount'
                ],
                rendering: [
                    '/^render.+$/',
                    'render'
                ],
            },
        }],

        // Prevent missing parentheses around multilines JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': ['off', {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
        }],

        // Require that the first prop in a JSX element be on a new line when the element is multiline
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

        // Enforce spacing around jsx equals signs
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': ['warn', 'never'],

        // Enforce JSX indentation
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['warn', 2],

        // Disallow target="_blank" on links
        // https://github.com/yannickcr/eslint-plugin-react/blob/ac102885765be5ff37847a871f239c6703e1c7cc/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-target-blank': ['warn', { enforceDynamicLinks: 'always' }],

        // only .jsx files may have JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],

        // prevent accidental JS comments from being injected into JSX as text
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
        'react/jsx-no-comment-textnodes': 'error',

        // disallow using React.render/ReactDOM.render's return value
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-render-return-value': 'error',

        // require a shouldComponentUpdate method, or PureRenderMixin
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
        'react/require-optimization': ['off', { allowDecorators: [] }],

        // warn against using findDOMNode()
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': 'error',

        // Forbid certain props on Components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
        'react/forbid-component-props': ['off', { forbid: [] }],

        // Forbid certain elements
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md
        'react/forbid-elements': ['off', { forbid: [], }],

        // Prevent problem with children and props.dangerouslySetInnerHTML
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-danger-with-children': 'error',

        // Prevent unused propType definitions
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['warn', {
            customValidators: [
            ],
            skipShapeProps: true,
        }],

        // Require style prop value be an object or var
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/style-prop-object': 'error',

        // Prevent invalid characters from appearing in markup
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': 'error',

        // Prevent passing of children as props
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
        'react/no-children-prop': 'error',

        // Validate whitespace in and around the JSX opening and closing brackets
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': ['warn', {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
        }],

        // Enforce spaces before the closing bracket of self-closing JSX elements
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-space-before-closing.md
        // Deprecated in favor of jsx-tag-spacing
        'react/jsx-space-before-closing': ['off', 'always'],

        // Prevent usage of Array index in keys
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': 'error',

        // Enforce a defaultProps definition for every prop that is not a required prop
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/require-default-props.md
        'react/require-default-props': ['error', {
            forbidDefaultForRequired: true,
        }],

        // Forbids using non-exported propTypes
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        // this is intentionally set to "warn". it would be "error",
        // but it's only critical if you're stripping propTypes in production.
        'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],

        // Prevent void DOM elements from receiving children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
        'react/void-dom-elements-no-children': 'error',

        // Enforce all defaultProps have a corresponding non-required PropType
        // https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],

        // Prevent usage of shouldComponentUpdate when extending React.PureComponent
        // https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/no-redundant-should-component-update.md
        'react/no-redundant-should-component-update': 'error',

        // Prevent unused state values
        // https://github.com/yannickcr/eslint-plugin-react/pull/1103/
        'react/no-unused-state': 'warn',

        // Enforces consistent naming for boolean props
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/boolean-prop-naming.md
        'react/boolean-prop-naming': ['off', {
            propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            message: '',
        }],

        // Prevents common casing typos
        // https://github.com/yannickcr/eslint-plugin-react/blob/73abadb697034b5ccb514d79fb4689836fe61f91/docs/rules/no-typos.md
        'react/no-typos': 'error',

        // Enforce curly braces or disallow unnecessary curly braces in JSX props and/or children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

        // One JSX Element Per Line
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }],

        // Enforce consistent usage of destructuring assignment of props, state, and context
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['warn', 'always'],

        // Prevent using this.state within a this.setState
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/no-access-state-in-setstate.md
        'react/no-access-state-in-setstate': 'error',

        // Prevent usage of button elements without an explicit type attribute
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/button-has-type.md
        'react/button-has-type': ['warn', {
            button: true,
            submit: true,
            reset: false,
        }],

        // Ensures inline tags are not rendered without spaces between them
        'react/jsx-child-element-spacing': 'off',

        // Prevent this from being used in stateless functional components
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/no-this-in-sfc.md
        'react/no-this-in-sfc': 'error',

        // Validate JSX maximum depth
        // https://github.com/yannickcr/eslint-plugin-react/blob/abe8381c0d6748047224c430ce47f02e40160ed0/docs/rules/jsx-max-depth.md
        'react/jsx-max-depth': 'off',

        // Disallow multiple spaces between inline JSX props
        // https://github.com/yannickcr/eslint-plugin-react/blob/ac102885765be5ff37847a871f239c6703e1c7cc/docs/rules/jsx-props-no-multi-spaces.md
        'react/jsx-props-no-multi-spaces': 'warn',

        // Prevent usage of UNSAFE_ methods
        // https://github.com/yannickcr/eslint-plugin-react/blob/157cc932be2cfaa56b3f5b45df6f6d4322a2f660/docs/rules/no-unsafe.md
        'react/no-unsafe': 'off',

        // Enforce shorthand or standard form for React fragments
        // https://github.com/yannickcr/eslint-plugin-react/blob/bc976b837abeab1dffd90ac6168b746a83fc83cc/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['warn', 'syntax'],

        // Enforce linebreaks in curly braces in JSX attributes and expressions.
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
        'react/jsx-curly-newline': ['warn', {
            multiline: 'consistent',
            singleline: 'consistent',
        }],

        // Enforce state initialization style
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        // TODO: set to "never" once babel-preset-airbnb supports public class fields
        'react/state-in-constructor': ['off', 'always'],

        // Enforces where React component static properties should be positioned
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        // TODO: set to "static public field" once babel-preset-airbnb supports public class fields
        'react/static-property-placement': ['warn', 'property assignment'],

        // Disallow JSX props spreading
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off', {
            html: 'enforce',
            custom: 'enforce',
            exceptions: [],
        }],

        // Enforce that props are read-only
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
        'react/prefer-read-only-props': 'off',

        // Prevent usage of `javascript:` URLs
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        // TODO: enable, semver-major
        'react/jsx-no-script-url': ['off', [
            {
                name: 'Link',
                props: ['to'],
            },
        ]],

        // Disallow unnecessary fragments
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        // TODO: enable, semver-major
        'react/jsx-no-useless-fragment': 'off',

        // Prevent adjacent inline elements not separated by whitespace
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
        // TODO: enable? semver-major
        'react/no-adjacent-inline-elements': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'array-callback-return': 'off',

        // Enforce a specific function type for function components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        // TODO: enable! semver-minor, but do it in a major to be safe
        // TODO: investigate if setting namedComponents to expression vs declaration is problematic
        'react/function-component-definition': ['off', {
            namedComponents: 'function-expression',
            unnamedComponents: 'function-expression',
        }],
    },
};
