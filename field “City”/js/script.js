// Получаем элементы страницы
const input = document.getElementById('city-input');
const select = document.getElementById('city-select');

// кол бэк функция, которая будет вызываться при получении ответа от сервера
function createResponseProcessing(data) {
    // Передаем данные в функцию, для вывода на страницу
    createCityVariant(data.result);
}
// Вешаем слушатель события на инпут, срабатывает при каждом изменение значения
input.addEventListener('input', function () {

    // Получаем данные введенные в поле 
    const searchValue = this.value;

    // url по которому запрашиваем города
    const url = `https://kladr-api.ru/api.php?query=${searchValue}&contentType=city&withParent=1&limit=5&callback=createResponseProcessing`;
    if (searchValue.length > 2) {
        // Создаем скрипт
    const script = document.createElement('script');
    // Устанавливаем атрибуты скрипта
    script.src = url;
    script.type = 'text/javascript';

    // Добавляем скрипт на страницу
    document.body.appendChild(script);

    // Удаляем скрипт после выполнения запроса
    script.onload = function () {
        this.remove();
    };
    }else{
        // Обнуляем варианты и скрываем их если значение в инпут меньше трех 
        select.innerHTML = '';
        select.style.display = 'none';
    }
});

function createCityVariant(data) {
    //обнуляем список перед каждым выводом
    select.innerHTML = '';
    //перебираем полученные данные 
    for (city of data) {
        if (city.name === "Бесплатная версия kladr-api.ru") continue
        const option = document.createElement('option');
        // в вариант присваиваем название города
        option.value = city.name;
        // так же название города прописываем в контент тега
        option.textContent = city.name;
        // добавляем вариант к селект
        select.appendChild(option);
        // на каждый вариант вешаем функцию
        option.onclick = () => {
            // при взаимодействии с любым из вариантов, заполняем значение инпут и полностью скрываем селект
            input.value = option.value
            select.style.display = 'none'
        }
    }
    // показываем селект и сформированные варианты 
    select.style.display = 'block';
}
