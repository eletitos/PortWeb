$(document).ready(function () {

    var contenedor = $('#contenedor');
    var numeroFotos = 70;
    var extension;
    var numeroColumnas;
    var anchoContenedor;
    var anchoColumnas;
    var arrayMinimos = [];
    var imagen = $('.imagen');
    var cortinaBlanca;
    var primerScroll = true;
    var numRueda= 1;
    var altoVentana = $(window).height();
    var botonMenu = document.getElementById('menu-icon');
    var scrollPosition = 0;
    var modoMosaico = true;
    var aleatorio;
    var dispositivoMovil = false;
    var menuDesplegado = false;
    var about = $('#btn-about');
    var aboutDesplegado = false;
    var altoMenu = $('header nav').height();
   
    

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
            calcularColumnas();
            calculoPosicion();
        });

       
        
    $(window).scroll(function () {  
        
        if(botonMenu.checked || !modoMosaico){                          //Se fija el scroll si el menú está desplegado.
            $(window).scrollTop(scrollPosition);
        }else{
            for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
                arrayMinimos.pop(); 
            }
            calculoPosicion();
            if(primerScroll){                       //Se establece la animación del primer scroll.  
                $(window).scrollTop(0);
                $('.caja-cabecera').addClass('recogida');
                $('.tags').addClass('tag-desplegado');
                setTimeout(function () {  primerScroll = false;}, 900);        
            }
        }
    });


     /*  $(window).on('touchstart', function () { 
        dispositivoMovil = true;
        $(window).off('touchstart')
     }) */



    /*imagen.on('mouseover', function() {                             //Cortina negra cd pasa el ratón.
      //  if(modoMosaico & !dispositivoMovil){
            $(this).find('.cortina').stop(true, false).slideDown();  //Función ejecutada cuando el ratón entra, en modo mosaico y si el dispositivo no es movil.
        //}
        /*if(dispositivoMovil){
            imagen.off('mouseover');
        }
    }); 

    imagen.on('mouseleave', function() {
        $(this).find('.cortina').stop(true, false).slideUp(); //función ejecutada cuando el ratón sale.
        if(dispositivoMovil){
            imagen.off('mouseleave');
            console.log('mouseleave desactivado');
        }
    });*/


    $('#menu-icon').on('change',function(){             //Evento que calcula la posición de scroll cd se presiona el menú
        scrollPosition = $(window).scrollTop();
        if(aboutDesplegado){
            $('.cortina-roja').removeClass('desplegado');
            $('.texto-about').removeClass('desplegado-texto');
            $('.cortina-roja').addClass('replegado');
            $('.texto-about').addClass('replegado-texto');
            $('.iconos-redes').removeClass('mostrar');
            aboutDesplegado = false;
        }
    
    });

    imagen.click(function(){
        $('.cortina').toggleClass('ocultar');
        if(modoMosaico){
            scrollPosition = $(window).scrollTop();
            imagen.not(this).addClass('ocultar');
            aleatorio = Math.ceil(Math.random()*4);
            $(this).addClass('posicion-'+ aleatorio);
            tamañoMaximoFotos(this);

            modoMosaico = !modoMosaico;                   //Alternar valor booleano
        }else{
            imagen.not(this).removeClass('ocultar');
            $(this).removeClass('posicion-'+ aleatorio);
            $(this).find('img').css({
                maxWidth: '',
                maxHeight: '',
                width: '100%'
            });
            modoMosaico = !modoMosaico;    
        }
        console.log('mostrar Mosaico: ' + modoMosaico + 'numero aleatorio: ' + aleatorio);

    });

    about.on('click', function () { 
        $('.cortina-roja').removeClass('replegado');
        $('.texto-about').removeClass('replegado-texto');
        $('.cortina-roja').addClass('desplegado');
        $('.texto-about').addClass('desplegado-texto');
        $('.iconos-redes').addClass('mostrar');
        aboutDesplegado = true;
     })

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

         });

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
    }
    


//--------------FUNCIÓN CÁLCULO ALTURA MÁXIMA FOTOS------------------

    function tamañoMaximoFotos(selector) {
        let alturaMaxima = $('header nav').height();
        $(selector).find('img').css({
            maxWidth: anchoContenedor + 'px',
            maxHeight: alturaMaxima + 'px',
            width: 'auto'
        });
    }

});