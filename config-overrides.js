const path = require('path');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  
  config.resolve.alias = {
    ...config.resolve.alias,
    'native-base' : 'native-base-web',
    'react/lib/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry'}
  console.log(path.join(__dirname, 'src/web/mock/MockReactNative.js'));
  console.log(config.resolve.alias);
  return config;
}