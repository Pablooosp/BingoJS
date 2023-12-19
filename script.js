let numerosBingo = [];
let interval;
let alertaBingoMostrada = false;
let alertaPrimerCartonMostrada = false;
let generacionHabilitada = true;

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

function generarNumeroBingo() {
    if (!generacionHabilitada) {
        return;
    }

    // Generar número aleatorio del 1 al 90 que no se haya generado antes
    let numero;
    do {
        numero = Math.floor(Math.random() * 90) + 1;
    } while (numerosBingo.includes(numero));

    // Agregar el número a la lista
    numerosBingo.push(numero);

    // Actualizar la visualización de los números de Bingo
    mostrarNumerosBingo();

    // Comprobar si algún número está en los cartones y cambiar el fondo a verde
    comprobarNumerosEnCartones();
    comprobarCartonCompleto();
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
        numeroElement.classList.add('bg-gray-300', 'p-2', 'rounded', 'm-2', 'inline-block', 'animated-number');
        numerosBingoSection.appendChild(numeroElement);
    }
}

function iniciarBingo() {
    // Iniciar generación de números aleatorios
    interval = setInterval(generarNumeroBingo, 500); // Cambié a 500 ms para hacer la animación más rápida
}

function detenerGeneracion() {
    // Detener la generación de números
    generacionHabilitada = false;
}

function comprobarNumerosEnCartones() {
    // Comprobar si se completa una línea horizontal en algún cartón
    for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);
        
        if (tabla.classList.contains('hidden')) {
            // Si el cartón está oculto, omitir la comprobación
            continue;
        }

        const filas = tabla.querySelectorAll('.text-center');

        // Verificar si se completa una línea horizontal
        const lineaCompleta = Array.from(filas).some((celda, index, array) => {
            const filaIndex = Math.floor(index / 5);
            const fila = array.slice(filaIndex * 5, (filaIndex + 1) * 5);
            return fila.every(c => c.textContent !== '' && c.style.backgroundColor === 'green');
        });

        // Mostrar la alerta solo si se completa una línea y no se ha mostrado antes
        if (lineaCompleta && !alertaBingoMostrada) {
            alert(`¡Bingo! Se ha completado una línea en el Cartón ${i}!`);
            alertaBingoMostrada = true; // Marcar la alerta de bingo como mostrada
        }

        // Cambiar el fondo a verde si el número coincide con algún número de Bingo
        for (const celda of filas) {
            const numeroCarton = parseInt(celda.textContent, 10);
            if (numerosBingo.includes(numeroCarton)) {
                celda.style.backgroundColor = 'green';
            }
        }
    }
}

function comprobarCartonCompleto() {
    // Comprobar si algún cartón está completo
    for (let i = 1; i <= 4; i++) {
        const tabla = document.getElementById(`tablaCarton${i}`);
        
        // Verificar si el cartón es visible
        if (!tabla.classList.contains('hidden')) {
            const filas = tabla.querySelectorAll('.text-center');

            // Verificar si todas las celdas tienen fondo verde
            const cartonCompleto = Array.from(filas).every(celda => celda.style.backgroundColor === 'green');

            // Mostrar la alerta solo si el cartón se completa y no se ha mostrado antes
            if (cartonCompleto && !alertaPrimerCartonMostrada) {
                alert(`¡Bingo! Se ha completado el Cartón ${i}!`);
                alertaPrimerCartonMostrada = true; // Marcar la alerta del primer cartón como mostrada
                detenerGeneracion(); // Detener la generación cuando se completa un cartón
                mostrarBotonReinicio();
            }
        }
    }
}

function mostrarBotonReinicio() {
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    reiniciarBtn.classList.remove('hidden');
}

function reiniciarJuego() {
    // Detener la generación de números aleatorios
    clearInterval(interval);

    // Reiniciar variables y ocultar los cartones
    numerosBingo = [];
    alertaBingoMostrada = false;
    alertaPrimerCartonMostrada = false;
    generacionHabilitada = true; // Restablecer la generación
    document.getElementById('menu').style.display = 'block';
    document.getElementById('cartones').classList.add('hidden');
    document.getElementById('reiniciarBtn').classList.add('hidden');
}

