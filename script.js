// Функция для шифровки текста в картинку
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

    // Ссылка на скачивание изображения
    const dataURL = canvas.toDataURL();
    document.getElementById('downloadLink').href = dataURL;
}
