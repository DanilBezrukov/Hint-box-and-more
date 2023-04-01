// Получаем элементы страницы
const input = document.getElementById('city-input');
const select = document.getElementById('city-select');

// Вешаем слушатель события на инпут, срабатывает при каждом изменение значения
input.addEventListener('input', function() {

    // Получаем данные введенные в поле 
    const searchValue = this.value;

    // токен для получения данных от апи
    const token = 'pk.eyJ1IjoiZGFuaWwzMyIsImEiOiJjbGZ5MHBvYzcwaTV2M2NwaGUwZDFldXNlIn0.G-MxBuNwx_CbxyO6B2Ngdg'

    // Делаем запрос на сервер когда количество введенных символов больше или равно трем
    if (searchValue.length > 2) {

        // Ошибка CORS !!!
        // const url = `https://kladr-api.ru/api.php?query=${searchTerm}&contentType=city`;
        // const url = `https://kladr-api.ru/api.php?query=${searchTerm}&contentType=city&withParent=1&limit=2`;

        // url по которому запрашиваем города
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?types=place&access_token=${token}`;
        
        // запрос к апи
        fetch(url)
        // преобразуем данные из json и возвращаем их
        .then(response => response.json())
        // передаем данные в функцию, для вывода на страницу
        .then(data => createCityVariant(data.features))
        // выводим сообщение в консоль в случае ошибки
        .catch(error => console.error(error));
    } else {
        // обнуляем варианты и скрываем их если значение в инпут меньше трех 
      select.innerHTML = '';
      select.style.display = 'none'
    }
  });

  function createCityVariant(data) {
    //обнуляем список перед каждым выводом
    select.innerHTML = '';
    //перебираем полученные данные 
    data.forEach(city => {
        // создаем вариант
      const option = document.createElement('option');
      // в вариант присваиваем название города
      option.value = city.place_name;
      // так же название города прописываем в контент тега
      option.textContent = city.place_name;
      // добавляем вариант к селект
      select.appendChild(option);
      // на каждый вариант вешаем функцию
      option.onclick = () =>{
        // при взаимодействии с любым из вариантов, заполняем значение инпут и полностью скрываем селект
        input.value = option.value
        select.style.display = 'none'
      }
    });
    // показываем селект и сформированные варианты 
    select.style.display = 'block';
  }