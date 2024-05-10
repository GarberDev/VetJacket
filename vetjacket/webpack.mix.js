const mix = require('laravel-mix');

// Configure Mix to use React
mix.js('resources/js/app.js', 'public/js')
   .react()
   .sass('resources/sass/app.scss', 'public/css');
