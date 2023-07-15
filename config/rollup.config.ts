import { upperCamel } from '@skax/camel';
import { type MergedRollupOptions } from 'rollup';
// minify the Rollup bundle
// rollup common plugin
import rollupPlugins from './rollup.plugins';
import isDev from './isDev';
import pkg from '../package.json';

// 大驼峰命名
const name = upperCamel(pkg.name, '-');

const input = 'src/index.ts';

const banner = `/*
*
* ${name}.js v${pkg.version}
* Copyright (c) ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${
  pkg.author
}
* Released under the MIT License.
*
*/`;

const sourcemap = isDev;

export default [
  {
    input,
    output: [
      {
        exports: 'auto',
        // Node 默认的模块规范, 可通过 Webpack 加载
        // https://javascript.ruanyifeng.com/nodejs/module.html
        // https://zh.wikipedia.org/wiki/CommonJS
        file: pkg.main,
        format: 'cjs',
        sourcemap,
        banner,
      },
      {
        file: pkg.umd,
        format: 'umd',
        name: upperCamel(pkg.name.replace('@skax/', '')),
        sourcemap,
        banner,
      },
    ],
    plugins: [...rollupPlugins],
  },
] as MergedRollupOptions[];
