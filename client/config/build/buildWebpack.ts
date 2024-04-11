import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types';

export function buildWebpack(
  options: BuildOptions
): webpack.Configuration | DevServerConfiguration {
  const isDev = options.mode === 'development';
  const { mode, paths } = options;

  return {
    mode: mode,

    entry: paths.entry,

    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },

    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(options),
    },

    resolve: buildResolvers(options),

    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',

    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
