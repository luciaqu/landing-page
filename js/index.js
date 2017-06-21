var errores= [];
var options=['Mustard','Ketchup','Relish'];

$(document).ready(function(){
	console.log('Ready Ready Ready');
	$('#msj').hide(); // oculto el div
	$('#ingresar').on ('click', function(){
		user = $('#username').val();
		pass = $('#password').val();

		if (user == 'pepe' && pass == '123456'){
			$('#msj').show();
			$('#msj').append('<p>Welcome!</p>');
		} else {
			$('#msj').show();
			$('#msj').append('<p>Failed login.</p>');
		}
	});



	$('.vermas').on('click',function(){
		var vid = $(this).data('id');
		var id = '#' + vid;
		if ($(id).css('display')==='none'){
			$('.extra').hide();
			$(id).css('display','block');
		} else {
			if($(id).css('display')==='block'){
				$(id).css('display','none')}
		}

	});

	var select = $('#condimento');
	for(i=0; i<options.length;i++){
		value=i;
		console.log('condimento in');
		var option = '<option value ="'+ value +'">'+ options[i] + '</option>';
		select.append(option); 
	}

	$('#gracias').hide();
	$('#send').on('click', function(){
		errores=[];
		console.log('funcionó!');
		validarEmail($('#email').val());
		validarNombre($('#nombre').val());
		validarEdad($('#edad').val());

		if (errores.length == 0){ //si el array de los errores es igual a cero, SUBMIT
			/*$('#formulario').submit();*/
			var datos = $('#contacto').serialize();
			console.log (datos);

			$('#gracias').show();  //método de jquery para mostrar
			$('#gracias').append('<p>¡Gracias!</p>');
		}else{
			$('#gracias').show(); //sino, recorrer array: en el div con ID error pusheo los errores nombrados en las funciones
			for (i=0;i<errores.length;i++){ 
				$('#gracias').append(errores[i]);
		   }
		}
	});//termina function de INGRESAR
	$('#limpiar').on('click',function(){
		$('#contacto')[0].reset();
		console.log('limpiar formulario');
		$('#gracias').html('');
	});//botón limpiar
	
}); //termina document ready
function validarEmail(email) { //Funcion para validar formato de mail//
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Expresion regular para chequear formato mail//
		console.log('validarEmail in');
		if (email == '' || email == null) {
			console.log('mail vacio');
			errores.push("<li>Por favor completa tu e-mail</li>");
		}else{
			if (!expr.test(email)) {
				console.log('mail invalido');
				errores.push("<li>Por favor ingresá un email válido</li>");
			}else{
				console.log('mail valido');
				return true;
			}
		}return false;
	} //Fin validarEmail//

	function validarNombre(nombre){ //Funcion para validar el nombre//
		console.log('validarName in');
		if(nombre == '' || nombre == null){
			console.log('nombre vacio');
			errores.push("<li>Por favor completa tu nombre</li>");
		} else {
			if (!soloLetras(nombre)) {
				console.log('Nombre invalido');
				//error.style.display = 'block';
				//error.innerHTML += '<li>Por favor ingresá un nombre valido</li>';//.innerHTML para poner algo dentro de html
				errores.push("<li>Por favor ingresa tu nombre valido</li>");
			} else {
			console.log('nombre valido');
			return true;
			}
		}return false;
	} //Fin validarNombre//

		function validarEdad(edad) { //Funcion para validar edad//
		console.log('validarEdad in');
		if (edad == '' || edad == null) {
			console.log('Edad vacia');
			errores.push("<li>Por favor completa tu edad</li>");
		}else{
			if(isNaN(parseInt(edad))) {
				console.log('Edad invalida');
				errores.push("<li>Por favor ingresa una edad valida</li>");
			} else {
				if (parseInt(edad) > 120 || parseInt(edad) < 18) {
					console.log('Edad invalida');
					errores.push("<li>Por favor ingresa una edad valida</li>");
				}else{
					console.log('Edad valida');
					return true;
				}
			}return false;
		}//validar edad
}
function soloLetras(x) { //Valido apellido y nombre con expresion regular//
	console.log('soloLetras in');
	expr = /^([a-zA-Z\s]{3,50})*$/ ; //expresion regular de intervalos de letras min 3 caracteres max 50//
	if(expr.test(x)) {//test > para matchear var y expresión regular. expresionregular.test(variable).
		return true;
	}
	return false;
}






/* sintaxis Jquery:
	$(selector).accion();
	$('tag')/$('#id')/$('.class').accion();*/

