<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta content="zaratedev" name="author" />
    <meta content="desarrollador web y móvil" name="description" />
    <meta content="laravel, vue, crud, bootstrap 4" name="keywords" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }} - desarrollo web y móvil.</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield( 'css' )
</head>
<body>
    @include( 'assets.navbar' )
    @include( 'assets.sidebar' )
    <div id="app">
        @yield('content')
    </div>
    @include( 'assets.footer' )
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    @if( env('APP_ENV') == 'local' )
      <script src="http://localhost:35729/livereload.js"></script>
    @endif
    @yield( 'js' )
</body>
</html>
