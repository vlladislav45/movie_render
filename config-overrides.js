const rewireAliases = require('react-app-rewire-aliases');
module.exports = function override(config, env) {
  
  config = rewireAliases.aliasesOptions({
    'react-redux':  process.env.NODE_ENV === 'development' ? 'react-redux/lib' : 'react-redux'
  })(config, env);
  
  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
  })
  
  return config;
}
