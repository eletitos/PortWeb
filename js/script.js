$(document).ready(function () {

    var contenedor = $('#contenedor');
    var numeroFotos = 70;
    var extension;
    var numeroColumnas;
    var anchoContenedor;
    var anchoColumnas;
    var anchoContenedor;
    var arrayMinimos = [];
    var contenedor = $('#contenedor');
    var imagen = $('.imagen');
    var cortinaBlanca;
    var primerScroll = true;
    var numRueda= 1;
    var altoVentana = $(window).height();
   
    
   $('h1').fitText(1, {minFontSize: '16px', maxFontSize: '120px'})
   $('h1').show();
    calcularColumnas();         //Calculo las columnas en función del tipo de pantalla con la función que he creado más abajo.
    calculoPosicion();

    for (let i = 0; i < datos.length; i++) {
        $('.cortina').eq(i).html('<h3 class="titulo">'+datos[i].titulo +'</h3>');

    }
   
  
    
/*------------------------EVENTOS----------------------------------------*/  
    $(window).resize(function () {  //Evento para cuando se redimensiona la pantalla
    
        for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
            arrayMinimos.pop(); 
        }
          // altoVentana = $(window).height();
            calcularColumnas();
            calculoPosicion();
        });

       
        
    $(window).scroll(function () {  
        for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
            arrayMinimos.pop(); 
        }
        calculoPosicion();
        if(primerScroll){
            
            $(window).scrollTop(0);
           //  $('.caja-cabecera h1').slideUp(200);
            $('.caja-cabecera').addClass('recogida');
            $('.tags').addClass('tag-desplegado');
           setTimeout(function () {  primerScroll = false}, 900) ;

        }
  
    })

    imagen.hover(function() {                             //Cortina negra cd pasa el ratón.
        $(this).find('.cortina').stop(true, false).slideDown();
      }, function() {
        $(this).find('.cortina').stop(true, false).slideUp();
      });


    $('.contenedor-logo').on('click', function () {
        $(window).scrollTop(0);
        location.reload();
        console.log('recargado');
    });



/*----------------------FUNCIÓN DE CÁLCULO DE POSICIÓN-----------------------------*/

  function calculoPosicion() {
      for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
          arrayMinimos.push(0); 
      }

        imagen.each(function () { 
            var minimo = Math.min.apply(null, arrayMinimos);  //Se determina la altura de la columna más corta (coordenada Y)
            var index = $.inArray(minimo, arrayMinimos);        //Se determina la columna que es
            var posicionEjeX = index*anchoColumnas*anchoContenedor/100;     //Cálculo de la coordenada X
            $(this).css({
                'left': posicionEjeX+'px',          //Fijo coordenada X
                'top': minimo+ 'px'                  //Fijo coordenada Y
            });
            
            arrayMinimos[index] = minimo + $(this).outerHeight();       //Establezco la nueva altura de la columna

          

            
         })

         var maximo = Math.max.apply(null, arrayMinimos);
         contenedor.css('height', maximo);
      

  }


/*   ------------------------------FUNCIÓN PARA CÁLCULO DE COLUMNAS--------------------------- */

    function calcularColumnas(){

        anchoContenedor = contenedor.width();
        if(anchoContenedor<501){
        numeroColumnas = 1;
        }else if(anchoContenedor<1001){
        numeroColumnas = 2;
        }else if(anchoContenedor<1501){
        numeroColumnas = 3;
        }else{
        numeroColumnas = 4;
        }
        anchoColumnas = 100/numeroColumnas;
        imagen.css('width', anchoColumnas + '%');
        console.log(numeroColumnas);
        anchoContenedor = contenedor.width();
        console.log('Ancho del contenedor = ' + anchoContenedor);
        console.log('ancho columna = ' + anchoColumnas);
    }
    
    


});