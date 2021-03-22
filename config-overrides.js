const workboxPlugin = require("workbox-webpack-plugin");
const path = require('path')

function customSW(config, env) {
  if (env === 'production') {
    const workboxConfigProd = {
      swSrc: path.join(__dirname, 'public', 'custom-service-worker.js'),
      swDest: 'custom-service-worker.js',
      importWorkboxFrom: 'disabled'
    }

    config.plugins.push(new workboxPlugin.InjectManifest(workboxConfigProd))
  }

  return config
};

const {
  override,
  disableEsLint,
  addDecoratorsLegacy,
  fixBabelImports,
} = require("customize-cra");

module.exports = override(
  customSW,
  disableEsLint(),
  addDecoratorsLegacy(),
  fixBabelImports("react-app-rewire-mobx", {
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
);
