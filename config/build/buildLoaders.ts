import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import { BuildOptions } from './types/config'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPaths: string) => resPaths.includes('.module.'),
            localIdentName: options.isDev
              ? ' [path][name]__[local]--[hash:base64:5] '
              : ' [hash:base64:8] ',
          },
        },
      },
      'sass-loader',
    ],
  }

  const typeScriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [typeScriptLoader, cssLoader]
}
