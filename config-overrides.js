const workboxPlugin = require("workbox-webpack-plugin");
const path = require('path')
const rewireMobX = require('react-app-rewire-mobx');

/*

const {
  addDecoratorsLegacy,
  override,
  disableEsLint
} = require("customize-cra");
*/

function customSW(config, env) {
  if (env === 'production') {
    const workboxConfigProd = {
      swSrc: path.join(__dirname, 'public', 'custom-service-worker.js'),
      swDest: 'custom-service-worker.js',
      importWorkboxFrom: 'disabled'
    }
    //config = removeSWPrecachePlugin(config)
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




/*

I had to take this out when I was rewiring mobx for decorators, still not sure how this works with out it ? 

module.exports = {

 webpack: function(config, env) {


   if (env === 'production') {
     const workboxConfigProd = {
       swSrc: path.join(__dirname, 'public', 'custom-service-worker.js'),
       swDest: 'custom-service-worker.js',
       importWorkboxFrom: 'disabled'
     }
     config = removeSWPrecachePlugin(config)
     config.plugins.push(new workboxPlugin.InjectManifest(workboxConfigProd))
   }

   return config
 }
}
*/

function removeSWPrecachePlugin(config) {
  const swPrecachePluginIndex = config.plugins.findIndex((element) => {
    return element.constructor.name === 'SWPrecacheWebpackPlugin'
  })
  if (swPrecachePluginIndex !== -1) {
    config.plugins.splice(swPrecachePluginIndex, 1)
  }
  return config
}


/*
function customSW(config, env) {
  config.plugins = config.plugins.map((plugin) => {
    if (plugin.constructor.name === "GenerateSW") {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: "./src/custom-service-worker.js",
        swDest: "service-worker.js"
      });
    }
    return plugin;
  });
  return config;
};

*/