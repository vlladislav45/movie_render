const rewireAliases = require('react-app-rewire-aliases');
const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    ["transform-imports", {
      "react-router": {
        "transform": importName => {
          console.group('EI MA DEI MA EI MA NA');
          console.log(importName);
          console.groupEnd();
          return "react-router/" + importName
        },
        "preventFullImport": true
      },
      "lodash": {
        "transform": "lodash/${member}",
        "preventFullImport": true
      }
    }],
    ["transform-react-remove-prop-types"],
    ["babel-plugin-styled-components", {
      "ssr": false
    }
    ]
  ))

module.exports = function override(config, env) {
  
  config = rewireAliases.aliasesOptions({
    'react-redux': process.env.NODE_ENV === 'development' ? 'react-redux/lib' : 'react-redux'
  })(config, env);
  
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
  })
  
  return config;
}
