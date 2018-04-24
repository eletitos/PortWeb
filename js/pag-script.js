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
var menu = document.querySelector('header nav');
var cortina = document.querySelectorAll('.cortina');
var cortinaRoja = document.querySelector('.cortina-roja');
var iconosRedes = document.querySelectorAll('.iconos-redes');
var textoAbout =  document.querySelector('.texto-about');
var cajasImagenes = document.querySelectorAll('#work .absolute');
var texto = document.querySelector('#work .texto');
var posicionBottomImagen;
var posicionTopImagen;


cajasImagenes.forEach(function (v, i) {
    posicionTopImagen = cajasImagenes[i].getBoundingClientRect().top;
    if (posicionTopImagen>0 && posicionTopImagen<altoVentana) {
        cajasImagenes[i].children[0].classList.add('cambio-opacidad');
    }
});

window.addEventListener('resize', function () {
    altoVentana = window.innerHeight;
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
    var scroll = window.scrollY;
    texto.style.transform = 'translateY(' + scroll/1.4 + 'px)'
}

//--------FUNCIÓN BLOQUEO DEL SCROLL---------

function bloqueoScroll() {
    if(menuDesplegado){
        window.scrollTo()
    }
}