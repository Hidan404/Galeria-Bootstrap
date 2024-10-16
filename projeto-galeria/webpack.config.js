const modoDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: modoDev ? 'development' : 'production', // Define em que modo será executado
    entry: './src/index.js',  // Define a pasta de entrada que irá referenciar as demais
    devServer: { // Cria pasta em memória e executa servidor
        contentBase: './build',
        port: 9000,
    },
    optimization: { // Minificadores
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: { // Pasta de saída gera arquivo app.js
        filename: 'app.js',
        path: __dirname + '/build',
        clean: true, // Limpa a pasta de saída antes de gerar novos arquivos
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'estilo.css' }), // Extraí css
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src/', from: '**/*.html' }, // Copia pastas com arquivos html para pasta build
                { context: 'src/', from: 'imgs/**/*' } // Copia pasta de imagens para pasta build
            ]
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader', // interpreta @import, url()...
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }, {
            test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
            use: ['file-loader']
        }]
    }
}
