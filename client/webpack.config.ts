import path from 'path';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths, BuildPlatform } from './config/build/types';

interface EnvVariables {
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  };

  const config: webpack.Configuration | DevServerConfiguration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  });

  return config;
};
