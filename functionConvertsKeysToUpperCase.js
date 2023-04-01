function getObjKeysToUpperCase(obj) {
    // проверяем является ли передаваемый аргумент объектом
    if (typeof obj !== 'object') return obj;

    // получаем ключи объекта
    const keys = Object.keys(obj);
    const result = {};

    // перебираем массив из ключей
    for (const key of keys) {
        // возводим каждый ключ в верхний регистор
      const upperCaseKey = key.toUpperCase();

      // Присваиваем ключу уже в верхнем регистре его изначальное значение
      // За счет рекурсии проверяем вложенность
      result[upperCaseKey] = getObjKeysToUpperCase(obj[key]);
    }
    return result;
  }

  const testObj = {
    level1_1 : {
        level2_1 : [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        level2_2 : {
            level3_1 : "string",
            level3_2 : [
                {level4_1 : 1},
                {level4_2 : true},
                {level4_3 : 1},
            ]
        }
    },
    level1_2 : "value3"
  }

  const result = getObjKeysToUpperCase(testObj)
  console.log(result)
  