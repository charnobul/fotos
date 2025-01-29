// Функция для шифрования текста в картинку
function encodeText() {
    const text = document.getElementById('inputText').value;
    if (!text) {
        alert("Введите текст!");
        return;
    }

    // Создаем изображение на холсте (canvas)
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const width = 500;
    const height = 200;

    canvas.width = width;
    canvas.height = height;

    // Преобразуем текст в бинарный формат
    const binaryText = text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');

    // Заполняем изображение цветами, скрывая бинарный текст в каждом пикселе
    let x = 0, y = 0;
    for (let i = 0; i < binaryText.length; i++) {
        const bit = binaryText[i] === '1' ? 255 : 0;
        ctx.fillStyle = `rgb(${bit}, ${bit}, ${bit})`;
        ctx.fillRect(x, y, 1, 1);
        x++;
        if (x >= width) {
            x = 0;
            y++;
        }
        if (y >= height) break;
    }

    // Создаем изображение в теге <img>
    const dataURL = canvas.toDataURL();
    const imgElement = document.getElementById('encodedImage');
    imgElement.src = dataURL;

    // Ссылка на скачивание изображения
    document.getElementById('downloadLink').href = dataURL;
    document.getElementById('downloadLink').style.display = 'block';
}

// Функция для расшифровки текста из изображения
function decodeTextFromImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imgElement = document.getElementById('encodedImage');
    
    // Загрузка изображения в canvas
    const img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Чтение пикселей
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const binaryText = [];
        
        for (let i = 0; i < pixels.data.length; i += 4) {
            // Считываем яркость пикселя (среднее значение RGB)
            const brightness = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
            // Если яркость пикселя больше 128, то это '1', иначе '0'
            binaryText.push(brightness > 128 ? '1' : '0');
        }

        // Преобразуем бинарный текст обратно в строку
        let text = '';
        for (let i = 0; i < binaryText.length; i += 8) {
            const byte = binaryText.slice(i, i + 8).join('');
            text += String.fromCharCode(parseInt(byte, 2));
        }

        // Выводим расшифрованный текст
        document.getElementById('decodedText').innerText = text;
    };

    img.src = imgElement.src;
}
