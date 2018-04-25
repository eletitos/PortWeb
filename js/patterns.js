var contenedor = document.getElementById('contenedor');
var anchoContenedor;
var anchoColumnas;
var aleatorio;
var altoVentana = window.innerHeight;
var anchoVentana = window.innerWidth;
var botonMenu = document.getElementById('menu-icon');
var dispositivoMovil = false;
var menuDesplegado = false;
var about = document.getElementById('btn-about');
var aboutDesplegado = false;
var menu = document.querySelector('header nav');
var cortina = document.querySelectorAll('.cortina');
var cortinaRoja = document.querySelector('.cortina-roja');
var iconosRedes = document.querySelectorAll('.iconos-redes');
var textoAbout =  document.querySelector('.texto-about');
var btnPattern = document.getElementById('cambio-pattern');
var numeroPatterns = patterns.length;
var contenedorPattern = document.querySelector('.pattern');


cargarPattern();


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

 //--------------FUNCIÓN CARGAR PATTERN--------------------
 function cargarPattern() {
     aleatorio= Math.floor(Math.random()*numeroPatterns);
     let patternInicio = patterns[aleatorio].archivo;
     contenedorPattern.style.background = `url(../img/patterns/${patternInicio})`;
    

 }