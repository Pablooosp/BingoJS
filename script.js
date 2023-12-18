let numerosBingo = [];
let interval;

function mostrarCartones(cantidad) {
  // Ocultar los botones y mostrar los cartones
  document.getElementById('menu').style.display = 'none';
  document.getElementById('cartones').classList.remove('hidden');

  // Mostrar la cantidad de tablas solicitada
  for (let i = 1; i <= 4; i++) {
      const tabla = document.getElementById(`tablaCarton${i}`);
      
      if (i <= cantidad) {
          const carton = generarNumerosCarton();
          mostrarCartonEnTabla(carton, tabla);
          tabla.classList.remove('hidden');
      } else {
          // Ocultar las tablas restantes
          tabla.classList.add('hidden');
      }
  }
}

function mostrarCartonEnTabla(carton, tabla) {
  // Limpiar contenido anterior
  tabla.innerHTML = '';

  // Crear una fila para los números del cartón
  const fila = document.createElement('div');
  fila.classList.add('grid', 'grid-cols-5', 'w-100', 'h-40');

  // Mostrar los números en la tabla
  for (let i = 0; i < carton.length; i++) {
      const celda = document.createElement('div');
      celda.textContent = carton[i];
      celda.classList.add('border-2', 'border-gray-300', 'text-base', 'text-center', 'flex', 'justify-center', 'items-center');
      fila.appendChild(celda);
  }

  // Agregar la fila a la tabla
  tabla.appendChild(fila);
}

function generarNumerosCarton() {
  const carton = [];
  
  // Generar 5 números únicos del 1 al 30 para la primera fila
  const fila1 = generarFilaOrdenada(1, 30);
  carton.push(...fila1);

  // Generar 5 números únicos del 31 al 60 para la segunda fila
  const fila2 = generarFilaOrdenada(31, 60);
  carton.push(...fila2);

  // Generar 5 números únicos del 61 al 90 para la tercera fila
  const fila3 = generarFilaOrdenada(61, 90);
  carton.push(...fila3);

  return carton;
}

function generarFilaOrdenada(min, max) {
  const fila = [];
  for (let i = 0; i < 5; i++) {
      let numero = generarNumeroUnico(min, max, fila);
      fila.push(numero);
  }
  return fila.sort((a, b) => a - b);
}

function generarNumeroUnico(min, max, numerosExcluidos) {
  // Generar número aleatorio único dentro del rango [min, max]
  let numero;
  do {
      numero = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (numerosExcluidos.includes(numero));

  return numero;
}
function iniciarBingo() {
    // Iniciar generación de números aleatorios
    interval = setInterval(generarNumeroBingo, 1000);
}

function generarNumeroBingo() {
    // Generar número aleatorio del 1 al 90
    const numero = Math.floor(Math.random() * 90) + 1;
    numerosBingo.push(numero);

    // Actualizar la visualización de los números de Bingo
    mostrarNumerosBingo();

    // Comprobar si algún número está en los cartones y cambiar el fondo a verde
    comprobarNumerosEnCartones();
}

function mostrarNumerosBingo() {
    // Mostrar solo los últimos 10 números generados en una sección
    const numerosBingoSection = document.getElementById('numerosBingo');
    numerosBingoSection.innerHTML = '<h2>Números de Bingo</h2>';

    // Obtener los últimos 10 números
    const ultimosNumeros = numerosBingo.slice(-10);

    for (const numero of ultimosNumeros) {
        const numeroElement = document.createElement('div');
        numeroElement.textContent = numero;
        numeroElement.classList.add('bg-gray-300', 'p-2', 'rounded', 'm-2', 'inline-block');
        numerosBingoSection.appendChild(numeroElement);
    }
}


function comprobarNumerosEnCartones() {
    // Comprobar si algún número de Bingo está en los cartones y cambiar el fondo a verde
    for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);
        const celdas = tabla.querySelectorAll('.text-center');
        for (const celda of celdas) {
            const numeroCarton = parseInt(celda.textContent, 10);
            if (numerosBingo.includes(numeroCarton)) {
                celda.style.backgroundColor = 'green';
            }
        }
    }
}



