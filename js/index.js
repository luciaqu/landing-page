var errores= [];
var options=['-','Masculino','Femenino','Otro'];

//variables slider
var slideimgs = ['img/slider1.jpg','img/slider2.jpg','img/slider3.jpg','img/slider4.jpg'];
var imagen = $('#slider-img');
var k=0;
var interval; 
//fin variables slider


$(document).ready(function(){
	console.log('Ready Ready Ready');
	// Formulario-login
	$('#msj').hide(); // oculto el div
	$('#ingresar').on ('click', function(){
		$('#msj').empty();
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

	//llama funcion slider
	slider();

	$('#sliderlink').on('click', function(){
	
	slide();
	
	});//Fin funcion slider on click

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

	$('#gracias').hide();

	$('#send').on('click', function(){
		errores=[];
		$('#gracias').empty();
		validarEmail($('#email').val());
		validarNombre($('#nombre').val());
		validarEdad($('#edad').val());
		validarSelect($('#genero').val());
		
		if (errores.length == 0){ //si el array de los errores es igual a cero, SUBMIT
			/*$('#formulario').submit();*/
			
			var datos = $('#contacto').serialize();
			console.log (datos);

			$.ajax({
                url: "api/api.php",
                type: "post",
                data: datos,
                success: function (response) {
                    // you will get response from your php page (what you echo or print)   
                  if(response){
                    console.log(response);   
                      console.log("todo ok"); 

                      alert("Formulario enviado correctamente");
                    }else{  
                      alert("Error");
                      location.reload();
                    }
                  }//response
                });//ajáx
			$('#gracias').removeClass('alert alert-warning');
			$('#gracias').addClass('alert alert-success'); 
			$('#gracias').show();  //método de jquery para mostrar
			$('#gracias').append('<p>¡Gracias!</p>');
		}else{
			$('#gracias').removeClass('alert alert-success');
			$('#gracias').addClass('alert alert-warning'); 
			$('#gracias').show(); //sino, recorrer array: en el div con ID error pusheo los errores nombrados en las funciones
			for (i=0;i<errores.length;i++){ 
				$('#gracias').append(errores[i]);
		    }
		}
	});//Fin function de ENVIAR

	$('#limpiar').on('click',function(){
		$('#gracias').empty();
		$('#gracias').hide();
		$('#contacto')[0].reset();
		console.log('limpiar formulario');

	});// Fin botón limpiar
	

}); //termina document ready

var select = $('#genero');//variable select para género
    for(i=0; i<options.length;i++){
		value= i; //se pone i + 1 para no usar el cero, USO EL CERO PARA SABER ELIGIÓ O NO.
		console.log('genero in');
		var option = '<option value ="'+ value +'">'+ options[i] + '</option>';
		select.append(option); 
	
	}

function validarEmail(email) { //Funcion para validar formato de mail//
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Expresion regular para chequear formato mail//
		console.log('validarEmail in');
		if (email == '' || email == null) {
			console.log('mail vacio');
			errores.push("<p>Por favor completa tu e-mail</p>");
		}else{
			if (!expr.test(email)) {
				console.log('mail invalido');
				errores.push("<p>Por favor ingresá un email válido</p>");
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
			errores.push("<p>Por favor completá tu nombre</p>");
		} else {
			if (!soloLetras(nombre)) {
				console.log('Nombre invalido');
				//error.style.display = 'block';
				//error.innerHTML += '<li>Por favor ingresá un nombre valido</li>';//.innerHTML para poner algo dentro de html
				errores.push("<p>Por favor ingresá un nombre válido</p>");
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
			errores.push("<p>Por favor completa tu edad</p>");
		}else{
			if(isNaN(parseInt(edad))) {
				console.log('Edad invalida');
				errores.push("<p>Por favor ingresá una edad válida</p>");
			} else {
				if (parseInt(edad) > 120 || parseInt(edad) < 18) {
					console.log('Edad invalida');
					errores.push("<p>Por favor ingresá una edad válida</p>");
				}else{
					console.log('Edad valida');
					return true;
				}
			}return false;
		}//validar edad
}
function soloLetras(x) { //Valido apellido y nombre con expresion regular
	console.log('soloLetras in');
	expr = /^([a-zA-Z\s]{3,50})*$/ ; //expresion regular de intervalos de letras min 3 caracteres max 50//
	if(expr.test(x)) {//test > para matchear var y expresión regular. expresionregular.test(variable).
		return true;
	}
	return false;
}

function validarSelect(option){//Valido Select de género.
		if (option == 0){
			console.log('Genero vacio');
			errores.push("<p>Elija un género</p>");
		}else{
			console.log('genero valido');
			return true;
		}return false;

	}

//funciones slider
function slide() {
$(imagen).fadeOut('slow', function() {

	if (k==(slideimgs.length-1)) {
		k=0
	} else {k++};

	console.log(slideimgs[k]);	
	$(imagen).attr('src',slideimgs[k]).fadeIn('slow');

	});
};


function slider() {
	interval = setInterval(slide, 4000);

	$('#sliderlink').on({
		mouseover: function(){
		clearInterval(interval);		
		},

		mouseleave: function(){
		slider();		
		}
	});

};//fin funciones slider




/* sintaxis Jquery:
	$(selector).accion();
	$('tag')/$('#id')/$('.class').accion();*/

