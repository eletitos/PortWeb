//

    var contenedor = document.getElementById('contenedor');
    var numeroFotos = 70;
    var extension;
    var numeroColumnas;
    var anchoContenedor;
    var anchoColumnas;
    var arrayMinimos = [];
    var imagen = document.querySelectorAll('.imagen');     //lista
    var cortinaBlanca;
    var primerScroll = true;
    var numRueda= 1;
    var altoVentana = window.innerHeight;
    var botonMenu = document.getElementById('menu-icon');
    var scrollPosition = 0;
    var modoMosaico = true;
    var aleatorio;
    var dispositivoMovil = false;
    var menuDesplegado = false;
    var about = document.getElementById('btn-about');
    var aboutDesplegado = false;
    //var altoMenu = document.querySelector('header nav').offsetHeight;
    var menu = document.querySelector('header nav');
    var cortina = document.querySelectorAll('.cortina');
    var cortinaRoja = document.querySelector('.cortina-roja');
    var iconosRedes = document.querySelectorAll('.iconos-redes');
    var textoAbout =  document.querySelector('.texto-about');
    var imgn;
    
   
    

    calcularColumnas();         //Calculo las columnas en función del tipo de pantalla con la función que he creado más abajo.
    calculoPosicion();

    for (let i = 0; i < datos.length; i++) {
        cortina[i].innerHTML = '<h3 class="titulo">'+datos[i].titulo +'</h3>';

    }

    
/*------------------------EVENTOS----------------------------------------*/  

    window.addEventListener('resize', function(){
            arrayMinimos =[];
            calcularColumnas();
            calculoPosicion();
    });

    window.addEventListener('scroll', function () { 
        if(botonMenu.checked || !modoMosaico){                          //Se fija el scroll si el menú está desplegado.
            //window.scrollY=scrollPosition;
            window.scrollTo(0, scrollPosition);
        }else{
            arrayMinimos = [];      //inicializando array valores columna.
            calculoPosicion();
            if(primerScroll){       //se establece animación primer scroll
                window.scrollTo(0, 0);
                document.querySelector('.caja-cabecera').classList.add('recogida');
                document.querySelector('.tags').classList.add('tag-desplegado');
                setTimeout(function () {  primerScroll = false;}, 900);
            }
        }
     });        
           
    botonMenu.addEventListener('change',function () { 
        scrollPosition = window.scrollY;
        if (aboutDesplegado) {
            cortinaRoja.classList.replace('desplegado','replegado');
           textoAbout.classList.replace('desplegado-texto', 'replegado-texto');
            for (let i = 0; i < iconosRedes.length; i++) {
                iconosRedes[i].classList.remove('mostrar');
                
            }
        }
     });

  
     for (let i = 0; i < imagen.length; i++) {
         imagen[i].addEventListener('click', clickImagen);  
     }

    

    about.addEventListener('click', function(){
        cortinaRoja.classList.remove('replegado');
        cortinaRoja.classList.add('desplegado');
        textoAbout.classList.replace('replegado-texto', 'desplegado-texto');
        for (let i = 0; i < iconosRedes.length; i++) {
            iconosRedes[i].classList.add('mostrar');  
        }
        aboutDesplegado = true;
    });

/*------------------FUNCIÓN DE CLICK EN LAS IMÁGENES--------------------*/

function clickImagen() {
    this.querySelector('.cortina').classList.toggle('ocultar');
    if(modoMosaico){
       scrollPosition = window.scrollY;
       for (let j = 0; j < imagen.length; j++) {
           if(imagen[j] != this){
               imagen[j].classList.add('ocultar');
           }
       }
       aleatorio = Math.ceil(Math.random()*4);
       this.classList.add('posicion-'+aleatorio);
       tamañoMaximoFotos(this);
       console.log('modo mosaico es ' + modoMosaico);
       modoMosaico = !modoMosaico;                   //Alternar valor booleano
       console.log('modo mosaico cambia a ' + modoMosaico);
    }else{
       for (let j = 0; j < imagen.length; j++) {
           if(imagen[j] != this){
               imagen[j].classList.remove('ocultar');
               console.log('clase oculta');
           }
       }
       this.classList.remove('posicion-'+ aleatorio);
       //let estiloImagen = this.querySelector(imgn);
       imgn.style.maxWidth = '';
       imgn.style.maxHeight = '';
       imgn.style.width = '100%';
       modoMosaico = !modoMosaico;
    }
}

/*----------------------FUNCIÓN DE CÁLCULO DE POSICIÓN-----------------------------*/

  function calculoPosicion() {
    for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
        arrayMinimos.push(0); 
    };

for (let i = 0; i < imagen.length; i++) {
        var minimo = Math.min.apply(null, arrayMinimos);    //Se determina la altura de la columna más corta (coordenada Y)
        var index = arrayMinimos.indexOf(minimo);  //determina qué columna es
        var posicionEjeX = index*anchoColumnas*anchoContenedor/100;    //Cálculo de la coordenada X
        imagen[i].style.left = posicionEjeX + 'px';  //fija coordenada X
        imagen[i].style.top = minimo + 'px';         //fija coordenada Y
        arrayMinimos[index] = minimo + imagen[i].offsetHeight;  //establece nueva altura de la columna
    }    
    var maximo = Math.max.apply(null, arrayMinimos);
    contenedor.style.height = maximo + 'px';           //fijo altura del contenedor.

  }


/*   ------------------------------FUNCIÓN PARA CÁLCULO DE COLUMNAS--------------------------- */

    function calcularColumnas(){

        anchoContenedor = contenedor.offsetWidth;
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
        imagen.forEach(function (value, index) { imagen[index].style.width = anchoColumnas + '%' });

        console.log('el número de columnas es:' + numeroColumnas);
        console.log('el ancho del contenedor es' + anchoContenedor);
    }
    


//--------------FUNCIÓN CÁLCULO ALTURA MÁXIMA FOTOS------------------

    function tamañoMaximoFotos(selector) {
        let alturaMaxima = menu.offsetHeight;
        imgn = selector.querySelector('video') || selector.querySelector('img');
        imgn.style.maxWidth = anchoContenedor + 'px';
        imgn.style.maxHeight = alturaMaxima + 'px';
        imgn.style.width = 'auto';
    }

//});