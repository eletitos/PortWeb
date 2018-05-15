var altoVentana = window.innerHeight;
var anchoVentana = window.innerWidth;
var botonMenu = document.getElementById('menu-icon');
var scrollPosition = 0;
var about = document.getElementById('btn-about');
var aboutDesplegado = false;
var cortinaRoja = document.querySelector('.cortina-roja');
var iconosRedes = document.querySelectorAll('.iconos-redes');
var textoAbout =  document.querySelector('.texto-about');
var cajasImagenes = document.querySelectorAll('#work .absolute');
var texto = document.querySelector('#work .texto');
var posicionBottomImagen;
var posicionTopImagen;
var videos = document.querySelectorAll('video');
var email = document.querySelector('.texto-about').querySelector('.mail');
var playIcon = '<svg class="play-icon" viewBox="0 0 250 250" alt="Play video"><circle cx="125" cy="125" r="100" fill="none"  stroke-width="35" stroke="#fff"/><polygon points="95, 80 95, 170 170, 125" fill="#fff"/></svg>'
var volIcon = '<svg class="vol-icon" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 209.2 166.2"><path d="M89.5,9.3,38.3,51.6v-.2H0v63.5H38.3v-.2l51.3,42.2Z"/><path class="volumen ocultar" d="M161.5,0,139.1,19a80,80,0,0,1,0,128.2l22.5,19A109,109,0,0,0,161.5,0ZM123.8,31.9,99.6,52.3a31.9,31.9,0,0,1,0,61.5l24.2,20.4a60.8,60.8,0,0,0,0-102.4Z"/><polygon class="mute" points="188.8 138.3 154 103.5 119.2 138.3 98.8 117.9 133.6 83.1 98.8 48.3 119.2 27.9 154 62.7 188.8 27.9 209.2 48.3 174.4 83.1 209.2 117.9 188.8 138.3"/></svg>'
var videoConSonido = document.querySelector('.sonido');
var iconoVolumen;
var imagenes = document.querySelectorAll('img');


document.oncontextmenu = function(){return false;}      //desactivar botón derecho.
cajasImagenes.forEach(function (v, i) {
    posicionTopImagen = cajasImagenes[i].getBoundingClientRect().top;
    if (posicionTopImagen>0 && posicionTopImagen<altoVentana) {
        cajasImagenes[i].children[0].classList.add('cambio-opacidad');
    }
});

atributosAlt();
sinAutoplay();
iconoSonido();

window.addEventListener('resize', function () {
    altoVentana = window.innerHeight;
    anchoVentana = window.innerWidth;
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

window.addEventListener('scroll', function () { 
    desplazamientoImagenes();
    desplazamientoTexto();
    if (botonMenu.checked) {
        window.scrollTo(0, scrollPosition);
    }
 });

 document.body.addEventListener('touchmove', function () {
    if(botonMenu.checked){                          //Se fija el scroll si el menú está desplegado.
        //window.scrollY=scrollPosition;
        //e.preventDefault();
        //e.stopPropagation();
        document.body.style.overflow = 'hidden';
    }else{document.body.style.overflow = 'auto'}
});

email.addEventListener('mouseenter', function(){
    document.oncontextmenu = function(){return true;}  
})

email.addEventListener('mouseleave', function(){
    document.oncontextmenu = function(){return false;}  
})

 

/*------------- FUNCIÓN DESPLAZAMIENTO IMÁGENES---------------------*/
function desplazamientoImagenes() {
    for (let i = 0; i < cajasImagenes.length; i++) {
        posicionTopImagen = cajasImagenes[i].getBoundingClientRect().top;
        posicionBottomImagen = cajasImagenes[i].getBoundingClientRect().bottom;
        if(posicionBottomImagen < 0){
            cajasImagenes[i].style.transform = 'translateY(-125px)'
        }else if (posicionTopImagen>altoVentana) {
            cajasImagenes[i].style.transform = 'translateY(125px)'
        }else{
            cajasImagenes[i].style.transform = 'translateY(0)'
            cajasImagenes[i].children[0].classList.add('cambio-opacidad');
            setTimeout(function () {  
                cajasImagenes[i].style.background = 'transparent';
            }, 1800);
        }
    }

}

/*--------------FUNCIÓN DESPLAZAMIENTO TEXTO-----------------------*/

function desplazamientoTexto() {
    if(anchoVentana > 800){
        var scroll = window.scrollY;
        texto.style.transform = 'translateY(' + scroll/1.4 + 'px)';
    }
}

/* ------------------FUNCIÓN INSERTAR ATRIBUTOS ALT A IMÁGENES---------------- */

function atributosAlt(){
    imagenes.forEach(function(val){
        let numeroString = val.getAttribute('src').split('portfolio/')[1].split('.')[0];
        let numeroImagen = Number(numeroString) - 1;
        val.setAttribute('alt', `Elena Titos. ${datos[numeroImagen].alt}. ${datos[numeroImagen].titulo}`)
        console.log(numeroImagen);
    })
}

/* ----------------FUNCIÓN PARA DISPOSITIVOS SIN AUTOPLAY--------------------------- */

function sinAutoplay() {
    setTimeout(function(){
        videos.forEach(function(val, index){
            let tiempo = val.currentTime;
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
                 val.onplaying = function(){botonPlay.style.display = 'none'}
            }
        });
    }, 3000);
}


/* ---------------FUNCIÓN AGREGAR ICONO VOL EN VIDEOS CON SONIDO ------------------ */

function iconoSonido() {
    if(videoConSonido){
        videoConSonido.querySelector('video').addEventListener('play',function(){
            videoConSonido.insertAdjacentHTML('beforeend', volIcon);
            iconoVolumen = document.querySelector('.vol-icon');
            let volumenInicial = false;
            iconoVolumen.addEventListener('click', function () { 
                videoConSonido.querySelector('video').muted = volumenInicial;
                volumenInicial = !volumenInicial;
                iconoVolumen.querySelector('.mute').classList.toggle('ocultar');
                iconoVolumen.querySelector('.volumen').classList.toggle('ocultar');
             })
        })
    } 
}