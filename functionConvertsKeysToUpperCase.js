function getObjKeysToUpperCase(obj) {
  // проверяем является ли передаваемый аргумент объектом 
  if (typeof obj !== 'object' || obj === null) return obj;
  // если передаваемый аргумент массив то рекурсией проверяем его значения
  if (Array.isArray(obj)) {
    return obj.map(getObjKeysToUpperCase);
  }
  // получаем ключи объекта
  const keys = Object.keys(obj);

  // перебираем массив из ключей
  for (const key of keys) {
    // Сохраняем изначальное значение
    const value = obj[key]
    // возводим каждый ключ в верхний регистор
    const upperCaseKey = key.toUpperCase();
    //удаляем изначальный ключ
    delete obj[key]
    // вместо удаленного добавляем ключ в верхнем регистре и присваиваем ранее сохраненное значение
    // и проверяем вложенность за счет рекурсии
    obj[upperCaseKey] = getObjKeysToUpperCase(value);
  }
  return obj;
}

const testObj = {
  level1_1: {
    level2_1: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    level2_2: {
      level3_1: "string",
      level3_2: [
        { level4_1: 1 },
        { level4_2: true },
        { level4_3: 1 },
      ]
    }
  },
  level1_2: "value3"
}

const result = getObjKeysToUpperCase(testObj)
console.log(result)

