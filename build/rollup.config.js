// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import node from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json';
import styles from "rollup-plugin-styles";
// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
  .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
  input: './src/entry.js',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
        ],
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        mainFields: ["module", "main"],
        preferBuiltins: true
      }),
      commonjs({ transformMixedEsModules: true }),
    ],
    babel: {
      exclude: ['node_modules/**'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'runtime',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es' && process.env.consumer !== 'sfdc') {
  const esConfig = {
    ...baseConfig,
    input: './src/entry.esm.js',
    external,
    output: {
      // file: process.env.dist + '.esm.js',
      file: path.resolve('dist', `${path.basename(path.dirname(__dirname))}.esm.js`),
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins.postVue,
      json(),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
      styles()
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'es' && process.env.consumer === 'sfdc') {
  const esConfig = {
    ...baseConfig,
    input: 'build/sfdcBundler.js',
    output: {
      // file: process.env.dist + '-sf.esm.js',
      file: path.resolve('dist', `${path.basename(path.dirname(__dirname))}-sf.esm.js`),
      format: 'esm',
      name: 'App',
    },
    plugins: [
      ...baseConfig.plugins.postVue,
      json(),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
      terser({
        output: {
          ecma: 5,
        },
      }),
      styles({
        mode: [
          "inject",
          { container: "body", singleTag: true, prepend: true, attributes: { id: "global" } },
        ],
      })
    ],
  };
  buildFormats.push(esConfig);
}
// Export config
export default buildFormats;
