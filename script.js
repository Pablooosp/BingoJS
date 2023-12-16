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

  // Dividir el cartón en tres filas
  const fila1 = carton.slice(0, 5);
  const fila2 = carton.slice(5, 10);
  const fila3 = carton.slice(10, 15);

  // Crear una fila para los números del cartón
  const fila1Element = document.createElement('tr');
  const fila2Element = document.createElement('tr');
  const fila3Element = document.createElement('tr');

  // Mostrar los números en las filas
  fila1.forEach(numero => {
      const celda = document.createElement('td');
      celda.textContent = numero;
      celda.classList.add('casilla');
      fila1Element.appendChild(celda);
  });

  fila2.forEach(numero => {
      const celda = document.createElement('td');
      celda.textContent = numero;
      celda.classList.add('casilla');
      fila2Element.appendChild(celda);
  });

  fila3.forEach(numero => {
      const celda = document.createElement('td');
      celda.textContent = numero;
      celda.classList.add('casilla');
      fila3Element.appendChild(celda);
  });

  // Agregar las filas a la tabla
  tabla.appendChild(fila1Element);
  tabla.appendChild(fila2Element);
  tabla.appendChild(fila3Element);
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



