    var contenedor = document.getElementById('contenedor');
    var numeroFotos = datos.length;
    var extension;
    var numeroColumnas;
    var anchoContenedor;
    var anchoColumnas;
    var arrayMinimos = [];
    var imagen      //lista
    var primerScroll = true;
    var botonMenu = document.getElementById('menu-icon');
    var scrollPosition = 0;
    var modoMosaico = true;
    var aleatorio;
    var dispositivoMovil = false;
    var about = document.getElementById('btn-about');
    var aboutDesplegado = false;
    var menu = document.querySelector('header nav');
    var cortina;            //variable creada cd se crea la galería
    var cortinaRoja = document.querySelector('.cortina-roja');
    var iconosRedes = document.querySelectorAll('.iconos-redes');
    var textoAbout =  document.querySelector('.texto-about');
    var email = document.querySelector('.texto-about').querySelector('.mail');
    var imgn;
    var caja;
    var videos;
    var playIcon = '<svg class="play-icon" viewBox="0 0 250 250" alt="Play video"><circle cx="125" cy="125" r="100" fill="none"  stroke-width="35" stroke="#fff"/><polygon points="95, 80 95, 170 170, 125" fill="#fff"/></svg>'
    
   
    document.oncontextmenu = function(){return false;}      //desactivar botón derecho
    crearGaleria();
    calcularColumnas();         //Calculo las columnas en función del tipo de pantalla con la función que he creado más abajo.
    calculoPosicion();

    for (let i = 0; i < datos.length; i++) {
        cortina[i].innerHTML = '<h3 class="titulo">'+datos[i].titulo +'</h3>';

    }

  /*   imagen.forEach(function(val){
        val.addEventListener('load', function () { 
            calculoPosicion();
         })
    })

    videos.forEach(function(val){
        console.log('activado');
        val.addEventListener('load', function () { 
            calculoPosicion();
            console.log(`imagen ${val} cargada`);
         })
    }) */

  
/*------------------------EVENTOS----------------------------------------*/  

    window.addEventListener('resize', function(){

            calcularColumnas();
            calculoPosicion();
    });

    window.addEventListener('touchstart', function () { 
        dispositivoMovil = true;
        cortina.forEach(function(val){
            val.classList.add('ocultar');
        })

     })

    window.addEventListener('scroll', function () { 
        if(botonMenu.checked || !modoMosaico){                          //Se fija el scroll si el menú está desplegado.
            window.scrollTo(0, scrollPosition);
        }else{
            //calculoPosicion();
            if(primerScroll && numeroColumnas>1){       //se establece animación primer scroll
                window.scrollTo(0, 0);
                document.querySelector('.caja-cabecera').classList.add('recogida');
                document.querySelector('.pie').classList.add('pie-desplegado');
                setTimeout(function () {  primerScroll = false;}, 900);
            }
        }
     });     
     
     
    document.body.addEventListener('touchmove', function () {
        if(botonMenu.checked || !modoMosaico){                          //Se fija el scroll si el menú está desplegado.
            //window.scrollY=scrollPosition;
            //e.preventDefault();
            //e.stopPropagation();
            document.body.style.overflow = 'hidden';
        }else{document.body.style.overflow = 'auto'}
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

  
   /*   for (let i = 0; i < imagen.length; i++) {
         imagen[i].addEventListener('click', clickImagen);  
     }
 */
    

    about.addEventListener('click', function(){
        cortinaRoja.classList.remove('replegado');
        cortinaRoja.classList.add('desplegado');
        textoAbout.classList.replace('replegado-texto', 'desplegado-texto');
        for (let i = 0; i < iconosRedes.length; i++) {
            iconosRedes[i].classList.add('mostrar');  
        }
        aboutDesplegado = true;
    });

    email.addEventListener('mouseenter', function(){
        document.oncontextmenu = function(){return true;}  
    })

    email.addEventListener('mouseleave', function(){
        document.oncontextmenu = function(){return false;}  
    })

/*------------------FUNCIÓN DE CLICK EN LAS IMÁGENES--------------------*/

/* function clickImagen() {
    if(!dispositivoMovil){
        this.querySelector('.cortina').classList.toggle('ocultar');
    }
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
       modoMosaico = !modoMosaico;                   //Alternar valor booleano
    }else{
       for (let j = 0; j < imagen.length; j++) {
           if(imagen[j] != this){
               imagen[j].classList.remove('ocultar');
           }
       }
       this.classList.remove('posicion-'+ aleatorio);
       //let estiloImagen = this.querySelector(imgn);
       imgn.style.maxWidth = '';
       imgn.style.maxHeight = '';
       imgn.style.width = '100%';
       modoMosaico = !modoMosaico;
    }
} */

/*----------------------FUNCIÓN DE CÁLCULO DE POSICIÓN-----------------------------*/

  function calculoPosicion() {
    arrayMinimos =[];
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
    console.log('posicion calculada');
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
    }
 
//--------------FUNCIÓN CÁLCULO ALTURA MÁXIMA FOTOS------------------

    function tamañoMaximoFotos(selector) {
        let alturaMaxima = menu.offsetHeight;
        imgn = selector.querySelector('video') || selector.querySelector('img');
        imgn.style.maxWidth = anchoContenedor + 'px';
        imgn.style.maxHeight = alturaMaxima + 'px';
        imgn.style.width = 'auto';
    }

//-------------FUNCIÓN DE CREACIÓN DE GALERÍA-----------------------------

function crearGaleria() {
    for (let i = 0; i < numeroFotos; i++) {
        caja = document.createElement('div');
        caja.className = 'imagen';
        let archivo = datos[i].archivo;
        let extension = archivo.split('.')[1];
        let elemento;
        if(extension==='mp4'){
            elemento = `<video loop autoplay onload="calculoPosicion()" muted playsinline src="../videos/video500px/${archivo}"></video>`
        }else{
            elemento = `<img src="../img/portfolio/${archivo}" onload="calculoPosicion()" alt="Elena Titos. ${datos[i].alt}. ${datos[i].titulo}">`
        }

        contenedor.appendChild(caja);
        caja.innerHTML = `<div class="contenedor-cortina"> ${elemento} <div class="cortina"></div> </div>`
    }
    imagen = document.querySelectorAll('.imagen');
    cortina = document.querySelectorAll('.cortina');
    videos = document.querySelectorAll('video');
    sinAutoplay();
}

/* ----------------FUNCIÓN PARA DISPOSITIVOS SIN AUTOPLAY--------------------------- */

function sinAutoplay() {
    setTimeout(function(){
        videos.forEach(function(val, index){
            let tiempo = videos[index].currentTime;
            if(tiempo===0){
                let numeroPoster = val.getAttribute('src').split('px/')[1].split('.')[0];
                let srcPoster = `../videos/video500px/poster/poster${numeroPoster}.jpg`
                val.setAttribute('poster', srcPoster);
                val.parentElement.insertAdjacentHTML('beforeend', playIcon);
                let botonPlay = val.parentElement.querySelector('.play-icon');
                botonPlay.addEventListener('click', function (e) { 
                    e.stopPropagation();
                    val.play();
                 })
                val.addEventListener('play', function(){
                    botonPlay.style.display = 'none';
                })
            }
        });
    }, 1500);
}