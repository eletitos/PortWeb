var contenedor = document.getElementById('contenedor');
var numeroFotos = 70;
var extension;
var numeroColumnas;
var anchoContenedor;
var anchoColumnas;
var arrayMinimos = [];
var imagen = document.querySelectorAll('.imagen');     //lista
var primerScroll = true;
var altoVentana = window.innerHeight;
var anchoVentana = window.innerWidth;
var botonMenu = document.getElementById('menu-icon');
var scrollPosition = 0;
var aleatorio;
var dispositivoMovil = false;
var menuDesplegado = false;
var about = document.getElementById('btn-about');
var aboutDesplegado = false;
var menu = document.querySelector('header nav');
var cortina = document.querySelectorAll('.cortina');
var cortinaRoja = document.querySelector('.cortina-roja');
var iconosRedes = document.querySelectorAll('.iconos-redes');
var textoAbout =  document.querySelector('.texto-about');
var cajasImagenes = document.querySelectorAll('#work .absolute');
var texto = document.querySelector('#work .texto');
var posicionBottomImagen;
var posicionTopImagen;
var videos = document.querySelectorAll('video');
var playIcon = '<svg class="play-icon" viewBox="0 0 200 200" alt="Play video"><circle cx="100" cy="100" r="100" fill="none" stroke-width="35" stroke="#fff"/><polygon points="70, 55 70, 145 145, 100" fill="#fff"/></svg>'


cajasImagenes.forEach(function (v, i) {
    posicionTopImagen = cajasImagenes[i].getBoundingClientRect().top;
    if (posicionTopImagen>0 && posicionTopImagen<altoVentana) {
        cajasImagenes[i].children[0].classList.add('cambio-opacidad');
    }
});

sinAutoplay();

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
 });

 document.body.addEventListener('touchmove', function () {
    if(botonMenu.checked){                          //Se fija el scroll si el menú está desplegado.
        //window.scrollY=scrollPosition;
        //e.preventDefault();
        //e.stopPropagation();
        document.body.style.overflow = 'hidden';
    }else{document.body.style.overflow = 'auto'}
});
 

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

//--------FUNCIÓN BLOQUEO DEL SCROLL---------

function bloqueoScroll() {
    if(menuDesplegado){
        window.scrollTo()
    }
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
                val.addEventListener('play', function(){
                    botonPlay.style.display = 'none';
                    console.log(`video ${index} eliminado`);
                })
            }
        });
    }, 1500);
}