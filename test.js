/*

... какие лютые отступы, ну ок :-)

	task
	1. Напишите функцию подготовки строки, которая заполняет шаблон данными из указанного объекта
	2. Пришлите код целиком, чтобы можно его было проверить
	3. Придерживайтесь code style текущего задания
	4. По необходимости - можете дописать код, методы
	5. Разместите код в гите и пришлите ссылку
*/

/**
 * Класс для работы с API
 *
 * @author	User Name
 * @version	v.1.0 (dd/mm/yyyy)
 */
class Api {
	#error_handler = null
	#api_base_path = ""

	constructor(api_base_path) {
		this.#api_base_path = api_base_path ?? ''
	}

	/**
	 * Устанавливает внешний обработчик ошибок
	 *
	 * @author	VK
	 * @version	v.1.0 (dd/mm/yyyy)
	 * @param {function} handler
	 */
	set_error_handler(handler) {
		this.#error_handler = handler
	}

	/**
	 * Вызывает внешний обработчик ошибок, если он установлен
	 *
	 * @author		VK
	 * @version		v.1.0 (dd/mm/yyyy)
	 */
	error_handler() {
		if (this.#error_handler) {
			this.#error_handler(arguments)
		}
	}

	/**
	 * Заполняет строковый шаблон template данными из объекта object
	 *
	 * @author	User Name
	 * @version	v.1.0 (dd/mm/yyyy)
	 * @param	{object} object
	 * @param	{string} template
	 * @return	{string}
	 */
	get_api_path(object, template) {
		if (!object || !template) {
			this.error_handler("Invalid get_api_path parameters")
			return ""
		}

		return (
			this.#api_base_path +
			template.replaceAll(/(%)(\w+)(%)/g, (_match, _p, key) => {
				if (!object[key]) {
					this.error_handler("Invalid template key: " + key)
					return "%" + key + "%"
				}

				return encodeURIComponent(object[key])
			})
		)
	}
}

let user = {
	id: 20,
	name: "John Dow",
	role: "QA",
	salary: 100,
}

let api_path_templates = [
	"/api/items/%id%/%name%",
	"/api/items/%id%/%role%",
	"/api/items/%id%/%salary%",
]

let api = new Api()

api.set_error_handler(function () {
	console.log(arguments)
})

let api_paths = api_path_templates.map((api_path_template) => {
	return api.get_api_path(user, api_path_template)
})

console.log(JSON.stringify(api_paths))

// Ожидаемый результат
let expected_result = [
	"/api/items/20/John%20Dow",
	"/api/items/20/QA",
	"/api/items/20/100",
]

/*
// * Протестируем, но я бы расширил варианты см. ниже

import { expect, test } from 'vitest'

test('Test class Api "Класс для работы с API"', () => {
	expect(api_paths).toMatchObject(expected_result)
})
*/

/**
 *
 * Расширенный вариант для тестирования
 *
 *
 */
/*

import { expect, test } from 'vitest'

const api_path_templates_test =
	[
		undefined,
		"",
		"/",
		"%id%",
		"%%", // TODO: надо обсудить этот кейс
		"/api/items/%id%%id%%role%%role%",
		...api_path_templates
	];

const expected_result_test = [
	"",
	"",
	"/",
	"20",
	"%%",
	"/api/items/2020QAQA",
	...expected_result
];

test('Test class Api "Класс для работы с API"', () => {

	const api_paths_test = api_path_templates_test
		.map(
			(api_path_template) => api.get_api_path(user, api_path_template)
		);

	expect(api_paths_test).toMatchObject(expected_result_test)
})

*/
