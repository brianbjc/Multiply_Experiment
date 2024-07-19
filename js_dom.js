

document.addEventListener('DOMContentLoaded', () => {
    function updateColors() {
        const rgbValues = [];
        const colorPickers = [];

        for (let i = 1; i <= 10; i++) {
            const colorPicker = document.getElementById(`colorPicker${i}`);
            colorPickers.push(colorPicker);
            rgbValues.push(hexToRgb(colorPicker.value));
            colorPicker.addEventListener('input', () => {
                rgbValues[i - 1] = hexToRgb(colorPicker.value);
                updateGrid();
            });
        }

        function updateGrid() {
            for (let row = 1; row <= 10; row++) {

                document.getElementById(`color-repeat-${row}`).style.backgroundColor = colorPickers[row-1].value;
                document.getElementById(`colorpicker-text-${row}`).innerText = extractRgbValues(hexToRgb(colorPickers[row-1].value));

                document.getElementById(`color-repeat-${row}-text`).innerText = extractRgbValues(hexToRgb(colorPickers[row-1].value));


                for (let col = 1; col <= 10; col++) {
                    const color1Index = row - 1;
                    const color2Index = col - 1;
                    const elementId = `grid-item-${row}-${col}`;
                    const element = document.getElementById(elementId);
                    element.style.backgroundColor = multiplyColors(rgbValues[color1Index], rgbValues[color2Index]);
                    element.innerText = extractRgbValues(multiplyColors(rgbValues[color1Index], rgbValues[color2Index]));
                    

                }
            } 
        }

        updateGrid();
    }

    updateColors();
});


function toggleGrayscale() {
    const body = document.body;
    const button = document.getElementById('toggleButton');

    body.classList.toggle('grayscale');

    if (body.classList.contains('grayscale')) {
        button.textContent = 'Color';
    } else {
        button.textContent = 'Grey';
    }
}


function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
}

function multiplyColors(color1, color2) {
    // Extraer los componentes RGB de los colores
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);
    
    // Multiplicar los componentes y normalizarlos
    const r = (rgb1[0] * rgb2[0]) / 255;
    const g = (rgb1[1] * rgb2[1]) / 255;
    const b = (rgb1[2] * rgb2[2]) / 255;
    
    // Formatear el resultado como un color RGB
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function extractRgbValues(rgbString) {
    let values = rgbString.replace('rgb(', '').replace(')', '').split(',');
    values = values.map(value => parseInt(value.trim()));

    // Calcular los valores normalizados
    const normalizedValues = values.map(value => (value / 255).toFixed(2));

    // Convertir los valores RGB a formato hexadecimal
    const hexValues = values.map(value => value.toString(16).padStart(2, '0').toUpperCase());

    // Formatear los datos tabulados
    const rgbText = values.join(' ');
    const normalizedText = normalizedValues.join(' ');
    const hexText = hexValues.join(' ');

    return `${rgbText}\n${normalizedText}\n${hexText}`;
}




