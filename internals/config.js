const resolve = require('path').resolve;
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

const DevopsFrontend = {
  version: '1.0.0',

  /**
   * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
   * by caching the module metadata for all of our npm dependencies. We enable it by default
   * in development.
   *
   *
   * To disable the DLL Plugin, set this value to false.
   */
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
        'child_process',
        './node_modules/xmlhttprequest/lib/XMLHttpRequest.js',
        './node_modules/jQuery/lib/node-jquery.js',
        'source-map',
        'xmlhttprequest',
        'jsdom',
        'jquery-color'
      ],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: ['core-js', 'eventsource-polyfill', 'babel-polyfill', 'lodash'],

      // The path where the DLL manifest and bundle will get built
      path: resolve('../node_modules/diligencia-dlls'),
    },

    entry(pkg) {
      console.log('**************ENTRY**********');
      const dependencyNames = Object.keys(pkg.dependencies);
      console.log('**************DEPENDENCY NAMES**********');
      console.log(dependencyNames);
      const exclude = pkg.dllPlugin.exclude || DevopsFrontend.dllPlugin.defaults.exclude;
      console.log('**************EXCLUDE**********');
      console.log(exclude);
      const include = pkg.dllPlugin.include || DevopsFrontend.dllPlugin.defaults.include;
      console.log('**************INCLUDE**********');
      console.log(include);
      const includeDependencies = uniq(dependencyNames.concat(include));
      console.log('**************INCLUDE DEPENDENCIES**********');
      console.log(includeDependencies);
      console.log('**************FINAL**********');
      console.log(pullAll(includeDependencies, exclude));

      return {
        devopsDeps: pullAll(includeDependencies, exclude),
      };
    },
  },
};

module.exports = DevopsFrontend;
