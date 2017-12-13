let mix = require('laravel-mix');

// Plugins de webpack

let LiveReloadPlugin = require('webpack-livereload-plugin');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let ImageminPlugin = require('imagemin-webpack-plugin').default;
let CopyWebpackPlugin = require('copy-webpack-plugin');
let imageminMozjpeg = require('imagemin-mozjpeg');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.js('resources/assets/js/item.js', 'public/js')
	.sass('resources/assets/sass/item.scss', 'public/css');

mix.webpackConfig({
	plugins: [
		new LiveReloadPlugin(),
		new BrowserSyncPlugin({
          open: 'external',
          host: 'vue-materialize.dev',
          proxy: 'vue-materialize.dev',
          files: ['resources/views/**/*.php', 'app/**/*.php', 'routes/**/*.php', 'public/js/*.js', 'public/css/*.css']
        }),
        new CopyWebpackPlugin([{
            from: 'resources/assets/images',
            to: 'img', // Laravel mix will place this in 'public/img'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                    quality: 50,
                })
            ]
        }),
        new UglifyJSPlugin({
        	test: /\.js($|\?)/i
        })
	]
});