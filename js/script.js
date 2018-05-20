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
    let hojaEstilo = document.styleSheets[1];
    let cssSize = hojaEstilo.cssRules.length;
    
    
   
    document.oncontextmenu = function(){return false;}      //desactivar botón derecho
    insertarReglaCss();
    crearGaleria();
    calcularColumnas();         //Calculo las columnas en función del tipo de pantalla con la función que he creado más abajo.
    calculoPosicion();

    for (let i = 0; i < datos.length; i++) {
        cortina[i].innerHTML = `<h3 class="titulo"> ${datos[i].titulo}</h3><span class="etiquetas">${datos[i].etiqueta}</span>`;

    }


  
/*------------------------EVENTOS----------------------------------------*/  

    window.addEventListener('resize', function(){

            calcularColumnas();
            calculoPosicion();
    });

    window.addEventListener('touchstart', function () { 
        dispositivoMovil = true;
        for (let i = 0; i < imagen.length; i++) {
            imagen[i].addEventListener('click', clickImagen);  
        }

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

function clickImagen() {
    console.log(this.querySelector('.cortina'));
    this.querySelector('.cortina').classList.toggle('cortina-info');
}

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
        let alturaInfo = Math.round(anchoContenedor/numeroColumnas*0.3);
        let desplazamiento = Math.round(anchoContenedor/numeroColumnas*0.15);

        fijarAlturaInfo(alturaInfo, desplazamiento);

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
            elemento = `<video loop onloadedmetadata="calculoPosicion()" muted autoplay playsinline src="../videos/video500px/${archivo}" poster="../videos/video500px/poster/poster${i+1}.jpg"></video>`
        }else{
            elemento = `<img src="../img/portfolio/${archivo}" onload="calculoPosicion()" alt="Elena Titos. ${datos[i].alt}. ${datos[i].titulo}">`
        }

        contenedor.appendChild(caja);
        caja.innerHTML = `<div class="contenedor-cortina"> ${elemento} <div class="cortina"></div> </div>`
    }
    imagen = document.querySelectorAll('.imagen');
    cortina = document.querySelectorAll('.cortina');
    videos = document.querySelectorAll('video');
    sinAutoplay()
}

/* ----------------FUNCIÓN PARA DISPOSITIVOS SIN AUTOPLAY--------------------------- */

function sinAutoplay() {

    setTimeout(function(){
        videos.forEach(function(val, index){
            let tiempo = videos[index].currentTime;
            if(tiempo===0){
                val.parentElement.insertAdjacentHTML('beforeend', playIcon);
                let botonPlay = val.parentElement.querySelector('.play-icon');
                botonPlay.addEventListener('click', function (e) { 
                    e.stopPropagation();
                    val.play();
                 })
                 val.onplaying = function(){botonPlay.style.display = 'none'}

            }
        });
    }, 1500);
}

/* --------------FUNCIÓN CLICK EN IMÁGENES---------------- */

function clickImagen() {
    this.querySelector('.cortina').classList.toggle('cortina-info');
    let objetoDesplazado = this.querySelector('img') || this.querySelector('video');
    objetoDesplazado.classList.toggle('efecto-desplazamiento');
    
}

/* ----------------FUNCIÓN PARA INTRODUCIR UNA NUEVA REGLA DE ESTILO--------- */

function insertarReglaCss() {
    hojaEstilo.insertRule('.cortina-info{height: 0;}', cssSize);
    hojaEstilo.insertRule('.efecto-desplazamiento{transform: translateY(-57px); -webkit-transform: translateZ(0);}', cssSize+1);
}

function fijarAlturaInfo(alto, desplazamiento) {
    hojaEstilo.cssRules[cssSize].style.height = `${alto}px`;
    hojaEstilo.cssRules[cssSize+1].style.transform = `translateY(${-desplazamiento}px)`;
}
