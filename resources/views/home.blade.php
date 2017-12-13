@extends( 'layouts.app' )

@section('css')
	<link href="{{ asset('css/item.css') }}" rel="stylesheet">
@endsection

@section( 'content' )
	<main>
		<item></item>
	</main>
@endsection

@section( 'js' )
	<script src="{{ asset('js/item.js') }}"></script>
	<script type="text/javascript">

		$('#create-item').modal();
		$('#edit-item').modal();
	</script>
	

@endsection
