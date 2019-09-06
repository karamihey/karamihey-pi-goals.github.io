const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const paths = require('./paths');

/**
 * Get the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const { baseUrl } = options;

  // We need to explicitly check for null and undefined (and not a falsy value) because
  // TypeScript treats an empty string as `.`.
  if (baseUrl == null) {
    // If there's no baseUrl set we respect NODE_PATH
    // Note that NODE_PATH is deprecated and will be removed
    // in the next major release of create-react-app.

    const nodePath = process.env.NODE_PATH || '';

    return nodePath.split(path.delimiter).filter(Boolean);
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null;
  }

  const tsUrlResolved = path.resolve(paths.appPath, paths.appSrcTs);

  return [tsUrlResolved, baseUrlResolved];
}

function getModules() {
  const hasTsConfig = fs.existsSync(paths.appTsConfig);
  let config;

  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }));
    config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths,
    hasTsConfig,
  };
}

module.exports = getModules();
